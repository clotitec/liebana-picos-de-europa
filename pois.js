/* ============================================================
   POIS.JS — Liebana Picos de Europa
   Pueblos y patrimonio (datos estaticos)
   ============================================================ */

const VILLAGES = [
    {
        id: 'p1', name: 'Potes', type: 'pueblo',
        desc: 'Capital de la comarca de Liebana. Villa medieval con la Torre del Infantado, puentes medievales y una animada vida comercial. Punto de partida de numerosas rutas.',
        coords: [-4.6219, 43.1525], altitude: 291, population: 1400,
        tags: ['Capital', 'Medieval', 'Comercio', 'Gastronomia']
    },
    {
        id: 'p2', name: 'Espinama', type: 'pueblo',
        desc: 'Pintoresco pueblo a los pies de los Picos de Europa, puerta de acceso al teleferico de Fuente De y punto de partida de rutas de alta montana.',
        coords: [-4.7603, 43.1698], altitude: 828,
        tags: ['Montana', 'Teleferico', 'Picos']
    },
    {
        id: 'p3', name: 'Tresviso', type: 'pueblo',
        desc: 'El pueblo mas aislado de Cantabria, famoso por su queso picón. Solo accesible por una estrecha carretera de montana o por el sendero del desfiladero del Urdon.',
        coords: [-4.6140, 43.2208], altitude: 856,
        tags: ['Aislado', 'Queso', 'Montana']
    },
    {
        id: 'p4', name: 'Mogrovejo', type: 'pueblo',
        desc: 'Considerado uno de los pueblos mas bonitos de Espana. Torre medieval y casas solariegas con vistas espectaculares a los Picos de Europa.',
        coords: [-4.7215, 43.1582], altitude: 447,
        tags: ['Bonito', 'Medieval', 'Panoramico']
    },
    {
        id: 'p5', name: 'Baro', type: 'pueblo',
        desc: 'Tranquila aldea lebaniega con arquitectura tradicional montana y buenas vistas al valle.',
        coords: [-4.6485, 43.1420], altitude: 420,
        tags: ['Tranquilo', 'Tradicional']
    },
    {
        id: 'p6', name: 'Tama', type: 'pueblo',
        desc: 'Pueblo situado en el valle de Liebana, conocido por sus casonas montanesas y su iglesia parroquial.',
        coords: [-4.6650, 43.1480], altitude: 350,
        tags: ['Valle', 'Casonas']
    },
    {
        id: 'p7', name: 'La Hermida', type: 'pueblo',
        desc: 'Pequeno nucleo en el corazon del desfiladero de La Hermida. Punto de partida para rutas al nacimiento del Urdon y termas naturales.',
        coords: [-4.6078, 43.2368], altitude: 176,
        tags: ['Desfiladero', 'Termas', 'Urdon']
    },
    {
        id: 'p8', name: 'Cosgaya', type: 'pueblo',
        desc: 'Bonito pueblo en el valle de Camaleno con buena oferta de alojamiento rural y gastronomia. Punto de acceso a Fuente De.',
        coords: [-4.7385, 43.1612], altitude: 560,
        tags: ['Rural', 'Gastronomia', 'Alojamiento']
    },
    {
        id: 'p9', name: 'Lebena', type: 'pueblo',
        desc: 'Pequena aldea famosa por albergar la iglesia mozarabe de Santa Maria de Lebena, joya del siglo X.',
        coords: [-4.5654, 43.2078], altitude: 280,
        tags: ['Mozarabe', 'Iglesia', 'Historico']
    },
    {
        id: 'p10', name: 'Sotres', type: 'pueblo',
        desc: 'El pueblo mas alto de los Picos de Europa (1045m). Base para rutas de alta montana hacia Naranjo de Bulnes y Lagos de Covadonga.',
        coords: [-4.7462, 43.2318], altitude: 1045,
        tags: ['Altitude', 'Montana', 'Naranjo']
    },
    {
        id: 'p11', name: 'Camaleno', type: 'pueblo',
        desc: 'Municipio que incluye Fuente De, Espinama y Mogrovejo. Centro administrativo de la zona occidental de Liebana.',
        coords: [-4.7150, 43.1630], altitude: 410,
        tags: ['Municipio', 'Fuente De']
    },
    {
        id: 'p12', name: 'Ojedo', type: 'pueblo',
        desc: 'Nucleo proximo a Potes con servicios y comercios. Alberga el Monasterio de Santo Toribio de Liebana.',
        coords: [-4.6380, 43.1490], altitude: 305,
        tags: ['Servicios', 'Monasterio']
    }
];

const HERITAGE = [
    {
        id: 'h1', name: 'Monasterio de Santo Toribio de Liebana', type: 'patrimonio',
        desc: 'Uno de los lugares santos del cristianismo, guarda el trozo mas grande de la Cruz de Cristo (Lignum Crucis). Origen del Camino Lebaniego.',
        coords: [-4.6422, 43.1481],
        tags: ['Monasterio', 'Lignum Crucis', 'Camino Lebaniego'],
        future3d: true
    },
    {
        id: 'h2', name: 'Iglesia de Santa Maria de Lebena', type: 'patrimonio',
        desc: 'Joya del arte mozarabe del siglo X. Considerada una de las mejores muestras de arquitectura mozarabe de Espana.',
        coords: [-4.5654, 43.2078],
        tags: ['Mozarabe', 'Siglo X', 'Arquitectura'],
        future3d: true
    },
    {
        id: 'h3', name: 'Torre del Infantado', type: 'patrimonio',
        desc: 'Torre defensiva del siglo XV en el centro de Potes. Actualmente alberga exposiciones y es simbolo de la villa.',
        coords: [-4.6225, 43.1528],
        tags: ['Torre', 'Medieval', 'Potes'],
        future3d: true
    },
    {
        id: 'h4', name: 'Iglesia de Nuestra Senora de la Luz (Camaleno)', type: 'patrimonio',
        desc: 'Iglesia parroquial de Camaleno con elementos romanicos y goticos. Emplazamiento privilegiado con vistas a los Picos.',
        coords: [-4.7155, 43.1635],
        tags: ['Romanico', 'Gotico', 'Camaleno'],
        future3d: true
    },
    {
        id: 'h5', name: 'Iglesia de San Sebastian (Potes)', type: 'patrimonio',
        desc: 'Iglesia gotica del siglo XIV en Potes, con portada ojival y retablo barroco.',
        coords: [-4.6210, 43.1530],
        tags: ['Gotico', 'Potes', 'Barroco'],
        future3d: true
    },
    {
        id: 'h6', name: 'Puente de San Cayetano', type: 'patrimonio',
        desc: 'Puente medieval sobre el rio Quiviesa en Potes. Uno de los simbolos mas fotografiados de la villa.',
        coords: [-4.6215, 43.1520],
        tags: ['Puente', 'Medieval', 'Rio'],
        future3d: false
    },
    {
        id: 'h7', name: 'Teleferico de Fuente De', type: 'patrimonio',
        desc: 'Teleferico que salva un desnivel de 753 metros hasta los 1823m de altitud. Vistas espectaculares del macizo central de los Picos de Europa.',
        coords: [-4.8032, 43.1505],
        tags: ['Teleferico', 'Picos', 'Mirador'],
        future3d: false
    }
];
