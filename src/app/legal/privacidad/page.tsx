import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Inmobiliaria Élite – Elite Bienes de Patrimonio S.L.',
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>

      <p className="mb-4"><strong>Última actualización:</strong> enero 2025</p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> Elite Bienes de Patrimonio S.L.</li>
        <li><strong>Dirección:</strong> Av. Guillermo Reyna, 33, local B, 04600 Huércal-Overa, Almería</li>
        <li><strong>Email:</strong> contacto@inmobiliariaelite.es</li>
        <li><strong>Teléfono:</strong> +34 633 07 78 37</li>
      </ul>

      <h2>2. Datos que recogemos</h2>
      <p>A través de los formularios de este sitio web podemos recoger los siguientes datos personales:</p>
      <ul>
        <li>Nombre y apellidos</li>
        <li>Teléfono de contacto</li>
        <li>Dirección de correo electrónico</li>
        <li>Información relacionada con la propiedad que desea comprar o vender (tipo, ubicación, características, presupuesto)</li>
      </ul>

      <h2>3. Finalidad del tratamiento</h2>
      <p>Los datos personales que nos facilites serán tratados con las siguientes finalidades:</p>
      <ul>
        <li>Gestionar las consultas realizadas a través de los formularios de contacto</li>
        <li>Ofrecer asesoramiento inmobiliario personalizado</li>
        <li>Enviar información sobre propiedades y servicios que puedan ser de tu interés (solo con tu consentimiento)</li>
        <li>Gestionar la relación comercial derivada de servicios inmobiliarios</li>
      </ul>

      <h2>4. Base legal del tratamiento</h2>
      <p>La base legal para el tratamiento de tus datos es:</p>
      <ul>
        <li><strong>Consentimiento:</strong> al rellenar y enviar los formularios de contacto</li>
        <li><strong>Ejecución de contrato:</strong> cuando los datos son necesarios para la prestación de servicios inmobiliarios</li>
        <li><strong>Interés legítimo:</strong> para la gestión comercial y administrativa de la relación</li>
      </ul>

      <h2>5. Conservación de los datos</h2>
      <p>
        Los datos personales se conservarán mientras exista una relación comercial o interés mutuo, y durante
        los plazos legalmente establecidos para el cumplimiento de obligaciones legales.
      </p>

      <h2>6. Destinatarios de los datos</h2>
      <p>
        No se cederán datos personales a terceros salvo obligación legal. En caso de que sea necesario para
        la prestación de servicios inmobiliarios (por ejemplo, comunicación con notarías, entidades financieras
        o registros), se informará previamente al interesado.
      </p>

      <h2>7. Derechos del usuario</h2>
      <p>El usuario puede ejercer los siguientes derechos:</p>
      <ul>
        <li><strong>Acceso:</strong> derecho a obtener confirmación de si se están tratando datos personales</li>
        <li><strong>Rectificación:</strong> derecho a solicitar la corrección de datos inexactos</li>
        <li><strong>Supresión:</strong> derecho a solicitar la eliminación de datos personales</li>
        <li><strong>Oposición:</strong> derecho a oponerse al tratamiento de datos</li>
        <li><strong>Limitación:</strong> derecho a solicitar la limitación del tratamiento</li>
        <li><strong>Portabilidad:</strong> derecho a recibir los datos en formato estructurado</li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, puedes contactarnos en{' '}
        <a href="mailto:contacto@inmobiliariaelite.es">contacto@inmobiliariaelite.es</a>, indicando
        &quot;Protección de datos&quot; en el asunto.
      </p>
      <p>
        Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de
        Datos (AEPD) en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <h2>8. Seguridad de los datos</h2>
      <p>
        Adoptamos las medidas técnicas y organizativas necesarias para garantizar la seguridad de los
        datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
      </p>
    </>
  )
}
