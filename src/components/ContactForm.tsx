'use client'
import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
interface ContactFormProps { variant?: 'general' | 'comprar' | 'vender'; className?: string }
export function ContactForm({ variant = 'general', className = '' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const titles = { general: 'Escr\u00edbenos', comprar: 'Cu\u00e9ntanos qu\u00e9 buscas', vender: 'Solicita valoraci\u00f3n gratuita' }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setStatus('loading'); await new Promise(r=>setTimeout(r,1200)); setStatus('success'); e.currentTarget.reset() }
  if (status === 'success') return (<div className={`text-center py-12 ${className}`}><CheckCircle size={48} className="text-green-500 mx-auto mb-4"/><h3 className="heading-sm mb-2">\u00a1Mensaje enviado!</h3><p className="text-body">Nos pondremos en contacto contigo.</p><button onClick={()=>setStatus('idle')} className="mt-6 text-sm text-brand-gold hover:underline">Enviar otro mensaje</button></div>)
  return (<form onSubmit={handleSubmit} className={className}><h3 className="heading-sm mb-6">{titles[variant]}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-medium text-brand-charcoal mb-1.5">Nombre *</label><input type="text" name="nombre" required className="input-elite" placeholder="Tu nombre"/></div><div><label className="block text-sm font-medium text-brand-charcoal mb-1.5">Tel\u00e9fono *</label><input type="tel" name="telefono" required className="input-elite" placeholder="Tu tel\u00e9fono"/></div></div>
    <div className="mb-4"><label className="block text-sm font-medium text-brand-charcoal mb-1.5">Email</label><input type="email" name="email" className="input-elite" placeholder="tu@email.com"/></div>
    <div className="mb-6"><label className="block text-sm font-medium text-brand-charcoal mb-1.5">Mensaje</label><textarea name="mensaje" rows={4} className="textarea-elite" placeholder="Escribe tu mensaje..."/></div>
    <div className="mb-6"><label className="flex items-start gap-2 text-xs text-brand-warm-gray cursor-pointer"><input type="checkbox" name="privacidad" required className="mt-1 accent-brand-gold"/><span>He le\u00eddo y acepto la <a href="/legal/privacidad" target="_blank" className="text-brand-gold underline">pol\u00edtica de privacidad</a>.</span></label></div>
    <button type="submit" disabled={status==='loading'} className="btn-primary w-full sm:w-auto">{status==='loading' ? <><Loader2 size={16} className="animate-spin"/>Enviando...</> : <><Send size={16}/>Enviar mensaje</>}</button>
  </form>)
}
