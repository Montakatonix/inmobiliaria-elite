import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Inmobiliaria Élite – Elite Bienes de Patrimonio S.L.',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

      <p className="mb-4"><strong>Última actualización:</strong> enero 2025</p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un
        sitio web. Permiten que el sitio recuerde tus acciones y preferencias durante un período de tiempo,
        de modo que no tengas que volver a introducirlas cada vez que vuelvas al sitio.
      </p>

      <h2>2. ¿Qué tipos de cookies utilizamos?</h2>

      <h3>Cookies técnicas (necesarias)</h3>
      <p>
        Son imprescindibles para el funcionamiento del sitio web. Permiten funcionalidades básicas como
        la navegación entre páginas, el recordatorio de preferencias de cookies y la seguridad del sitio.
      </p>

      <h3>Cookies analíticas</h3>
      <p>
        Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando información
        de forma anónima. Utilizamos esta información para mejorar el funcionamiento y contenido del sitio.
      </p>

      <h2>3. Cookies utilizadas</h2>
      <table className="w-full text-sm border-collapse mb-6">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4">Cookie</th>
            <th className="text-left py-2 pr-4">Tipo</th>
            <th className="text-left py-2 pr-4">Duración</th>
            <th className="text-left py-2">Finalidad</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-2 pr-4">cookies_accepted</td>
            <td className="py-2 pr-4">Técnica</td>
            <td className="py-2 pr-4">1 año</td>
            <td className="py-2">Recordar la aceptación de cookies</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Gestión de cookies</h2>
      <p>
        Puedes configurar tu navegador para rechazar las cookies o para que te avise cuando un sitio web
        intente instalarlas. Ten en cuenta que si deshabilitas las cookies, algunas funcionalidades del
        sitio web podrían no funcionar correctamente.
      </p>
      <p>Instrucciones para gestionar cookies en los principales navegadores:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Internet Explorer / Edge</a></li>
      </ul>

      <h2>5. Actualización de la política</h2>
      <p>
        Esta política de cookies puede ser actualizada en función de cambios normativos o por la
        incorporación de nuevas funcionalidades en el sitio web. Te recomendamos revisar esta página
        periódicamente.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Si tienes alguna duda sobre nuestra política de cookies, puedes contactarnos en{' '}
        <a href="mailto:contacto@inmobiliariaelite.es">contacto@inmobiliariaelite.es</a>.
      </p>
    </>
  )
}
