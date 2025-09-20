import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';

import { SiteTextProvider } from '@/lib/site-text';

function AllProviders({ children }: { children: React.ReactNode }) {
  return <SiteTextProvider>{children}</SiteTextProvider>;
}

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}
