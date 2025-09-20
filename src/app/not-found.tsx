import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { defaultLocale, messages } from '@/config/i18n'

const text = messages[defaultLocale]

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{text.navigation.notFound}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-muted-foreground">
            Não encontramos a página solicitada. Verifique o endereço ou volte para a página inicial e explore nossas
            rotas disponíveis.
          </p>
          <Button asChild size="lg">
            <Link href="/">Voltar para o início</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
