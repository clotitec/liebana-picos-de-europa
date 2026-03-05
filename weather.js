/* ============================================================
   WEATHER.JS — Liebana Picos de Europa
   Modulo Open-Meteo para clima
   ============================================================ */

const WEATHER_CONFIG = {
    lat: 43.1525,
    lon: -4.6219,
    timezone: 'Europe/Madrid',
    cacheTTL: 1800000 // 30 minutos
};

const WMO_CODES = {
    0:  { desc: 'Despejado',        icon: '☀️' },
    1:  { desc: 'Mayormente despejado', icon: '🌤️' },
    2:  { desc: 'Parcialmente nublado', icon: '⛅' },
    3:  { desc: 'Nublado',          icon: '☁️' },
    45: { desc: 'Niebla',           icon: '🌫️' },
    48: { desc: 'Niebla helada',    icon: '🌫️' },
    51: { desc: 'Llovizna ligera',  icon: '🌦️' },
    53: { desc: 'Llovizna',         icon: '🌦️' },
    55: { desc: 'Llovizna intensa', icon: '🌧️' },
    61: { desc: 'Lluvia ligera',    icon: '🌦️' },
    63: { desc: 'Lluvia',           icon: '🌧️' },
    65: { desc: 'Lluvia intensa',   icon: '🌧️' },
    66: { desc: 'Lluvia helada',    icon: '🌧️' },
    67: { desc: 'Lluvia helada intensa', icon: '🌧️' },
    71: { desc: 'Nieve ligera',     icon: '❄️' },
    73: { desc: 'Nieve',            icon: '❄️' },
    75: { desc: 'Nieve intensa',    icon: '❄️' },
    77: { desc: 'Granizo',          icon: '❄️' },
    80: { desc: 'Chubascos ligeros', icon: '🌦️' },
    81: { desc: 'Chubascos',        icon: '🌧️' },
    82: { desc: 'Chubascos fuertes', icon: '🌧️' },
    85: { desc: 'Nieve ligera',     icon: '❄️' },
    86: { desc: 'Nieve intensa',    icon: '❄️' },
    95: { desc: 'Tormenta',         icon: '⛈️' },
    96: { desc: 'Tormenta con granizo', icon: '⛈️' },
    99: { desc: 'Tormenta con granizo', icon: '⛈️' }
};

let weatherCache = null;

async function fetchWeather() {
    // Check cache
    if (weatherCache && (Date.now() - weatherCache.timestamp < WEATHER_CONFIG.cacheTTL)) {
        return weatherCache.data;
    }

    // Check localStorage
    try {
        const cached = localStorage.getItem('weather_cache');
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < WEATHER_CONFIG.cacheTTL) {
                weatherCache = parsed;
                return parsed.data;
            }
        }
    } catch (e) { /* localStorage not available */ }

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_CONFIG.lat}&longitude=${WEATHER_CONFIG.lon}&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=${WEATHER_CONFIG.timezone}&forecast_days=5`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather API error: ${response.status}`);

        const data = await response.json();

        const wmo = WMO_CODES[data.current?.weathercode] || { desc: 'Desconocido', icon: '🌡️' };

        const result = {
            current: {
                temp: Math.round(data.current?.temperature_2m || 0),
                desc: wmo.desc,
                icon: wmo.icon,
                wind: Math.round(data.current?.windspeed_10m || 0),
                humidity: data.current?.relative_humidity_2m || 0
            },
            daily: (data.daily?.time || []).map((date, i) => {
                const dayWmo = WMO_CODES[data.daily.weathercode[i]] || { desc: '?', icon: '🌡️' };
                return {
                    date: date,
                    dayName: new Date(date).toLocaleDateString('es-ES', { weekday: 'short' }),
                    maxTemp: Math.round(data.daily.temperature_2m_max[i]),
                    minTemp: Math.round(data.daily.temperature_2m_min[i]),
                    precipitation: data.daily.precipitation_sum[i],
                    icon: dayWmo.icon,
                    desc: dayWmo.desc
                };
            })
        };

        // Cache
        weatherCache = { data: result, timestamp: Date.now() };
        try {
            localStorage.setItem('weather_cache', JSON.stringify(weatherCache));
        } catch (e) { /* localStorage full */ }

        return result;
    } catch (error) {
        console.warn('Error fetching weather:', error);
        return null;
    }
}

function renderWeatherWidget(weather) {
    if (!weather) return '';
    return `
        <div class="weather-card">
            <span class="weather-icon">${weather.current.icon}</span>
            <div>
                <div class="weather-temp">${weather.current.temp}°C</div>
                <div class="weather-desc">${weather.current.desc}</div>
            </div>
            <div class="ml-auto text-right">
                <div class="text-xs text-slate-500">💨 ${weather.current.wind} km/h</div>
                <div class="text-xs text-slate-500">💧 ${weather.current.humidity}%</div>
            </div>
        </div>
    `;
}

function renderWeatherForecast(weather) {
    if (!weather || !weather.daily) return '';
    return `
        <div class="flex gap-2 overflow-x-auto pb-2" style="-webkit-overflow-scrolling: touch;">
            ${weather.daily.map(d => `
                <div class="flex-shrink-0 text-center p-2 rounded-xl bg-slate-50 min-w-[60px]">
                    <div class="text-xs font-medium text-slate-500 capitalize">${d.dayName}</div>
                    <div class="text-lg my-1">${d.icon}</div>
                    <div class="text-xs font-bold text-slate-700">${d.maxTemp}°</div>
                    <div class="text-xs text-slate-400">${d.minTemp}°</div>
                </div>
            `).join('')}
        </div>
    `;
}
