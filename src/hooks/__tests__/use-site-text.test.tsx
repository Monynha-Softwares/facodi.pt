import { fireEvent, render, screen } from '@testing-library/react';

import { SiteTextProvider, useSiteText } from '@/hooks/use-site-text';

describe('useSiteText', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('exposes default language copy and updates when language changes', () => {
    const TestComponent = () => {
      const { language, copy, setLanguage } = useSiteText();
      return (
        <div>
          <span data-testid="language">{language}</span>
          <span data-testid="label">{copy.navigation.home}</span>
          <button type="button" onClick={() => setLanguage('en')}>
            change
          </button>
        </div>
      );
    };

    render(
      <SiteTextProvider>
        <TestComponent />
      </SiteTextProvider>
    );

    expect(screen.getByTestId('language').textContent).toBe('pt');
    expect(screen.getByTestId('label').textContent).toBe('Início');

    fireEvent.click(screen.getByRole('button', { name: /change/i }));

    expect(screen.getByTestId('language').textContent).toBe('en');
    expect(screen.getByTestId('label').textContent).toBe('Home');
  });
});
