export const siteConfig = {
  name: 'Inmobiliaria Élite',
  legalName: 'Elite Bienes de Patrimonio S.L.',
  description: 'Inmobiliaria especializada en el Levante Almeriense.',
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
    full: 'Av. Guillermo Reyna, 33, local B, 04600 Huércal-Overa, Almería',
    mapsUrl: 'https://maps.app.goo.gl/QCADmkzziSvre5j16',
  },
  social: { google: 'https://g.page/inmobiliaria-elite' },
  rating: { score: 4.8, count: 16, platform: 'Google' },
  hours: {
    weekdays: 'Lunes a Viernes: 9:30 – 14:00 / 16:30 – 20:00',
    saturday: 'Sábados: con cita previa',
    sunday: 'Domingos: cerrado',
  },
  zones: ['Huércal-Overa','Levante Almeriense','Almería','Pulpí','Vera','Garrucha','Mojácar','Cuevas del Almanzora','Zurgena','Albox'],
}

export const testimonials = [
  { text: 'Equipo muy joven pero altamente profesional. Siempre ponen todo su empeño.', author: 'María G.', rating: 5 },
  { text: 'Excelente trato y servicio. Súper recomendada.', author: 'Carlos R.', rating: 5 },
  { text: 'Grandes profesionales. Totalmente recomendable.', author: 'Ana P.', rating: 5 },
  { text: 'Muy transparentes, nos dieron mucha confianza.', author: 'Javier M.', rating: 5 },
]

export const featuredProperties = [
  { id:1,title:'Piso céntrico reformado',location:'Centro, Huércal-Overa',price:115000,bedrooms:3,bathrooms:2,area:110,type:'Piso',image:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',featured:true},
  { id:2,title:'Villa con piscina',location:'Las Norias, Huércal-Overa',price:289000,bedrooms:4,bathrooms:3,area:220,type:'Villa',image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',featured:true},
  { id:3,title:'Apartamento luminoso', location:'Av. Guillermo Reyna',price:89900,bedrooms:2,bathrooms:1,area:85,type:'Apartamento',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',featured:true},
]

export const services = [
  { id:'compraventa',title:'Compra y venta',description:'Te acompañamos en cada paso',icon:'Home'},
  { id:'captacion',title:'Captación',description:'Buscamos las mejores oportunidades',icon:'Search'},
  { id:'asesoramiento',title:'Asesoramiento financiero',description:'Te orientamos en financiación',icon:'Calculator'},
  { id:'valoracion',title:'Valoración profesional',description:'Valoraciones basadas en datos reales',icon:'BarChart3'},
  { id:'mercado',title:'Análisis de mercado',description:'Tendencias del mercado local',icon:'TrendingUp'},
  { id:'comercializacion',title:'Comercialización',description:'Planes de marketing personalizados',icon:'Megaphone'},
  { id:'acompanamiento',title:'Acompañamiento integral',description:'Desde consulta hasta notaría',icon:'Handshake'},
]

export const buyingSteps = [
  { step:1,title:'Cuéntanos qué buscas',description:'Entendemos tus necesidades'},
  { step:2,title:'Seleccionamos opciones',description:'Filtramos las mejores propiedades'},
  { step:3,title:'Visitas y asesoramiento',description:'Organizamos visitas con info detallada'},
  { step:4,title:'Negociación',description:'Mejores condiciones y financiación'},
  { step:5,title:'Firma y entrega',description:'Gestión documental completa'},
]

export const sellingSteps = [
  { step:1,title:'Valoración',description:'Analizamos tu propiedad'},
  { step:2,title:'Fotografía',description:'Presentación profesional'},
  { step:3,title:'Difusión',description:'Portales y redes sociales'},
  { step:4,title:'Visitas',description:'Gestión de visitas y filtrado'},
  { step:5,title:'Cierre',description:'Negociación y firma en notaría'},
]
