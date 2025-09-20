import { render, screen } from '@testing-library/react';

import { Button, buttonVariants } from '../button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies custom variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button.className).toContain('bg-highlight');
  });

  it('matches class from helper', () => {
    const className = buttonVariants({ variant: 'ghost', size: 'sm' });
    expect(className).toContain('h-9');
  });
});
