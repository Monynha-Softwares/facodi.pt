import { buildPageMetadata, messages } from '@/config/i18n'

describe('i18n configuration', () => {
  it('returns metadata using default locale when locale is not supported', () => {
    const metadata = buildPageMetadata('de' as never, 'home')
    expect(metadata).toEqual(messages.pt.metadata.home)
  })
})
