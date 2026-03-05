/* ============================================================
   POIS.JS — Liebana Picos de Europa
   Pueblos y patrimonio (datos estaticos)
   ============================================================ */

const VILLAGES = [
    {
        id: 'p1', name: 'Potes', type: 'pueblo',
        desc: 'Capital de la comarca de Liebana, villa medieval declarada Conjunto Historico. Destaca la Torre del Infantado, sus puentes medievales sobre los rios Deva y Quiviesa, y una animada vida comercial con mercado los lunes. Punto de partida ideal para explorar toda la comarca.',
        coords: [-4.6219, 43.1525], altitude: 291, population: 1400,
        tags: ['Capital', 'Medieval', 'Comercio', 'Gastronomia']
    },
    {
        id: 'p2', name: 'Espinama', type: 'pueblo',
        desc: 'Pueblo de montana a los pies de los Picos de Europa en el municipio de Camaleno. Puerta de acceso al teleferico de Fuente De y punto de partida de rutas clasicas de alta montana como la subida a los Puertos de Aliva.',
        coords: [-4.7603, 43.1698], altitude: 828,
        tags: ['Montana', 'Teleferico', 'Picos']
    },
    {
        id: 'p3', name: 'Tresviso', type: 'pueblo',
        desc: 'El pueblo mas aislado de Cantabria, encaramado a 856 metros de altitud. Famoso por su queso picon artesanal y accesible solo por una estrecha carretera de montana o por el espectacular sendero del desfiladero del Urdon desde La Hermida.',
        coords: [-4.6140, 43.2208], altitude: 856,
        tags: ['Aislado', 'Queso', 'Montana']
    },
    {
        id: 'p4', name: 'Mogrovejo', type: 'pueblo',
        desc: 'Declarado Bien de Interes Cultural y considerado uno de los pueblos mas bonitos de Espana. Conserva una torre medieval del siglo XIII, casas solariegas de piedra y ofrece unas vistas espectaculares a los Picos de Europa.',
        coords: [-4.7215, 43.1582], altitude: 447,
        tags: ['Bonito', 'Medieval', 'Panoramico']
    },
    {
        id: 'p5', name: 'Baro', type: 'pueblo',
        desc: 'Tranquila aldea lebaniega del municipio de Vega de Liebana con arquitectura tradicional de montana bien conservada. Ofrece buenas vistas al valle del Deva y es punto de inicio de rutas hacia los puertos de montanas circundantes.',
        coords: [-4.6485, 43.1420], altitude: 420,
        tags: ['Tranquilo', 'Tradicional']
    },
    {
        id: 'p6', name: 'Tama', type: 'pueblo',
        desc: 'Pueblo situado en el corazon del valle de Liebana, conocido por sus casonas montanesas tradicionales y su iglesia parroquial. Cercano a Potes, conserva un ambiente rural autentico con buenas conexiones a las principales rutas de senderismo.',
        coords: [-4.6650, 43.1480], altitude: 350,
        tags: ['Valle', 'Casonas']
    },
    {
        id: 'p7', name: 'La Hermida', type: 'pueblo',
        desc: 'Pequeno nucleo enclavado en el corazon del impresionante desfiladero de La Hermida, el mas largo de Espana con 21 km. Punto de partida para la ruta al nacimiento del Urdon, acceso a Tresviso y antiguo balneario de aguas termales.',
        coords: [-4.6078, 43.2368], altitude: 176,
        tags: ['Desfiladero', 'Termas', 'Urdon']
    },
    {
        id: 'p8', name: 'Cosgaya', type: 'pueblo',
        desc: 'Acogedor pueblo en el valle de Camaleno con buena oferta de alojamiento rural, gastronomia tipica lebaniega y un entorno natural privilegiado. Paso obligado en la carretera hacia Fuente De y las cumbres de los Picos de Europa.',
        coords: [-4.7385, 43.1612], altitude: 560,
        tags: ['Rural', 'Gastronomia', 'Alojamiento']
    },
    {
        id: 'p9', name: 'Lebena', type: 'pueblo',
        desc: 'Pequena aldea en el municipio de Cillorigo de Liebana, celebre por albergar la iglesia mozarabe de Santa Maria de Lebena, joya del siglo X y una de las obras cumbres del arte mozarabe peninsular.',
        coords: [-4.5654, 43.2078], altitude: 280,
        tags: ['Mozarabe', 'Iglesia', 'Historico']
    },
    {
        id: 'p10', name: 'Sotres', type: 'pueblo',
        desc: 'El pueblo habitado mas alto de los Picos de Europa a 1045 metros de altitud, en el concejo asturiano de Cabrales. Base imprescindible para rutas de alta montana hacia el Naranjo de Bulnes (Picu Urriellu), Pandebano y los Lagos de Covadonga.',
        coords: [-4.7462, 43.2318], altitude: 1045,
        tags: ['Altitude', 'Montana', 'Naranjo']
    },
    {
        id: 'p11', name: 'Camaleno', type: 'pueblo',
        desc: 'Cabeza del municipio que engloba localidades emblematicas como Fuente De, Espinama y Mogrovejo. Centro administrativo de la zona occidental de Liebana con servicios basicos y acceso directo a los Picos de Europa.',
        coords: [-4.7150, 43.1630], altitude: 410,
        tags: ['Municipio', 'Fuente De']
    },
    {
        id: 'p12', name: 'Ojedo', type: 'pueblo',
        desc: 'Nucleo urbano contiguo a Potes con servicios, comercios y equipamientos deportivos. En sus inmediaciones se encuentra el Monasterio de Santo Toribio de Liebana, lugar santo del cristianismo y meta del Camino Lebaniego.',
        coords: [-4.6380, 43.1490], altitude: 305,
        tags: ['Servicios', 'Monasterio']
    },
    {
        id: 'p13', name: 'Bejes', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana famosa por la elaboracion artesanal de queso picon Bejes-Tresviso con Denominacion de Origen Protegida. Rodeada de cuevas naturales utilizadas tradicionalmente para la maduracion del queso.',
        coords: [-4.639, 43.211], altitude: 555, population: 50,
        tags: ['Queso', 'Artesanal', 'Tradicion']
    },
    {
        id: 'p14', name: 'Cabanes', type: 'pueblo',
        desc: 'Pequena aldea de montana en el municipio de Cillorigo de Liebana, situada a 720 metros de altitud. Conserva la arquitectura popular lebaniega de piedra y madera, con un entorno de prados y bosques ideal para el senderismo.',
        coords: [-4.597, 43.204], altitude: 720,
        tags: ['Montana', 'Tradicional', 'Senderismo']
    },
    {
        id: 'p15', name: 'Dobres', type: 'pueblo',
        desc: 'Pueblo tradicional del municipio de Vega de Liebana a casi 900 metros de altitud. Destaca por su arquitectura popular bien conservada, sus horreos y las panoramicas sobre el valle. Punto de partida de rutas hacia los puertos de montana.',
        coords: [-4.715, 43.103], altitude: 890,
        tags: ['Tradicional', 'Montana', 'Panoramico']
    },
    {
        id: 'p16', name: 'Pembes', type: 'pueblo',
        desc: 'Tranquilo nucleo rural en el municipio de Vega de Liebana, enclavado en el valle del rio Quiviesa. Conserva un ambiente apacible con casas de piedra tradicionales y es punto de paso en rutas de senderismo por el valle.',
        coords: [-4.704, 43.096], altitude: 650,
        tags: ['Tranquilo', 'Rural', 'Valle']
    },
    {
        id: 'p17', name: 'Pendes', type: 'pueblo',
        desc: 'Aldea del municipio de Cillorigo de Liebana conocida por su puente medieval sobre el rio Deva, de gran valor historico. Situada en un cruce de caminos tradicional de la comarca, conserva ejemplos notables de arquitectura popular.',
        coords: [-4.597, 43.164], altitude: 380,
        tags: ['Medieval', 'Puente', 'Historico']
    },
    {
        id: 'p18', name: 'Frama', type: 'pueblo',
        desc: 'Pueblo del municipio de Pesaguero en la parte oriental de Liebana. Nucleo rural con casas de piedra tradicionales, rodeado de prados de siega y bosques de roble, con buenas opciones de senderismo por los alrededores.',
        coords: [-4.529, 43.125], altitude: 620,
        tags: ['Rural', 'Pesaguero', 'Senderismo']
    },
    {
        id: 'p19', name: 'Caloca', type: 'pueblo',
        desc: 'Remota aldea de montana en el municipio de Pesaguero, a casi 1000 metros de altitud. Una de las localidades mas elevadas de Liebana, rodeada de pastos de altura y con acceso a rutas hacia la sierra de Pena Sagra y los collados circundantes.',
        coords: [-4.464, 43.098], altitude: 980,
        tags: ['Remoto', 'Montana', 'Altitud']
    },
    {
        id: 'p20', name: 'Piasca', type: 'pueblo',
        desc: 'Localidad del municipio de Pesaguero celebre por albergar la iglesia romanica de Santa Maria de Piasca, antiguo monasterio del siglo IX con una portada esculpida considerada obra maestra del romanico cantabro.',
        coords: [-4.509, 43.119], altitude: 550,
        tags: ['Romanico', 'Monasterio', 'Historico']
    },
    {
        id: 'p21', name: 'Enterria', type: 'pueblo',
        desc: 'Pequena aldea del municipio de Vega de Liebana galardonada con el Premio al Pueblo Ejemplar. Destaca por el cuidado de su patrimonio arquitectonico y natural, con un entorno de excepcional belleza y senderos bien senalizados.',
        coords: [-4.697, 43.103], altitude: 620,
        tags: ['Premiado', 'Ejemplar', 'Patrimonio']
    },
    {
        id: 'p22', name: 'Cucayo', type: 'pueblo',
        desc: 'Diminuto nucleo de montana en el municipio de Vega de Liebana a 900 metros de altitud. Aldea de apenas un punado de casas rodeada de prados verdes y bosques, ideal para quien busca soledad y contacto con la naturaleza lebaniega.',
        coords: [-4.682, 43.098], altitude: 900,
        tags: ['Remoto', 'Montana', 'Naturaleza']
    },
    {
        id: 'p23', name: 'Lon', type: 'pueblo',
        desc: 'Pueblo del municipio de Vega de Liebana privilegiado por su posicion elevada que ofrece magnificas vistas panoramicas sobre el valle de Liebana y las cumbres de los Picos de Europa. Conserva arquitectura tradicional lebaniega y es punto de partida de rutas de media montana.',
        coords: [-4.694, 43.111], altitude: 560,
        tags: ['Mirador', 'Panoramico', 'Valle']
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
