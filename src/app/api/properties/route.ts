
// Traducciones completadas — v1.0import { NextResponse } from 'next/server'

const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Traducciones verificadas de anuncios no españoles — datos 100% reales del CRM
const TRANSLATIONS: Record<string, { title: string; description: string; bedrooms?: number; bathrooms?: number; area?: number }> = {
  '110863105': {
    title: 'Amplia casa familiar con gran terraza, parcela de 522 m² y árboles frutales en Albox',
    bedrooms: 5, bathrooms: 3, area: 250,
    description: `Amplia casa familiar con gran terraza, parcela de 522 m² y árboles frutales en Albox

Se ofrece esta magnífica vivienda de dos plantas con 250 m² construidos, ideal para quienes buscan espacio, comodidad y una excelente calidad de vida en un entorno tranquilo, con todos los servicios de Albox a poca distancia.

La vivienda destaca por su amplitud y versatilidad, contando con 5 dormitorios y 3 baños, lo que la convierte en una opción perfecta para familias numerosas, quienes necesitan espacio de trabajo en casa, o incluso como inversión para alojamiento rural o casa de vacaciones.

Distribuida en dos plantas, la propiedad ofrece estancias amplias y luminosas, con múltiples posibilidades de distribución y personalización según las necesidades del nuevo propietario.

Uno de los grandes atractivos de la casa es su espectacular terraza, un espacio ideal para disfrutar del clima mediterráneo durante todo el año. Perfecta para comidas al aire libre, reuniones familiares, momentos de relax, o simplemente para disfrutar de la tranquilidad del entorno.

En el exterior encontramos una parcela de 522 m², un verdadero oasis privado con árboles frutales y zona de huerto, perfecto para amantes de la naturaleza, aficionados a la jardinería, o quienes deseen cultivar sus propios alimentos. Este espacio también ofrece potencial para crear zonas de ocio, instalar una piscina, zona de barbacoa o un jardín aún más amplio.

Ubicada en Albox, localidad con todos los servicios necesarios: comercios, supermercados, restaurantes, centros médicos, colegios y vida local activa. Su buena conexión permite acceder fácilmente a otros municipios de la zona y a las playas de la provincia de Almería.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110245030': {
    title: '¡VIVIENDA EN EL SALTADOR DE HUÉRCAL-OVERA!',
    bedrooms: 4, bathrooms: 1, area: 0,
    description: `¡VIVIENDA EN EL SALTADOR DE HUÉRCAL-OVERA!

Descubre esta encantadora casa independiente, perfecta para quienes buscan un hogar con carácter y espacio. Con una distribución única en dos partes, la vivienda cuenta con un acogedor salón-comedor, una habitación, una despensa y un aseo en la primera parte. La segunda parte alberga una amplia cocina, un baño completo y tres habitaciones adicionales, junto con dos salas que ofrecen múltiples posibilidades de uso.

La propiedad, construida en 1965, se encuentra en buen estado y bien cuidada. Disfruta del calor de dos chimeneas y del confort del aire acondicionado en una de las habitaciones. Las ventanas de madera, mayoritariamente oscilobatientes, proporcionan una excelente ventilación e iluminación natural. Los suelos de la cocina y los baños aportan funcionalidad y estilo.

Además, el terreno frente a la casa también es de propiedad, lo que ofrece la posibilidad de disfrutar de espacio exterior adicional. Con dos depósitos de agua, uno para agua de lluvia, y acceso al agua de la comunidad de regantes, esta casa es ideal para amantes de la naturaleza y el jardín.

No pierdas la oportunidad de adquirir esta magnífica propiedad que incluye terraza, balcón, armarios empotrados y trastero. Con garaje y calefacción mediante bomba de calor, esta casa ofrece todo lo que necesitas para vivir con comodidad.

¡Ven a verla y enamórate de tu nuevo hogar!

Las fotos de este anuncio han sido realizadas por un fotógrafo profesional, no existen retoques fotográficos en las imágenes y se ajustan totalmente a la realidad.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '109967041': {
    title: 'Exclusiva vivienda de nueva construcción en Huércal-Overa — estrena hogar en un entorno tranquilo con espacio y luz',
    bedrooms: 3, bathrooms: 2, area: 0,
    description: `Exclusiva vivienda de nueva construcción en Huércal-Overa — estrena hogar en un entorno tranquilo con espacio y luz

Diseño moderno, amplitud y luz natural

Distribuida en dos plantas, la vivienda ha sido concebida para ofrecer comodidad y funcionalidad en el día a día:

3 dormitorios amplios
2 baños completos
Dormitorio principal con baño en suite
Excelente distribución y aprovechamiento del espacio
Grandes ventanales que aportan luminosidad durante todo el día
El equilibrio perfecto entre estética moderna y confort.

Calidad y confort en cada detalle

Dispone de cocina totalmente equipada, acabados modernos y materiales de calidad que garantizan durabilidad y estilo. Cada estancia transmite una sensación de hogar desde el primer momento.

Terreno privado: crea el exterior de tus sueños

Su amplio terreno es uno de sus grandes valores añadidos. Un lienzo en blanco donde podrás:
- Construir una piscina privada
- Diseñar una zona chill-out
- Instalar una barbacoa y comedor exterior
- Crear un jardín personalizado

Un espacio pensado para disfrutar del clima y la vida al aire libre con total intimidad.

Ubicación ideal

Situada en un barrio residencial tranquilo, sin ruido ni tráfico, pero a pocos minutos de todos los servicios esenciales: supermercados, colegios, centros médicos y principales vías de acceso.

Vive con la tranquilidad que deseas sin renunciar al confort.

Contacta con nosotros ahora para más información o para organizar tu visita. Puede que sea la casa que estabas esperando.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110242111': {
    title: '¡VIVIENDA EN ÚRCAL!',
    bedrooms: 2, bathrooms: 1, area: 147,
    description: `¡VIVIENDA EN ÚRCAL!

Descubre esta encantadora villa independiente en Úrcal, ideal para disfrutar de la tranquilidad y el confort. Con una distribución en dos plantas, la planta baja te recibe con un acogedor salón que se conecta a una moderna cocina comedor, perfecta para compartir momentos en familia. La terraza lateral y el porche invitan a relajarse al aire libre, mientras que la piscina te ofrece una refrescante escapada en los días soleados. Además, cuenta con dos cómodos dormitorios, uno de ellos con armario empotrado, y un baño completo con bañera.

En el primer piso, el dormitorio principal está complementado por el acceso a una zona chill-out privada, ideal para desconectar. Las calidades de la vivienda son excepcionales: paredes lisas, ventanas Climalit y suelos modernos que aportan elegancia y funcionalidad. La cocina, equipada con encimeras de Silestone, y las instalaciones sanitarias y eléctricas nuevas garantizan comodidad y modernidad.

Esta villa cuenta también con calefacción mediante radiadores en todas las estancias y preinstalación de aire acondicionado, asegurando un ambiente agradable durante todo el año. Con 147 m², hay espacio suficiente para toda la familia.

No pierdas la oportunidad de vivir en esta maravillosa casa que combina confort, estilo y funcionalidad.

Las fotos de este anuncio han sido realizadas por un fotógrafo profesional, no existen retoques fotográficos en las imágenes y se ajustan totalmente a la realidad.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110242146': {
    title: '¡VIVIENDA INDEPENDIENTE EN ÚRCAL!',
    bedrooms: 4, bathrooms: 1, area: 229,
    description: `¡VIVIENDA INDEPENDIENTE EN ÚRCAL!

Descubre esta amplia casa independiente que ofrece un sinfín de posibilidades para crear el hogar de tus sueños. Con 229 m² construidos, la propiedad cuenta con un recibidor acogedor que da paso a un luminoso salón comedor, ideal para disfrutar de momentos en familia. La cocina, aunque antigua, tiene un gran potencial y se conecta directamente con la cochera cerrada y el baño completo, facilitando el acceso y la comodidad.

La vivienda dispone de cuatro dormitorios, ideales para alojar a toda la familia o incluso para crear un espacio de trabajo. Además, hay una buhardilla sin acondicionar que se puede transformar en un rincón único. Los suelos de terrazo y las ventanas de madera añaden un toque clásico, mientras que el patio interior y los corrales ofrecen espacio exterior para el descanso o la creatividad.

Situada en una finca rústica de más de 4000 m², la propiedad incluye un gallinero de más de 1000 m² con cisterna, lo que ofrece numerosas posibilidades para emprendedores o amantes de la naturaleza. A pesar de necesitar reforma, esta casa es una oportunidad única para personalizar cada rincón a tu gusto.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110757985': {
    title: 'Amplia vivienda de dos plantas en el corazón de Pulpí (Almería) — ubicación privilegiada con todos los servicios',
    bedrooms: 4, bathrooms: 1, area: 198,
    description: `Amplia vivienda de dos plantas en el corazón de Pulpí (Almería) — ubicación privilegiada con todos los servicios

La propiedad cuenta con 198 m² útiles, lo que garantiza espacios amplios, cómodos y con múltiples posibilidades de redistribución o actualización según las necesidades del comprador.

La vivienda principal se distribuye en 4 dormitorios de buen tamaño, ideales para una familia numerosa o para utilizar como despacho, cuarto de juegos o vestidor. Cuenta con un baño completo, un amplio salón-comedor con mucha luz natural que crea un ambiente acogedor y confortable, y una cocina independiente, amplia y funcional con suficiente espacio de almacenamiento y zona de trabajo.

En el exterior se encuentra un patio privado, perfecto como zona de descanso, reuniones familiares, zona de juego o incluso para crear una agradable zona chill-out.

Como gran valor añadido, la propiedad incluye un edificio anexo que necesita renovación y abre un amplio abanico de posibilidades: ampliación de la vivienda principal, creación de un piso independiente, alojamiento para invitados, despacho profesional o un proyecto de alquiler tras la renovación.

Gracias a su tamaño y la doble construcción, esta es una excelente oportunidad para inversores, con potencial de obtener altos rendimientos mediante reforma y posterior alquiler o reventa.

Esta propiedad en el corazón de Pulpí combina una ubicación estratégica, mucho espacio y versatilidad. Una oportunidad única tanto como residencia principal como proyecto de inversión.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110767876': {
    title: 'Se vende amplia vivienda de dos plantas en el corazón de Taberno — ideal para familias e inversores',
    bedrooms: 4, bathrooms: 2, area: 0,
    description: `Se vende amplia vivienda de dos plantas en el corazón de Taberno — ideal para familias numerosas e inversores que buscan una excelente oportunidad de rentabilidad.

La propiedad cuenta con cuatro dormitorios y dos baños completos, distribuidos en dos plantas independientes, lo que permite destinar cada nivel como vivienda autónoma. Esta característica la convierte en una opción perfecta para alquiler por separado, vivienda familiar con espacio extra para invitados, o incluso para combinar residencia permanente con alquiler.

La casa destaca por sus espacios amplios y luminosos, con una distribución funcional que ofrece comodidad y privacidad. La configuración permite crear dos entradas independientes, lo que incrementa aún más el potencial de inversión.

Ubicada en el centro del municipio, con todos los servicios a un paso: supermercados, colegio, centro de salud, farmacia, instalaciones deportivas y comercios locales. Taberno es un entorno tranquilo y acogedor, perfecto para quienes buscan calidad de vida, seguridad y el encanto de un pueblo andaluz con todas las comodidades necesarias para el día a día.

Una vivienda versátil con mucho potencial y en una ubicación privilegiada. ¡Una oportunidad que no debes dejar pasar!

Las fotos de este anuncio han sido realizadas por un fotógrafo profesional, no existen retoques fotográficos en las imágenes y se ajustan totalmente a la realidad.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110789277': {
    title: 'Vivienda a reformar en pleno casco histórico de Albox — 142 m² en dos plantas con gran potencial',
    bedrooms: 0, bathrooms: 0, area: 142,
    description: `Vivienda a reformar situada en pleno casco histórico de Albox, con una superficie construida de 142 m² distribuidos en dos plantas.

La propiedad conserva el encanto tradicional de la zona y ofrece una excelente base para una reforma integral, permitiendo adaptar los espacios a las necesidades actuales sin perder el carácter original. Su distribución en dos alturas brinda múltiples posibilidades de diseño: desde una amplia vivienda familiar con varias habitaciones y zonas de estar diferenciadas, hasta un proyecto más contemporáneo con espacios abiertos, patio interior o incluso terraza.

Localizada en una zona central y con fácil acceso a todos los servicios (comercio, colegios, centro de salud y zonas de ocio), esta vivienda representa una gran oportunidad tanto como residencia habitual, segunda vivienda o inversión.

Una propiedad con mucho potencial, ideal para quien busca personalizar su hogar en un entorno con historia y encanto.

Las fotos de este anuncio han sido realizadas por un fotógrafo profesional, no existen retoques fotográficos en las imágenes y se ajustan totalmente a la realidad.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110824348': {
    title: 'Amplio piso de 134 m² en zona privilegiada de Huércal-Overa — listo para entrar a vivir',
    bedrooms: 4, bathrooms: 2, area: 134,
    description: `Amplio piso de 134 m² en zona privilegiada de Huércal-Overa — listo para entrar a vivir

Se vende magnífico piso de 134 m² en Huércal-Overa, ubicado en una zona privilegiada, cerca de todos los servicios: supermercados, colegios, comercios, centro de salud y zonas de ocio. Una vivienda ideal tanto para familias como para quienes buscan espacio, comodidad y una excelente ubicación.

La vivienda dispone de 4 amplios dormitorios, perfectos para familia numerosa, despacho o habitación de invitados. Cuenta también con 2 baños completos, uno de ellos en suite en el dormitorio principal, que proporciona mayor comodidad y privacidad.

Destaca por su gran amplitud, buena distribución y luminosidad, con estancias cómodas y funcionales que hacen del piso un hogar muy agradable para el día a día.

La propiedad se vende amueblada según las fotografías, lo que permite entrar a vivir desde el primer momento o convertirla en una excelente oportunidad de inversión.

Características principales:
134 m² construidos
4 dormitorios amplios
2 baños completos (uno en suite)
Vivienda muy luminosa
Buena distribución
Se vende amueblado según fotos
Ubicación privilegiada cerca de todos los servicios

Las fotos de este anuncio han sido realizadas por un fotógrafo profesional, no existen retoques fotográficos en las imágenes y se ajustan totalmente a la realidad.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110887057': {
    title: 'Acogedora vivienda en planta baja en Taberno — 3 dormitorios, garaje y patio cubierto',
    bedrooms: 3, bathrooms: 1, area: 0,
    description: `Se vende acogedora vivienda en planta baja situada en el tranquilo municipio de Taberno, una excelente oportunidad para quienes buscan comodidad, espacio y la tranquilidad de vivir en un entorno agradable con todos los servicios esenciales a su alcance.

La vivienda dispone de 3 dormitorios, amplios y luminosos, ideales para una familia o para adaptar alguno de ellos como despacho, habitación de invitados o zona de estudio. Cuenta con 1 baño completo, funcional y bien distribuido para el uso diario.

El inmueble ofrece un amplio salón-comedor, un espacio confortable y acogedor, perfecto para disfrutar en familia o recibir visitas. La cocina es independiente y dispone de chimenea, un elemento que aporta un toque tradicional y cálido a la vivienda, ideal para crear un ambiente acogedor en los meses de invierno.

Además, la vivienda cuenta con un patio cubierto, un espacio muy práctico y versátil que puede utilizarse como zona de descanso, comedor exterior, lavandería o almacén.

Uno de los grandes valores añadidos de esta vivienda es que incluye garaje, lo que aporta comodidad, seguridad para el vehículo y espacio de almacenamiento adicional.

Al tratarse de una vivienda en planta baja, resulta especialmente cómoda y accesible para todas las edades, facilitando el día a día sin necesidad de escaleras.

Ubicada en un entorno tranquilo, esta vivienda ofrece la posibilidad de disfrutar de la calidad de vida que ofrece un pueblo, rodeada de naturaleza y con un ambiente relajado, pero con todos los servicios esenciales cerca.

Una vivienda increíble que combina confort, funcionalidad y tranquilidad, ideal como residencia habitual, segunda vivienda o inversión.

Las fotos de este anuncio han sido realizadas por un fotógrafo profesional, no existen retoques fotográficos en las imágenes y se ajustan totalmente a la realidad.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110898164': {
    title: 'Gran oportunidad en Overa: vivienda con terreno y enorme potencial',
    bedrooms: 0, bathrooms: 0, area: 128,
    description: `Gran oportunidad en Overa: vivienda con terreno y enorme potencial

Se vende vivienda de 128 m² para reformar en Overa, una excelente oportunidad tanto para quienes buscan crear la casa de sus sueños como para inversores que deseen aprovechar su gran potencial.

La vivienda ofrece una base amplia y sólida que permite realizar una reforma integral y diseñar una casa completamente personalizada. Gracias a sus metros cuadrados, existe la posibilidad de redistribuir los espacios para crear una vivienda moderna, luminosa y funcional, adaptada a las necesidades actuales.

Situada en un entorno tranquilo y agradable, esta propiedad es perfecta para quienes valoran la calma, la intimidad y la calidad de vida, sin renunciar a la proximidad de los servicios de la zona.

Uno de los grandes atractivos de esta propiedad es que incluye un terreno independiente justo enfrente, de 298 m². Este terreno ofrece múltiples posibilidades: construcción de una segunda vivienda, casa de invitados, proyecto de inversión, creación de zona de ocio con jardín y piscina, habilitación de zona de aparcamiento o incluso destinarla a huerto o zona recreativa.

La combinación de vivienda y terreno frente a la propiedad hace que esta oportunidad sea algo poco habitual en la zona, permitiendo ampliar el proyecto e incrementar considerablemente su valor.

Ideal para quienes buscan espacio, tranquilidad y la posibilidad de desarrollar un proyecto personalizado en una ubicación encantadora.

Las fotos de este anuncio han sido realizadas por un fotógrafo profesional, no existen retoques fotográficos en las imágenes y se ajustan totalmente a la realidad.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110936948': {
    title: 'Solar urbano de 149 m² en urbanización Retamar, Partaloa — entorno tranquilo y residencial',
    bedrooms: 0, bathrooms: 0, area: 149,
    description: `Se vende solar urbano de 149 m² en la urbanización Retamar de Partaloa, ubicado en un entorno tranquilo y residencial, ideal para quienes buscan calidad de vida y contacto con la naturaleza.

El terreno cuenta con buena orientación (soleado durante gran parte del día), lo que lo hace perfecto para diseñar una vivienda eficiente y luminosa. Dispone de agradables vistas despejadas a la montaña y al entorno natural, aportando privacidad y un entorno relajado.

Situado en una urbanización consolidada, con acceso para vehículos y disponibilidad de suministros básicos al pie de la parcela.

Ubicación: Retamar, Partaloa
Superficie: 149 m²
Clasificación: Suelo urbano consolidado
Edificabilidad: según normativa local (ideal para vivienda unifamiliar)
Posibilidad de construir vivienda unifamiliar con alturas y ocupación reguladas por el plan urbanístico municipal.

Perfecto tanto como residencia principal como segunda vivienda o inversión.

Gran oportunidad para construir la casa que siempre has querido en una zona en crecimiento, bien comunicada y con encanto natural.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '110959820': {
    title: '¡OPORTUNIDAD ÚNICA! Vivienda en casco histórico de Albox — 200 m² con alto potencial para promotores',
    bedrooms: 0, bathrooms: 0, area: 200,
    description: `¡OPORTUNIDAD ÚNICA!

Se vende amplia vivienda en pleno centro histórico de Albox, con una superficie aproximada de 200 m², una ocasión excepcional para inversores y promotores.

La propiedad se encuentra en estado no habitable y no es susceptible de reforma, lo que la convierte en una excelente opción para demolición y desarrollo de un nuevo proyecto a medida.

Ubicada en una zona privilegiada del casco antiguo, con todos los servicios a pie de calle (comercios, restauración, centros educativos y transporte), ofrece un gran potencial para la construcción de una gran vivienda unifamiliar o incluso varias unidades residenciales, según la normativa urbanística.

Su superficie y ubicación estratégica hacen de este inmueble una inversión con alto potencial, ideal para quienes buscan rentabilidad en una zona consolidada y demandada.

Una ocasión difícil de encontrar en el mercado actual. No pierdas esta oportunidad de inversión en el corazón de Albox.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '111014874': {
    title: 'Edificio completo en el casco histórico de Huércal-Overa — 430 m², alta rentabilidad y múltiples opciones',
    bedrooms: 0, bathrooms: 0, area: 430,
    description: `Edificio completo en el casco histórico de Huércal-Overa con alta rentabilidad y múltiples opciones de explotación

Magnífica oportunidad para inversores en pleno casco histórico de Huércal-Overa. Se vende edificio completo con una superficie construida de 430 m², ideal para desarrollar un proyecto inmobiliario rentable en una ubicación consolidada y con demanda.

El inmueble se distribuye de la siguiente manera:

Planta baja: amplio local comercial en funcionamiento, listo para iniciar actividad desde el primer día generando ingresos sin inversión adicional. Tiene acceso directo desde la calle y buena visibilidad, características esenciales para cualquier tipo de negocio.
Almacén: espacio grande y versátil, perfecto como apoyo logístico para el local o con posibilidad de reconversión (trasteros, ampliación del local, nuevos locales comerciales, etc.).
Planta superior: dos viviendas independientes por reformar, con buena distribución y potencial para convertirse en viviendas modernas, apartamentos de alquiler o incluso alojamientos turísticos, incrementando notablemente el valor del activo.

Este edificio ofrece una excelente combinación de rentabilidad inmediata + revalorización a medio plazo, lo que lo convierte en una inversión muy atractiva. El local comercial genera ingresos desde el principio, mientras que la reforma de las viviendas incrementa el rendimiento total del inmueble.

Opciones de explotación para inversores:
Generación de ingresos mixtos (local comercial + alquiler residencial)
Proyecto de reforma integral y posterior venta por unidades para maximizar el beneficio
Conversión a apartamentos turísticos o alquiler por habitaciones, aprovechando la ubicación central
Uso combinado de negocio propio + vivienda para reducir costes operativos

Ubicación estratégica en una zona con todos los servicios a pie de calle: comercios, restaurantes, centros educativos y transporte público. El entorno histórico añade valor y atractivo tanto para residentes como para visitantes.

Puntos de inversión clave:
430 m² con múltiples posibilidades de redistribución
Local comercial operativo (ingresos inmediatos)
Alto potencial de revalorización tras reforma
Diversificación de ingresos
Ubicación consolidada con demanda estable

Un inmueble versátil, con gran proyección y perfecto para quien busca una inversión segura con potencial de crecimiento.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '111073548': {
    title: '¡Vivienda nueva a estrenar desde 289.000 €! — Villa de lujo en Valle del Este con piscina y garaje',
    bedrooms: 3, bathrooms: 2, area: 90,
    description: `¡Vivienda nueva a estrenar, desde 289.000 €!

Exclusiva villa de lujo ubicada en el prestigioso resort Valle del Este, concebida para disfrutar de un estilo de vida mediterráneo sofisticado, donde el diseño contemporáneo, el confort y la privacidad se combinan a la perfección.

Situada sobre una parcela de 201 m², la propiedad cuenta con 90 m² construidos cuidadosamente diseñados. La vivienda de dos plantas dispone de 3 amplios dormitorios y 2 elegantes baños. Destaca su moderna cocina de diseño abierta, integrada con un luminoso salón-comedor, creando un espacio amplio y funcional perfecto tanto para el día a día como para el entretenimiento.

En el exterior, la villa ofrece una gran terraza y una espectacular piscina privada, ideal para disfrutar del excelente clima durante todo el año. Cuenta además con garaje privado para mayor comodidad y seguridad.

La vivienda ha sido construida con materiales de primera calidad, incluyendo suelos de porcelánico, diseño vanguardista, puertas interiores blancas y carpintería de aluminio gris con grandes ventanales, garantizando un óptimo aislamiento térmico y acústico, así como abundante luz natural.

Los baños cuentan con platos de ducha enrasados y griferías de alta gama Porcelanosa, añadiendo un toque de elegancia y exclusividad.

Entre sus características destacan la preinstalación de aire acondicionado split independiente en dormitorios y salón, videoportero electrónico y sistema aerotérmico para producción de agua caliente sanitaria con acumulador, garantizando eficiencia energética y sostenibilidad.

Ubicada en un resort de reconocido prestigio con campo de golf y servicios de alto nivel, y con fácil acceso a playas, aeropuertos y principales destinos, esta propiedad representa una excelente oportunidad como residencia principal, segunda residencia o inversión internacional.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '111160543': {
    title: 'Cortijo en venta en Arboleas — entorno rural tranquilo, 100 m² construidos, parcela de 260 m²',
    bedrooms: 4, bathrooms: 0, area: 100,
    description: `Se vende cortijo en el municipio de Arboleas, ubicado en un entorno rural muy tranquilo, rodeado de naturaleza y con vistas despejadas, ideal para quienes buscan privacidad, descanso y calidad de vida.

La vivienda cuenta con aproximadamente 100 m² construidos, distribuidos en dos plantas. Dispone de 4 dormitorios, ofreciendo espacio suficiente tanto para familias como para invitados o incluso para destinar alguna estancia a despacho o zona de ocio. La distribución actual permite múltiples posibilidades de redistribución según las necesidades del comprador.

La propiedad se asienta sobre una parcela de 260 m², un espacio ideal para crear una zona exterior personalizada: jardín, terraza, zona de barbacoa o incluso una pequeña piscina, aprovechando el clima de la zona.

Se trata de una propiedad para reformar, lo que representa una excelente oportunidad para diseñar y personalizar la vivienda a tu gusto, conservando el carácter tradicional de los cortijos andaluces y adaptándola a las comodidades modernas.

Ubicada a pocos minutos del núcleo urbano, donde se encuentran todos los servicios necesarios, pero manteniendo la tranquilidad y el encanto del entorno rural. Ideal como residencia principal, segunda vivienda o inversión para turismo rural.

Gran potencial en una zona con mucho encanto.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '111172524': {
    title: 'Espectacular vivienda de 3 plantas con 355 m², terraza panorámica y múltiples posibilidades en Albox',
    bedrooms: 3, bathrooms: 1, area: 355,
    description: `Espectacular vivienda de 3 plantas con 355 m², terraza panorámica y múltiples posibilidades en Albox

¿Buscas una vivienda amplia, versátil y con gran potencial? Te presentamos esta magnífica propiedad de tres plantas en Albox, con unos impresionantes 355 m² construidos, ideal tanto como vivienda familiar, inversión o incluso para crear dos viviendas independientes.

Planta baja
Gran garaje con mucho espacio, perfecto para varios vehículos o incluso como zona de trabajo. Además cuenta con un patio privado y varios almacenes, ideal para quienes necesitan espacio adicional o quieren desarrollar un pequeño negocio, taller o zona de ocio.

Primera planta (vivienda principal)
Con 114 m², esta planta ofrece una distribución cómoda y luminosa: cocina independiente, acogedor salón-comedor, 3 dormitorios bien distribuidos y 1 baño completo. Un espacio diseñado para el confort diario.

Segunda planta
Distribuida de forma similar a la primera, lo que ofrece una oportunidad única: ampliar la vivienda o convertirla en una segunda vivienda independiente para familiares o para alquilar.

Terraza
Uno de los grandes atractivos de la propiedad: una amplia terraza desde la que podrás disfrutar de unas impresionantes vistas panorámicas, perfecta para relajarse, celebrar reuniones o crear tu propia zona chill-out.

Puntos fuertes:
Gran superficie construida (355 m²)
Posibilidad de 2 viviendas independientes
Gran garaje + almacenes
Terraza con vistas despejadas
Vivienda luminosa con excelente distribución
Ideal como inversión o vivienda familiar

Situada en una zona tranquila de Albox, con buena conectividad y cerca de todos los servicios.

Una propiedad con enorme potencial que debes visitar para apreciar todo lo que puede ofrecerte.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '111290819': {
    title: 'Piso en planta baja en urbanización privada de Mojácar — 3 dormitorios, terraza y acceso a piscina comunitaria',
    bedrooms: 3, bathrooms: 1, area: 0,
    description: `Descubre una oportunidad única de vivir o invertir en uno de los destinos más atractivos de la costa de Almería: Mojácar. Este fantástico piso en planta baja, ubicado en una cuidada y tranquila urbanización privada, combina comodidad, estilo y una excelente calidad de vida en un entorno privilegiado.

La vivienda destaca por su cómoda distribución y sus espacios generosos. Cuenta con tres amplios dormitorios, todos ellos con excelente iluminación natural, ideales tanto para familias como para quienes deseen espacio extra para invitados, teletrabajo o zona recreativa. El baño completo ofrece funcionalidad y confort, con un diseño práctico para el uso diario.

El corazón de la vivienda es el acogedor salón con cocina abierta, un espacio moderno y diáfano que invita a disfrutar de cada momento. La cocina se integra perfectamente en el ambiente, facilitando la interacción y creando un entorno ideal tanto para el día a día como para reuniones con familia y amigos.

Sin duda, uno de los mayores atractivos de este inmueble es su impresionante terraza privada. Un espacio amplio y versátil donde podrás relajarte, tomar el sol, comer al aire libre o simplemente desestresarte en un entorno tranquilo. Desde aquí tendrás además acceso directo a la piscina comunitaria, lo que convierte esta vivienda en una opción perfecta para los meses de verano y para quienes valoran la comodidad de tener zonas comunes a un paso de casa.

La urbanización ofrece un ambiente seguro, bien mantenido y agradable, ideal para disfrutar de la tranquilidad sin renunciar a la proximidad de todos los servicios, playas y zonas de ocio que caracterizan a Mojácar.

Ya sea como residencia principal, segunda vivienda o como inversión con alto rendimiento en alquiler vacacional, este piso reúne todas las características para ser una elección acertada.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '107863585': {
    title: '¡Descubre esta maravillosa casa en Huércal-Overa! Finca con olivos, árboles frutales y pozo propio',
    bedrooms: 2, bathrooms: 1, area: 110,
    description: `¡Descubre esta maravillosa casa en Huércal-Overa! Este encantador refugio, completamente productivo, se extiende sobre una parcela donde podrás disfrutar de cultivos de olivos y árboles frutales que florecen bajo el sol. Con un sistema de riego por goteo y un pozo propio, esta propiedad es ideal para los amantes de la agricultura y la vida rural.

La vivienda cuenta con 110 m² construidos, distribuidos en dos acogedores dormitorios, un baño funcional y una cocina equipada. Además, el porche orientado al sur invita al descanso con vistas al paisaje circundante, y existe un edificio anexo que puede utilizarse como garaje o para almacenamiento de aperos agrícolas. Todos los servicios necesarios se encuentran a pocos minutos en coche, lo que convierte este lugar en la opción ideal para vivir en armonía con la naturaleza sin renunciar a las comodidades. ¡No dejes pasar esta oportunidad única de invertir en tu futuro!

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '108775375': {
    title: '¡Gran oportunidad para inversores o familias! Amplia vivienda para reformar en ubicación privilegiada',
    bedrooms: 3, bathrooms: 0, area: 92,
    description: `¡GRAN OPORTUNIDAD PARA INVERSORES O FAMILIAS! AMPLIA VIVIENDA PARA REFORMAR EN UBICACIÓN PRIVILEGIADA

Se ofrece en venta esta espaciosa vivienda con grandes posibilidades de reforma, ideal para quienes buscan crear el hogar de sus sueños o realizar una inversión con alta rentabilidad.

La propiedad cuenta con una superficie construida de 92 m² distribuida en 3 habitaciones, baños, cocina independiente y un amplio salón comedor. Gracias a su distribución y metros disponibles, permite múltiples opciones de redistribución y diseño personalizado.

Ubicada en una zona muy tranquila con todos los servicios a mano: transporte público, colegios, centros de salud, supermercados y zonas verdes.

El piso necesita una reforma integral, lo que representa una excelente oportunidad para personalizarlo a tu gusto o aumentar su valor en el mercado tras la rehabilitación.

No dejes pasar esta oportunidad única. ¡Contáctanos para más información o para concertar una visita!

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '108778550': {
    title: 'Encantadora casa de pueblo con 3 dormitorios y gran potencial de reforma en las afueras de Huércal-Overa',
    bedrooms: 3, bathrooms: 0, area: 0,
    description: `Encantadora casa de pueblo con 3 dormitorios y gran potencial de reforma en las afueras de Huércal-Overa

Ubicada en una tranquila zona rural a pocos minutos en coche del centro de Huércal-Overa, esta acogedora casa de pueblo ofrece la combinación perfecta de tranquilidad, espacio y potencial. La vivienda, de una sola planta, dispone de tres dormitorios, una cocina independiente y un salón comedor amplio y luminoso, ideal para la vida familiar o como casa de vacaciones.

La propiedad se asienta sobre un amplio terreno que ofrece múltiples posibilidades de reforma y ampliación: desde la construcción de jardines, una piscina, hasta la creación de un espacio para huerto o una terraza con vistas al campo.

Aunque la casa necesita algunas actualizaciones, su sólida estructura y el entorno natural que la rodea la convierten en una excelente oportunidad para quienes buscan un proyecto personalizable con gran potencial.

La propiedad dispone de un almacén contiguo a la propiedad de 175 metros cuadrados, que tiene un coste adicional de 20.000 € (urbano). Y otro almacén en la misma finca, también urbano de 250 metros cuadrados con un precio de venta de 44.900 €.

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  },
  '107836465': {
    title: '¡Precio totalmente negociable! Terreno edificable de 272 m² en Alfoquía, Zurgena',
    bedrooms: 0, bathrooms: 0, area: 272,
    description: `¡PRECIO TOTALMENTE NEGOCIABLE!

¡Descubre la oportunidad que estabas esperando en Alfoquía, Zurgena! Este terreno edificable de 272 metros cuadrados te ofrece la posibilidad de construir la vivienda de tus sueños en un entorno tranquilo y acogedor. Con acceso a dos calles, tendrás la flexibilidad que necesitas para diseñar tu hogar ideal.

Imagina disfrutar de la paz y la serenidad que solo un pueblo puede ofrecer, sin renunciar a la comodidad de tener todos los servicios al alcance de tu mano. Este terreno, ubicado en un núcleo urbano, es perfecto para desarrollar una villa independiente y vivir rodeado de naturaleza y buenos vecinos.

No dejes pasar esta oportunidad única de invertir en tu futuro. ¡Ven a ver este espacio donde tus sueños pueden hacerse realidad! ¡Contáctanos y da el primer paso hacia tu nuevo hogar!

Contarás con el respaldo de profesionales con experiencia en el sector y asesoramiento financiero gratuito para facilitarte el proceso de compra.

Cumplimos con el Decreto de la Junta de Andalucía 218/2005, asegurando transparencia en todos los trámites. Los gastos de notario, registro, honorarios de agencia, impuesto de transmisiones patrimoniales y demás gastos no están incluidos en el precio.`
  }
}

function extractFromDesc(desc: string) {
  const r = (/([0-9]+)\s*dormitorio/i.exec(desc) || /([0-9]+)\s*habitaci/i.exec(desc))?.[1]
  const b = /([0-9]+)\s*ba[ñn]o/i.exec(desc)?.[1]
  const s = (/([0-9]+)\s*m[²2]/i.exec(desc) || /([0-9]+)\s*metros? construido/i.exec(desc))?.[1]
  return { bedrooms: r ? Number(r) : 0, bathrooms: b ? Number(b) : 0, area: s ? Number(s) : 0 }
}

function mapAd(ad: any) {
  const id = String(ad.id)
  const trans = TRANSLATIONS[id]

  const rawText: string = ad.comments?.adComments?.[0]?.propertyComment || ''
  const title = trans?.title || rawText.split('\n')[0]?.trim() || 'Propiedad en venta'
  const description = trans?.description || rawText.trim()

  const pics = ad.multimedias?.pictures
  const picArr = Array.isArray(pics) ? pics : pics ? [pics] : []
  const images: string[] = picArr.map((p: any) => p?.multimediaPath || '').filter(Boolean)

  const byOp = ad.prices?.byOperation
  const price = byOp?.SALE?.price ? Number(byOp.SALE.price) : byOp?.RENT?.price ? Number(byOp.RENT.price) : 0

  const typeMap: Record<string, string> = {
    '0':'Piso','1':'Casa','2':'Chalet','3':'Adosado','4':'Ático',
    '5':'Local','6':'Oficina','7':'Terreno','8':'Garaje',
    '9':'Trastero','10':'Nave','11':'Finca','12':'Edificio'
  }
  const prop = ad.property || {}
  const type = typeMap[String(prop.typology ?? '')] || 'Inmueble'
  const location: string = prop.address?.location?.name || 'Huércal-Overa'

  const fromDesc = extractFromDesc(description)
  const bedrooms = trans?.bedrooms ?? (Number(prop.rooms || 0) || fromDesc.bedrooms)
  const bathrooms = trans?.bathrooms ?? (Number(prop.bathrooms || 0) || fromDesc.bathrooms)
  const area = trans?.area ?? (Number(prop.size || prop.constructedArea || 0) || fromDesc.area)

  return { id, title, description, type, price, bedrooms, bathrooms, area, location, images, image: images[0] || '' }
}

export async function GET() {
  try {
    const res = await fetch(`${CRM_URL}?get_inmuebles`, {
      headers: { 'Authorization': `Bearer ${CRM_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`CRM ${res.status}`)
    const raw = await res.json()
    const ads: any[] = Array.isArray(raw?.ad) ? raw.ad : raw?.ad ? [raw.ad] : []
    const properties = ads.map(mapAd).filter(p => p.price > 0)
    return NextResponse.json({ success: true, properties, total: properties.length })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
    }
