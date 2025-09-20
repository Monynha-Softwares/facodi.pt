import Link from "next/link";

import { Button } from "@monynha/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16 text-center">
      <div className="mb-8 text-6xl" role="img" aria-label="Cachorro caramelo confuso">
        🐕‍🦺
      </div>
      <h1 className="font-heading text-4xl font-semibold text-foreground">
        Ops, essa página fugiu pro quintal…
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Não encontramos o conteúdo que você procura. Vamos voltar para a área de estudos e escolher um novo curso?
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/">Voltar para o início</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="https://discord.gg/monynha" target="_blank" rel="noreferrer">
            Falar com a comunidade
          </Link>
        </Button>
      </div>
    </div>
  );
}
