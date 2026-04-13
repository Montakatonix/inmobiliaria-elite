export const siteConfig = {
  name: 'Inmobiliaria Élite',
  legalName: 'Elite Bienes de Patrimonio S.L.',
  description: 'Inmobiliaria especializada en el Levante Almeriense. Compra, venta y asesoramiento inmobiliario en Huércal-Overa, Almería.',
  url: 'https://inmobiliariaelite.es',
  phone: '+34 633 07 78 37',
  phoneDisplay: '633 07 78 37',
  email: 'contacto@inmobiliariaelite.es',
  address: {
    street: 'Av. Guillermo Reyna, 33, local B',
    postalCode: '04600',
    city: 'Huércal-Overa',
    province: 'Almería',
    country: 'España',
    full: 'Av. Guillermo Reyna, 33, local B, 04600 Huércal-Overa, Almería, España',
    mapsUrl: 'https://maps.app.goo.gl/QCADmkzziSvre5j16',
  },
  social: {
    google: 'https://g.page/inmobiliaria-elite',
  },
  rating: {
    score: 4.8,
    count: 16,
    platform: 'Google',
  },
  hours: {
    weekdays: 'Lunes a Viernes: 9:30 – 14:00 / 16:30 – 20:00',
    saturday: 'Sábados: con cita previa',
    sunday: 'Domingos: cerrado',
  },
  zones: [
    'Huércal-Overa',
    'Levante Almeriense',
    'Almería',
    'Pulpí',
    'Vera',
    'Garrucha',
    'Mojácar',
    'Cuevas del Almanzora',
    'Zurgena',
    'Albox',
  ],
}

export const testimonials = [
  {
    text: 'Esta inmobiliaria está formada por un equipo muy joven, pero altamente profesional. Siempre ponen todo su empeño en informarte lo mejor posible y ofrecerte las opciones que mejor se adaptan a ti.',
    author: 'María G.',
    rating: 5,
  },
  {
    text: 'Excelente trato y servicio de todo el equipo de Élite. Sin duda una inmobiliaria súper recomendada, muy resolutivos y con un servicio excelente que te acompaña de principio a fin.',
    author: 'Carlos R.',
    rating: 5,
  },
  {
    text: 'Grandes profesionales, estoy muy contenta con vosotros. Me ayudaron con todo el proceso y siempre estuvieron disponibles para resolver mis dudas. Totalmente recomendable.',
    author: 'Ana P.',
    rating: 5,
  },
  {
    text: 'Nos atendieron de maravilla desde el primer momento. Muy transparentes con todo el proceso y nos dieron mucha confianza. Encontramos nuestra casa ideal gracias a ellos.',
    author: 'Javier M.',
    rating: 5,
  },
]

export const featuredProperties = [
  {
    id: 1,
    title: 'Piso céntrico reformado',
    location: 'Centro, Huércal-Overa',
    price: 115000,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    type: 'Piso',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Villa con piscina y jardín',
    location: 'Las Norias, Huércal-Overa',
    price: 289000,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: true,
  },
  {
    id: 3,
    title: 'Apartamento luminoso con terraza',
    location: 'Av. Guillermo Reyna, Huércal-Overa',
    price: 89900,
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    type: 'Apartamento',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    featured: true,
  },
  {
    id: 4,
    title: 'Casa de campo con terreno',
    location: 'Overa, Huércal-Overa',
    price: 175000,
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    type: 'Casa',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    featured: false,
  },
  {
    id: 5,
    title: 'Ático con vistas panorámicas',
    location: 'Plaza Mayor, Huércal-Overa',
    price: 149000,
    bedrooms: 3,
    bathrooms: 2,
    area: 134,
    type: 'Ático',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    featured: false,
  },
  {
    id: 6,
    title: 'Chalet adosado familiar',
    location: 'La Atalaya, Huércal-Overa',
    price: 198000,
    bedrooms: 4,
    bathrooms: 3,
    area: 190,
    type: 'Chalet',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    featured: false,
  },
]

export const services = [
  {
    id: 'compraventa',
    title: 'Compra y venta de inmuebles',
    description: 'Te acompañamos en cada paso del proceso de compra o venta de tu propiedad, con total transparencia y seguridad jurídica.',
    icon: 'Home',
  },
  {
    id: 'captacion',
    title: 'Captación de inmuebles',
    description: 'Buscamos activamente las mejores oportunidades del mercado para conectar propietarios con compradores ideales.',
    icon: 'Search',
  },
  {
    id: 'asesoramiento',
    title: 'Asesoramiento financiero',
    description: 'Te orientamos en la financiación de tu vivienda, negociando las mejores condiciones hipotecarias para ti.',
    icon: 'Calculator',
  },
  {
    id: 'valoracion',
    title: 'Valoración profesional',
    description: 'Realizamos valoraciones precisas basadas en datos reales del mercado local para que tomes decisiones informadas.',
    icon: 'BarChart3',
  },
  {
    id: 'mercado',
    title: 'Análisis de mercado',
    description: 'Estudiamos las tendencias del mercado inmobiliario en el Levante Almeriense para ofrecerte información actualizada.',
    icon: 'TrendingUp',
  },
  {
    id: 'comercializacion',
    title: 'Estrategia de comercialización',
    description: 'Diseñamos planes de marketing personalizados para maximizar la visibilidad y el valor de tu propiedad.',
    icon: 'Megaphone',
  },
  {
    id: 'acompanamiento',
    title: 'Acompañamiento integral',
    description: 'Desde la primera consulta hasta la firma en notaría, estamos a tu lado resolviendo cualquier duda o trámite.',
    icon: 'Handshake',
  },
]

export const buyingSteps = [
  {
    step: 1,
    title: 'Cuéntanos qué buscas',
    description: 'Nos reunimos contigo para entender tus necesidades, presupuesto y preferencias. Cada persona es única y merece una búsqueda personalizada.',
  },
  {
    step: 2,
    title: 'Seleccionamos opciones',
    description: 'Filtramos entre nuestra cartera y el mercado local para presentarte solo las propiedades que realmente encajan con lo que necesitas.',
  },
  {
    step: 3,
    title: 'Visitas y asesoramiento',
    description: 'Organizamos las visitas y te ofrecemos información detallada sobre cada inmueble: estado, documentación, entorno y potencial.',
  },
  {
    step: 4,
    title: 'Negociación y financiación',
    description: 'Negociamos las mejores condiciones de compra y te ayudamos a conseguir financiación adaptada a tu perfil económico.',
  },
  {
    step: 5,
    title: 'Firma y entrega',
    description: 'Nos encargamos de toda la gestión documental y te acompañamos hasta la firma en notaría. Tu nuevo hogar te espera.',
  },
]

export const sellingSteps = [
  {
    step: 1,
    title: 'Valoración profesional',
    description: 'Analizamos tu propiedad y el mercado actual para establecer un precio competitivo y realista que maximice tu beneficio.',
  },
  {
    step: 2,
    title: 'Preparación y fotografía',
    description: 'Optimizamos la presentación de tu vivienda con fotografía profesional y, si es necesario, consejos de home staging.',
  },
  {
    step: 3,
    title: 'Difusión multicanal',
    description: 'Publicamos tu propiedad en los principales portales inmobiliarios, redes sociales y nuestra base de datos de compradores activos.',
  },
  {
    step: 4,
    title: 'Gestión de visitas',
    description: 'Organizamos y acompañamos todas las visitas, filtrando previamente a los interesados para optimizar tu tiempo.',
  },
  {
    step: 5,
    title: 'Negociación y cierre',
    description: 'Gestionamos las ofertas, negociamos en tu nombre y coordinamos todos los trámites hasta la firma en notaría.',
  },
]
