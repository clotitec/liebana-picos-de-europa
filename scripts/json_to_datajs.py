#!/usr/bin/env python3
"""
json_to_datajs.py — Converts routes78.json to data.js
"""

import json
import sys
from pathlib import Path

INPUT_FILE = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / 'Downloads' / 'routes78.json'
OUTPUT_FILE = Path(__file__).parent.parent / 'data.js'

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

def main():
    print(f"Reading {INPUT_FILE}...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        routes = json.load(f)

    print(f"Processing {len(routes)} routes...")

    lines = [
        '/* ============================================================',
        '   DATA.JS — Liebana Picos de Europa',
        f'   {len(routes)} rutas generadas desde Wikiloc (perfil 9670173)',
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
        coords_parts = []
        for c in r['coords']:
            lon = c[0]
            lat = c[1]
            elev = c[2] if len(c) > 2 else 0
            coords_parts.append(f'[{lon},{lat},{elev}]')

        coords_str = ','.join(coords_parts)

        name_escaped = r['name'].replace("'", "\\'")
        zone = r['zone']
        zone_display = zone.replace('-', ' ').title()

        lines.append(f"    {{")
        lines.append(f"        id: '{r['id']}', num: {r['num']},")
        lines.append(f"        color: ZONE_COLORS['{zone}'],")
        lines.append(f"        name: '{name_escaped}',")
        lines.append(f"        desc: '',")
        lines.append(f"        km: '{r['distance']}', time: '{r['time']}',")
        lines.append(f"        diff: '{r['diff']}', type: '{r['type']}',")
        lines.append(f"        location: '{zone_display}', municipality: '{zone_display}',")
        lines.append(f"        zone: '{zone}', tags: [], status: 'active',")
        lines.append(f"        image: null, url360: null, streetView: null,")
        lines.append(f"        gpxFile: null, wikiloc: null,")
        lines.append(f"        elevMax: {r['elevMax']}, elevMin: {r['elevMin']},")
        lines.append(f"        uphill: {r['uphill']}, downhill: {r['downhill']},")
        lines.append(f"        coords: [{coords_str}]")
        lines.append(f"    }},")

    lines.append('];')

    print(f"Writing {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    size_kb = OUTPUT_FILE.stat().st_size / 1024
    print(f"Done! {size_kb:.0f} KB written")
    print(f"Routes: {len(routes)}")

    # Summary
    zones = {}
    for r in routes:
        zones[r['zone']] = zones.get(r['zone'], 0) + 1
    print(f"Zones: {json.dumps(zones, indent=2)}")

if __name__ == '__main__':
    main()
