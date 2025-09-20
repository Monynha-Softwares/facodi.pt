'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const initialState = {
  name: '',
  email: '',
  organization: '',
  message: ''
}

type FormState = typeof initialState

type SubmissionStatus = 'idle' | 'success' | 'error'

export const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>(initialState)
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      organization: formState.organization.trim(),
      message: formState.message.trim()
    }

    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      setStatus('error')
      setError('Informe nome, email e mensagem para continuar.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      setStatus('error')
      setError('Utilize um email válido.')
      return
    }

    setStatus('success')
    setError(null)
    setFormState(initialState)
  }

  return (
    <form aria-describedby="form-status" className="space-y-6" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="name">
            Nome completo
          </label>
          <Input id="name" name="name" onChange={handleChange} required value={formState.name} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
            Email
          </label>
          <Input id="email" name="email" onChange={handleChange} required type="email" value={formState.email} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="organization">
          Organização (opcional)
        </label>
        <Input
          id="organization"
          name="organization"
          onChange={handleChange}
          placeholder="Rede, coletivo ou instituição"
          value={formState.organization}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="message">
          Como podemos colaborar?
        </label>
        <textarea
          aria-required
          className={cn(
            'min-h-[160px] w-full rounded-lg border border-border bg-card/80 px-4 py-3 text-base text-foreground shadow-inner transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'placeholder:text-muted-foreground'
          )}
          id="message"
          name="message"
          onChange={handleChange}
          placeholder="Compartilhe ideias de parceria, contexto ou necessidades."
          required
          value={formState.message}
        />
      </div>
      <Button className="w-full sm:w-auto" type="submit">
        Enviar mensagem
      </Button>
      <p
        aria-live="polite"
        className={cn(
          'text-sm',
          status === 'success' ? 'text-success' : status === 'error' ? 'text-danger' : 'text-muted-foreground'
        )}
        id="form-status"
      >
        {status === 'success'
          ? 'Mensagem enviada! Em breve retornamos com novidades.'
          : error ?? 'Responderemos em até 3 dias úteis.'}
      </p>
    </form>
  )
}
