import { fireEvent, screen } from '@testing-library/react';

import { useSiteText } from '@/lib/hooks/use-site-text';
import { renderWithProviders } from '@/test/render-with-providers';

import { LanguageSwitcher } from '../language-switcher';

describe('LanguageSwitcher', () => {
  it('lists available languages', () => {
    renderWithProviders(<LanguageSwitcher />);
    const select = screen.getByLabelText(/idioma|language/i);
    expect(select).toBeInTheDocument();
    expect(select.querySelectorAll('option')).toHaveLength(4);
  });

  it('updates the locale when changed', () => {
    function CurrentLocale() {
      const { locale } = useSiteText();
      return <span data-testid="current-locale">{locale}</span>;
    }

    renderWithProviders(
      <>
        <LanguageSwitcher />
        <CurrentLocale />
      </>,
    );

    fireEvent.change(screen.getByLabelText(/idioma|language/i), { target: { value: 'en' } });
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
  });
});
