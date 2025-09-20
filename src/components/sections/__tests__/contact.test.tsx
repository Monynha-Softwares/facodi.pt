import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ContactSection } from '@/components/sections/contact';

describe('ContactSection', () => {
  it('envia a mensagem após preencher todos os campos', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/nome/i), 'Estudante FACODI');
    await user.type(screen.getByLabelText(/e-mail/i), 'facodi@example.com');
    await user.type(screen.getByLabelText(/como podemos ajudar/i), 'Quero contribuir com conteúdos.');

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(await screen.findByText(/enviando/i, { timeout: 1500 })).toBeInTheDocument();
    expect(
      await screen.findByText(/recebemos sua mensagem/i, {
        timeout: 2000
      })
    ).toBeInTheDocument();
  });
});
