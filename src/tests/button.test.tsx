import { render, screen } from '@testing-library/react'
import React from 'react'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders the provided text', () => {
    render(<Button>Enviar</Button>)
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument()
  })

  it('supports different variants', () => {
    render(<Button variant="secondary">Acessar</Button>)
    const button = screen.getByRole('button', { name: 'Acessar' })
    expect(button).toHaveClass('bg-secondary')
  })
})
