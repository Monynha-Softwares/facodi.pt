import { Navbar } from '@/components/navigation/navbar';
import { renderWithProviders } from '@/lib/test-utils';

vi.mock('next/navigation', () => ({
  usePathname: () => '/'
}));

describe('Navbar', () => {
  it('renders navigation links from translations', () => {
    const { getAllByRole, getByRole } = renderWithProviders(<Navbar />);

    expect(getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(getAllByRole('link', { name: /contact/i })).toHaveLength(2);
  });
});
