import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { ContactForm } from '@/components/forms/contact-form'

describe('ContactForm', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/informe nome, email e mensagem/i)).toBeInTheDocument()
  })

  it('submits with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/nome completo/i), 'Facodi Tester')
    await user.type(screen.getByLabelText(/email/i), 'teste@facodi.pt')
    await user.type(screen.getByLabelText(/como podemos colaborar/i), 'Gostaria de contribuir com conteúdos.')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(screen.getByText(/mensagem enviada/i)).toBeInTheDocument()
  })
})
