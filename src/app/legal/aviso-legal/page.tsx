import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de Inmobiliaria Élite – Elite Bienes de Patrimonio S.L.',
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Aviso Legal</h1>

      <p className="mb-4"><strong>Última actualización:</strong> enero 2025</p>

      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
        Información y Comercio Electrónico (LSSICE), se informa a los usuarios de los datos del titular de este
        sitio web:
      </p>
      <ul>
        <li><strong>Denominación social:</strong> Elite Bienes de Patrimonio S.L.</li>
        <li><strong>Nombre comercial:</strong> Inmobiliaria Élite</li>
        <li><strong>Domicilio social:</strong> Av. Guillermo Reyna, 33, local B, 04600 Huércal-Overa, Almería, España</li>
        <li><strong>Teléfono:</strong> +34 633 07 78 37</li>
        <li><strong>Email:</strong> contacto@inmobiliariaelite.es</li>
        <li><strong>Actividad:</strong> Intermediación inmobiliaria, compraventa de inmuebles y asesoramiento financiero inmobiliario</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente sitio web tiene como finalidad informar sobre los servicios inmobiliarios ofrecidos por
        Elite Bienes de Patrimonio S.L. y facilitar el contacto con los usuarios interesados en comprar,
        vender o recibir asesoramiento inmobiliario.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso a este sitio web atribuye la condición de usuario e implica la aceptación plena y sin
        reservas de todas las disposiciones incluidas en este aviso legal. El usuario se compromete a
        utilizar el sitio web de conformidad con la ley, la moral y el orden público.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos del sitio web (textos, imágenes, diseño gráfico, código fuente, logos, marcas, etc.)
        son propiedad de Elite Bienes de Patrimonio S.L. o de terceros que han autorizado su uso. Queda
        prohibida la reproducción, distribución, transformación o comunicación pública sin autorización expresa.
      </p>

      <h2>5. Exclusión de garantías y responsabilidad</h2>
      <p>
        Elite Bienes de Patrimonio S.L. no garantiza la disponibilidad continua del sitio web y no se
        responsabiliza de los daños o perjuicios que pudieran derivarse del acceso o uso del mismo.
        La información sobre propiedades publicadas tiene carácter informativo y puede estar sujeta a
        modificaciones sin previo aviso.
      </p>

      <h2>6. Enlaces externos</h2>
      <p>
        Este sitio web puede contener enlaces a páginas de terceros. Elite Bienes de Patrimonio S.L.
        no se hace responsable del contenido ni de las prácticas de privacidad de dichas páginas.
      </p>

      <h2>7. Legislación aplicable y jurisdicción</h2>
      <p>
        Para la resolución de cualquier controversia relacionada con este sitio web se aplicará la
        legislación española, siendo competentes los juzgados y tribunales de Almería.
      </p>
    </>
  )
}
