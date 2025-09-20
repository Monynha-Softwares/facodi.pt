import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-6 py-24 text-center">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Erro 404</p>
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p className="text-base text-foreground/80">
          O caminho que você tentou acessar não existe ou foi movido. Utilize o menu principal para continuar navegando.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/">Voltar para o início</Link>
      </Button>
    </div>
  );
}
