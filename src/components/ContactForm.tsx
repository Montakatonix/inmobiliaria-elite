'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

interface ContactFormProps {
  variant?: 'general' | 'comprar' | 'vender'
  className?: string
}

export function ContactForm({ variant = 'general', className = '' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const titles = {
    general: 'Escríbenos',
    comprar: 'Cuéntanos qué buscas',
    vender: 'Solicita una valoración gratuita',
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    // Simulated form submission - replace with Formspree/Resend endpoint
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // OPTION 1: Formspree (recommended - just replace YOUR_FORM_ID)
      // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   body: formData,
      //   headers: { Accept: 'application/json' },
      // })
      // if (res.ok) setStatus('success')
      // else setStatus('error')

      // Simulation for now
      await new Promise((r) => setTimeout(r, 1200))
      console.log('Form data:', Object.fromEntries(formData))
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`text-center py-12 ${className}`}>
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="heading-sm mb-2">¡Mensaje enviado!</h3>
        <p className="text-body">Nos pondremos en contacto contigo lo antes posible.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-brand-gold hover:underline">
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <h3 className="heading-sm mb-6">{titles[variant]}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-brand-charcoal mb-1.5">Nombre *</label>
          <input type="text" name="nombre" id="nombre" required className="input-elite" placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-brand-charcoal mb-1.5">Teléfono *</label>
          <input type="tel" name="telefono" id="telefono" required className="input-elite" placeholder="Tu teléfono" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-1.5">Email</label>
        <input type="email" name="email" id="email" className="input-elite" placeholder="tu@email.com" />
      </div>

      {variant === 'comprar' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-brand-charcoal mb-1.5">Tipo de inmueble</label>
              <select name="tipo" id="tipo" className="input-elite">
                <option value="">Selecciona...</option>
                <option value="piso">Piso</option>
                <option value="casa">Casa / Chalet</option>
                <option value="villa">Villa</option>
                <option value="atico">Ático</option>
                <option value="terreno">Terreno</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label htmlFor="presupuesto" className="block text-sm font-medium text-brand-charcoal mb-1.5">Presupuesto</label>
              <select name="presupuesto" id="presupuesto" className="input-elite">
                <option value="">Selecciona...</option>
                <option value="<100k">Hasta 100.000 €</option>
                <option value="100k-200k">100.000 € - 200.000 €</option>
                <option value="200k-300k">200.000 € - 300.000 €</option>
                <option value=">300k">Más de 300.000 €</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="zona" className="block text-sm font-medium text-brand-charcoal mb-1.5">Zona preferida</label>
            <input type="text" name="zona" id="zona" className="input-elite" placeholder="Ej: Huércal-Overa centro, Levante..." />
          </div>
        </>
      )}

      {variant === 'vender' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="tipo_venta" className="block text-sm font-medium text-brand-charcoal mb-1.5">Tipo de inmueble</label>
              <select name="tipo_venta" id="tipo_venta" className="input-elite">
                <option value="">Selecciona...</option>
                <option value="piso">Piso</option>
                <option value="casa">Casa / Chalet</option>
                <option value="villa">Villa</option>
                <option value="terreno">Terreno</option>
                <option value="local">Local comercial</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-brand-charcoal mb-1.5">Ubicación</label>
              <input type="text" name="ubicacion" id="ubicacion" className="input-elite" placeholder="Dirección o zona" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="superficie" className="block text-sm font-medium text-brand-charcoal mb-1.5">Superficie (m²)</label>
              <input type="number" name="superficie" id="superficie" className="input-elite" placeholder="Ej: 120" />
            </div>
            <div>
              <label htmlFor="habitaciones" className="block text-sm font-medium text-brand-charcoal mb-1.5">Habitaciones</label>
              <input type="number" name="habitaciones" id="habitaciones" className="input-elite" placeholder="Ej: 3" />
            </div>
          </div>
        </>
      )}

      <div className="mb-6">
        <label htmlFor="mensaje" className="block text-sm font-medium text-brand-charcoal mb-1.5">
          {variant === 'comprar' ? 'Cuéntanos más sobre lo que buscas' : variant === 'vender' ? 'Detalles adicionales' : 'Mensaje'}
        </label>
        <textarea name="mensaje" id="mensaje" rows={4} className="textarea-elite" placeholder="Escribe tu mensaje aquí..." />
      </div>

      <input type="hidden" name="formulario" value={variant} />
      <input type="hidden" name="_subject" value={`[Web] Nuevo contacto - ${variant}`} />

      <div className="mb-6">
        <label className="flex items-start gap-2 text-xs text-brand-warm-gray cursor-pointer">
          <input type="checkbox" name="privacidad" required className="mt-1 accent-brand-gold" />
          <span>
            He leído y acepto la{' '}
            <a href="/legal/privacidad" target="_blank" className="text-brand-gold underline">política de privacidad</a>.
            Consiento el tratamiento de mis datos para ser contactado/a.
          </span>
        </label>
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full sm:w-auto">
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Enviando...</>
        ) : (
          <><Send size={16} /> Enviar mensaje</>
        )}
      </button>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600">Ha ocurrido un error. Por favor, inténtalo de nuevo o llámanos directamente.</p>
      )}
    </form>
  )
}
