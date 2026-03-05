/* ============================================================
   APP.JS — Liebana Picos de Europa
   Logica principal de la aplicacion
   ============================================================ */

// ==================== STATE ====================
let map;
let markers = [];
let routeLayers = [];
let routeSources = [];
let activeTab = 'rutas';
let activeFilter = 'all';
let activeZone = 'all';
let activeServiceFilter = 'restaurantes';
let selectedFeature = null;
let isSatellite = false;
let is3DTerrain = false;
let elevationMarker = null;
let liebanaBoundary = null;
let weatherData = null;
let servicesData = {};
let isDetailOpen = false;

// ==================== CONSTANTS ====================
const lightStyle = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
const satelliteSource = {
    type: 'raster',
    tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
    tileSize: 256,
    attribution: 'Tiles &copy; Esri'
};

const SNAP = {
    COLLAPSED: 140,
    HALF: window.innerHeight * 0.45,
    FULL: window.innerHeight - 60
};

const DIFF_LABELS = { easy: 'Facil', medium: 'Media', hard: 'Dificil' };
const TAB_ICONS = {
    rutas: '🥾',
    pueblos: '🏘️',
    servicios: '🔧',
    patrimonio: '⛪'
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

function initMap() {
    map = new maplibregl.Map({
        container: 'map',
        style: lightStyle,
        center: CONFIG.center,
        zoom: CONFIG.zoom,
        maxZoom: 18,
        minZoom: 8,
        attributionControl: false,
        pitchWithRotate: true,
        dragRotate: true
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    map.on('load', () => {
        loadBoundary();
        loadDataLayer();
        renderDesktopSidebar();
        renderMobileSheet();
        setupBottomSheet();
        setupSearch();
        hideLoader();
        fetchWeather().then(w => { weatherData = w; updateWeatherUI(); });
    });
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 500);
    }
}

// ==================== BOUNDARY ====================
async function loadBoundary() {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(CONFIG.boundaryQuery)}&format=json&polygon_geojson=1&limit=1`,
            { headers: { 'User-Agent': 'LiebanaPicosApp/1.0' } }
        );
        const data = await response.json();
        if (data?.[0]?.geojson) {
            const geojson = data[0].geojson;
            addBoundaryMask(geojson);
        }
    } catch (e) {
        console.log('Boundary load failed, using fallback bbox');
    }
}

function addBoundaryMask(geojson) {
    if (!geojson) return;
    liebanaBoundary = geojson;

    // Create inverse polygon for mask
    const world = [[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]];
    let boundaryCoords;

    if (geojson.type === 'Polygon') {
        boundaryCoords = geojson.coordinates[0];
    } else if (geojson.type === 'MultiPolygon') {
        boundaryCoords = geojson.coordinates.reduce((a, b) => b[0].length > a.length ? b[0] : a, []);
    } else return;

    const maskGeoJSON = {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [world, boundaryCoords]
        }
    };

    if (map.getSource('mask')) {
        map.getSource('mask').setData(maskGeoJSON);
    } else {
        map.addSource('mask', { type: 'geojson', data: maskGeoJSON });
        map.addLayer({
            id: 'mask-fill',
            type: 'fill',
            source: 'mask',
            paint: { 'fill-color': '#000000', 'fill-opacity': 0.25 }
        });
    }

    // Boundary line
    const lineGeoJSON = {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [boundaryCoords] }
    };

    if (map.getSource('boundary-line')) {
        map.getSource('boundary-line').setData(lineGeoJSON);
    } else {
        map.addSource('boundary-line', { type: 'geojson', data: lineGeoJSON });
        map.addLayer({
            id: 'boundary-stroke',
            type: 'line',
            source: 'boundary-line',
            paint: {
                'line-color': CONFIG.boundaryColor,
                'line-width': 2,
                'line-dasharray': [4, 3],
                'line-opacity': 0.5
            }
        });
    }
}

// ==================== DATA LAYER ====================
function clearMapData() {
    markers.forEach(m => m.remove());
    markers = [];
    routeLayers.forEach(id => { try { map.removeLayer(id); } catch (e) {} });
    routeSources.forEach(id => { try { map.removeSource(id); } catch (e) {} });
    routeLayers = [];
    routeSources = [];
}

function loadDataLayer() {
    clearMapData();

    if (activeTab === 'rutas') {
        loadRoutesOnMap();
    } else if (activeTab === 'pueblos') {
        loadVillagesOnMap();
    } else if (activeTab === 'servicios') {
        loadServicesOnMap();
    } else if (activeTab === 'patrimonio') {
        loadHeritageOnMap();
    }
}

function loadRoutesOnMap() {
    const filtered = getFilteredRoutes();

    // Create arrow image
    if (!map.hasImage('route-arrow')) {
        const size = 20;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(size * 0.15, size * 0.15);
        ctx.lineTo(size * 0.85, size * 0.5);
        ctx.lineTo(size * 0.15, size * 0.85);
        ctx.lineTo(size * 0.35, size * 0.5);
        ctx.closePath();
        ctx.fill();
        map.addImage('route-arrow', { width: size, height: size, data: ctx.getImageData(0, 0, size, size).data });
    }

    filtered.forEach(route => {
        const { id, color, coords } = route;
        const sourceId = `route-src-${id}`;
        const geojson = {
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: coords.map(c => [c[0], c[1]]) }
        };

        map.addSource(sourceId, { type: 'geojson', data: geojson });
        routeSources.push(sourceId);

        // Glow
        const glowId = `route-${id}-glow`;
        map.addLayer({
            id: glowId, type: 'line', source: sourceId,
            paint: {
                'line-color': color.glow,
                'line-width': ['interpolate', ['linear'], ['zoom'], 10, 6, 14, 12, 18, 24],
                'line-opacity': 0.35,
                'line-blur': 4
            }
        });
        routeLayers.push(glowId);

        // Outline
        const outlineId = `route-${id}-outline`;
        map.addLayer({
            id: outlineId, type: 'line', source: sourceId,
            paint: { 'line-color': '#FFFFFF', 'line-width': 5, 'line-opacity': 0.8 }
        });
        routeLayers.push(outlineId);

        // Path
        const pathId = `route-${id}-path`;
        map.addLayer({
            id: pathId, type: 'line', source: sourceId,
            paint: { 'line-color': color.main, 'line-width': 3 }
        });
        routeLayers.push(pathId);

        // Arrows
        const arrowId = `route-${id}-arrows`;
        map.addLayer({
            id: arrowId, type: 'symbol', source: sourceId,
            layout: {
                'symbol-placement': 'line',
                'symbol-spacing': 200,
                'icon-image': 'route-arrow',
                'icon-size': 0.6,
                'icon-allow-overlap': true
            },
            paint: { 'icon-opacity': 0.7 }
        });
        routeLayers.push(arrowId);

        // Start marker
        addRouteMarker(route);
    });
}

function addRouteMarker(route) {
    const coords = route.coords;
    const startCoord = [coords[0][0], coords[0][1]];

    const el = document.createElement('div');
    el.className = 'route-marker';
    el.style.background = route.color.main;
    el.textContent = route.num;
    el.onclick = () => openDetail(route, 'ruta');

    const marker = new maplibregl.Marker({ element: el })
        .setLngLat(startCoord)
        .addTo(map);
    markers.push(marker);
}

function loadVillagesOnMap() {
    VILLAGES.forEach(village => {
        const el = document.createElement('div');
        el.className = 'poi-marker';
        el.textContent = '🏘️';
        el.onclick = () => openDetail(village, 'pueblo');

        const marker = new maplibregl.Marker({ element: el })
            .setLngLat(village.coords)
            .addTo(map);
        markers.push(marker);
    });
}

async function loadServicesOnMap() {
    const type = activeServiceFilter;
    if (!servicesData[type]) {
        servicesData[type] = await fetchServices(type);
    }
    const items = servicesData[type] || [];
    const info = SERVICE_TYPES[type];

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'poi-marker';
        el.textContent = info?.icon || '📍';
        el.onclick = () => openDetail(item, 'servicio');

        const marker = new maplibregl.Marker({ element: el })
            .setLngLat(item.coords)
            .addTo(map);
        markers.push(marker);
    });
}

function loadHeritageOnMap() {
    HERITAGE.forEach(h => {
        const el = document.createElement('div');
        el.className = 'poi-marker';
        el.textContent = '⛪';
        el.onclick = () => openDetail(h, 'patrimonio');

        const marker = new maplibregl.Marker({ element: el })
            .setLngLat(h.coords)
            .addTo(map);
        markers.push(marker);
    });
}

// ==================== FILTERING ====================
function getFilteredRoutes() {
    return hikingRoutes.filter(r => {
        if (activeFilter !== 'all' && r.diff !== activeFilter) return false;
        if (activeZone !== 'all' && r.zone !== activeZone) return false;
        return true;
    });
}

function setFilter(filter) {
    activeFilter = filter;
    loadDataLayer();
    renderList();
    updateFilterUI();
}

function setZone(zone) {
    activeZone = zone;
    loadDataLayer();
    renderList();
    updateFilterUI();
}

function switchTab(tab) {
    activeTab = tab;
    activeFilter = 'all';
    activeZone = 'all';
    loadDataLayer();
    renderDesktopSidebar();
    renderMobileSheet();
    updateTabUI();
}

function setServiceFilter(type) {
    activeServiceFilter = type;
    loadDataLayer();
    renderList();
}

// ==================== SEARCH ====================
function setupSearch() {
    const desktopSearch = document.getElementById('desktopSearch');
    const mobileSearch = document.getElementById('mobileSearch');

    [desktopSearch, mobileSearch].forEach(input => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            filterCardsBySearch(term);
            // Sync both inputs
            if (desktopSearch && input !== desktopSearch) desktopSearch.value = e.target.value;
            if (mobileSearch && input !== mobileSearch) mobileSearch.value = e.target.value;
        });
    });
}

function filterCardsBySearch(term) {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        const text = (card.dataset.searchText || '').toLowerCase();
        card.style.display = !term || text.includes(term) ? '' : 'none';
    });
}

// ==================== DESKTOP SIDEBAR ====================
function renderDesktopSidebar() {
    const sidebar = document.getElementById('desktopSidebar');
    if (!sidebar) return;

    const zones = [...new Set(hikingRoutes.map(r => r.zone))].sort();
    const routeCount = hikingRoutes.length;

    sidebar.innerHTML = `
        <!-- Header -->
        <div class="p-5 pb-3">
            <div class="flex items-center gap-3 mb-4">
                <div class="text-3xl">🏔️</div>
                <div>
                    <h1 class="text-lg font-bold text-slate-800 leading-tight">Liebana</h1>
                    <p class="text-xs font-medium text-slate-500">Picos de Europa</p>
                </div>
                <div id="sidebarWeather" class="ml-auto"></div>
            </div>

            <!-- Search -->
            <div class="relative mb-4">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input type="text" id="desktopSearch" class="search-input" placeholder="Buscar rutas, pueblos...">
            </div>

            <!-- Tabs -->
            <div class="flex gap-1 bg-slate-100/80 p-1 rounded-2xl mb-3">
                ${renderTabButton('rutas', `Rutas`, routeCount)}
                ${renderTabButton('pueblos', 'Pueblos', VILLAGES.length)}
                ${renderTabButton('servicios', 'Servicios', null)}
                ${renderTabButton('patrimonio', 'Patrimonio', HERITAGE.length)}
            </div>

            <!-- Filters -->
            ${activeTab === 'rutas' ? `
                <div class="flex gap-2 overflow-x-auto pb-1 mb-2" id="filterContainerDesktop">
                    ${renderDiffFilters()}
                </div>
                <div class="flex gap-1.5 overflow-x-auto pb-2" id="zoneFilterContainer">
                    <button class="zone-pill ${activeZone === 'all' ? 'active' : ''}" onclick="setZone('all')">Todas</button>
                    ${zones.map(z => `<button class="zone-pill ${activeZone === z ? 'active' : ''}" style="--zone-color: ${ZONE_COLORS[z]?.main || '#455A64'}" onclick="setZone('${z}')">${capitalize(z)}</button>`).join('')}
                </div>
            ` : ''}
            ${activeTab === 'servicios' ? renderServiceFilters() : ''}
        </div>

        <!-- List -->
        <div id="desktopList" class="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5">
            ${renderListContent()}
        </div>
    `;

    setupSearch();
}

function renderTabButton(tab, label, count) {
    const isActive = activeTab === tab;
    return `
        <button class="tab-btn flex-1 ${isActive ? 'active' : ''}" onclick="switchTab('${tab}')">
            <span class="text-sm">${TAB_ICONS[tab]}</span>
            <span class="hidden xl:inline">${label}</span>
            ${count !== null ? `<span class="count">${count}</span>` : ''}
        </button>
    `;
}

function renderDiffFilters() {
    const counts = { all: hikingRoutes.length };
    hikingRoutes.forEach(r => { counts[r.diff] = (counts[r.diff] || 0) + 1; });

    return `
        <button class="filter-pill ${activeFilter === 'all' ? 'active' : ''}" onclick="setFilter('all')">Todas (${counts.all})</button>
        <button class="filter-pill ${activeFilter === 'easy' ? 'active' : ''}" onclick="setFilter('easy')">Facil ${counts.easy ? `(${counts.easy})` : ''}</button>
        <button class="filter-pill ${activeFilter === 'medium' ? 'active' : ''}" onclick="setFilter('medium')">Media ${counts.medium ? `(${counts.medium})` : ''}</button>
        <button class="filter-pill ${activeFilter === 'hard' ? 'active' : ''}" onclick="setFilter('hard')">Dificil ${counts.hard ? `(${counts.hard})` : ''}</button>
    `;
}

function renderServiceFilters() {
    const types = Object.keys(SERVICE_TYPES);
    return `
        <div class="flex gap-1.5 overflow-x-auto pb-2">
            ${types.map(t => {
                const info = SERVICE_TYPES[t];
                return `<button class="zone-pill ${activeServiceFilter === t ? 'active' : ''}" onclick="setServiceFilter('${t}')">${info.icon} ${info.label}</button>`;
            }).join('')}
        </div>
    `;
}

// ==================== MOBILE BOTTOM SHEET ====================
function renderMobileSheet() {
    const sheet = document.getElementById('bottomSheet');
    if (!sheet) return;

    const zones = [...new Set(hikingRoutes.map(r => r.zone))].sort();

    sheet.innerHTML = `
        <div class="sheet-handle-area" id="sheetHandle">
            <div class="sheet-handle"></div>
        </div>

        <div class="px-4 pt-1 pb-2">
            <!-- Tabs -->
            <div class="flex gap-1 bg-slate-100/80 p-1 rounded-2xl mb-3">
                ${renderTabButton('rutas', 'Rutas', hikingRoutes.length)}
                ${renderTabButton('pueblos', 'Pueblos', VILLAGES.length)}
                ${renderTabButton('servicios', 'Serv.', null)}
                ${renderTabButton('patrimonio', 'Patrim.', HERITAGE.length)}
            </div>

            <!-- Filters -->
            ${activeTab === 'rutas' ? `
                <div class="flex gap-2 overflow-x-auto pb-1 mb-2" style="-webkit-overflow-scrolling: touch;">
                    ${renderDiffFilters()}
                </div>
                <div class="flex gap-1.5 overflow-x-auto pb-2" style="-webkit-overflow-scrolling: touch;">
                    <button class="zone-pill ${activeZone === 'all' ? 'active' : ''}" onclick="setZone('all')">Todas</button>
                    ${zones.map(z => `<button class="zone-pill ${activeZone === z ? 'active' : ''}" style="--zone-color: ${ZONE_COLORS[z]?.main || '#455A64'}" onclick="setZone('${z}')">${capitalize(z)}</button>`).join('')}
                </div>
            ` : ''}
            ${activeTab === 'servicios' ? renderServiceFilters() : ''}
        </div>

        <div id="mobileList" class="flex-1 overflow-y-auto custom-scrollbar px-4 pb-safe">
            ${renderListContent()}
        </div>
    `;
}

// ==================== LIST RENDERING ====================
function renderList() {
    const desktopList = document.getElementById('desktopList');
    const mobileList = document.getElementById('mobileList');
    const content = renderListContent();
    if (desktopList) desktopList.innerHTML = content;
    if (mobileList) mobileList.innerHTML = content;
}

function renderListContent() {
    if (activeTab === 'rutas') return renderRouteCards();
    if (activeTab === 'pueblos') return renderVillageCards();
    if (activeTab === 'servicios') return renderServiceCards();
    if (activeTab === 'patrimonio') return renderHeritageCards();
    return '';
}

function renderRouteCards() {
    const filtered = getFilteredRoutes();
    if (filtered.length === 0) {
        return `<div class="empty-state"><div class="empty-state-icon">🏔️</div><div class="empty-state-text">No hay rutas con estos filtros</div></div>`;
    }
    return `<div class="flex flex-col gap-2">${filtered.map(r => createRouteCard(r)).join('')}</div>`;
}

function createRouteCard(route) {
    const elevGain = calcElevationGain(route.coords);
    return `
        <div class="card-item bg-white rounded-2xl p-3.5" data-search-text="${route.name} ${route.location} ${route.zone} ${(route.tags || []).join(' ')}" onclick="openDetail(hikingRoutes.find(r=>r.id==='${route.id}'), 'ruta')">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-sm" style="background: ${route.color.main}">${route.num}</div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-sm text-slate-800 truncate">${route.name}</h3>
                    <p class="text-xs text-slate-500 mt-0.5">${route.location}</p>
                    <div class="flex items-center gap-2 mt-2 flex-wrap">
                        <span class="text-xs font-semibold text-slate-600">${route.km} km</span>
                        <span class="text-xs text-slate-300">|</span>
                        <span class="text-xs text-slate-600">${route.time}</span>
                        <span class="text-xs text-slate-300">|</span>
                        <span class="text-xs text-slate-600">↑${elevGain}m</span>
                        <span class="badge badge-${route.diff}">${DIFF_LABELS[route.diff] || route.diff}</span>
                    </div>
                </div>
                <svg class="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
        </div>
    `;
}

function renderVillageCards() {
    return `<div class="flex flex-col gap-2">${VILLAGES.map(v => `
        <div class="card-item bg-white rounded-2xl p-3.5" data-search-text="${v.name} ${(v.tags || []).join(' ')}" onclick="openDetail(VILLAGES.find(x=>x.id==='${v.id}'), 'pueblo')">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl bg-amber-50 text-base flex items-center justify-center flex-shrink-0">🏘️</div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-sm text-slate-800">${v.name}</h3>
                    <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">${v.desc}</p>
                    <div class="flex items-center gap-2 mt-1.5">
                        ${v.altitude ? `<span class="text-xs text-slate-500">⛰️ ${v.altitude}m</span>` : ''}
                        ${v.population ? `<span class="text-xs text-slate-500">👥 ${v.population}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('')}</div>`;
}

function renderServiceCards() {
    const items = servicesData[activeServiceFilter] || [];
    const info = SERVICE_TYPES[activeServiceFilter];

    if (items.length === 0) {
        return `<div class="empty-state">
            <div class="empty-state-icon">${info?.icon || '🔍'}</div>
            <div class="empty-state-text">Cargando ${info?.label || 'servicios'}...</div>
            <p class="text-xs text-slate-400 mt-2">Consultando OpenStreetMap</p>
        </div>`;
    }

    return `<div class="flex flex-col gap-2">${items.map(item => `
        <div class="card-item bg-white rounded-2xl p-3.5" data-search-text="${item.name} ${item.address || ''}" onclick="openDetail(servicesData['${activeServiceFilter}'].find(x=>x.id==='${item.id}'), 'servicio')">
            <div class="flex items-start gap-3">
                <div class="service-icon ${item.iconClass}">${item.icon}</div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-sm text-slate-800 truncate">${item.name}</h3>
                    ${item.address ? `<p class="text-xs text-slate-500 mt-0.5">${item.address}</p>` : ''}
                    ${item.cuisine ? `<p class="text-xs text-slate-400 mt-0.5">${item.cuisine}</p>` : ''}
                    ${item.phone ? `<p class="text-xs text-blue-500 mt-0.5">${item.phone}</p>` : ''}
                </div>
            </div>
        </div>
    `).join('')}</div>`;
}

function renderHeritageCards() {
    return `<div class="flex flex-col gap-2">${HERITAGE.map(h => `
        <div class="card-item bg-white rounded-2xl p-3.5" data-search-text="${h.name} ${(h.tags || []).join(' ')}" onclick="openDetail(HERITAGE.find(x=>x.id==='${h.id}'), 'patrimonio')">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl bg-purple-50 text-base flex items-center justify-center flex-shrink-0">⛪</div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-sm text-slate-800">${h.name}</h3>
                    <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">${h.desc}</p>
                    <div class="flex gap-1.5 mt-2 flex-wrap">
                        ${(h.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    ${h.future3d ? '<span class="text-xs text-purple-500 font-medium mt-1 inline-block">🔮 3D disponible pronto</span>' : ''}
                </div>
            </div>
        </div>
    `).join('')}</div>`;
}

// ==================== DETAIL MODAL ====================
function openDetail(item, type) {
    if (!item) return;
    isDetailOpen = true;
    selectedFeature = { item, type };

    const modal = document.getElementById('detailModal');
    const overlay = document.getElementById('detailOverlay');
    const panel = document.getElementById('detailPanel');
    modal.classList.remove('hidden');

    // Fly to item
    const coords = Array.isArray(item.coords[0]) ? [item.coords[0][0], item.coords[0][1]] : item.coords;
    map.flyTo({ center: coords, zoom: 14, duration: 800 });

    // Render content
    if (type === 'ruta') {
        panel.innerHTML = renderRouteDetail(item);
        setTimeout(() => drawElevationProfile(item.coords), 100);
    } else if (type === 'pueblo') {
        panel.innerHTML = renderVillageDetail(item);
    } else if (type === 'servicio') {
        panel.innerHTML = renderServiceDetail(item);
    } else if (type === 'patrimonio') {
        panel.innerHTML = renderHeritageDetail(item);
    }

    requestAnimationFrame(() => {
        overlay.classList.add('visible');
        panel.classList.add('visible');
    });
}

function closeDetail() {
    isDetailOpen = false;
    selectedFeature = null;
    const overlay = document.getElementById('detailOverlay');
    const panel = document.getElementById('detailPanel');
    overlay.classList.remove('visible');
    panel.classList.remove('visible');

    if (elevationMarker) { elevationMarker.remove(); elevationMarker = null; }

    setTimeout(() => {
        document.getElementById('detailModal').classList.add('hidden');
    }, 350);

    map.flyTo({ center: CONFIG.center, zoom: CONFIG.zoom, duration: 800 });
}

function renderRouteDetail(route) {
    const elevGain = calcElevationGain(route.coords);
    const { maxElev, minElev } = getElevationStats(route.coords);
    const startCoord = route.coords[0];

    return `
        <!-- Hero gradient -->
        <div class="h-44 relative" style="background: linear-gradient(135deg, ${route.color.main}, ${route.color.glow})">
            <button class="detail-close" onclick="closeDetail()">&times;</button>
            <div class="absolute bottom-4 left-5 right-5">
                <span class="type-badge mb-2 inline-block" style="background: rgba(255,255,255,0.2); color: white;">
                    ${route.type === 'circular' ? '🔄 Circular' : '➡️ Lineal'}
                </span>
                <h2 class="text-xl font-bold text-white leading-tight">${route.name}</h2>
                <p class="text-sm text-white/80 mt-1">${route.location}</p>
            </div>
        </div>

        <div class="p-5">
            <!-- Stats -->
            <div class="stats-grid mb-4">
                <div class="stat-item">
                    <div class="stat-value">${route.km} km</div>
                    <div class="stat-label">Distancia</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${route.time}</div>
                    <div class="stat-label">Duracion</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value"><span class="badge badge-${route.diff}">${DIFF_LABELS[route.diff]}</span></div>
                    <div class="stat-label">Dificultad</div>
                </div>
            </div>

            <!-- Elevation Profile -->
            <div class="mb-4">
                <h3 class="text-sm font-bold text-slate-700 mb-2">Perfil de Elevacion</h3>
                <div class="elevation-container" id="elevationContainer">
                    <canvas id="elevationCanvas" class="elevation-canvas"></canvas>
                    <div class="elevation-tooltip" id="elevationTooltip"></div>
                </div>
                <div class="elevation-stats">
                    <div class="elevation-stat">
                        <div class="elevation-stat-value">↑${elevGain}m</div>
                        <div class="elevation-stat-label">Subida</div>
                    </div>
                    <div class="elevation-stat">
                        <div class="elevation-stat-value">${maxElev}m</div>
                        <div class="elevation-stat-label">Max</div>
                    </div>
                    <div class="elevation-stat">
                        <div class="elevation-stat-value">${minElev}m</div>
                        <div class="elevation-stat-label">Min</div>
                    </div>
                </div>
            </div>

            <!-- Tags -->
            ${route.tags?.length ? `
                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${route.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            ` : ''}

            <!-- Description -->
            <p class="text-sm text-slate-600 leading-relaxed mb-5">${route.desc}</p>

            <!-- Weather -->
            <div id="detailWeather" class="mb-4"></div>

            <!-- Actions -->
            <div class="flex gap-2">
                <button class="action-btn action-btn-primary flex-1" onclick="navigateTo(${startCoord[1]}, ${startCoord[0]})">
                    📍 Ir al inicio
                </button>
                <button class="action-btn action-btn-secondary" onclick="shareItem('${route.name}', ${startCoord[1]}, ${startCoord[0]})">
                    📤
                </button>
                ${route.gpxFile ? `<button class="action-btn action-btn-secondary" onclick="downloadGPX('${route.gpxFile}')">⬇️ GPX</button>` : ''}
            </div>

            ${route.wikiloc ? `<a href="${route.wikiloc}" target="_blank" class="block text-center text-xs text-blue-500 mt-3 font-medium">Ver en Wikiloc →</a>` : ''}
        </div>
    `;
}

function renderVillageDetail(village) {
    return `
        <div class="h-36 relative bg-gradient-to-br from-amber-600 to-amber-800">
            <button class="detail-close" onclick="closeDetail()">&times;</button>
            <div class="absolute bottom-4 left-5">
                <h2 class="text-xl font-bold text-white">${village.name}</h2>
            </div>
        </div>
        <div class="p-5">
            <div class="flex gap-3 mb-4">
                ${village.altitude ? `<div class="stat-item flex-1"><div class="stat-value">⛰️ ${village.altitude}m</div><div class="stat-label">Altitud</div></div>` : ''}
                ${village.population ? `<div class="stat-item flex-1"><div class="stat-value">👥 ${village.population}</div><div class="stat-label">Poblacion</div></div>` : ''}
            </div>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">${village.desc}</p>
            ${village.tags?.length ? `<div class="flex flex-wrap gap-1.5 mb-4">${village.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
            <div class="flex gap-2">
                <button class="action-btn action-btn-primary flex-1" onclick="navigateTo(${village.coords[1]}, ${village.coords[0]})">📍 Como llegar</button>
                <button class="action-btn action-btn-secondary" onclick="shareItem('${village.name}', ${village.coords[1]}, ${village.coords[0]})">📤</button>
            </div>
        </div>
    `;
}

function renderServiceDetail(item) {
    return `
        <div class="h-28 relative bg-gradient-to-br from-blue-500 to-blue-700">
            <button class="detail-close" onclick="closeDetail()">&times;</button>
            <div class="absolute bottom-4 left-5">
                <span class="text-2xl">${item.icon}</span>
                <h2 class="text-lg font-bold text-white mt-1">${item.name}</h2>
            </div>
        </div>
        <div class="p-5">
            ${item.address ? `<p class="text-sm text-slate-600 mb-2">📍 ${item.address}</p>` : ''}
            ${item.phone ? `<p class="text-sm mb-2"><a href="tel:${item.phone}" class="text-blue-500 font-medium">📞 ${item.phone}</a></p>` : ''}
            ${item.website ? `<p class="text-sm mb-2"><a href="${item.website}" target="_blank" class="text-blue-500 font-medium">🌐 Sitio web</a></p>` : ''}
            ${item.openingHours ? `<p class="text-sm text-slate-600 mb-2">🕐 ${item.openingHours}</p>` : ''}
            ${item.cuisine ? `<p class="text-sm text-slate-600 mb-2">🍴 ${item.cuisine}</p>` : ''}
            <div class="flex gap-2 mt-4">
                <button class="action-btn action-btn-primary flex-1" onclick="navigateTo(${item.coords[1]}, ${item.coords[0]})">📍 Como llegar</button>
                <button class="action-btn action-btn-secondary" onclick="shareItem('${item.name}', ${item.coords[1]}, ${item.coords[0]})">📤</button>
            </div>
        </div>
    `;
}

function renderHeritageDetail(h) {
    return `
        <div class="h-36 relative bg-gradient-to-br from-purple-600 to-purple-900">
            <button class="detail-close" onclick="closeDetail()">&times;</button>
            <div class="absolute bottom-4 left-5">
                <h2 class="text-xl font-bold text-white">${h.name}</h2>
            </div>
        </div>
        <div class="p-5">
            <p class="text-sm text-slate-600 leading-relaxed mb-4">${h.desc}</p>
            ${h.tags?.length ? `<div class="flex flex-wrap gap-1.5 mb-4">${h.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
            ${h.future3d ? '<div class="p-3 bg-purple-50 rounded-xl mb-4 text-center"><p class="text-sm text-purple-700 font-medium">🔮 Vista 3D disponible proximamente</p></div>' : ''}
            <div class="flex gap-2">
                <button class="action-btn action-btn-primary flex-1" onclick="navigateTo(${h.coords[1]}, ${h.coords[0]})">📍 Como llegar</button>
                <button class="action-btn action-btn-secondary" onclick="shareItem('${h.name}', ${h.coords[1]}, ${h.coords[0]})">📤</button>
            </div>
        </div>
    `;
}

// ==================== ELEVATION PROFILE ====================
function drawElevationProfile(coords) {
    const container = document.getElementById('elevationContainer');
    const canvas = document.getElementById('elevationCanvas');
    if (!canvas || !container || !coords || coords.length < 2) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padLeft = 40, padRight = 10, padTop = 15, padBottom = 25;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    // Calculate distances and elevations
    const elevations = coords.map(c => c[2] || 0);
    const distances = [0];
    for (let i = 1; i < coords.length; i++) {
        distances.push(distances[i - 1] + haversine(coords[i - 1], coords[i]));
    }
    const totalDist = distances[distances.length - 1];
    const minElev = Math.min(...elevations) - 20;
    const maxElev = Math.max(...elevations) + 20;
    const elevRange = maxElev - minElev || 1;

    // Grid
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 0.5;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = padTop + (plotH / gridLines) * i;
        ctx.beginPath(); ctx.moveTo(padLeft, y); ctx.lineTo(w - padRight, y); ctx.stroke();
        const elevLabel = Math.round(maxElev - (elevRange / gridLines) * i);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '9px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(elevLabel + 'm', padLeft - 4, y + 3);
    }

    // Distance labels
    ctx.textAlign = 'center';
    const distSteps = Math.min(5, Math.ceil(totalDist));
    for (let i = 0; i <= distSteps; i++) {
        const dist = (totalDist / distSteps) * i;
        const x = padLeft + (dist / totalDist) * plotW;
        ctx.fillText(dist.toFixed(1) + 'km', x, h - 4);
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padTop, 0, h - padBottom);
    gradient.addColorStop(0, 'rgba(27, 94, 32, 0.35)');
    gradient.addColorStop(1, 'rgba(27, 94, 32, 0.02)');

    ctx.beginPath();
    ctx.moveTo(padLeft, padTop + plotH);
    for (let i = 0; i < coords.length; i++) {
        const x = padLeft + (distances[i] / totalDist) * plotW;
        const y = padTop + plotH - ((elevations[i] - minElev) / elevRange) * plotH;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(padLeft + plotW, padTop + plotH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    for (let i = 0; i < coords.length; i++) {
        const x = padLeft + (distances[i] / totalDist) * plotW;
        const y = padTop + plotH - ((elevations[i] - minElev) / elevRange) * plotH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#1B5E20';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Store data for hover
    canvas._elevData = { coords, distances, elevations, totalDist, minElev, maxElev, elevRange, padLeft, padRight, padTop, padBottom, plotW, plotH, w, h };

    // Hover interaction
    canvas.onmousemove = (e) => handleElevationHover(e, canvas, ctx, dpr);
    canvas.onmouseleave = () => {
        const tooltip = document.getElementById('elevationTooltip');
        if (tooltip) tooltip.classList.remove('visible');
        if (elevationMarker) { elevationMarker.remove(); elevationMarker = null; }
        // Redraw without hover line
        drawElevationProfile(coords);
    };
}

function handleElevationHover(e, canvas, ctx, dpr) {
    const data = canvas._elevData;
    if (!data) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const dist = ((mouseX - data.padLeft) / data.plotW) * data.totalDist;
    if (dist < 0 || dist > data.totalDist) return;

    // Find closest point
    let closestIdx = 0;
    let minDiff = Infinity;
    for (let i = 0; i < data.distances.length; i++) {
        const diff = Math.abs(data.distances[i] - dist);
        if (diff < minDiff) { minDiff = diff; closestIdx = i; }
    }

    const coord = data.coords[closestIdx];
    const elev = data.elevations[closestIdx];

    // Tooltip
    const tooltip = document.getElementById('elevationTooltip');
    if (tooltip) {
        tooltip.textContent = `${elev.toFixed(0)}m | ${data.distances[closestIdx].toFixed(1)}km`;
        tooltip.classList.add('visible');
    }

    // Redraw + vertical line
    drawElevationProfile(data.coords);
    const freshCtx = canvas.getContext('2d');
    freshCtx.save();
    freshCtx.scale(dpr, dpr);
    const x = data.padLeft + (data.distances[closestIdx] / data.totalDist) * data.plotW;
    freshCtx.strokeStyle = 'rgba(27, 94, 32, 0.5)';
    freshCtx.lineWidth = 1;
    freshCtx.setLineDash([4, 3]);
    freshCtx.beginPath();
    freshCtx.moveTo(x, data.padTop);
    freshCtx.lineTo(x, data.padTop + data.plotH);
    freshCtx.stroke();
    freshCtx.restore();

    // Map marker
    if (elevationMarker) elevationMarker.remove();
    const el = document.createElement('div');
    el.className = 'elevation-hover-marker';
    elevationMarker = new maplibregl.Marker({ element: el })
        .setLngLat([coord[0], coord[1]])
        .addTo(map);
}

// ==================== BOTTOM SHEET TOUCH ====================
function setupBottomSheet() {
    const sheet = document.getElementById('bottomSheet');
    if (!sheet) return;

    let startY = 0, startHeight = 0, isDragging = false;

    // Initial position: collapsed
    sheet.style.transform = `translateY(${sheet.offsetHeight - SNAP.COLLAPSED}px)`;

    const handle = document.getElementById('sheetHandle') || sheet;

    handle.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startHeight = sheet.offsetHeight - parseTranslateY(sheet);
        isDragging = true;
        sheet.classList.add('dragging');
    }, { passive: true });

    sheet.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const dy = startY - e.touches[0].clientY;
        const newHeight = Math.max(SNAP.COLLAPSED, Math.min(SNAP.FULL, startHeight + dy));
        sheet.style.transform = `translateY(${sheet.offsetHeight - newHeight}px)`;
    }, { passive: true });

    sheet.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        sheet.classList.remove('dragging');

        const currentHeight = sheet.offsetHeight - parseTranslateY(sheet);
        const velocity = e.changedTouches?.[0]?.clientY ? (startY - e.changedTouches[0].clientY) / 100 : 0;

        let target;
        if (Math.abs(velocity) > 1) {
            target = velocity > 0 ? SNAP.FULL : SNAP.COLLAPSED;
        } else {
            const dists = [
                { snap: SNAP.COLLAPSED, d: Math.abs(currentHeight - SNAP.COLLAPSED) },
                { snap: SNAP.HALF, d: Math.abs(currentHeight - SNAP.HALF) },
                { snap: SNAP.FULL, d: Math.abs(currentHeight - SNAP.FULL) }
            ];
            target = dists.sort((a, b) => a.d - b.d)[0].snap;
        }

        sheet.style.transform = `translateY(${sheet.offsetHeight - target}px)`;
    });

    // Click handle to toggle
    handle.addEventListener('click', () => {
        const currentHeight = sheet.offsetHeight - parseTranslateY(sheet);
        const target = currentHeight < SNAP.HALF ? SNAP.HALF : SNAP.COLLAPSED;
        sheet.style.transform = `translateY(${sheet.offsetHeight - target}px)`;
    });
}

function parseTranslateY(el) {
    const match = el.style.transform?.match(/translateY\((.+?)px\)/);
    return match ? parseFloat(match[1]) : 0;
}

// ==================== MAP CONTROLS ====================
function locateUser() {
    if (!('geolocation' in navigator)) return alert('Geolocalizacion no disponible');
    navigator.geolocation.getCurrentPosition(
        pos => {
            const coords = [pos.coords.longitude, pos.coords.latitude];
            map.flyTo({ center: coords, zoom: 14, duration: 1000 });

            // Pulse ring + marker
            const container = document.createElement('div');
            container.style.position = 'relative';
            const pulse = document.createElement('div');
            pulse.className = 'pulse-ring';
            container.appendChild(pulse);
            const dot = document.createElement('div');
            dot.className = 'location-dot';
            container.appendChild(dot);
            const marker = new maplibregl.Marker({ element: container }).setLngLat(coords).addTo(map);
            markers.push(marker);
        },
        () => alert('No se pudo obtener la ubicacion')
    );
}

function resetView() {
    map.flyTo({ center: CONFIG.center, zoom: CONFIG.zoom, pitch: 0, bearing: 0, duration: 800 });
}

function toggleSatellite() {
    isSatellite = !isSatellite;
    const btn = document.getElementById('btnSatellite');

    if (isSatellite) {
        if (!map.getSource('satellite')) map.addSource('satellite', satelliteSource);
        // Insert below mask
        const maskLayerId = map.getLayer('mask-fill') ? 'mask-fill' : undefined;
        map.addLayer({ id: 'satellite-layer', type: 'raster', source: 'satellite' }, maskLayerId);
        if (map.getLayer('mask-fill')) map.setPaintProperty('mask-fill', 'fill-opacity', 0.4);
        if (btn) btn.style.background = 'rgba(27, 94, 32, 0.2)';
    } else {
        if (map.getLayer('satellite-layer')) map.removeLayer('satellite-layer');
        if (map.getLayer('mask-fill')) map.setPaintProperty('mask-fill', 'fill-opacity', 0.25);
        if (btn) btn.style.background = '';
    }
}

function toggle3DTerrain() {
    is3DTerrain = !is3DTerrain;
    const btn = document.getElementById('btn3D');

    if (is3DTerrain) {
        if (!map.getSource('terrain-dem')) {
            map.addSource('terrain-dem', {
                type: 'raster-dem',
                tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
                tileSize: 256,
                encoding: 'terrarium',
                maxzoom: 15
            });
        }
        map.setTerrain({ source: 'terrain-dem', exaggeration: 1.5 });
        if (!map.getLayer('sky')) {
            map.addLayer({
                id: 'sky', type: 'sky',
                paint: { 'sky-type': 'atmosphere', 'sky-atmosphere-sun': [0.0, 90.0], 'sky-atmosphere-sun-intensity': 15 }
            });
        }
        map.easeTo({ pitch: 60, duration: 800 });
        if (btn) btn.style.background = 'rgba(27, 94, 32, 0.2)';
    } else {
        map.setTerrain(null);
        if (map.getLayer('sky')) map.removeLayer('sky');
        map.easeTo({ pitch: 0, duration: 800 });
        if (btn) btn.style.background = '';
    }
}

// ==================== ACTIONS ====================
function navigateTo(lat, lon) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
}

function shareItem(name, lat, lon) {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    if (navigator.share) {
        navigator.share({ title: name, text: `${name} - Liebana, Picos de Europa`, url });
    } else {
        navigator.clipboard.writeText(`${name}\n${url}`).then(() => alert('Enlace copiado'));
    }
}

function downloadGPX(filename) {
    const link = document.createElement('a');
    link.href = `gpx/${filename}`;
    link.download = filename;
    link.click();
}

function open360(url) {
    const fs = document.getElementById('fs360');
    const frame = document.getElementById('fs360Frame');
    frame.src = url;
    fs.classList.remove('hidden');
    fs.classList.add('flex');
}

function close360() {
    const fs = document.getElementById('fs360');
    const frame = document.getElementById('fs360Frame');
    frame.src = '';
    fs.classList.add('hidden');
    fs.classList.remove('flex');
}

// ==================== WEATHER UI ====================
function updateWeatherUI() {
    if (!weatherData) return;
    const sidebarWeather = document.getElementById('sidebarWeather');
    if (sidebarWeather) {
        sidebarWeather.innerHTML = `<span class="text-lg">${weatherData.current.icon}</span><span class="text-sm font-bold text-slate-700 ml-1">${weatherData.current.temp}°</span>`;
    }
    if (isDetailOpen && selectedFeature?.type === 'ruta') {
        const dw = document.getElementById('detailWeather');
        if (dw) dw.innerHTML = renderWeatherForecast(weatherData);
    }
}

// ==================== UI HELPERS ====================
function updateTabUI() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const tab = btn.getAttribute('data-tab') || btn.textContent.trim().toLowerCase();
        btn.classList.toggle('active', false);
    });
}

function updateFilterUI() {
    document.querySelectorAll('.filter-pill').forEach(btn => {
        const isActive = btn.textContent.includes(DIFF_LABELS[activeFilter]) || (activeFilter === 'all' && btn.textContent.includes('Todas'));
        btn.classList.toggle('active', isActive);
    });
}

// ==================== UTILITY FUNCTIONS ====================
function capitalize(str) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function haversine(c1, c2) {
    const R = 6371;
    const dLat = (c2[1] - c1[1]) * Math.PI / 180;
    const dLon = (c2[0] - c1[0]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(c1[1] * Math.PI / 180) * Math.cos(c2[1] * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calcElevationGain(coords) {
    let gain = 0;
    for (let i = 1; i < coords.length; i++) {
        const diff = (coords[i][2] || 0) - (coords[i - 1][2] || 0);
        if (diff > 0) gain += diff;
    }
    return Math.round(gain);
}

function getElevationStats(coords) {
    const elevs = coords.map(c => c[2] || 0);
    return { maxElev: Math.round(Math.max(...elevs)), minElev: Math.round(Math.min(...elevs)) };
}
