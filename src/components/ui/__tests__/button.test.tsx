import { render, screen } from '@testing-library/react';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders label and applies variant styles', () => {
    render(<Button variant="secondary">Enviar</Button>);
    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-accent');
  });
});
