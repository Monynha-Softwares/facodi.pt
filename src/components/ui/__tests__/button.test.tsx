import { render } from '@testing-library/react';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders children', () => {
    const { getByRole } = render(<Button>Enviar</Button>);
    expect(getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { getByRole } = render(
      <Button variant="outline" aria-label="outline button">
        Botão
      </Button>
    );

    expect(getByRole('button', { name: /outline button/i })).toHaveClass('border-border');
  });
});
