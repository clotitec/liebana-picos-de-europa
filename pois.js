/* ============================================================
   POIS.JS — Liebana Picos de Europa
   88 Pueblos reales de Liebana + Patrimonio (datos estaticos)
   ============================================================ */

const VILLAGES = [
    // ── POTES (2 pueblos) ──────────────────────────────────────
    {
        id: 'p1', name: 'Potes', type: 'pueblo',
        desc: 'Capital de la comarca de Liebana, villa medieval declarada Conjunto Historico. Destaca la Torre del Infantado, sus puentes medievales sobre los rios Deva y Quiviesa, y una animada vida comercial con mercado los lunes.',
        coords: [-4.622040, 43.152850], altitude: 291, population: 1400,
        municipality: 'Potes',
        tags: ['Capital', 'Medieval', 'Comercio', 'Gastronomia']
    },
    {
        id: 'p2', name: 'Rases', type: 'pueblo',
        desc: 'Pequeno nucleo perteneciente al municipio de Potes, situado en las inmediaciones de la capital comarcal. Conserva el caracter rural tradicional lebaniego con vistas al valle del Deva.',
        coords: [-4.613540, 43.147530], altitude: 320,
        municipality: 'Potes',
        tags: ['Tranquilo', 'Rural', 'Potes']
    },

    // ── TRESVISO (1 pueblo) ────────────────────────────────────
    {
        id: 'p3', name: 'Tresviso', type: 'pueblo',
        desc: 'El pueblo mas aislado de Cantabria, encaramado a 856 metros de altitud. Famoso por su queso picon artesanal y accesible solo por una estrecha carretera de montana o por el espectacular sendero del desfiladero del Urdon.',
        coords: [-4.614060, 43.220810], altitude: 856,
        municipality: 'Tresviso',
        tags: ['Aislado', 'Queso', 'Montana']
    },

    // ── PESAGUERO (10 pueblos) ─────────────────────────────────
    {
        id: 'p4', name: 'Avellanedo', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Pesaguero rodeada de bosques de avellanos que le dan nombre. Enclave tranquilo con arquitectura popular de piedra y madera en la zona oriental de Liebana.',
        coords: [-4.517530, 43.118790], altitude: 600,
        municipality: 'Pesaguero',
        tags: ['Rural', 'Bosque', 'Tranquilo']
    },
    {
        id: 'p5', name: 'Barreda', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Pesaguero en el valle oriental de Liebana. Aldea de casas tradicionales de piedra rodeada de prados y bosques de roble y haya.',
        coords: [-4.503130, 43.115280], altitude: 580,
        municipality: 'Pesaguero',
        tags: ['Rural', 'Tradicional', 'Valle']
    },
    {
        id: 'p6', name: 'Caloca', type: 'pueblo',
        desc: 'Remota aldea de montana en el municipio de Pesaguero, a casi 1000 metros de altitud. Una de las localidades mas elevadas de Liebana, rodeada de pastos de altura con acceso a rutas hacia la sierra de Pena Sagra.',
        coords: [-4.464350, 43.098210], altitude: 980,
        municipality: 'Pesaguero',
        tags: ['Remoto', 'Montana', 'Altitud']
    },
    {
        id: 'p7', name: 'Cueva', type: 'pueblo',
        desc: 'Aldea del municipio de Pesaguero asentada en un paraje natural rodeado de formaciones rocosas. Conserva la arquitectura tradicional lebaniega y un entorno de gran belleza paisajistica.',
        coords: [-4.497120, 43.107360], altitude: 650,
        municipality: 'Pesaguero',
        tags: ['Rural', 'Naturaleza', 'Paisaje']
    },
    {
        id: 'p8', name: 'Lerones', type: 'pueblo',
        desc: 'Pequena localidad del municipio de Pesaguero en la parte alta del valle. Aldea tranquila con casas de piedra y un entorno de prados verdes rodeados de bosques mixtos.',
        coords: [-4.487450, 43.100340], altitude: 720,
        municipality: 'Pesaguero',
        tags: ['Tranquilo', 'Montana', 'Pastoral']
    },
    {
        id: 'p9', name: 'Lomena', type: 'pueblo',
        desc: 'Aldea del municipio de Pesaguero con un patrimonio de arquitectura popular bien conservado. Enclave rural autentico en la zona oriental de la comarca de Liebana.',
        coords: [-4.533480, 43.126530], altitude: 550,
        municipality: 'Pesaguero',
        tags: ['Tradicional', 'Rural', 'Patrimonio']
    },
    {
        id: 'p10', name: 'Obargo', type: 'pueblo',
        desc: 'Pequeno nucleo rural en el municipio de Pesaguero, rodeado de prados de siega y bosques. Conserva ejemplos de la arquitectura popular montanesa con casas de piedra y madera.',
        coords: [-4.520090, 43.121450], altitude: 620,
        municipality: 'Pesaguero',
        tags: ['Rural', 'Arquitectura', 'Montana']
    },
    {
        id: 'p11', name: 'Pesaguero', type: 'pueblo',
        desc: 'Cabeza del municipio del mismo nombre en la zona oriental de Liebana. Centro de servicios de la zona con buenas vistas al valle y punto de paso de rutas de senderismo hacia Pena Sagra.',
        coords: [-4.506060, 43.110370], altitude: 600,
        municipality: 'Pesaguero',
        tags: ['Municipio', 'Servicios', 'Valle']
    },
    {
        id: 'p12', name: 'Valdeprado', type: 'pueblo',
        desc: 'Aldea del municipio de Pesaguero situada en un amplio prado rodeado de montes. Conserva el encanto rural de la Liebana oriental con casas de piedra y horreos tradicionales.',
        coords: [-4.487560, 43.091760], altitude: 750,
        municipality: 'Pesaguero',
        tags: ['Rural', 'Prados', 'Tradicional']
    },
    {
        id: 'p13', name: 'Vendejo', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Pesaguero enclavado entre bosques y prados. Aldea tranquila con arquitectura montanesa tradicional y un entorno natural de gran belleza.',
        coords: [-4.517620, 43.104210], altitude: 680,
        municipality: 'Pesaguero',
        tags: ['Tranquilo', 'Bosque', 'Rural']
    },

    // ── CABEZON DE LIEBANA (12 pueblos) ────────────────────────
    {
        id: 'p14', name: 'Aniezo', type: 'pueblo',
        desc: 'Pueblo del municipio de Cabezon de Liebana con interesante patrimonio de arquitectura popular. Conserva casonas de piedra y ofrece vistas al valle del Deva desde su posicion elevada.',
        coords: [-4.579040, 43.137810], altitude: 480,
        municipality: 'Cabezon de Liebana',
        tags: ['Tradicional', 'Casonas', 'Valle']
    },
    {
        id: 'p15', name: 'Buyezo', type: 'pueblo',
        desc: 'Aldea del municipio de Cabezon de Liebana en la ladera sur del valle. Pequeno nucleo de casas de piedra rodeado de prados y bosques de roble con ambiente rural autentico.',
        coords: [-4.575510, 43.129350], altitude: 520,
        municipality: 'Cabezon de Liebana',
        tags: ['Rural', 'Aldea', 'Robles']
    },
    {
        id: 'p16', name: 'Cabezon de Liebana', type: 'pueblo',
        desc: 'Cabeza del municipio del mismo nombre, centro administrativo con servicios basicos. Situado en el valle del Deva con buen acceso a rutas de senderismo y al patrimonio romanico de la zona.',
        coords: [-4.567280, 43.138950], altitude: 440,
        municipality: 'Cabezon de Liebana',
        tags: ['Municipio', 'Servicios', 'Valle']
    },
    {
        id: 'p17', name: 'Cahecho', type: 'pueblo',
        desc: 'Pintoresca aldea del municipio de Cabezon de Liebana encaramada en la ladera con magnificas vistas panoramicas al valle de Liebana y a los Picos de Europa. Destaca por su ermita y sus casonas de piedra.',
        coords: [-4.575340, 43.147460], altitude: 560,
        municipality: 'Cabezon de Liebana',
        tags: ['Panoramico', 'Ermita', 'Casonas']
    },
    {
        id: 'p18', name: 'Cambarco', type: 'pueblo',
        desc: 'Aldea del municipio de Cabezon de Liebana con un interesante conjunto de arquitectura popular lebaniega. Conserva casas blasonadas y una iglesia parroquial con elementos romanicos.',
        coords: [-4.557580, 43.133530], altitude: 500,
        municipality: 'Cabezon de Liebana',
        tags: ['Arquitectura', 'Iglesia', 'Blasonado']
    },
    {
        id: 'p19', name: 'Frama', type: 'pueblo',
        desc: 'Pueblo del municipio de Cabezon de Liebana en la parte oriental de la comarca. Nucleo rural con casas de piedra tradicionales, rodeado de prados de siega y bosques de roble.',
        coords: [-4.538950, 43.130570], altitude: 620,
        municipality: 'Cabezon de Liebana',
        tags: ['Rural', 'Prados', 'Senderismo']
    },
    {
        id: 'p20', name: 'Lamedo', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Cabezon de Liebana en una posicion elevada sobre el valle. Conserva la arquitectura tradicional de piedra y ofrece un entorno natural de gran tranquilidad.',
        coords: [-4.553170, 43.136880], altitude: 550,
        municipality: 'Cabezon de Liebana',
        tags: ['Tranquilo', 'Elevado', 'Tradicional']
    },
    {
        id: 'p21', name: 'Luriezo', type: 'pueblo',
        desc: 'Aldea del municipio de Cabezon de Liebana conocida por su entorno boscoso y sus senderos. Pueblo de casas de piedra rodeado de bosques de roble y castano con gran encanto rural.',
        coords: [-4.564230, 43.126740], altitude: 540,
        municipality: 'Cabezon de Liebana',
        tags: ['Bosque', 'Senderos', 'Rural']
    },
    {
        id: 'p22', name: 'Perrozo', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Cabezon de Liebana con arquitectura popular bien conservada. Situado en una posicion panoramica con vistas al valle del Deva.',
        coords: [-4.580500, 43.140360], altitude: 490,
        municipality: 'Cabezon de Liebana',
        tags: ['Panoramico', 'Arquitectura', 'Valle']
    },
    {
        id: 'p23', name: 'Piasca', type: 'pueblo',
        desc: 'Localidad del municipio de Cabezon de Liebana celebre por albergar la iglesia romanica de Santa Maria de Piasca, antiguo monasterio del siglo IX con una portada esculpida considerada obra maestra del romanico cantabro.',
        coords: [-4.536740, 43.122150], altitude: 550,
        municipality: 'Cabezon de Liebana',
        tags: ['Romanico', 'Monasterio', 'Historico']
    },
    {
        id: 'p24', name: 'San Andres', type: 'pueblo',
        desc: 'Aldea del municipio de Cabezon de Liebana con una iglesia parroquial de interes. Pequeno nucleo de casas de piedra en un entorno de prados y bosques tradicionales.',
        coords: [-4.552730, 43.141260], altitude: 470,
        municipality: 'Cabezon de Liebana',
        tags: ['Iglesia', 'Rural', 'Tranquilo']
    },
    {
        id: 'p25', name: 'Torices', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Cabezon de Liebana con casas de piedra tradicionales. Enclave rural tranquilo rodeado de prados verdes en el corazon de la comarca.',
        coords: [-4.569750, 43.143870], altitude: 460,
        municipality: 'Cabezon de Liebana',
        tags: ['Tranquilo', 'Tradicional', 'Rural']
    },

    // ── CILLORIGO DE LIEBANA (14 pueblos) ──────────────────────
    {
        id: 'p26', name: 'Armano', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana enclavada en la ladera del valle. Conserva casas de piedra tradicionales y un ambiente rural autentico con vistas al desfiladero de La Hermida.',
        coords: [-4.606610, 43.198260], altitude: 420,
        municipality: 'Cillorigo de Liebana',
        tags: ['Rural', 'Desfiladero', 'Tradicional']
    },
    {
        id: 'p27', name: 'Bejes', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana famosa por la elaboracion artesanal de queso picon Bejes-Tresviso con Denominacion de Origen Protegida. Rodeada de cuevas naturales utilizadas para la maduracion del queso.',
        coords: [-4.639610, 43.211020], altitude: 555, population: 50,
        municipality: 'Cillorigo de Liebana',
        tags: ['Queso', 'Artesanal', 'Tradicion']
    },
    {
        id: 'p28', name: 'Cabanes', type: 'pueblo',
        desc: 'Pequena aldea de montana en el municipio de Cillorigo de Liebana, situada a 720 metros de altitud. Conserva la arquitectura popular lebaniega de piedra y madera con un entorno ideal para el senderismo.',
        coords: [-4.627120, 43.195400], altitude: 720,
        municipality: 'Cillorigo de Liebana',
        tags: ['Montana', 'Tradicional', 'Senderismo']
    },
    {
        id: 'p29', name: 'Castro-Cillorigo', type: 'pueblo',
        desc: 'Nucleo historico del municipio de Cillorigo de Liebana con restos de una antigua fortaleza medieval. Posicion estrategica elevada con vistas dominantes sobre el valle del Deva.',
        coords: [-4.614710, 43.174530], altitude: 500,
        municipality: 'Cillorigo de Liebana',
        tags: ['Historico', 'Fortaleza', 'Panoramico']
    },
    {
        id: 'p30', name: 'Colio', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana con casas de piedra y un entorno de prados verdes. Lugar tranquilo proximo a Potes con buenas vistas al valle.',
        coords: [-4.603260, 43.163150], altitude: 400,
        municipality: 'Cillorigo de Liebana',
        tags: ['Tranquilo', 'Prados', 'Valle']
    },
    {
        id: 'p31', name: 'Lebena', type: 'pueblo',
        desc: 'Pequena aldea en el municipio de Cillorigo de Liebana, celebre por albergar la iglesia mozarabe de Santa Maria de Lebena, joya del siglo X y una de las obras cumbres del arte mozarabe peninsular.',
        coords: [-4.574010, 43.208090], altitude: 280,
        municipality: 'Cillorigo de Liebana',
        tags: ['Mozarabe', 'Iglesia', 'Historico']
    },
    {
        id: 'p32', name: 'Pendes', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana conocida por su puente medieval sobre el rio Deva, de gran valor historico. Situada en un cruce de caminos tradicional de la comarca.',
        coords: [-4.594770, 43.168660], altitude: 380,
        municipality: 'Cillorigo de Liebana',
        tags: ['Medieval', 'Puente', 'Historico']
    },
    {
        id: 'p33', name: 'Pumarena', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Cillorigo de Liebana situado entre manzanos y prados. El nombre evoca los pomares (manzanales) que rodean esta tranquila aldea lebaniega.',
        coords: [-4.608680, 43.169310], altitude: 390,
        municipality: 'Cillorigo de Liebana',
        tags: ['Rural', 'Frutales', 'Tranquilo']
    },
    {
        id: 'p34', name: 'Salarzon', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana con una interesante iglesia parroquial y casas de piedra blasonadas. Nucleo de gran valor etnografico en el corazon de Liebana.',
        coords: [-4.593380, 43.164580], altitude: 420,
        municipality: 'Cillorigo de Liebana',
        tags: ['Iglesia', 'Blasonado', 'Etnografico']
    },
    {
        id: 'p35', name: 'San Pedro', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Cillorigo de Liebana con su ermita de San Pedro y casas de piedra tradicionales. Enclave rural con vistas al valle del Deva.',
        coords: [-4.617400, 43.174090], altitude: 450,
        municipality: 'Cillorigo de Liebana',
        tags: ['Ermita', 'Rural', 'Tradicional']
    },
    {
        id: 'p36', name: 'Tama', type: 'pueblo',
        desc: 'Pueblo situado en el corazon del valle de Liebana, conocido por sus casonas montanesas tradicionales y su iglesia parroquial. Cercano a Potes, conserva un ambiente rural autentico.',
        coords: [-4.609600, 43.158710], altitude: 350,
        municipality: 'Cillorigo de Liebana',
        tags: ['Valle', 'Casonas', 'Iglesia']
    },
    {
        id: 'p37', name: 'Trillayo', type: 'pueblo',
        desc: 'Diminuta aldea del municipio de Cillorigo de Liebana con apenas unas casas de piedra. Enclave de gran tranquilidad en un entorno natural de bosques y prados.',
        coords: [-4.589680, 43.179640], altitude: 480,
        municipality: 'Cillorigo de Liebana',
        tags: ['Diminuto', 'Tranquilo', 'Naturaleza']
    },
    {
        id: 'p38', name: 'Vinon', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana con casas de piedra y un entorno de vinas y frutales. Su nombre evoca la tradicion viticola de la zona.',
        coords: [-4.597590, 43.166060], altitude: 400,
        municipality: 'Cillorigo de Liebana',
        tags: ['Vinedos', 'Frutales', 'Tradicional']
    },
    // Nota: El CSV incluye 14 pueblos pero Cillorigo tiene 13 listados mas el de Ojedo que pertenece a otro ambito

    // ── CAMALENO (33 pueblos) ──────────────────────────────────
    {
        id: 'p39', name: 'Arenos', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Camaleno en las laderas que ascienden hacia los Picos de Europa. Conserva la arquitectura popular de piedra y un entorno de prados de montana.',
        coords: [-4.729260, 43.148190], altitude: 500,
        municipality: 'Camaleno',
        tags: ['Montana', 'Rural', 'Picos']
    },
    {
        id: 'p40', name: 'Arguebanes', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con interesantes casonas de piedra y una iglesia parroquial. Situado en una posicion elevada con vistas al valle de Camaleno y los Picos de Europa.',
        coords: [-4.717740, 43.156180], altitude: 460,
        municipality: 'Camaleno',
        tags: ['Casonas', 'Iglesia', 'Panoramico']
    },
    {
        id: 'p41', name: 'Barcena', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Camaleno asentado en una vega fertil junto al rio. Aldea de casas tradicionales con prados verdes y huertos familiares.',
        coords: [-4.725230, 43.151270], altitude: 430,
        municipality: 'Camaleno',
        tags: ['Rural', 'Vega', 'Huertos']
    },
    {
        id: 'p42', name: 'Baro', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno en el valle del rio Deva. Conserva arquitectura tradicional de montana bien conservada con vistas al valle y es punto de inicio de rutas hacia los puertos circundantes.',
        coords: [-4.706780, 43.153860], altitude: 420,
        municipality: 'Camaleno',
        tags: ['Tradicional', 'Valle', 'Senderismo']
    },
    {
        id: 'p43', name: 'Beares', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Camaleno rodeada de bosques y prados. Enclave tranquilo con casas de piedra en las faldas de los Picos de Europa.',
        coords: [-4.734510, 43.153870], altitude: 480,
        municipality: 'Camaleno',
        tags: ['Tranquilo', 'Bosque', 'Rural']
    },
    {
        id: 'p44', name: 'Besoy', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno en un entorno de prados y bosques de roble y haya. Conserva la arquitectura popular lebaniega y un ambiente pastoral.',
        coords: [-4.736080, 43.146570], altitude: 520,
        municipality: 'Camaleno',
        tags: ['Pastoral', 'Bosque', 'Tradicional']
    },
    {
        id: 'p45', name: 'Bodia', type: 'pueblo',
        desc: 'Pequeno nucleo del municipio de Camaleno con casas de piedra y un entorno natural de gran belleza. Situado en la ladera con vistas al valle de Camaleno.',
        coords: [-4.720610, 43.149870], altitude: 470,
        municipality: 'Camaleno',
        tags: ['Rural', 'Paisaje', 'Tranquilo']
    },
    {
        id: 'p46', name: 'Brez', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con una iglesia parroquial de interes y casas blasonadas. Conserva un rico patrimonio etnografico en un entorno de montanas.',
        coords: [-4.690790, 43.152340], altitude: 440,
        municipality: 'Camaleno',
        tags: ['Iglesia', 'Blasonado', 'Etnografico']
    },
    {
        id: 'p47', name: 'Camaleno', type: 'pueblo',
        desc: 'Cabeza del municipio que engloba localidades emblematicas como Fuente De, Espinama y Mogrovejo. Centro administrativo de la zona occidental de Liebana con acceso directo a los Picos de Europa.',
        coords: [-4.711450, 43.157400], altitude: 410,
        municipality: 'Camaleno',
        tags: ['Municipio', 'Capital', 'Picos']
    },
    {
        id: 'p48', name: 'Congarna', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con casas de piedra y tejados de losa. Enclave rural con vistas a los Picos de Europa y un entorno de prados de montana.',
        coords: [-4.698390, 43.153020], altitude: 450,
        municipality: 'Camaleno',
        tags: ['Losa', 'Rural', 'Picos']
    },
    {
        id: 'p49', name: 'Cosgaya', type: 'pueblo',
        desc: 'Acogedor pueblo en el valle de Camaleno con buena oferta de alojamiento rural, gastronomia tipica lebaniega y un entorno natural privilegiado. Paso obligado hacia Fuente De.',
        coords: [-4.741260, 43.159330], altitude: 560,
        municipality: 'Camaleno',
        tags: ['Rural', 'Gastronomia', 'Alojamiento']
    },
    {
        id: 'p50', name: 'Enterria', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con un cuidado patrimonio arquitectonico. Destaca por su entorno de excepcional belleza y senderos bien senalizados hacia los puertos de montana.',
        coords: [-4.697590, 43.145310], altitude: 520,
        municipality: 'Camaleno',
        tags: ['Patrimonio', 'Senderos', 'Belleza']
    },
    {
        id: 'p51', name: 'Espinama', type: 'pueblo',
        desc: 'Pueblo de montana a los pies de los Picos de Europa. Puerta de acceso al teleferico de Fuente De y punto de partida de rutas clasicas de alta montana como la subida a los Puertos de Aliva.',
        coords: [-4.764620, 43.168000], altitude: 828,
        municipality: 'Camaleno',
        tags: ['Montana', 'Teleferico', 'Picos']
    },
    {
        id: 'p52', name: 'Fuente De', type: 'pueblo',
        desc: 'Enclave turistico a los pies del circo glaciar de Fuente De, estacion inferior del famoso teleferico que asciende 753 metros hasta los 1823m. Puerta de entrada al macizo central de los Picos de Europa.',
        coords: [-4.801480, 43.150640], altitude: 1070,
        municipality: 'Camaleno',
        tags: ['Teleferico', 'Turismo', 'Picos']
    },
    {
        id: 'p53', name: 'La Frecha', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Camaleno en un entorno de bosques y prados. Conserva casas de piedra tradicionales y un ambiente de gran serenidad.',
        coords: [-4.745610, 43.152930], altitude: 600,
        municipality: 'Camaleno',
        tags: ['Tranquilo', 'Bosque', 'Sereno']
    },
    {
        id: 'p54', name: 'La Molina', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno que debe su nombre a un antiguo molino harinero. Nucleo rural con casas de piedra y un entorno de prados junto al rio.',
        coords: [-4.716370, 43.160350], altitude: 400,
        municipality: 'Camaleno',
        tags: ['Molino', 'Rio', 'Rural']
    },
    {
        id: 'p55', name: 'Las Ilces', type: 'pueblo',
        desc: 'Pequeno nucleo del municipio de Camaleno rodeado de acebos (ilces) y bosques mixtos. Enclave natural con arquitectura popular de piedra.',
        coords: [-4.752370, 43.155690], altitude: 650,
        municipality: 'Camaleno',
        tags: ['Bosque', 'Naturaleza', 'Acebo']
    },
    {
        id: 'p56', name: 'Lon', type: 'pueblo',
        desc: 'Pueblo del municipio de Camaleno privilegiado por su posicion elevada que ofrece magnificas vistas panoramicas sobre el valle de Liebana y las cumbres de los Picos de Europa.',
        coords: [-4.691470, 43.147330], altitude: 560,
        municipality: 'Camaleno',
        tags: ['Mirador', 'Panoramico', 'Valle']
    },
    {
        id: 'p57', name: 'Los Llanos', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno asentada en un terreno llano al pie de los montes. Nucleo de casas de piedra con prados de siega y huertos tradicionales.',
        coords: [-4.754230, 43.163510], altitude: 700,
        municipality: 'Camaleno',
        tags: ['Llano', 'Prados', 'Huertos']
    },
    {
        id: 'p58', name: 'Llaves', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con casas de piedra y un entorno de prados verdes. Conserva la esencia rural lebaniega en un paraje tranquilo.',
        coords: [-4.726680, 43.155470], altitude: 450,
        municipality: 'Camaleno',
        tags: ['Rural', 'Prados', 'Tranquilo']
    },
    {
        id: 'p59', name: 'Mieses', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Camaleno cuyo nombre alude a las mieses (cereales). Aldea con casas de piedra y campos de cultivo en el fertil valle de Camaleno.',
        coords: [-4.702060, 43.156880], altitude: 410,
        municipality: 'Camaleno',
        tags: ['Agricola', 'Valle', 'Rural']
    },
    {
        id: 'p60', name: 'Mogrovejo', type: 'pueblo',
        desc: 'Declarado Bien de Interes Cultural y considerado uno de los pueblos mas bonitos de Espana. Conserva una torre medieval del siglo XIII, casas solariegas de piedra y vistas espectaculares a los Picos de Europa.',
        coords: [-4.726360, 43.147710], altitude: 447,
        municipality: 'Camaleno',
        tags: ['Bonito', 'Medieval', 'Panoramico']
    },
    {
        id: 'p61', name: 'Pembes', type: 'pueblo',
        desc: 'Tranquilo nucleo rural en el municipio de Camaleno, enclavado en el valle del rio Quiviesa. Conserva casas de piedra tradicionales y es punto de paso en rutas de senderismo por el valle.',
        coords: [-4.680200, 43.150820], altitude: 430,
        municipality: 'Camaleno',
        tags: ['Tranquilo', 'Rural', 'Valle']
    },
    {
        id: 'p62', name: 'Pido', type: 'pueblo',
        desc: 'Pintoresca aldea de montana del municipio de Camaleno con espectaculares vistas al macizo central de los Picos de Europa. Sus casas de piedra se escalonan en la ladera ofreciendo una estampa clasica lebaniega.',
        coords: [-4.775280, 43.165900], altitude: 750,
        municipality: 'Camaleno',
        tags: ['Montana', 'Panoramico', 'Picos']
    },
    {
        id: 'p63', name: 'Quintana', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con casas de piedra tradicionales y una pequena iglesia. Enclave rural en un entorno de prados y bosques.',
        coords: [-4.716970, 43.163520], altitude: 430,
        municipality: 'Camaleno',
        tags: ['Rural', 'Iglesia', 'Tradicional']
    },
    {
        id: 'p64', name: 'Redo', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Camaleno en una posicion elevada sobre el valle. Ofrece vistas al entorno montanoso y conserva la arquitectura popular de la zona.',
        coords: [-4.696350, 43.158430], altitude: 440,
        municipality: 'Camaleno',
        tags: ['Elevado', 'Vistas', 'Rural']
    },
    {
        id: 'p65', name: 'San Pelayo', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con una ermita dedicada a San Pelayo y casas de piedra. Nucleo rural tranquilo con vistas al valle de Camaleno.',
        coords: [-4.739780, 43.157500], altitude: 540,
        municipality: 'Camaleno',
        tags: ['Ermita', 'Tranquilo', 'Rural']
    },
    {
        id: 'p66', name: 'Santo Toribio', type: 'pueblo',
        desc: 'Enclave del municipio de Camaleno donde se ubica el celebre Monasterio de Santo Toribio de Liebana, uno de los cinco lugares santos del cristianismo y custodio del Lignum Crucis.',
        coords: [-4.646680, 43.152050], altitude: 400,
        municipality: 'Camaleno',
        tags: ['Monasterio', 'Peregrino', 'Santo']
    },
    {
        id: 'p67', name: 'Sebrango', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno con casas de piedra y tejados tradicionales. Pequeno nucleo en un entorno de bosques mixtos y prados de montana.',
        coords: [-4.683440, 43.155740], altitude: 450,
        municipality: 'Camaleno',
        tags: ['Rural', 'Bosque', 'Montana']
    },
    {
        id: 'p68', name: 'Tanarrio', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno encaramada en la ladera con magnificas vistas. Conserva un interesante conjunto de arquitectura popular y horreos tradicionales.',
        coords: [-4.684970, 43.147900], altitude: 550,
        municipality: 'Camaleno',
        tags: ['Panoramico', 'Horreos', 'Tradicional']
    },
    {
        id: 'p69', name: 'Trevino', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Camaleno con casas de piedra tradicionales. Enclave rural en un entorno de prados y bosques con ambiente sereno.',
        coords: [-4.715290, 43.155050], altitude: 430,
        municipality: 'Camaleno',
        tags: ['Rural', 'Sereno', 'Tradicional']
    },
    {
        id: 'p70', name: 'Turieno', type: 'pueblo',
        desc: 'Pueblo del municipio de Camaleno situado junto al Monasterio de Santo Toribio. Nucleo con casas de piedra y buenas opciones de alojamiento rural, punto de partida del Camino Lebaniego.',
        coords: [-4.644820, 43.149850], altitude: 390,
        municipality: 'Camaleno',
        tags: ['Monasterio', 'Camino', 'Alojamiento']
    },
    {
        id: 'p71', name: 'Vallejo', type: 'pueblo',
        desc: 'Aldea del municipio de Camaleno situada en un pequeno valle entre montanas. Conserva casas de piedra y un entorno de gran tranquilidad rodeado de bosques.',
        coords: [-4.738670, 43.161230], altitude: 580,
        municipality: 'Camaleno',
        tags: ['Valle', 'Tranquilo', 'Bosque']
    },

    // ── VEGA DE LIEBANA (17 pueblos) ───────────────────────────
    {
        id: 'p72', name: 'Barago', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana con una iglesia parroquial romanica de interes. Conserva un patrimonio arquitectonico notable y un entorno de prados y montes.',
        coords: [-4.651050, 43.124720], altitude: 520,
        municipality: 'Vega de Liebana',
        tags: ['Romanico', 'Iglesia', 'Patrimonio']
    },
    {
        id: 'p73', name: 'Barrio', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Vega de Liebana con casas de piedra y un entorno de prados verdes. Aldea tradicional en el alto valle del Quiviesa.',
        coords: [-4.683370, 43.113210], altitude: 550,
        municipality: 'Vega de Liebana',
        tags: ['Rural', 'Prados', 'Valle']
    },
    {
        id: 'p74', name: 'Bores', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana en una posicion elevada con amplias vistas al valle. Conserva arquitectura popular de piedra y un entorno pastoral de montanas.',
        coords: [-4.671180, 43.110350], altitude: 600,
        municipality: 'Vega de Liebana',
        tags: ['Elevado', 'Vistas', 'Pastoral']
    },
    {
        id: 'p75', name: 'Campollo', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Vega de Liebana rodeada de campos y prados. Nucleo de casas de piedra con un entorno de gran belleza natural.',
        coords: [-4.661700, 43.109810], altitude: 580,
        municipality: 'Vega de Liebana',
        tags: ['Campos', 'Rural', 'Belleza']
    },
    {
        id: 'p76', name: 'Dobarganes', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana con casas de piedra y tejados de losa. Nucleo tradicional rodeado de prados de siega en el valle del Quiviesa.',
        coords: [-4.669950, 43.122640], altitude: 500,
        municipality: 'Vega de Liebana',
        tags: ['Losa', 'Tradicional', 'Prados']
    },
    {
        id: 'p77', name: 'Dobres', type: 'pueblo',
        desc: 'Pueblo tradicional del municipio de Vega de Liebana a casi 900 metros de altitud. Destaca por su arquitectura popular bien conservada, sus horreos y las panoramicas sobre el valle.',
        coords: [-4.699940, 43.109890], altitude: 890,
        municipality: 'Vega de Liebana',
        tags: ['Tradicional', 'Montana', 'Panoramico']
    },
    {
        id: 'p78', name: 'Enterrias', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana galardonada con el Premio al Pueblo Ejemplar. Destaca por el cuidado de su patrimonio arquitectonico y natural con senderos bien senalizados.',
        coords: [-4.698390, 43.102350], altitude: 620,
        municipality: 'Vega de Liebana',
        tags: ['Premiado', 'Ejemplar', 'Patrimonio']
    },
    {
        id: 'p79', name: 'Ledantes', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana en el alto valle. Conserva casas de piedra y horreos tradicionales con un entorno de prados y bosques de montana.',
        coords: [-4.687620, 43.108700], altitude: 570,
        municipality: 'Vega de Liebana',
        tags: ['Horreos', 'Montana', 'Tradicional']
    },
    {
        id: 'p80', name: 'Pollayo', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Vega de Liebana con casas de piedra y un entorno pastoral. Nucleo tranquilo rodeado de prados y bosques de roble.',
        coords: [-4.646320, 43.116950], altitude: 540,
        municipality: 'Vega de Liebana',
        tags: ['Tranquilo', 'Pastoral', 'Robles']
    },
    {
        id: 'p81', name: 'Tollo', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana en una posicion elevada con vistas al valle del Quiviesa. Conserva casas de piedra y tejados de losa tradicionales.',
        coords: [-4.673870, 43.118570], altitude: 560,
        municipality: 'Vega de Liebana',
        tags: ['Elevado', 'Losa', 'Vistas']
    },
    {
        id: 'p82', name: 'Toranzo', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Vega de Liebana con una iglesia parroquial de interes y casas de piedra blasonadas. Enclave de valor etnografico.',
        coords: [-4.657460, 43.119960], altitude: 530,
        municipality: 'Vega de Liebana',
        tags: ['Iglesia', 'Blasonado', 'Etnografico']
    },
    {
        id: 'p83', name: 'Tudes', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana con arquitectura popular bien conservada. Pueblo de casas de piedra y madera en un entorno de prados verdes.',
        coords: [-4.655360, 43.112840], altitude: 580,
        municipality: 'Vega de Liebana',
        tags: ['Arquitectura', 'Tradicional', 'Prados']
    },
    {
        id: 'p84', name: 'Vada', type: 'pueblo',
        desc: 'Nucleo rural del municipio de Vega de Liebana junto al rio Quiviesa. Aldea con casas de piedra y un entorno de prados y huertas tradicionales.',
        coords: [-4.654640, 43.126730], altitude: 480,
        municipality: 'Vega de Liebana',
        tags: ['Rio', 'Huertas', 'Rural']
    },
    {
        id: 'p85', name: 'Valmeo', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana con un interesante conjunto de casas de piedra y una iglesia parroquial. Enclave rural en el corazon del valle.',
        coords: [-4.646260, 43.134310], altitude: 460,
        municipality: 'Vega de Liebana',
        tags: ['Iglesia', 'Rural', 'Valle']
    },
    {
        id: 'p86', name: 'La Vega', type: 'pueblo',
        desc: 'Cabeza del municipio de Vega de Liebana, centro administrativo y de servicios del alto valle del Quiviesa. Conserva casas solariegas y ofrece buenas opciones de alojamiento rural.',
        coords: [-4.660330, 43.130320], altitude: 490,
        municipality: 'Vega de Liebana',
        tags: ['Municipio', 'Servicios', 'Solariegas']
    },
    {
        id: 'p87', name: 'Vejo', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Vega de Liebana en un entorno de bosques y prados. Conserva casas de piedra tradicionales y un ambiente de gran serenidad.',
        coords: [-4.654810, 43.106040], altitude: 620,
        municipality: 'Vega de Liebana',
        tags: ['Sereno', 'Bosque', 'Tradicional']
    },
    {
        id: 'p88', name: 'Villaverde', type: 'pueblo',
        desc: 'Aldea del municipio de Vega de Liebana rodeada de vegetacion exuberante que le da nombre. Nucleo de casas de piedra con prados verdes y un entorno natural de gran belleza.',
        coords: [-4.649710, 43.120870], altitude: 510,
        municipality: 'Vega de Liebana',
        tags: ['Verde', 'Naturaleza', 'Belleza']
    }
];

const HERITAGE = [
    {
        id: 'h1', name: 'Monasterio de Santo Toribio de Liebana', type: 'patrimonio',
        desc: 'Uno de los cinco lugares santos del cristianismo, custodio del Lignum Crucis, el trozo mas grande conocido de la Cruz de Cristo. Origen del Camino Lebaniego y lugar donde el monje Beato de Liebana escribio sus celebres Comentarios al Apocalipsis en el siglo VIII.',
        coords: [-4.6422, 43.1481],
        tags: ['Monasterio', 'Lignum Crucis', 'Camino Lebaniego'],
        future3d: true
    },
    {
        id: 'h2', name: 'Iglesia de Santa Maria de Lebena', type: 'patrimonio',
        desc: 'Obra maestra del arte mozarabe del siglo X, declarada Monumento Nacional. Fundada por los condes de Liebana, combina influencias visigodas, asturianas y califales en un edificio de extraordinaria armonia con arcos de herradura y capiteles tallados.',
        coords: [-4.5654, 43.2078],
        tags: ['Mozarabe', 'Siglo X', 'Arquitectura'],
        future3d: true
    },
    {
        id: 'h3', name: 'Torre del Infantado', type: 'patrimonio',
        desc: 'Imponente torre defensiva del siglo XV situada en el centro de Potes, mandada construir por el primer Marques de Santillana. Declarada Bien de Interes Cultural, actualmente alberga exposiciones y es el simbolo mas reconocible de la villa.',
        coords: [-4.6225, 43.1528],
        tags: ['Torre', 'Medieval', 'Potes'],
        future3d: true
    },
    {
        id: 'h4', name: 'Iglesia de Nuestra Senora de la Luz (Camaleno)', type: 'patrimonio',
        desc: 'Iglesia parroquial de Camaleno que combina elementos romanicos y goticos con reformas posteriores. Emplazamiento privilegiado con vistas a los Picos de Europa, conserva interesantes capiteles y una pila bautismal medieval.',
        coords: [-4.7155, 43.1635],
        tags: ['Romanico', 'Gotico', 'Camaleno'],
        future3d: true
    },
    {
        id: 'h5', name: 'Iglesia de San Sebastian (Potes)', type: 'patrimonio',
        desc: 'Iglesia gotica del siglo XIV situada en el casco historico de Potes, con portada ojival apuntada y un notable retablo barroco en su interior. Testigo de la larga historia medieval de la villa lebaniega.',
        coords: [-4.6210, 43.1530],
        tags: ['Gotico', 'Potes', 'Barroco'],
        future3d: true
    },
    {
        id: 'h6', name: 'Puente de San Cayetano', type: 'patrimonio',
        desc: 'Puente medieval de piedra sobre el rio Quiviesa en Potes, tambien conocido como Puente Nuevo. Uno de los rincones mas fotografiados de la villa, ofrece una estampa clasica con la Torre del Infantado al fondo.',
        coords: [-4.6215, 43.1520],
        tags: ['Puente', 'Medieval', 'Rio'],
        future3d: false
    },
    {
        id: 'h7', name: 'Teleferico de Fuente De', type: 'patrimonio',
        desc: 'Espectacular teleferico que salva un desnivel de 753 metros en menos de 4 minutos, ascendiendo desde los 1070m hasta los 1823m de altitud. Ofrece vistas impresionantes del macizo central de los Picos de Europa y acceso a rutas de alta montana.',
        coords: [-4.8032, 43.1505],
        tags: ['Teleferico', 'Picos', 'Mirador'],
        future3d: false
    },
    {
        id: 'h8', name: 'Iglesia de Santa Juliana', type: 'patrimonio',
        desc: 'Iglesia prerromanica ubicada en las cercanias de Lebena, testimonio del rico patrimonio religioso altomedieval de la comarca de Liebana. Conserva elementos arquitectonicos de gran valor historico y artistico.',
        coords: [-4.583, 43.189],
        tags: ['Prerromanico', 'Iglesia', 'Altomedieval'],
        future3d: false
    },
    {
        id: 'h9', name: 'Puente de La Hermida', type: 'patrimonio',
        desc: 'Puente medieval de piedra que cruza el rio Deva en el desfiladero de La Hermida. Construccion robusta de arco que durante siglos fue paso obligado en la principal via de acceso a la comarca de Liebana.',
        coords: [-4.610, 43.230],
        tags: ['Puente', 'Medieval', 'Desfiladero'],
        future3d: false
    },
    {
        id: 'h10', name: 'Iglesia de Santa Maria de Piasca', type: 'patrimonio',
        desc: 'Antiguo monasterio romanico del siglo IX con una portada esculpida del siglo XII considerada obra maestra del romanico cantabro. Conserva magnificos capiteles historiados, canecillos y una arquivolta decorada con figuras de gran expresividad.',
        coords: [-4.509, 43.119],
        tags: ['Romanico', 'Monasterio', 'Escultura'],
        future3d: false
    },
    {
        id: 'h11', name: 'Mirador del Cable (Fuente De)', type: 'patrimonio',
        desc: 'Espectacular mirador situado en la estacion superior del teleferico de Fuente De a 1823 metros de altitud. Ofrece una panoramica sobrecogedora del macizo central de los Picos de Europa, el valle de Liebana y las cumbres circundantes.',
        coords: [-4.805, 43.153],
        tags: ['Mirador', 'Teleferico', 'Panoramica'],
        future3d: false
    },
    {
        id: 'h12', name: 'Cueva del Cobre', type: 'patrimonio',
        desc: 'Cueva de interes historico y geologico situada en las proximidades de Potes. Cavidad natural con formaciones karsticas que ha sido utilizada por el ser humano desde tiempos remotos y forma parte del rico patrimonio subterraneo de Liebana.',
        coords: [-4.635, 43.165],
        tags: ['Cueva', 'Geologico', 'Historico'],
        future3d: false
    }
];
