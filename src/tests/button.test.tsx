import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders label and responds to clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Monynha</Button>);

    const button = screen.getByRole('button', { name: /Monynha/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveClass('rounded-2xl');
  });
});
