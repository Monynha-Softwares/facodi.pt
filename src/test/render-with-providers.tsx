import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { SiteTextProvider } from '@/components/providers/site-text-provider';

export function renderWithProviders(ui: ReactElement) {
  return render(<SiteTextProvider>{ui}</SiteTextProvider>);
}
