#!/usr/bin/env python3
"""
extract_gpx_to_js.py — Liebana Picos de Europa
Convierte archivos GPX de la carpeta gpx/ a data.js

Uso:
    python scripts/extract_gpx_to_js.py

Requiere: archivos .gpx en la carpeta gpx/
Genera: data.js con CONFIG, ZONE_COLORS y hikingRoutes
"""

import os
import re
import math
import xml.etree.ElementTree as ET
from pathlib import Path

GPX_DIR = Path(__file__).parent.parent / 'gpx'
OUTPUT_FILE = Path(__file__).parent.parent / 'data.js'
MAX_POINTS = 500  # Max coordinates per route after sampling
GPX_NS = '{http://www.topografix.com/GPX/1/1}'

ZONE_COLORS = {
    'tresviso':      "{ main: '#D32F2F', glow: '#EF5350' }",
    'potes':         "{ main: '#E65100', glow: '#FF8F00' }",
    'penarrubia':    "{ main: '#1565C0', glow: '#42A5F5' }",
    'la-hermida':    "{ main: '#00838F', glow: '#26C6DA' }",
    'sotres':        "{ main: '#2E7D32', glow: '#66BB6A' }",
    'camaleno':      "{ main: '#6A1B9A', glow: '#AB47BC' }",
    'cillorigo':     "{ main: '#F57F17', glow: '#FFEE58' }",
    'vega-liebana':  "{ main: '#AD1457', glow: '#EC407A' }",
    'cabezon':       "{ main: '#4E342E', glow: '#8D6E63' }",
    'pesaguero':     "{ main: '#283593', glow: '#5C6BC0' }",
    'other':         "{ main: '#455A64', glow: '#78909C' }",
}

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

def parse_gpx(filepath):
    """Parse a GPX file and return list of [lon, lat, elevation] coordinates."""
    tree = ET.parse(filepath)
    root = tree.getroot()
    coords = []

    # Try standard GPX 1.1 namespace
    for trkpt in root.iter(f'{GPX_NS}trkpt'):
        lat = float(trkpt.get('lat'))
        lon = float(trkpt.get('lon'))
        ele_elem = trkpt.find(f'{GPX_NS}ele')
        ele = float(ele_elem.text) if ele_elem is not None else 0
        coords.append([round(lon, 6), round(lat, 6), round(ele, 1)])

    # Fallback: no namespace
    if not coords:
        for trkpt in root.iter('trkpt'):
            lat = float(trkpt.get('lat'))
            lon = float(trkpt.get('lon'))
            ele_elem = trkpt.find('ele')
            ele = float(ele_elem.text) if ele_elem is not None else 0
            coords.append([round(lon, 6), round(lat, 6), round(ele, 1)])

    return coords

def downsample(coords, max_points=MAX_POINTS):
    """Downsample coordinates while preserving important elevation changes."""
    if len(coords) <= max_points:
        return coords

    step = max(1, len(coords) // max_points)
    sampled = [coords[0]]  # Always include first

    for i in range(1, len(coords) - 1):
        if i % step == 0:
            sampled.append(coords[i])
        elif abs(coords[i][2] - sampled[-1][2]) > 5:  # Significant elevation change
            sampled.append(coords[i])

    sampled.append(coords[-1])  # Always include last
    return sampled

def calc_distance(coords):
    """Calculate total route distance in km."""
    total = 0
    for i in range(1, len(coords)):
        total += haversine(coords[i-1][1], coords[i-1][0], coords[i][1], coords[i][0])
    return round(total, 1)

def calc_elevation_gain(coords):
    """Calculate total positive elevation gain."""
    gain = 0
    for i in range(1, len(coords)):
        diff = coords[i][2] - coords[i-1][2]
        if diff > 0:
            gain += diff
    return round(gain)

def classify_difficulty(distance_km, elevation_gain):
    """Auto-classify difficulty based on distance and elevation gain."""
    if elevation_gain > 700 or distance_km > 10:
        return 'hard'
    elif elevation_gain > 300 or distance_km > 6:
        return 'medium'
    return 'easy'

def estimate_time(distance_km, elevation_gain):
    """Estimate hiking time based on Naismith's rule."""
    base_hours = distance_km / 4  # 4 km/h flat
    climb_hours = elevation_gain / 600  # 600m/h climbing
    total = base_hours + climb_hours
    hours = int(total)
    mins = int((total - hours) * 60)
    if mins >= 30:
        return f'{hours}-{hours+1}h'
    return f'{hours}h {mins}min' if mins > 0 else f'{hours}h'

def is_circular(coords, threshold_km=0.5):
    """Check if route is circular (start and end within threshold)."""
    if len(coords) < 2:
        return False
    dist = haversine(coords[0][1], coords[0][0], coords[-1][1], coords[-1][0])
    return dist < threshold_km

def parse_zone_from_name(filename):
    """Extract zone from filename or GPX name."""
    name_lower = filename.lower().replace('_', ' ').replace('-', ' ')

    zone_map = {
        'tresviso': 'tresviso',
        'potes': 'potes',
        'penarrubia': 'penarrubia',
        'peñarrubia': 'penarrubia',
        'hermida': 'la-hermida',
        'sotres': 'sotres',
        'camaleno': 'camaleno',
        'camaleño': 'camaleno',
        'cillorigo': 'cillorigo',
        'vega': 'vega-liebana',
        'cabezon': 'cabezon',
        'cabezón': 'cabezon',
        'pesaguero': 'pesaguero',
        'fuente de': 'camaleno',
        'espinama': 'camaleno',
        'mogrovejo': 'camaleno',
        'cares': 'camaleno',
        'urdon': 'penarrubia',
        'urdón': 'penarrubia',
    }

    for key, zone in zone_map.items():
        if key in name_lower:
            return zone
    return 'other'

def clean_route_name(filename):
    """Generate clean route name from filename."""
    name = Path(filename).stem
    # Remove common prefixes/suffixes
    name = re.sub(r'^\d+[\s._-]*', '', name)
    name = name.replace('_', ' ').replace('-', ' ')
    # Capitalize words
    name = ' '.join(w.capitalize() for w in name.split())
    return name

def main():
    if not GPX_DIR.exists():
        print(f"Error: GPX directory not found at {GPX_DIR}")
        print("Please place your .gpx files in the gpx/ folder")
        return

    gpx_files = sorted(GPX_DIR.glob('*.gpx'))
    if not gpx_files:
        print(f"No .gpx files found in {GPX_DIR}")
        return

    print(f"Found {len(gpx_files)} GPX files")

    routes = []
    for i, gpx_file in enumerate(gpx_files, 1):
        print(f"  Processing [{i}/{len(gpx_files)}]: {gpx_file.name}")

        try:
            coords = parse_gpx(gpx_file)
            if len(coords) < 2:
                print(f"    WARNING: Skipped (too few points)")
                continue

            coords = downsample(coords)
            distance = calc_distance(coords)
            elev_gain = calc_elevation_gain(coords)
            difficulty = classify_difficulty(distance, elev_gain)
            time_est = estimate_time(distance, elev_gain)
            circular = is_circular(coords)
            zone = parse_zone_from_name(gpx_file.name)
            name = clean_route_name(gpx_file.name)

            route = {
                'id': f'r{i}',
                'num': i,
                'name': name,
                'zone': zone,
                'km': str(distance),
                'time': time_est,
                'diff': difficulty,
                'type': 'circular' if circular else 'lineal',
                'location': zone.replace('-', ' ').title(),
                'municipality': zone.replace('-', ' ').title(),
                'elev_gain': elev_gain,
                'gpxFile': gpx_file.name,
                'coords': coords
            }
            routes.append(route)
            print(f"    OK: {distance}km, +{elev_gain}m, {difficulty}, {len(coords)} pts")

        except Exception as e:
            print(f"    ERROR: {e}")

    # Generate data.js
    print(f"\nGenerating data.js with {len(routes)} routes...")

    lines = [
        '/* ============================================================',
        '   DATA.JS — Liebana Picos de Europa',
        f'   {len(routes)} rutas generadas desde archivos GPX',
        '   ============================================================ */',
        '',
        'const CONFIG = {',
        '    center: [-4.65, 43.15],',
        '    zoom: 11,',
        "    boundaryQuery: 'Liébana, Cantabria, Spain',",
        "    boundaryColor: '#1B5E20',",
        "    bbox: '43.05,-4.90,43.30,-4.40'",
        '};',
        '',
        'const ZONE_COLORS = {',
    ]

    for zone, color in ZONE_COLORS.items():
        lines.append(f"    '{zone}': {color},")

    lines.extend([
        '};',
        '',
        'const hikingRoutes = ['
    ])

    for r in routes:
        coords_str = ',\n            '.join(
            f'[{c[0]}, {c[1]}, {c[2]}]' for c in r['coords']
        )
        zone_color = f"ZONE_COLORS['{r['zone']}']"

        lines.append(f"    {{")
        lines.append(f"        id: '{r['id']}',")
        lines.append(f"        num: {r['num']},")
        lines.append(f"        color: {zone_color},")
        lines.append(f"        name: '{r['name'].replace(chr(39), chr(92)+chr(39))}',")
        lines.append(f"        desc: '',")
        lines.append(f"        km: '{r['km']}',")
        lines.append(f"        time: '{r['time']}',")
        lines.append(f"        diff: '{r['diff']}',")
        lines.append(f"        type: '{r['type']}',")
        lines.append(f"        location: '{r['location']}',")
        lines.append(f"        municipality: '{r['municipality']}',")
        lines.append(f"        zone: '{r['zone']}',")
        lines.append(f"        tags: [],")
        lines.append(f"        status: 'active',")
        lines.append(f"        image: null,")
        lines.append(f"        url360: null,")
        lines.append(f"        streetView: null,")
        lines.append(f"        gpxFile: '{r['gpxFile']}',")
        lines.append(f"        wikiloc: null,")
        lines.append(f"        coords: [")
        lines.append(f"            {coords_str}")
        lines.append(f"        ]")
        lines.append(f"    }},")

    lines.append('];')

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"Done! Written to {OUTPUT_FILE}")
    print(f"Total routes: {len(routes)}")
    print(f"Zones: {', '.join(sorted(set(r['zone'] for r in routes)))}")

if __name__ == '__main__':
    main()
