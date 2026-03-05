/* ============================================================
   SERVICES.JS — Liebana Picos de Europa
   Modulo Overpass API para POIs dinamicos
   ============================================================ */

const OVERPASS_API = 'https://overpass-api.de/api/interpreter';
const LIEBANA_BBOX = '43.05,-4.90,43.30,-4.40';
const CACHE_TTL = 3600000; // 1 hora

const SERVICE_TYPES = {
    restaurantes: {
        label: 'Restaurantes',
        icon: '🍽️',
        iconClass: 'service-icon-restaurante',
        query: `[out:json][timeout:30];(node["amenity"~"restaurant|bar|cafe"](${LIEBANA_BBOX});way["amenity"~"restaurant|bar|cafe"](${LIEBANA_BBOX}););out center body;`
    },
    alojamientos: {
        label: 'Alojamientos',
        icon: '🏨',
        iconClass: 'service-icon-alojamiento',
        query: `[out:json][timeout:30];(node["tourism"~"hotel|guest_house|hostel|apartment|camp_site"](${LIEBANA_BBOX});way["tourism"~"hotel|guest_house|hostel|apartment|camp_site"](${LIEBANA_BBOX}););out center body;`
    },
    salud: {
        label: 'Centros de Salud',
        icon: '🏥',
        iconClass: 'service-icon-salud',
        query: `[out:json][timeout:30];(node["amenity"~"hospital|clinic|doctors"](${LIEBANA_BBOX});way["amenity"~"hospital|clinic|doctors"](${LIEBANA_BBOX}););out center body;`
    },
    farmacias: {
        label: 'Farmacias',
        icon: '💊',
        iconClass: 'service-icon-farmacia',
        query: `[out:json][timeout:30];node["amenity"="pharmacy"](${LIEBANA_BBOX});out body;`
    },
    iglesias: {
        label: 'Iglesias',
        icon: '⛪',
        iconClass: 'service-icon-iglesia',
        query: `[out:json][timeout:30];(node["amenity"="place_of_worship"](${LIEBANA_BBOX});way["amenity"="place_of_worship"](${LIEBANA_BBOX}););out center body;`
    },
    miradores: {
        label: 'Miradores',
        icon: '🔭',
        iconClass: 'service-icon-mirador',
        query: `[out:json][timeout:30];node["tourism"="viewpoint"](${LIEBANA_BBOX});out body;`
    },
    parking: {
        label: 'Parking',
        icon: '🅿️',
        iconClass: 'service-icon-parking',
        query: `[out:json][timeout:30];(node["amenity"="parking"](${LIEBANA_BBOX});way["amenity"="parking"](${LIEBANA_BBOX}););out center body;`
    },
    agua: {
        label: 'Fuentes de Agua',
        icon: '💧',
        iconClass: 'service-icon-agua',
        query: `[out:json][timeout:30];(node["amenity"="drinking_water"](${LIEBANA_BBOX});node["natural"="spring"]["drinking_water"="yes"](${LIEBANA_BBOX}););out body;`
    }
};

// Cache de resultados
const servicesCache = {};

async function fetchServices(type) {
    const cacheKey = `overpass_${type}`;

    // Check memory cache
    if (servicesCache[type] && (Date.now() - servicesCache[type].timestamp < CACHE_TTL)) {
        return servicesCache[type].data;
    }

    // Check sessionStorage
    try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                servicesCache[type] = { data, timestamp };
                return data;
            }
        }
    } catch (e) { /* sessionStorage not available */ }

    const serviceType = SERVICE_TYPES[type];
    if (!serviceType) return [];

    try {
        const response = await fetch(OVERPASS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'data=' + encodeURIComponent(serviceType.query)
        });

        if (!response.ok) throw new Error(`Overpass error: ${response.status}`);

        const json = await response.json();
        const results = (json.elements || []).map(el => {
            const lat = el.lat || (el.center && el.center.lat);
            const lon = el.lon || (el.center && el.center.lon);
            if (!lat || !lon) return null;

            return {
                id: `svc_${el.id}`,
                name: el.tags?.name || el.tags?.amenity || el.tags?.tourism || 'Sin nombre',
                type: type,
                icon: serviceType.icon,
                iconClass: serviceType.iconClass,
                coords: [lon, lat],
                phone: el.tags?.phone || el.tags?.['contact:phone'] || null,
                website: el.tags?.website || el.tags?.['contact:website'] || null,
                address: el.tags?.['addr:street'] ? `${el.tags['addr:street']} ${el.tags['addr:housenumber'] || ''}`.trim() : null,
                cuisine: el.tags?.cuisine || null,
                stars: el.tags?.stars || null,
                openingHours: el.tags?.opening_hours || null,
                wheelchair: el.tags?.wheelchair || null,
                tags: el.tags || {}
            };
        }).filter(Boolean);

        // Cache results
        servicesCache[type] = { data: results, timestamp: Date.now() };
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({ data: results, timestamp: Date.now() }));
        } catch (e) { /* sessionStorage full */ }

        return results;
    } catch (error) {
        console.warn(`Error fetching ${type}:`, error);
        return [];
    }
}

async function fetchAllServices() {
    const types = Object.keys(SERVICE_TYPES);
    const results = {};
    await Promise.allSettled(types.map(async type => {
        results[type] = await fetchServices(type);
    }));
    return results;
}

function getServiceTypeInfo(type) {
    return SERVICE_TYPES[type] || null;
}
