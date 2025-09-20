#!/usr/bin/env python3
"""Gera conteúdo da LESTI 2025/2026 com base no plano curricular."""

from __future__ import annotations

import json
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parents[1]
COURSE_DIR = ROOT / "content" / "courses" / "lesti"


def quote(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def format_value(key, value, indent=0):
    indent_str = "  " * indent
    lines = []
    if key is None:
        prefix = indent_str
    else:
        prefix = f"{indent_str}{key}:"
    if isinstance(value, dict):
        lines.append(prefix)
        for sub_key, sub_value in value.items():
            lines.extend(format_value(sub_key, sub_value, indent + 1))
    elif isinstance(value, list):
        if not value:
            if key is None:
                lines.append(f"{indent_str}[]")
            else:
                lines.append(f"{prefix} []")
        else:
            lines.append(prefix)
            for item in value:
                if isinstance(item, dict):
                    lines.append("  " * (indent + 1) + "-")
                    for sub_key, sub_value in item.items():
                        lines.extend(format_value(sub_key, sub_value, indent + 2))
                else:
                    rendered = quote(item) if isinstance(item, str) else str(item)
                    lines.append("  " * (indent + 1) + f"- {rendered}")
    elif isinstance(value, bool):
        rendered = "true" if value else "false"
        if key is None:
            lines.append(f"{indent_str}{rendered}")
        else:
            lines.append(f"{prefix} {rendered}")
    elif value is None:
        if key is None:
            lines.append(f"{indent_str}null")
        else:
            lines.append(f"{prefix} null")
    elif isinstance(value, (int, float)):
        if key is None:
            lines.append(f"{indent_str}{value}")
        else:
            lines.append(f"{prefix} {value}")
    elif isinstance(value, str):
        rendered = quote(value)
        if key is None:
            lines.append(f"{indent_str}{rendered}")
        else:
            lines.append(f"{prefix} {rendered}")
    else:
        raise TypeError(f"Unsupported value type: {type(value)!r}")
    return lines


def write_markdown(path: Path, frontmatter: dict, body: str) -> None:
    lines = ["---"]
    for key, value in frontmatter.items():
        lines.extend(format_value(key, value, 0))
    lines.append("---")
    content = "\n".join(lines) + "\n\n" + body.strip() + "\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def topic_body(summary: str) -> str:
    return dedent(
        f"""{summary} As atividades aprofundam o tema com exercícios guiados e aplicações práticas alinhadas à engenharia de sistemas."""
    )


UCS = [
    {
        "code": "19411003",
        "slug": "19411003-algebra-linear-e-geometria-analitica",
        "title": "Álgebra Linear e Geometria Analítica",
        "ects": 5,
        "semester": 1,
        "description": "Fundamentos de espaços vetoriais, matrizes, determinantes e geometria analítica.",
        "summary": "Introduz bases de álgebra linear e ferramentas de geometria analítica aplicadas a problemas de engenharia.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Caracterizar espaços vetoriais, subespaços e bases a partir de geradores e propriedades de dependência.",
            "Resolver sistemas lineares utilizando operações com matrizes, determinantes, autovalores e diagonalização.",
            "Interpretar retas e planos no espaço através de produtos interno, externo e misto, articulando resultados geométricos.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Álgebra Linear – espaços vetoriais; combinação linear; dependência e independência linear; propriedades; subespaço gerador e base; matrizes (igualdade, adição, multiplicação por escalar; multiplicação de matrizes; transposição); determinantes (regra de Sarrus, propriedades; condensação de matriz; teorema de Laplace); matriz adjunta; matriz inversa; matrizes ortogonais; matrizes complexas; sistemas de equações lineares; regra de Cramer; mudança de base; valores e vetores próprios; diagonalização de uma matriz.
        - Geometria Analítica – cálculo vetorial; produto interno (definição, interpretação geométrica, propriedades, aplicações); ortogonalização de Gram-Schmidt; produto externo e misto (definições, interpretação geométrica, propriedades, aplicações); parâmetros e cossenos diretores; equações da reta e do plano; posição relativa de retas e planos.
        """,
        "topics": [
            {
                "slug": "espacos-vetoriais",
                "title": "Espaços Vetoriais e Independência",
                "summary": "Definição de espaços vetoriais e conceitos de combinação linear, dependência e independência linear, incluindo propriedades fundamentais.",
                "tags": ["álgebra linear", "bases"],
            },
            {
                "slug": "matrizes-e-operacoes",
                "title": "Matrizes e Operações",
                "summary": "Operações com matrizes (adição, multiplicação escalar e entre matrizes, transposição) e conceitos de determinantes (regra de Sarrus, Laplace), matriz adjunta, inversa, ortogonal e complexa.",
                "tags": ["matrizes", "determinantes"],
            },
            {
                "slug": "sistemas-lineares-e-vetores-proprios",
                "title": "Sistemas Lineares e Vetores Próprios",
                "summary": "Resolução de sistemas de equações lineares (regra de Cramer), mudança de base, cálculo de valores próprios e vetores próprios, e diagonalização de matrizes.",
                "tags": ["sistemas lineares", "autovalores"],
            },
            {
                "slug": "calculo-vetorial-e-produtos",
                "title": "Cálculo Vetorial e Produtos",
                "summary": "Produto interno de vetores, ortogonalização de Gram-Schmidt, produto externo e misto com aplicações geométricas.",
                "tags": ["produto interno", "geometria analítica"],
            },
            {
                "slug": "geometria-analitica-basica",
                "title": "Geometria Analítica Básica",
                "summary": "Equações da reta e do plano, parâmetros e cossenos diretores, e análise da posição relativa entre retas e planos.",
                "tags": ["retas e planos", "geometria analítica"],
            },
        ],
    },

    {
        "code": "19411002",
        "slug": "19411002-analise-matematica-i",
        "title": "Análise Matemática I",
        "ects": 5,
        "semester": 1,
        "description": "Fundamentos de análise real: conjuntos numéricos, funções, limites, derivadas e integrais.",
        "summary": "Introduz cálculo diferencial e integral de funções reais de uma variável com aplicações geométricas.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Classificar conjuntos numéricos e operar com intervalos e limites em ℝ.",
            "Aplicar técnicas de diferenciação, incluindo a fórmula de Taylor e análise de extremos.",
            "Calcular integrais indefinidas e definidas, relacionando-as ao cálculo de áreas, comprimentos e volumes.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Números Reais – conjuntos numéricos (naturais, inteiros, racionais e reais), propriedades básicas dos números reais, intervalos e conjuntos limitados.
        - Funções reais de variável real – conceitos básicos sobre funções reais e funções elementares (incluindo transcendentes); função composta, inversa, implícita e funções paramétricas; gráficos de funções; limites e continuidade; derivadas e diferenciais; fórmula de Taylor; problemas de otimização; primitivas, integrais e aplicações no cálculo de áreas, comprimentos de arco e volumes de sólidos de revolução.
        """,
        "topics": [
            {
                "slug": "numeros-reais",
                "title": "Números Reais",
                "summary": "Revisão dos conjuntos numéricos (N, Z, Q, R), suas propriedades fundamentais, definição de intervalos e conceito de conjunto limitado.",
                "tags": ["números reais", "intervalos"],
            },
            {
                "slug": "funcoes-basicas",
                "title": "Funções Reais e Elementares",
                "summary": "Conceitos iniciais de funções de ℝ em ℝ, incluindo funções elementares e transcendentes, composição, inversa, implícita e parametrização.",
                "tags": ["funções", "transcendentes"],
            },
            {
                "slug": "calculo-diferencial",
                "title": "Cálculo Diferencial",
                "summary": "Limites e continuidade de funções reais; cálculo de derivadas e diferenciais; utilização do polinómio de Taylor e análise de otimização.",
                "tags": ["limites", "derivadas"],
            },
            {
                "slug": "calculo-integral",
                "title": "Cálculo Integral",
                "summary": "Cálculo de primitivas e integrais definidas; aplicação da integração em áreas, comprimentos de arco e volumes de sólidos de revolução.",
                "tags": ["integração", "áreas"],
            },
        ],
    },

    {
        "code": "19411008",
        "slug": "19411008-analise-matematica-ii",
        "title": "Análise Matemática II",
        "ects": 7,
        "semester": 1,
        "description": "Cálculo multivariável, integrais múltiplos, campos vetoriais e equações diferenciais ordinárias.",
        "summary": "Aprofunda análise em várias variáveis e técnicas de integração aplicadas a fluxos, campos e EDOs.",
        "language": "pt",
        "prerequisites": ["19411002"],
        "learning_outcomes": [
            "Aplicar noções topológicas em ℝⁿ e calcular derivadas parciais, direcionais e operadores vetoriais.",
            "Executar integrais múltiplos, mudanças de variável e integrais de linha e superfície em campos vetoriais.",
            "Resolver equações diferenciais de primeira ordem e lineares de ordem superior com coeficientes constantes.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Funções Reais de Várias Variáveis – noções topológicas em ℝⁿ (campos escalares e vetoriais, curvas e superfícies de nível; limite e continuidade).
        - Cálculo Diferencial em ℝⁿ – derivadas direcionais e parciais; diferencial total e aproximações; regra da cadeia (derivadas parciais de função composta e implícita); derivadas de ordem superior; gradiente, divergência e rotacional.
        - Cálculo Integral em ℝⁿ – integrais duplos e triplos; mudança de variáveis; aplicações ao cálculo de áreas e volumes; integral de linha de campos vetoriais (fluxo); campos solenoidais; teoremas de Green, Stokes e da divergência; campos conservativos e potencial escalar.
        - Equações Diferenciais – equações diferenciais de 1ª ordem (separáveis, lineares, homogêneas e homogeneizáveis, equações exatas e fator integrante) e equações lineares de ordem superior com coeficientes constantes e método dos coeficientes indeterminados.
        """,
        "topics": [
            {
                "slug": "calculo-multivariavel",
                "title": "Cálculo Multivariável",
                "summary": "Conceitos topológicos em várias variáveis, derivadas parciais e direcionais, uso de gradiente, divergência e rotacional.",
                "tags": ["ℝⁿ", "derivadas parciais"],
            },
            {
                "slug": "integral-multivariavel",
                "title": "Integração Multivariável",
                "summary": "Integrais duplos e triplos, mudanças de variáveis e integrais de linha e superfície com teoremas de Green, Stokes e Gauss.",
                "tags": ["integrais múltiplos", "campos vetoriais"],
            },
            {
                "slug": "equacoes-diferenciais",
                "title": "Equações Diferenciais",
                "summary": "Resolução de EDOs de primeira ordem e lineares de ordem superior com coeficientes constantes, incluindo fator integrante e coeficientes indeterminados.",
                "tags": ["EDO", "modelação"],
            },
        ],
    },

    {
        "code": "19411005",
        "slug": "19411005-arquitetura-de-computadores",
        "title": "Arquitetura de Computadores",
        "ects": 5,
        "semester": 1,
        "description": "História da computação, lógica digital, organização do processador e hierarquia de memória.",
        "summary": "Estuda fundamentos de hardware e arquitetura do conjunto de instruções que suportam computadores modernos.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Descrever componentes de um sistema computacional e sua evolução histórica.",
            "Projetar circuitos combinatórios e sequenciais simples usando álgebra Booleana.",
            "Relacionar ciclo de instruções, modos de endereçamento e hierarquia de memória na execução de programas.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Fundamentos e evolução dos sistemas computacionais – história e estrutura interna dos computadores modernos.
        - Sistemas de representação digital: sistemas de numeração (binário, hexadecimal), conversões e aritmética; codificação numérica e alfanumérica.
        - Lógica e circuitos combinatórios: álgebra Booleana, portas lógicas, circuitos de descodificação e multiplexagem.
        - Sistemas sequenciais: registos, memórias, unidades de processamento e controle.
        - Organização interna do processador: ciclo de execução de instruções, modos de endereçamento, componentes estruturais; codificação/descodificação de operações, registos especializados; ULA, unidade de controle, fluxo de execução.
        - Arquitetura do conjunto de instruções (ISA) e arquitetura de memória: tipos de instruções, modos de endereçamento; chamadas, retornos, interrupções; memória cache e virtual; interfaces de entrada e saída.
        """,
        "topics": [
            {
                "slug": "fundamentos-computadores",
                "title": "Fundamentos de Computadores",
                "summary": "Visão histórica da computação e estrutura básica de computadores, incluindo componentes principais e organização interna.",
                "tags": ["história da computação", "hardware"],
            },
            {
                "slug": "representacao-digital",
                "title": "Representação Digital",
                "summary": "Sistemas de numeração binário e hexadecimal, aritmética associada e códigos para dados numéricos e caracteres.",
                "tags": ["binário", "códigos"],
            },
            {
                "slug": "logica-combinatoria",
                "title": "Lógica Combinatória",
                "summary": "Princípios da álgebra Booleana e implementação de circuitos combinatórios como descodificadores e multiplexadores.",
                "tags": ["álgebra Booleana", "circuitos"],
            },
            {
                "slug": "sistemas-sequenciais",
                "title": "Sistemas Sequenciais",
                "summary": "Conceitos de circuitos sequenciais, armazenamento com registos e memórias e controle sequencial de operações.",
                "tags": ["flip-flops", "registos"],
            },
            {
                "slug": "processador-e-isa",
                "title": "Processador e ISA",
                "summary": "Estrutura interna do CPU, ciclo de busca-decodificação-execução, modos de endereçamento e organização de registadores.",
                "tags": ["CPU", "ISA"],
            },
            {
                "slug": "hierarquia-memoria-io",
                "title": "Hierarquia de Memória e I/O",
                "summary": "Organização da memória principal, cache e virtual, além de interfaces de entrada/saída e comunicação com periféricos.",
                "tags": ["memória", "I/O"],
            },
        ],
    },

    {
        "code": "19411004",
        "slug": "19411004-fisica",
        "title": "Física",
        "ects": 5,
        "semester": 1,
        "description": "Sistemas de unidades, estática, dinâmica, trabalho e energia, oscilações e ondas na mecânica clássica.",
        "summary": "Apresenta princípios fundamentais da mecânica para análise de partículas e corpos rígidos.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Aplicar análise dimensional e unidades SI na modelação física.",
            "Determinar equilíbrio, movimento e energia de partículas e corpos rígidos.",
            "Caracterizar oscilações e ondas mecânicas em sistemas simples.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Sistemas de Unidades e Análise Dimensional: Sistema Internacional (SI); grandezas físicas e dimensões; notação científica; algarismos significativos.
        - Estática do ponto material e do corpo rígido: primeira lei de Newton; sistemas equivalentes de forças; condições de equilíbrio em 2D e 3D; atrito.
        - Forças distribuídas e momentos de inércia: cálculo de centro de massa; momentos de inércia via decomposição; teorema dos eixos paralelos.
        - Cinemática do ponto material: vetores posição, velocidade e aceleração; componentes cartesianos, tangencial e normal.
        - Dinâmica do ponto material: segunda lei de Newton; equações de movimento; equilíbrio dinâmico.
        - Métodos de Trabalho e Energia: trabalho de uma força; energia cinética e potencial; conservação da energia mecânica.
        - Oscilações e Ondas: movimento harmônico simples; movimento circular uniforme; ondas mecânicas.
        """,
        "topics": [
            {
                "slug": "unidades-e-medidas",
                "title": "Unidades e Medidas",
                "summary": "Uso do SI e análise dimensional para verificar consistência de equações físicas; notação científica e dígitos significativos.",
                "tags": ["SI", "análise dimensional"],
            },
            {
                "slug": "estatica",
                "title": "Estática",
                "summary": "Equilíbrio de partículas e corpos rígidos, resultante e momento de forças, atrito estático e cinético.",
                "tags": ["equilíbrio", "forças"],
            },
            {
                "slug": "forcas-distribuidas-inercia",
                "title": "Forças Distribuídas e Inércia",
                "summary": "Determinação de centros de massa e cálculo de momentos de inércia com o teorema dos eixos paralelos.",
                "tags": ["centro de massa", "inércia"],
            },
            {
                "slug": "cinematica",
                "title": "Cinemática",
                "summary": "Descrição do movimento de um ponto material com vetores posição, velocidade e aceleração em diferentes referenciais.",
                "tags": ["movimento", "vetores"],
            },
            {
                "slug": "dinamica",
                "title": "Dinâmica",
                "summary": "Aplicação da segunda lei de Newton para formular equações de movimento e analisar equilíbrio dinâmico.",
                "tags": ["leis de Newton", "dinâmica"],
            },
            {
                "slug": "trabalho-e-energia",
                "title": "Trabalho e Energia",
                "summary": "Cálculo do trabalho de forças, energia cinética e potencial e conservação da energia mecânica.",
                "tags": ["energia", "trabalho"],
            },
            {
                "slug": "oscilacoes-ondas",
                "title": "Oscilações e Ondas",
                "summary": "Estudo do movimento harmônico simples, relação com movimento circular uniforme e introdução às ondas mecânicas.",
                "tags": ["oscilações", "ondas"],
            },
        ],
    },

    {
        "code": "19411000",
        "slug": "19411000-programacao",
        "title": "Programação",
        "ects": 5,
        "semester": 1,
        "description": "Introdução à programação em Python, lógica algorítmica, estruturas de controlo e manipulação de dados.",
        "summary": "Forma a base de desenvolvimento em Python com foco em algoritmos, modularização e tratamento de dados.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Desenvolver algoritmos estruturados e traduzi-los para código Python.",
            "Aplicar estruturas de controlo, funções e coleções para resolver problemas computacionais.",
            "Realizar operações com strings e ficheiros garantindo robustez com tratamento de exceções.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Introdução e motivação; algoritmia; ambiente de desenvolvimento.
        - Variáveis e tipos de dados; entrada e saída de dados.
        - Estruturas de controlo: condições e repetições.
        - Funções e procedimentos; modularização; estruturas de dados (arrays, listas, dicionários).
        - Sequências de caracteres; ficheiros e exceções.
        """,
        "topics": [
            {
                "slug": "fundamentos-programacao",
                "title": "Fundamentos de Programação",
                "summary": "Noções iniciais de programação e raciocínio algorítmico para resolver problemas computacionais.",
                "tags": ["algoritmos", "lógica"]
            },
            {
                "slug": "ambiente-desenvolvimento",
                "title": "Ambiente de Desenvolvimento",
                "summary": "Configuração de IDEs e ferramentas para escrever, executar e depurar código Python.",
                "tags": ["IDE", "ferramentas"],
            },
            {
                "slug": "variaveis-tipos",
                "title": "Variáveis e Tipos",
                "summary": "Conceitos de variável, atribuição e manipulação de tipos primitivos em memória.",
                "tags": ["tipos de dados", "memória"],
            },
            {
                "slug": "io-basico",
                "title": "Entrada e Saída",
                "summary": "Operações básicas de input/output, leitura do utilizador e produção de saída formatada.",
                "tags": ["I/O", "Python"],
            },
            {
                "slug": "estruturas-controle",
                "title": "Estruturas de Controlo",
                "summary": "Uso de condicionais e laços de repetição para controlar o fluxo de execução.",
                "tags": ["condicionais", "loops"],
            },
            {
                "slug": "modularizacao",
                "title": "Modularização",
                "summary": "Definição de funções e procedimentos, passagem de parâmetros e escopo de variáveis.",
                "tags": ["funções", "escopo"],
            },
            {
                "slug": "estruturas-dados-simples",
                "title": "Estruturas de Dados Simples",
                "summary": "Uso de arrays, listas e dicionários para armazenar e manipular coleções de dados.",
                "tags": ["listas", "dicionários"],
            },
            {
                "slug": "strings",
                "title": "Strings",
                "summary": "Manipulação de sequências de caracteres: concatenação, slicing e pesquisa de padrões.",
                "tags": ["strings", "texto"],
            },
            {
                "slug": "ficherios-excecoes",
                "title": "Ficheiros e Exceções",
                "summary": "Operações de leitura/escrita em ficheiros e tratamento de erros com blocos try/except.",
                "tags": ["ficheiros", "exceções"],
            },
        ],
    },

    {
        "code": "19411009",
        "slug": "19411009-sistemas-operativos",
        "title": "Sistemas Operativos",
        "ects": 5,
        "semester": 1,
        "description": "Princípios de sistemas operativos, gestão de processos, memória, ficheiros e administração prática em Windows e Linux.",
        "summary": "Apresenta o papel do sistema operativo e desenvolve competências de administração e scripting em ambientes desktop e servidor.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Explicar a arquitetura e as funções principais de um sistema operativo moderno.",
            "Aplicar técnicas de escalonamento, sincronização e gestão de memória em cenários práticos.",
            "Administrar sistemas Windows e Linux, automatizando tarefas com scripts de shell e PowerShell.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos gerais de sistemas operativos, gestão de processos, memória e ficheiros, mecanismos de proteção e segurança.
        - Componente prática: instalação, configuração e administração de Windows e Linux (desktop e servidor), noções de Windows Server, scripting em Bash e PowerShell.
        """,
        "topics": [
            {
                "slug": "so-conceitos-gerais",
                "title": "Conceitos Gerais de SO",
                "summary": "Estrutura e serviços de um sistema operativo, camadas e modelo de gestão de recursos.",
                "tags": ["sistemas operativos", "kernel"],
            },
            {
                "slug": "processos-e-threads",
                "title": "Processos e Threads",
                "summary": "Ciclo de vida de processos, escalonamento, sincronização e gestão de deadlocks.",
                "tags": ["processos", "concorrência"],
            },
            {
                "slug": "gestao-memoria",
                "title": "Gestão de Memória",
                "summary": "Partições, paginação, segmentação e conceitos de memória virtual.",
                "tags": ["memória", "paginaçao"],
            },
            {
                "slug": "sistemas-arquivos-io",
                "title": "Sistemas de Arquivos e I/O",
                "summary": "Organização de sistemas de ficheiros e gerenciamento de dispositivos de entrada/saída.",
                "tags": ["sistemas de ficheiros", "I/O"],
            },
            {
                "slug": "protecao-seguranca-so",
                "title": "Proteção e Segurança",
                "summary": "Mecanismos de proteção, autenticação e permissões em ambientes multiutilizador.",
                "tags": ["segurança", "permissões"],
            },
            {
                "slug": "administracao-sistemas",
                "title": "Administração de Sistemas",
                "summary": "Instalação e configuração de sistemas Windows e Linux, gestão de utilizadores e serviços básicos.",
                "tags": ["administração", "Windows/Linux"],
            },
            {
                "slug": "scripting-e-automacao",
                "title": "Scripting e Automação",
                "summary": "Uso de Bash e PowerShell para automatizar tarefas administrativas e interagir com o SO.",
                "tags": ["shell", "PowerShell"],
            },
        ],
    },

    {
        "code": "19411001",
        "slug": "19411001-ambientes-desenvolvimento-colaborativo",
        "title": "Ambientes de Desenvolvimento Colaborativo",
        "ects": 5,
        "semester": 2,
        "description": "Ferramentas e práticas colaborativas para desenvolvimento de software: gestão de projetos, IDEs partilhadas, controlo de versão e documentação.",
        "summary": "Capacita o estudante para organizar projetos de software com ferramentas colaborativas e documentação viva.",
        "language": "pt",
        "prerequisites": ["19411000"],
        "learning_outcomes": [
            "Configurar ferramentas de planeamento e colaboração para equipas de desenvolvimento.",
            "Aplicar boas práticas de versionamento, documentação e uso de wikis técnicos.",
            "Gerir issues e acompanhar progresso de projetos com métricas e relatórios.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Sistemas de gestão de projetos, IDEs colaborativas, controladores de versão (Git), wikis, documentação de código fonte e issue tracking.
        """,
        "topics": [
            {
                "slug": "gestao-de-projetos",
                "title": "Gestão de Projetos",
                "summary": "Uso de software de gestão de projetos para organizar tarefas, cronogramas e recursos em equipas de desenvolvimento.",
                "tags": ["gestão de projetos", "planeamento"],
            },
            {
                "slug": "ides-colaborativos",
                "title": "IDEs e Plataformas Colaborativas",
                "summary": "Configuração de IDEs e plataformas que permitem edição simultânea e fluxo de trabalho partilhado.",
                "tags": ["IDE", "colaboração"],
            },
            {
                "slug": "controlo-de-versao",
                "title": "Controlo de Versão",
                "summary": "Conceitos de repositórios, commits, branches e merges com Git/GitHub.",
                "tags": ["Git", "versionamento"],
            },
            {
                "slug": "documentacao-colaborativa",
                "title": "Documentação Colaborativa",
                "summary": "Criação e manutenção de documentação viva em wikis ou markdown para requisitos, arquitetura e uso.",
                "tags": ["documentação", "wikis"],
            },
            {
                "slug": "documentacao-codigo",
                "title": "Documentação de Código",
                "summary": "Uso de comentários, padrões e ferramentas para gerar documentação a partir do código-fonte.",
                "tags": ["documentação", "código"],
            },
            {
                "slug": "rastreamento-issues",
                "title": "Rastreamento de Issues",
                "summary": "Registo e acompanhamento de bugs e tarefas em sistemas de issue tracking.",
                "tags": ["issues", "qualidade"],
            },
        ],
    },

    {
        "code": "19411010",
        "slug": "19411010-gestao",
        "title": "Gestão",
        "ects": 5,
        "semester": 2,
        "description": "Princípios de gestão, planeamento estratégico, organização, finanças e fundamentos de gestão de projetos.",
        "summary": "Introduz conceitos de gestão empresarial e planeamento de projetos tradicionais e ágeis.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Explicar funções administrativas e principais teorias de gestão organizacional.",
            "Elaborar análises estratégicas, planos de marketing e estruturas organizacionais eficientes.",
            "Planejar e controlar projetos utilizando abordagens tradicionais e ágeis.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Parte 1: contexto da gestão – conceitos, teorias, planeamento estratégico e marketing, organização, direção e coordenação, controle financeiro e investimentos.
        - Parte 2: gestão de projetos – planejamento de atividades, recursos e custos; execução, controle e encerramento em metodologias tradicionais e ágeis.
        """,
        "topics": [
            {
                "slug": "fundamentos-gestao",
                "title": "Fundamentos de Gestão",
                "summary": "Princípios administrativos de planejar, organizar, liderar e controlar, com destaque às principais escolas de gestão.",
                "tags": ["administração", "teorias de gestão"],
            },
            {
                "slug": "planeamento-estrategico",
                "title": "Planeamento Estratégico",
                "summary": "Processo de análise SWOT, definição de objetivos e elaboração de estratégias e planos de ação.",
                "tags": ["estratégia", "marketing"],
            },
            {
                "slug": "organizacao-empresarial",
                "title": "Organização Empresarial",
                "summary": "Estruturas funcionais, divisionais e matriciais, distribuição de tarefas e mecanismos de coordenação.",
                "tags": ["organização", "estrutura"],
            },
            {
                "slug": "controle-financeiro",
                "title": "Controle Financeiro",
                "summary": "Noções de orçamento, análise de investimentos e indicadores financeiros para apoio à decisão.",
                "tags": ["finanças", "indicadores"],
            },
            {
                "slug": "gestao-projetos",
                "title": "Gestão de Projetos",
                "summary": "Ciclo de vida de projetos, definição de escopo, cronograma e controlo de riscos.",
                "tags": ["projetos", "PMBOK"],
            },
            {
                "slug": "ferramentas-projetos",
                "title": "Ferramentas de Projetos",
                "summary": "Uso de software, EAP, cronogramas Gantt e práticas ágeis como sprints e retrospectivas.",
                "tags": ["ferramentas", "Scrum"],
            },
        ],
    },

    {
        "code": "19411006",
        "slug": "19411006-programacao-orientada-a-objetos",
        "title": "Programação Orientada a Objetos",
        "ects": 5,
        "semester": 2,
        "description": "Paradigma orientado a objetos com foco em classes, encapsulamento, herança, polimorfismo e design de sistemas.",
        "summary": "Explora os pilares da programação orientada a objetos e sua aplicação em projetos práticos.",
        "language": "pt",
        "prerequisites": ["19411000"],
        "learning_outcomes": [
            "Modelar problemas com classes, objetos e interfaces bem definidas.",
            "Aplicar encapsulamento, herança e polimorfismo para promover reutilização e extensibilidade.",
            "Elaborar projetos OO com foco em coesão, baixo acoplamento e documentação adequada.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Introdução ao paradigma OO, objetos, classes e instâncias.
        - Características da POO: encapsulamento, partilha de comportamento, herança, polimorfismo, interfaces e relações entre objetos.
        - Projeto de aplicações orientadas a objetos e exemplos práticos.
        """,
        "topics": [
            {
                "slug": "paradigma-oo",
                "title": "Paradigma Orientado a Objetos",
                "summary": "Motivação do paradigma OO em contraste com abordagens procedurais, destacando abstração e modelagem.",
                "tags": ["OO", "paradigmas"],
            },
            {
                "slug": "classe-e-objeto",
                "title": "Classes e Objetos",
                "summary": "Conceitos de tipo, instância, atributos, métodos, identidade e referências de objetos.",
                "tags": ["classes", "objetos"],
            },
            {
                "slug": "encapsulamento",
                "title": "Encapsulamento",
                "summary": "Ocultação de informação e definição de interfaces públicas para controlar acesso ao estado interno.",
                "tags": ["encapsulamento", "interfaces"],
            },
            {
                "slug": "heranca-e-polimorfismo",
                "title": "Herança e Polimorfismo",
                "summary": "Reutilização de código via herança e flexibilidade de polimorfismo de subtipo e sobrecarga.",
                "tags": ["herança", "polimorfismo"],
            },
            {
                "slug": "associacoes-entre-classes",
                "title": "Associações entre Classes",
                "summary": "Relações de generalização, associação, agregação e composição, avaliando coesão e acoplamento.",
                "tags": ["UML", "relações"],
            },
            {
                "slug": "desenho-oo",
                "title": "Desenho OO",
                "summary": "Aplicação prática dos conceitos OO em projetos, uso de UML e implementação em linguagens como Java ou C#.",
                "tags": ["design", "UML"],
            },
        ],
    },

    {
        "code": "19411007",
        "slug": "19411007-tecnologias-web",
        "title": "Tecnologias Web",
        "ects": 5,
        "semester": 2,
        "description": "Tecnologias de front-end e back-end para desenvolvimento web: HTML, CSS, JavaScript, PHP e integração cliente-servidor.",
        "summary": "Apresenta a arquitetura web, linguagens de marcação e programação para construir aplicações completas.",
        "language": "pt",
        "prerequisites": ["19411000"],
        "learning_outcomes": [
            "Estruturar páginas web acessíveis com HTML e CSS responsivos.",
            "Implementar interatividade no cliente usando JavaScript e comunicação assíncrona.",
            "Desenvolver scripts PHP no servidor integrando bases de dados e APIs.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Introdução: evolução da Web e protocolo HTTP.
        - Linguagens de marcação e estilo: HTML/XHTML, CSS e XML.
        - Programação cliente (JavaScript) e servidor (PHP).
        - Trabalhos práticos de integração cliente-servidor e projeto de aplicações Web.
        """,
        "topics": [
            {
                "slug": "fundamentos-web",
                "title": "Fundamentos da Web",
                "summary": "História da Web, protocolo HTTP e arquitetura cliente-servidor.",
                "tags": ["HTTP", "arquitetura web"],
            },
            {
                "slug": "html-css-xml",
                "title": "HTML, CSS e XML",
                "summary": "Estruturação de conteúdo com HTML/XHTML, estilização com CSS e representação de dados em XML.",
                "tags": ["HTML", "CSS"],
            },
            {
                "slug": "javascript",
                "title": "Programação em JavaScript",
                "summary": "Manipulação do DOM, eventos no navegador e introdução a AJAX para interatividade.",
                "tags": ["JavaScript", "DOM"],
            },
            {
                "slug": "php-e-backend",
                "title": "PHP e Backend",
                "summary": "Sintaxe de PHP, tratamento de requisições, acesso a bases de dados e gestão de sessões.",
                "tags": ["PHP", "backend"],
            },
            {
                "slug": "integracao-frontend-backend",
                "title": "Integração Frontend-Backend",
                "summary": "Construção de aplicações Web completas articulando formulários, APIs e atualização dinâmica da interface.",
                "tags": ["integração", "HTTP"],
            },
            {
                "slug": "desenvolvimento-web",
                "title": "Projeto de Desenvolvimento Web",
                "summary": "Planeamento e implementação de projetos web com funcionalidades completas e persistência de dados.",
                "tags": ["projetos web", "full stack"],
            },
        ],
    },

    {
        "code": "19411023",
        "slug": "19411023-tecnicas-de-comunicacao",
        "title": "Técnicas de Comunicação",
        "ects": 3,
        "semester": 2,
        "description": "Processos de comunicação, competências interpessoais, comunicação organizacional e prática oral e escrita.",
        "summary": "Desenvolve habilidades de comunicação verbal, não verbal e escrita em contextos profissionais.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Analisar processos de comunicação e identificar barreiras em diferentes contextos.",
            "Aplicar técnicas de comunicação interpessoal e escuta ativa para melhorar interações.",
            "Produzir mensagens orais e escritas adequadas ao ambiente académico e empresarial.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Processo de comunicação e modelos clássicos; comunicação interpessoal e organizacional; aplicações práticas para comunicação escrita e oral.
        """,
        "topics": [
            {
                "slug": "teoria-comunicacao",
                "title": "Teoria da Comunicação",
                "summary": "Modelos emissores-receptores, funções da comunicação e elementos envolvidos na transmissão da mensagem.",
                "tags": ["comunicação", "modelos"],
            },
            {
                "slug": "comunicacao-interpessoal",
                "title": "Comunicação Interpessoal",
                "summary": "Impacto de estilos pessoais, comunicação verbal e não verbal e barreiras ao diálogo.",
                "tags": ["interpessoal", "linguagem corporal"],
            },
            {
                "slug": "escuta-ativa",
                "title": "Escuta Ativa",
                "summary": "Técnicas para melhorar a receção da mensagem e superar obstáculos de escuta.",
                "tags": ["escuta", "feedback"],
            },
            {
                "slug": "comunicacao-organizacional",
                "title": "Comunicação Organizacional",
                "summary": "Fluxos formais e informais nas organizações, liderança e gestão de conflitos.",
                "tags": ["organizações", "liderança"],
            },
            {
                "slug": "comunicacao-pratica",
                "title": "Comunicação Prática",
                "summary": "Elaboração de textos profissionais, apresentações e competências em língua inglesa.",
                "tags": ["escrita profissional", "apresentações"],
            },
        ],
    },

    {
        "code": "19411037",
        "slug": "19411037-opcao-i-livre",
        "title": "Opção I – UC Optativa (3 ECTS)",
        "ects": 3,
        "semester": 2,
        "description": "Unidade optativa de 3 ECTS escolhida pelo estudante entre ofertas da UAlg/ISE alinhadas ao percurso formativo.",
        "summary": "Espaço para personalizar a formação no 1.º ano, selecionando uma UC optativa disponível na instituição.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Selecionar uma unidade optativa adequada aos interesses académicos ou de especialização.",
            "Planear o estudo individual alinhado aos objetivos e avaliação da UC escolhida.",
            "Documentar aprendizagens e relacioná-las com o percurso em Engenharia de Sistemas e Tecnologias Informáticas.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conteúdos definidos pela Ficha de UC selecionada pelo estudante para completar os 3 ECTS do bloco optativo.
        """,
        "topics": [
            {
                "slug": "escolha-da-uc",
                "title": "Escolha da UC Optativa",
                "summary": "Identificação de ofertas optativas disponíveis, análise de requisitos e compatibilidade com o plano pessoal de estudos.",
                "tags": ["optativas", "planeamento"],
            },
            {
                "slug": "conteudos-variaveis",
                "title": "Conteúdos Variáveis",
                "summary": "Temas dependentes da unidade cursada, seguindo a respetiva ficha oficial da UAlg/ISE.",
                "tags": ["variável", "UC externa"],
            },
        ],
    },

    {
        "code": "19411011",
        "slug": "19411011-algoritmos-e-estruturas-de-dados",
        "title": "Algoritmos e Estruturas de Dados",
        "ects": 5,
        "semester": 3,
        "description": "Consolidação de POO em Java, análise de complexidade e implementação de algoritmos e estruturas de dados fundamentais.",
        "summary": "Explora algoritmos de ordenação/pesquisa e estruturas lineares, árvores, hashing e grafos com análise de desempenho.",
        "language": "pt",
        "prerequisites": ["19411006"],
        "learning_outcomes": [
            "Analisar a complexidade temporal e espacial de algoritmos utilizando notação Big-O.",
            "Implementar algoritmos de ordenação, pesquisa e estruturas lineares em Java.",
            "Aplicar árvores, tabelas de dispersão e grafos na resolução de problemas reais.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Revisão de POO em Java e recursos avançados (memória dinâmica, ficheiros, GUI).
        - Complexidade algorítmica; algoritmos de ordenação (Bubble, Shell, Quick); pesquisa linear e binária; pilhas e filas; árvores binárias de busca e AVL; tabelas de dispersão; grafos e aplicações práticas.
        """,
        "topics": [
            {
                "slug": "complexidade",
                "title": "Complexidade Algorítmica",
                "summary": "Princípios de análise de algoritmos com contagem de operações e notação Big-O.",
                "tags": ["complexidade", "Big-O"],
            },
            {
                "slug": "ordenacao",
                "title": "Algoritmos de Ordenação",
                "summary": "Implementação e comparação de algoritmos como Bubble Sort, Shell Sort e Quick Sort.",
                "tags": ["ordenação", "desempenho"],
            },
            {
                "slug": "pesquisa",
                "title": "Pesquisa em Vetores",
                "summary": "Busca linear e binária, requisitos e análise de eficiência.",
                "tags": ["pesquisa", "vetores"],
            },
            {
                "slug": "pilhas-e-filas",
                "title": "Pilhas e Filas",
                "summary": "Estruturas LIFO/FIFO, operações básicas e aplicações típicas.",
                "tags": ["pilhas", "filas"],
            },
            {
                "slug": "estruturas-arvore",
                "title": "Árvores",
                "summary": "Árvores binárias de busca, percursos, balanceamento AVL e manipulação de nós.",
                "tags": ["árvores", "BST"],
            },
            {
                "slug": "hash-e-grafo",
                "title": "Hash e Grafos",
                "summary": "Construção de tabelas de dispersão e representação de grafos com algoritmos básicos.",
                "tags": ["hash", "grafos"],
            },
            {
                "slug": "projeto-algoritmos",
                "title": "Projeto Aplicado",
                "summary": "Integração de estruturas e algoritmos em soluções como filas, conversores de expressões ou percursos em grafos.",
                "tags": ["projetos", "implementação"],
            },
        ],
    },

    {
        "code": "19411013",
        "slug": "19411013-aprendizagem-automatica",
        "title": "Aprendizagem Automática",
        "ects": 5,
        "semester": 3,
        "description": "Introdução ao machine learning supervisionado e não supervisionado, ferramentas e avaliação de modelos.",
        "summary": "Apresenta fundamentos de ML, principais algoritmos, engenharia de atributos e pipelines de experimentação.",
        "language": "pt",
        "prerequisites": ["19411011", "19411012"],
        "learning_outcomes": [
            "Diferenciar paradigmas de aprendizagem e selecionar algoritmos apropriados a cada problema.",
            "Utilizar ferramentas como scikit-learn ou TensorFlow para treinar e ajustar modelos.",
            "Avaliar desempenho com métricas adequadas e construir pipelines de ML reprodutíveis.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos fundamentais de ML, ferramentas e frameworks.
        - Aprendizagem supervisionada (k-NN, regressões, árvores, ensembles, SVM, redes neurais) e não supervisionada (clustering, PCA, detecção de anomalias).
        - Engenharia de atributos, avaliação de modelos (cross-validation, métricas) e construção de pipelines e aplicações reais.
        """,
        "topics": [
            {
                "slug": "ml-fundamentos",
                "title": "Fundamentos de ML",
                "summary": "Conceitos básicos de aprendizagem supervisionada, não supervisionada, overfitting e underfitting.",
                "tags": ["machine learning", "fundamentos"],
            },
            {
                "slug": "frameworks-ml",
                "title": "Frameworks de ML",
                "summary": "Familiarização com bibliotecas como scikit-learn, TensorFlow/Keras e plataformas visuais.",
                "tags": ["ferramentas", "Python"],
            },
            {
                "slug": "algoritmos-supervisionados",
                "title": "Algoritmos Supervisionados",
                "summary": "Estudo de k-NN, modelos lineares, árvores de decisão, ensembles, SVM e redes neurais básicas.",
                "tags": ["classificação", "regressão"],
            },
            {
                "slug": "algoritmos-nao-supervisionados",
                "title": "Algoritmos Não Supervisionados",
                "summary": "Clusterização, redução de dimensionalidade e deteção de anomalias.",
                "tags": ["clustering", "PCA"],
            },
            {
                "slug": "preparacao-dados",
                "title": "Preparação de Dados",
                "summary": "Normalização, codificação de variáveis e criação de novas características.",
                "tags": ["feature engineering", "pré-processamento"],
            },
            {
                "slug": "validacao-e-metricas",
                "title": "Validação e Métricas",
                "summary": "Cross-validation, ajuste de hiperparâmetros e métricas como acurácia, precisão, recall e F1.",
                "tags": ["validação", "métricas"],
            },
            {
                "slug": "pipeline-ml",
                "title": "Pipelines de ML",
                "summary": "Montagem de fluxos completos com pré-processamento, treino, avaliação e implementação.",
                "tags": ["pipeline", "automação"],
            },
            {
                "slug": "aplicacoes-ml",
                "title": "Aplicações de ML",
                "summary": "Casos de uso como classificação de spam, previsão de valores e reconhecimento de padrões.",
                "tags": ["aplicações", "casos de uso"],
            },
        ],
    },

    {
        "code": "19411012",
        "slug": "19411012-base-de-dados-i",
        "title": "Base de Dados I",
        "ects": 5,
        "semester": 3,
        "description": "Introdução a sistemas de gestão de bases de dados, modelo relacional, SQL e noções de NoSQL.",
        "summary": "Aborda arquitetura de SGBDs, modelação relacional, normalização, SQL e fundamentos de bases NoSQL.",
        "language": "pt",
        "prerequisites": ["19411000"],
        "learning_outcomes": [
            "Comparar SGBDs com sistemas baseados em ficheiros e compreender a arquitetura ANSI/SPARC.",
            "Modelar esquemas relacionais e aplicar normalização para garantir integridade.",
            "Escrever e otimizar consultas SQL, reconhecendo cenários para bases NoSQL.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos gerais de BD, arquitetura ANSI/SPARC, transações, organização e armazenamento.
        - Bases de dados relacionais: normalização, álgebra/cálculo relacional, SQL (DDL, DML, DCL), otimização e desempenho.
        - Introdução a bases de dados não relacionais e teorema CAP.
        """,
        "topics": [
            {
                "slug": "sgbd-conceitos",
                "title": "Conceitos de SGBD",
                "summary": "Finalidade de um SGBD, componentes e independência de dados na arquitetura de três níveis.",
                "tags": ["SGBD", "arquitetura"],
            },
            {
                "slug": "transacoes",
                "title": "Transações",
                "summary": "Propriedades ACID, controlo de concorrência e recuperação para garantir integridade.",
                "tags": ["transações", "ACID"],
            },
            {
                "slug": "modelagem-e-normalizacao",
                "title": "Modelagem e Normalização",
                "summary": "Transformação de modelos ER em esquemas relacionais e aplicação das formas normais.",
                "tags": ["modelação", "normalização"],
            },
            {
                "slug": "sql-idioma",
                "title": "Linguagem SQL",
                "summary": "Definição, manipulação e controlo de dados com SQL, incluindo junções e consultas aninhadas.",
                "tags": ["SQL", "consultas"],
            },
            {
                "slug": "desempenho-bd",
                "title": "Desempenho em BD",
                "summary": "Uso de índices, planos de execução e estratégias de escalabilidade de consultas e transações.",
                "tags": ["otimização", "índices"],
            },
            {
                "slug": "bd-distribuidas",
                "title": "Bases de Dados Distribuídas",
                "summary": "Replicação, fragmentação e desafios de consistência em ambientes distribuídos.",
                "tags": ["distribuição", "replicação"],
            },
            {
                "slug": "no-sql",
                "title": "Introdução ao NoSQL",
                "summary": "Motivações para NoSQL, teorema CAP e categorias como documentos, colunas, chave-valor e grafos.",
                "tags": ["NoSQL", "CAP"],
            },
        ],
    },

    {
        "code": "19411015",
        "slug": "19411015-computacao-visual",
        "title": "Computação Visual",
        "ects": 5,
        "semester": 3,
        "description": "Fundamentos de computação gráfica, processamento de imagem, visão computacional, realidade aumentada e interação humano-computador.",
        "summary": "Integra conceitos de gráficos 3D, visão computacional e AR para construir aplicações visuais.",
        "language": "pt",
        "prerequisites": ["19411011"],
        "learning_outcomes": [
            "Aplicar pipelines gráficos e modelação 3D em aplicações interativas.",
            "Implementar técnicas de processamento de imagem e visão para deteção e reconhecimento.",
            "Desenvolver protótipos que combinem gráficos, visão e realidade aumentada com interação adequada.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos de computação gráfica, processamento de imagem, visão computacional, realidade aumentada, interação homem-máquina e desenvolvimento de aplicações integradas com ferramentas como Blender, OpenCV e MediaPipe.
        """,
        "topics": [
            {
                "slug": "computacao-grafica",
                "title": "Computação Gráfica",
                "summary": "Pipeline gráfico básico, renderização 3D e modelagem geométrica com bibliotecas como OpenGL.",
                "tags": ["gráficos 3D", "renderização"],
            },
            {
                "slug": "processamento-imagem",
                "title": "Processamento de Imagem",
                "summary": "Filtros, deteção de contornos, morfologia e manipulação de imagens digitais com OpenCV.",
                "tags": ["imagens", "OpenCV"],
            },
            {
                "slug": "visao-computacional",
                "title": "Visão Computacional",
                "summary": "Deteção e reconhecimento de objetos, faces e poses utilizando modelos clássicos e de ML.",
                "tags": ["visão", "reconhecimento"],
            },
            {
                "slug": "realidade-aumentada",
                "title": "Realidade Aumentada",
                "summary": "Princípios de AR, calibração de câmaras e sobreposição de objetos virtuais no mundo real.",
                "tags": ["AR", "calibração"],
            },
            {
                "slug": "interacao-3d",
                "title": "Interação 3D",
                "summary": "Dispositivos e técnicas de interação para aplicações visuais, incluindo VR/AR e sensores de profundidade.",
                "tags": ["IHM", "dispositivos"],
            },
            {
                "slug": "projeto-integrador-visual",
                "title": "Projeto Integrador Visual",
                "summary": "Desenvolvimento de aplicações que combinam gráficos, processamento de imagem e visão computacional.",
                "tags": ["projeto", "integração"],
            },
        ],
    },

    {
        "code": "19411014",
        "slug": "19411014-redes-de-computadores",
        "title": "Redes de Computadores",
        "ects": 5,
        "semester": 3,
        "description": "Conceitos, camadas e protocolos de redes, incluindo física, enlace, LANs, IP, transporte e aplicações.",
        "summary": "Cobre fundamentos de redes, topologias, protocolos Ethernet/Wi-Fi, endereçamento IP, TCP/UDP e serviços de aplicação.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Identificar componentes de redes e explicar modelos OSI e TCP/IP.",
            "Projetar e configurar redes locais com cablagem, Ethernet e Wi-Fi, realizando subnetting IPv4/IPv6.",
            "Comparar protocolos de transporte e serviços de aplicação relevantes para sistemas distribuídos.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos fundamentais, camada física, camada de ligação de dados, redes locais (Ethernet/Wi-Fi), camada de rede (IP, roteamento), camada de transporte (TCP/UDP) e protocolos de aplicação (HTTP, FTP, SMTP, DNS).
        """,
        "topics": [
            {
                "slug": "principios-redes",
                "title": "Princípios de Redes",
                "summary": "Componentes, topologias e normas que regem redes de computadores, modelo OSI/TCP-IP.",
                "tags": ["redes", "modelos"],
            },
            {
                "slug": "fisica-e-enlace",
                "title": "Camadas Física e de Enlace",
                "summary": "Sinalização, modulação, limite de Shannon e protocolos de enquadramento, erro e fluxo.",
                "tags": ["camada física", "enlace"],
            },
            {
                "slug": "redes-locais",
                "title": "Redes Locais",
                "summary": "Características de Ethernet e Wi-Fi, configuração de LANs, VLANs e dimensionamento.",
                "tags": ["LAN", "Ethernet"],
            },
            {
                "slug": "enderecamento-e-roteamento",
                "title": "Endereçamento e Roteamento",
                "summary": "Endereços IPv4/IPv6, ARP, ICMP, subnetting e roteamento básico.",
                "tags": ["IP", "roteamento"],
            },
            {
                "slug": "transporte-e-aplicacao",
                "title": "Camadas de Transporte e Aplicação",
                "summary": "Funcionamento de TCP e UDP, portas e escolha de protocolos conforme o serviço.",
                "tags": ["TCP", "UDP"],
            },
            {
                "slug": "protocolos-servicos",
                "title": "Protocolos de Aplicação",
                "summary": "HTTP, FTP, SMTP, DNS e outros serviços de aplicação e sua relação com camadas inferiores.",
                "tags": ["HTTP", "DNS"],
            },
        ],
    },

    {
        "code": "19411025",
        "slug": "19411025-microprocessadores",
        "title": "Microprocessadores",
        "ects": 5,
        "semester": 3,
        "description": "Arquiteturas de microprocessadores, sistemas embebidos e desenvolvimento com microcontroladores como Arduino/ATmega328.",
        "summary": "Introduz projeto top-down de sistemas embebidos, máquinas de estados e programação de microcontroladores.",
        "language": "pt",
        "prerequisites": ["19411005"],
        "learning_outcomes": [
            "Explicar arquiteturas de microprocessadores e modelá-los como máquinas de estados.",
            "Projetar sistemas embebidos simples considerando restrições de hardware e software.",
            "Programar microcontroladores Arduino/ATmega integrando sensores e atuadores.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Arquitetura de microprocessadores, VLSI, máquinas de estados e projeto top-down de sistemas embebidos.
        - Introdução a microcontroladores (Arduino, ATmega328), periféricos e implementação prática de sistemas embebidos.
        """,
        "topics": [
            {
                "slug": "vlsi-e-estados",
                "title": "VLSI e Máquinas de Estados",
                "summary": "Circuitos VLSI e modelagem de CPUs como máquinas de estados finitos.",
                "tags": ["VLSI", "FSM"],
            },
            {
                "slug": "arquitetura-cpu",
                "title": "Arquitetura de CPU",
                "summary": "Componentes internos, unidades de controlo e comparação de arquiteturas Von Neumann vs Harvard, RISC vs CISC.",
                "tags": ["CPU", "arquitetura"],
            },
            {
                "slug": "introducao-embebidos",
                "title": "Introdução a Sistemas Embebidos",
                "summary": "Componentes de sistemas embebidos, restrições de tempo real e consumo energético.",
                "tags": ["sistemas embebidos", "tempo real"],
            },
            {
                "slug": "arduino-e-atmega",
                "title": "Arduino e ATmega328",
                "summary": "Arquitetura, GPIO, temporizadores, comunicação serial e ADCs do ATmega328.",
                "tags": ["Arduino", "ATmega"],
            },
            {
                "slug": "projeto-embebido",
                "title": "Projeto Embebido",
                "summary": "Desenvolvimento e depuração de projetos com sensores, atuadores e comunicação serial.",
                "tags": ["projeto", "hardware"],
            },
        ],
    },

    {
        "code": "19411026",
        "slug": "19411026-tecnologias-e-aplicacoes-websig",
        "title": "Tecnologias e Aplicações para WebSIG",
        "ects": 5,
        "semester": 3,
        "description": "Fundamentos de geoinformação, bases de dados espaciais, serviços de mapas na web e desenvolvimento de aplicações SIG cliente-servidor.",
        "summary": "Capacita para trabalhar com dados geoespaciais, publicar serviços OGC e criar aplicações web com mapas interativos.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Interpretar dados espaciais e sistemas de coordenadas em aplicações SIG.",
            "Projetar bases de dados espaciais e expor serviços de mapas via padrões OGC.",
            "Desenvolver aplicações web interativas utilizando APIs de mapas e consultas espaciais.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Informação geográfica, dados espaciais, sistemas de coordenadas, aplicações desktop SIG e bases de dados espaciais.
        - Aplicações cliente-servidor para SIG: serviços de mapas na web (WMS/WFS) e desenvolvimento de aplicações web com mapas interativos.
        - Projeto prático integrando base de dados espacial, publicação de serviços e aplicação web.
        """,
        "topics": [
            {
                "slug": "sistemas-informacao-geografica",
                "title": "Sistemas de Informação Geográfica",
                "summary": "Representação vetorial e matricial, projeções e uso de ferramentas desktop como QGIS.",
                "tags": ["SIG", "cartografia"],
            },
            {
                "slug": "bases-dados-espaciais",
                "title": "Bases de Dados Espaciais",
                "summary": "Tipos geométricos, consultas espaciais e extensões como PostGIS.",
                "tags": ["PostGIS", "geodados"],
            },
            {
                "slug": "servicos-mapas-web",
                "title": "Serviços de Mapas Web",
                "summary": "Configuração de servidores de mapas (GeoServer) e protocolos OGC como WMS e WFS.",
                "tags": ["OGC", "GeoServer"],
            },
            {
                "slug": "api-mapas",
                "title": "APIs de Mapas",
                "summary": "Uso de bibliotecas JavaScript (Leaflet, OpenLayers) para mapas interativos e integração de serviços externos.",
                "tags": ["Leaflet", "OpenLayers"],
            },
            {
                "slug": "aplicacao-sig-web",
                "title": "Aplicação SIG Web",
                "summary": "Implementação completa combinando base de dados espacial, serviços e interface web para consultas.",
                "tags": ["SIG web", "aplicações"],
            },
        ],
    },

    {
        "code": "19411038",
        "slug": "19411038-opcao-ii-livre",
        "title": "Opção II – UC Optativa (5 ECTS)",
        "ects": 5,
        "semester": 3,
        "description": "Unidade optativa de 5 ECTS escolhida entre ofertas da UAlg/ISE para complementar a formação na área técnica ou científica.",
        "summary": "Permite aprofundar uma especialização no 2.º ano através de uma UC optativa de 5 ECTS.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Selecionar e frequentar uma UC optativa alinhada com interesses técnicos ou científicos.",
            "Integrar os conhecimentos adquiridos com os objetivos da especialização escolhida.",
            "Produzir evidências de aprendizagem e refletir sobre o contributo da optativa para o percurso profissional.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conteúdos definidos pela unidade optativa selecionada pelo estudante no catálogo da UAlg/ISE.
        """,
        "topics": [
            {
                "slug": "selecao-da-optativa",
                "title": "Seleção da Optativa",
                "summary": "Processo de escolha da UC optativa considerando pré-requisitos, objetivos e oferta semestral.",
                "tags": ["optativas", "planeamento"],
            },
            {
                "slug": "resultados-da-optativa",
                "title": "Resultados da Optativa",
                "summary": "Competências e conteúdos variáveis de acordo com a UC cursada, documentados na respetiva ficha.",
                "tags": ["competências", "variável"],
            },
        ],
    },

    {
        "code": "19411017",
        "slug": "19411017-base-de-dados-ii",
        "title": "Base de Dados II",
        "ects": 5,
        "semester": 4,
        "description": "Arquitetura interna de SGBDs, metadados, SQL avançado, tuning, concorrência, backup, replicação, segurança e NoSQL complementares.",
        "summary": "Aprofunda administração de bases de dados com foco em desempenho, segurança e alta disponibilidade.",
        "language": "pt",
        "prerequisites": ["19411012"],
        "learning_outcomes": [
            "Explicar estruturas internas de armazenamento, catálogo e metadados de um SGBD.",
            "Executar SQL avançado, índices, particionamento e técnicas de tuning para consultas complexas.",
            "Gerir transações, backups, replicação e políticas de segurança em ambientes de produção.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Arquitetura interna, organização de ficheiros, gestão de memória, metadados, catálogo e programação armazenada.
        - SQL avançado, índices, planos de execução, particionamento, processamento paralelo e monitorização de desempenho.
        - Transações, concorrência, backup/restore, replicação, segurança e aprofundamento em bases NoSQL.
        """,
        "topics": [
            {
                "slug": "storage-interno",
                "title": "Armazenamento Interno",
                "summary": "Organização de páginas, blocos, buffers e impacto de RAID no desempenho de I/O.",
                "tags": ["armazenamento", "RAID"],
            },
            {
                "slug": "catalogo-sistema",
                "title": "Catálogo do Sistema",
                "summary": "Uso do dicionário de dados, views, materialized views, triggers e PL/SQL.",
                "tags": ["metadados", "PL/SQL"],
            },
            {
                "slug": "sql-avancado",
                "title": "SQL Avançado",
                "summary": "Consultas complexas, CTEs, índices B-tree/bitmap e leitura de planos de execução.",
                "tags": ["SQL", "otimização"],
            },
            {
                "slug": "tuning-bd",
                "title": "Tuning de BD",
                "summary": "Particionamento, processamento paralelo, monitorização e ajuste de parâmetros do SGBD.",
                "tags": ["tuning", "particionamento"],
            },
            {
                "slug": "transacoes-concorrencia",
                "title": "Transações e Concorrência",
                "summary": "Níveis de isolamento, bloqueios, MVCC e tratamento de deadlocks.",
                "tags": ["concorrência", "isolamento"],
            },
            {
                "slug": "backup-recuperacao",
                "title": "Backup e Recuperação",
                "summary": "Estratégias de backup completo/incremental, rollforward e recuperação de desastres.",
                "tags": ["backup", "recuperação"],
            },
            {
                "slug": "replicacao-distribuicao",
                "title": "Replicação e Distribuição",
                "summary": "Replicação síncrona/assíncrona, sharding e trade-offs do teorema CAP.",
                "tags": ["replicação", "sharding"],
            },
            {
                "slug": "seguranca-bd",
                "title": "Segurança de BD",
                "summary": "Gestão de utilizadores, privilégios, encriptação e auditoria.",
                "tags": ["segurança", "permissões"],
            },
        ],
    },

    {
        "code": "19411019",
        "slug": "19411019-computacao-movel",
        "title": "Computação Móvel",
        "ects": 5,
        "semester": 4,
        "description": "Desenvolvimento de aplicações móveis, hardware de dispositivos, design de UI/UX, frameworks Flet e multiplataforma, integração com serviços e projeto prático.",
        "summary": "Explora ecossistemas móveis, construção de apps com Flet e frameworks nativos, incluindo comunicação com APIs.",
        "language": "pt",
        "prerequisites": ["19411007"],
        "learning_outcomes": [
            "Caracterizar hardware móvel, limitações de recursos e impactos no design de apps.",
            "Construir interfaces responsivas e gerir estado em Flet e frameworks multiplataforma ou nativos.",
            "Desenvolver aplicações móveis completas integrando armazenamento, chamadas assíncronas e serviços externos.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Dispositivos móveis, desenvolvimento UI/UX, tipos de apps (nativas, web, híbridas).
        - Framework Flet (Python), componentes, eventos, estado, operações assíncronas e integração com APIs.
        - Plataformas móveis populares (Flutter/React Native/Kotlin Multiplatform) e projeto prático integrado.
        """,
        "topics": [
            {
                "slug": "mobile-hardware",
                "title": "Hardware Móvel",
                "summary": "Capacidades e limitações de smartphones/tablets, sensores e implicações para desenvolvimento.",
                "tags": ["hardware móvel", "sensores"],
            },
            {
                "slug": "desenho-ui-ux-mobile",
                "title": "Design UI/UX Mobile",
                "summary": "Princípios de interface tátil, responsividade, acessibilidade e adaptação a orientações diversas.",
                "tags": ["UI/UX", "mobile"],
            },
            {
                "slug": "tipos-apps-mobile",
                "title": "Tipos de Aplicações Mobile",
                "summary": "Comparação entre apps nativas, web responsivas e híbridas/multiplataforma.",
                "tags": ["apps nativas", "multiplataforma"],
            },
            {
                "slug": "flet-framework",
                "title": "Framework Flet",
                "summary": "Arquitetura do Flet, modelo cliente-servidor interno e construção de interfaces com componentes prontos.",
                "tags": ["Flet", "Python"],
            },
            {
                "slug": "widgets-e-eventos",
                "title": "Widgets e Eventos",
                "summary": "Definição de layouts, manipulação de eventos e gestão de estado em Flet ou frameworks equivalentes.",
                "tags": ["widgets", "eventos"],
            },
            {
                "slug": "programacao-assincrona",
                "title": "Programação Assíncrona",
                "summary": "Uso de chamadas assíncronas para comunicação com APIs e atualização de interface sem bloqueios.",
                "tags": ["assíncrono", "APIs"],
            },
            {
                "slug": "frameworks-nativos",
                "title": "Frameworks Nativos/Multiplataforma",
                "summary": "Arquitetura e componentes de Flutter, React Native ou Kotlin Multiplatform, navegação e integração com serviços do dispositivo.",
                "tags": ["Flutter", "React Native"],
            },
            {
                "slug": "projeto-mobile",
                "title": "Projeto Mobile",
                "summary": "Implementação de aplicação completa com design, persistência local e consumo de APIs externas.",
                "tags": ["projeto", "mobile"],
            },
        ],
    },

    {
        "code": "19411016",
        "slug": "19411016-engenharia-de-software",
        "title": "Engenharia de Software",
        "ects": 5,
        "semester": 4,
        "description": "Processos de desenvolvimento, metodologias estruturadas e OO, UML, ferramentas CASE e gestão de projetos de software.",
        "summary": "Aborda modelos de ciclo de vida, modelação UML e práticas de gestão de projetos tradicionais e ágeis.",
        "language": "pt",
        "prerequisites": ["19411006"],
        "learning_outcomes": [
            "Selecionar processos de desenvolvimento adequados considerando riscos e requisitos.",
            "Modelar requisitos, estrutura e comportamento com UML e ferramentas CASE.",
            "Aplicar práticas de gestão de projetos e integração contínua no desenvolvimento de software.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Introdução, processos de desenvolvimento (cascata, incremental, espiral, ágil), metodologias estruturadas vs OO.
        - UML: casos de uso, diagramas de classes, objetos, sequências, estados, atividades, componentes e implantação.
        - Ferramentas CASE e gestão de projetos (PMBOK vs Scrum) com controlo de versões e integração contínua.
        """,
        "topics": [
            {
                "slug": "processo-software",
                "title": "Processos de Software",
                "summary": "Modelos de ciclo de vida e entregáveis associados a cada fase.",
                "tags": ["processos", "ciclo de vida"],
            },
            {
                "slug": "analise-estruturada-vs-oo",
                "title": "Análise Estruturada vs OO",
                "summary": "Comparação de abordagens baseadas em fluxos de dados e objetos, impactando design e implementação.",
                "tags": ["análise", "metodologias"],
            },
            {
                "slug": "uml-casos-uso",
                "title": "UML – Casos de Uso",
                "summary": "Representação de requisitos funcionais com casos de uso e especificações textuais.",
                "tags": ["UML", "casos de uso"],
            },
            {
                "slug": "uml-classes-sequencias",
                "title": "UML – Classes e Sequências",
                "summary": "Diagrama de classes e diagramas de sequência para modelar estrutura e interações.",
                "tags": ["classes", "sequências"],
            },
            {
                "slug": "uml-estados-atividades",
                "title": "UML – Estados e Atividades",
                "summary": "Modelação de comportamento interno e fluxos de trabalho com diagramas de estados e atividades.",
                "tags": ["estados", "atividades"],
            },
            {
                "slug": "uml-componentes",
                "title": "UML – Componentes e Implantação",
                "summary": "Arquitetura de alto nível com diagramas de componentes e distribuição física com diagramas de implantação.",
                "tags": ["componentes", "implantação"],
            },
            {
                "slug": "ferramentas-case",
                "title": "Ferramentas CASE e Gestão",
                "summary": "Uso de ferramentas CASE e comparação de gestão tradicional (PMBOK) e ágil (Scrum) com integração contínua.",
                "tags": ["CASE", "Scrum"],
            },
        ],
    },

    {
        "code": "19411018",
        "slug": "19411018-probabilidades-e-estatistica",
        "title": "Probabilidades e Estatística",
        "ects": 5,
        "semester": 4,
        "description": "Probabilidade, variáveis aleatórias, estatística descritiva, inferência, testes de hipóteses e regressão linear.",
        "summary": "Fornece base probabilística e estatística para análise de dados e tomada de decisão em engenharia.",
        "language": "pt",
        "prerequisites": ["19411002"],
        "learning_outcomes": [
            "Aplicar regras de probabilidade, probabilidade condicional e teorema de Bayes a problemas reais.",
            "Descrever conjuntos de dados com medidas de posição e dispersão, identificando padrões e outliers.",
            "Construir intervalos de confiança, realizar testes de hipóteses e ajustar regressões lineares simples.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Probabilidade: eventos, probabilidade condicional, teorema de Bayes; variáveis aleatórias discretas e contínuas; esperança, variância.
        - Estatística descritiva; estimação; intervalos de confiança; testes de hipóteses; regressão e correlação.
        """,
        "topics": [
            {
                "slug": "conceitos-probabilidade",
                "title": "Conceitos de Probabilidade",
                "summary": "Definição formal, operações com eventos e aplicação do teorema de Bayes.",
                "tags": ["probabilidade", "Bayes"],
            },
            {
                "slug": "variaveis-aleatorias",
                "title": "Variáveis Aleatórias",
                "summary": "Distribuições discretas (Binomial, Poisson) e contínuas (Uniforme, Normal) com cálculo de momentos.",
                "tags": ["distribuições", "momentos"],
            },
            {
                "slug": "analise-dados",
                "title": "Análise Descritiva de Dados",
                "summary": "Medidas de posição, dispersão e visualização (histogramas, boxplots, dispersão).",
                "tags": ["estatística descritiva", "visualização"],
            },
            {
                "slug": "inferencias-estatisticas",
                "title": "Inferência Estatística",
                "summary": "Distribuições amostrais, construção de intervalos de confiança para média e proporção.",
                "tags": ["intervalos", "amostragem"],
            },
            {
                "slug": "testagem-hipoteses",
                "title": "Testes de Hipóteses",
                "summary": "Testes z, t, qui-quadrado, conceitos de erro tipo I/II e p-valor.",
                "tags": ["testes", "p-valor"],
            },
            {
                "slug": "regressao-linear",
                "title": "Regressão Linear",
                "summary": "Ajuste de modelos lineares simples, coeficiente de correlação e análise de resíduos.",
                "tags": ["regressão", "correlação"],
            },
        ],
    },

    {
        "code": "19411028",
        "slug": "19411028-computacao-reconfiguravel",
        "title": "Computação Reconfigurável",
        "ects": 5,
        "semester": 4,
        "description": "Hardware reconfigurável, FPGAs, linguagens HDL e desenvolvimento de sistemas digitais configuráveis.",
        "summary": "Introduz conceitos de FPGAs e fluxo de projeto com VHDL/Verilog para sistemas digitais reconfiguráveis.",
        "language": "pt",
        "prerequisites": ["19411025"],
        "learning_outcomes": [
            "Explicar vantagens e aplicações de hardware reconfigurável em relação a ASICs fixos.",
            "Descrever a arquitetura interna de FPGAs e utilizar ferramentas CAD no fluxo de projeto.",
            "Modelar circuitos combinatórios e sequenciais com VHDL/Verilog e testá-los em placas FPGA.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Introdução a sistemas reconfiguráveis, FPGAs, linguagens HDL e projeto completo em FPGA com exemplos práticos.
        """,
        "topics": [
            {
                "slug": "hardware-reconfiguravel",
                "title": "Hardware Reconfigurável",
                "summary": "Conceito, motivação e aplicações de hardware reprogramável.",
                "tags": ["reconfigurável", "hardware"],
            },
            {
                "slug": "arquitetura-fpga",
                "title": "Arquitetura de FPGA",
                "summary": "LUTs, flip-flops, interconexões programáveis, blocos de I/O e DSP.",
                "tags": ["FPGA", "arquitetura"],
            },
            {
                "slug": "vhdl-verilog",
                "title": "VHDL e Verilog",
                "summary": "Sintaxe básica, modelação comportamental/estrutural e diferenças entre simulação e síntese.",
                "tags": ["VHDL", "Verilog"],
            },
            {
                "slug": "ferramentas-cad-hdl",
                "title": "Ferramentas CAD para HDL",
                "summary": "Uso de Vivado/Quartus para simulação, síntese, place-and-route e geração de bitstream.",
                "tags": ["CAD", "síntese"],
            },
            {
                "slug": "aplicacoes-fpga",
                "title": "Aplicações FPGA",
                "summary": "Desenvolvimento e teste de circuitos e aceleradores em hardware real.",
                "tags": ["projetos", "hardware"],
            },
        ],
    },

    {
        "code": "19411039",
        "slug": "19411039-opcao-iii-livre",
        "title": "Opção III – UC Optativa (5 ECTS)",
        "ects": 5,
        "semester": 4,
        "description": "UC optativa de 5 ECTS para complementar a formação no segundo semestre do 2.º ano, conforme oferta da UAlg/ISE.",
        "summary": "Flexibiliza o percurso com uma optativa adicional orientada às pistas de especialização.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Avaliar ofertas optativas compatíveis com os objetivos académicos e profissionais.",
            "Gerir autonomamente o plano de estudos e avaliações da UC escolhida.",
            "Relacionar aprendizagens da optativa com projetos ou estágios futuros.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pela UC optativa selecionada na oferta institucional.
        """,
        "topics": [
            {
                "slug": "planeamento-da-optativa",
                "title": "Planeamento da Optativa",
                "summary": "Escolha da UC, análise de objetivos e requisitos de avaliação.",
                "tags": ["planeamento", "optativas"],
            },
            {
                "slug": "conteudos-da-optativa",
                "title": "Conteúdos da Optativa",
                "summary": "Temas e competências específicos definidos pela ficha da UC frequentada.",
                "tags": ["conteúdos", "variável"],
            },
        ],
    },

    {
        "code": "19411029",
        "slug": "19411029-computacao-em-nuvem",
        "title": "Computação em Nuvem",
        "ects": 5,
        "semester": 4,
        "description": "Conceitos de cloud computing, virtualização, modelos de serviço (IaaS/PaaS/SaaS/BaaS), integração de serviços web e desenvolvimento distribuído.",
        "summary": "Explora fundamentos de computação em nuvem, virtualização e consumo de serviços para aplicações distribuídas.",
        "language": "pt",
        "prerequisites": ["19411014"],
        "learning_outcomes": [
            "Explicar modelos de nuvem, vantagens, desafios e implicações de SLA.",
            "Configurar ambientes virtualizados ou contentorizados e compreender hypervisors.",
            "Integrar serviços cloud (IaaS/PaaS/SaaS/FaaS) em aplicações distribuídas utilizando APIs web.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos base de cloud computing, virtualização, modelos de implementação e serviços em nuvem (IaaS, PaaS, SaaS, BaaS).
        - Integração de serviços web, hospedagem de aplicações, uso de bases de dados em nuvem e funções serverless.
        """,
        "topics": [
            {
                "slug": "conceitos-cloud",
                "title": "Conceitos de Cloud",
                "summary": "Definição de computação em nuvem, elasticidade, custos e preocupações de segurança/latência.",
                "tags": ["cloud", "SLA"],
            },
            {
                "slug": "tecnicas-virtualizacao",
                "title": "Virtualização",
                "summary": "Funcionamento de hypervisors, VMs de processo e sistema, e contentores.",
                "tags": ["virtualização", "hypervisor"],
            },
            {
                "slug": "servicos-nuvem",
                "title": "Modelos de Serviço",
                "summary": "IaaS, PaaS, SaaS e BaaS com exemplos de AWS, Azure e GCP.",
                "tags": ["IaaS", "SaaS"],
            },
            {
                "slug": "arquiteturas-distribuidas",
                "title": "Arquiteturas Distribuídas",
                "summary": "Distribuição geográfica de serviços, tolerância a falhas e teorema CAP em sistemas cloud.",
                "tags": ["distribuição", "CAP"],
            },
            {
                "slug": "pratica-cloud",
                "title": "Prática em Cloud",
                "summary": "Configuração de VMs, implantação de aplicações e uso de serviços geridos.",
                "tags": ["deploy", "infraestrutura"],
            },
            {
                "slug": "webservices-integration",
                "title": "Integração de Web Services",
                "summary": "Construção de aplicações que consomem APIs REST/SOAP e serviços cloud, incluindo serverless.",
                "tags": ["APIs", "serverless"],
            },
        ],
    },

    {
        "code": "19411040",
        "slug": "19411040-opcao-iv-livre",
        "title": "Opção IV – UC Optativa (5 ECTS)",
        "ects": 5,
        "semester": 4,
        "description": "UC optativa de 5 ECTS alternativa à Computação em Nuvem, selecionada conforme interesse do estudante.",
        "summary": "Permite escolher outra unidade de 5 ECTS no mesmo semestre para diversificar competências.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Escolher uma UC alternativa alinhada com metas académicas e profissionais.",
            "Gerir estudo e avaliação da UC optativa, articulando com o plano curricular.",
            "Avaliar o impacto da optativa na especialização pretendida.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pela unidade optativa selecionada em substituição à Computação em Nuvem.
        """,
        "topics": [
            {
                "slug": "selecionar-opcao-iv",
                "title": "Selecionar a Opção IV",
                "summary": "Avaliação de alternativas disponíveis, requisitos e objetivos da UC escolhida.",
                "tags": ["optativas", "planeamento"],
            },
            {
                "slug": "conteudos-opcao-iv",
                "title": "Conteúdos da Opção IV",
                "summary": "Temas abordados conforme a ficha oficial da unidade selecionada.",
                "tags": ["conteúdo", "variável"],
            },
        ],
    },

    {
        "code": "19411030",
        "slug": "19411030-projeto-na-empresa-iii",
        "title": "Projeto na Empresa III",
        "ects": 5,
        "semester": 4,
        "description": "Projeto supervisionado em ambiente empresarial ou de investigação, aplicando competências do curso.",
        "summary": "Proporciona experiência profissional através da execução de um projeto com parceiro externo, incluindo relatório e apresentação.",
        "language": "pt",
        "prerequisites": ["19411001", "19411011"],
        "learning_outcomes": [
            "Realizar levantamento de requisitos e definir objetivos com o parceiro empresarial.",
            "Planejar e executar atividades técnicas, adaptando-se a imprevistos e cumprindo prazos.",
            "Documentar resultados e comunicar o projeto de forma profissional, oral e escrita.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pelo projeto atribuído, incluindo levantamento de requisitos, planeamento, desenvolvimento, documentação e apresentação final.
        """,
        "topics": [
            {
                "slug": "levantamento-requisitos",
                "title": "Levantamento de Requisitos",
                "summary": "Identificação de necessidades e objetivos do projeto com o parceiro externo.",
                "tags": ["requisitos", "análise"],
            },
            {
                "slug": "planeamento-projeto",
                "title": "Planeamento do Projeto",
                "summary": "Elaboração de plano de trabalho com etapas, cronograma e entregáveis.",
                "tags": ["planeamento", "cronograma"],
            },
            {
                "slug": "desenvolvimento-solucao",
                "title": "Desenvolvimento da Solução",
                "summary": "Conceção e implementação da solução técnica acordada, com validação incremental.",
                "tags": ["desenvolvimento", "implementação"],
            },
            {
                "slug": "ferramentas-tecnologias",
                "title": "Ferramentas e Tecnologias",
                "summary": "Uso de tecnologias específicas do projeto e aprendizagem contínua de novas competências.",
                "tags": ["ferramentas", "aprendizagem"],
            },
            {
                "slug": "documentacao-relatorio",
                "title": "Documentação e Relatório",
                "summary": "Registo do trabalho e produção de relatório técnico com análise crítica.",
                "tags": ["documentação", "relatório"],
            },
            {
                "slug": "apresentacao-defesa",
                "title": "Apresentação e Defesa",
                "summary": "Preparação de apresentação oral e defesa do projeto perante avaliadores.",
                "tags": ["apresentação", "defesa"],
            },
        ],
    },

    {
        "code": "19411020",
        "slug": "19411020-analise-de-dados-e-visualizacao",
        "title": "Análise de Dados e Visualização da Informação",
        "ects": 5,
        "semester": 5,
        "description": "Limpeza e análise exploratória de dados, princípios de visualização, ferramentas e storytelling com dashboards.",
        "summary": "Ensina a preparar dados, extrair insights e comunicar resultados por meio de visualizações eficazes.",
        "language": "pt",
        "prerequisites": ["19411018"],
        "learning_outcomes": [
            "Aplicar técnicas de pré-processamento para tratar dados brutos e preparar bases de análise.",
            "Realizar análise exploratória, identificar padrões e selecionar visualizações apropriadas.",
            "Construir dashboards e narrativas visuais claras com ferramentas especializadas.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Estatística aplicada à análise de dados, limpeza e análise exploratória.
        - Princípios de visualização da informação, escolha de gráficos, ferramentas (Tableau, Power BI, bibliotecas Python/R).
        - Visualização avançada (dados multidimensionais, séries temporais, mapas) e storytelling com dashboards.
        """,
        "topics": [
            {
                "slug": "pre-processamento-dados",
                "title": "Pré-processamento de Dados",
                "summary": "Tratamento de dados brutos: valores ausentes, outliers, normalização e transformações.",
                "tags": ["limpeza", "normalização"],
            },
            {
                "slug": "analise-exploratoria",
                "title": "Análise Exploratória",
                "summary": "Uso de estatísticas descritivas e gráficos simples para identificar padrões e anomalias.",
                "tags": ["EDA", "estatística"],
            },
            {
                "slug": "design-visualizacao",
                "title": "Design de Visualização",
                "summary": "Princípios perceptuais para escolher tipos de gráficos e evitar distorções.",
                "tags": ["visualização", "design"],
            },
            {
                "slug": "ferramentas-visualizacao",
                "title": "Ferramentas de Visualização",
                "summary": "Uso de ferramentas como Tableau, Power BI ou bibliotecas Python/R para gráficos interativos.",
                "tags": ["Tableau", "Power BI"],
            },
            {
                "slug": "visualizacao-avancada",
                "title": "Visualização Avançada",
                "summary": "Representação de séries temporais, mapas, redes e redução de dimensionalidade.",
                "tags": ["séries temporais", "mapas"],
            },
            {
                "slug": "storytelling",
                "title": "Storytelling com Dados",
                "summary": "Organização de visualizações em narrativas convincentes e dashboards interativos.",
                "tags": ["storytelling", "dashboards"],
            },
        ],
    },

    {
        "code": "19411021",
        "slug": "19411021-desenvolvimento-de-aplicacoes-web",
        "title": "Desenvolvimento de Aplicações Web",
        "ects": 5,
        "semester": 5,
        "description": "Arquitetura web moderna, front-end com frameworks JavaScript, back-end com APIs REST, segurança e desempenho.",
        "summary": "Integra front-end SPA, APIs RESTful, segurança e otimização em projetos web completos.",
        "language": "pt",
        "prerequisites": ["19411007", "19411012"],
        "learning_outcomes": [
            "Planejar arquiteturas web em camadas distinguindo renderização server-side e SPA.",
            "Desenvolver front-ends com frameworks modernos e consumir APIs REST com comunicação assíncrona.",
            "Implementar back-ends seguros, otimizar desempenho e realizar deploy de aplicações web.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Arquitetura cliente-servidor, monolitos vs SPA, APIs REST, comunicação assíncrona (AJAX/WebSockets).
        - Desenvolvimento front-end (React/Angular/Vue), gestão de estado, roteamento, integração com backend.
        - Desenvolvimento back-end (Node.js/Express, Django, ASP.NET), segurança, desempenho e projeto fullstack.
        """,
        "topics": [
            {
                "slug": "arquitetura-webapp",
                "title": "Arquitetura de Aplicações Web",
                "summary": "Comparação de renderização server-side, SPA e microserviços.",
                "tags": ["arquitetura", "SPA"],
            },
            {
                "slug": "front-end-framework",
                "title": "Framework Front-end",
                "summary": "Uso de frameworks JavaScript para componentes, roteamento e gestão de estado.",
                "tags": ["React", "Angular"],
            },
            {
                "slug": "api-restful",
                "title": "APIs RESTful",
                "summary": "Projeto e implementação de endpoints REST com serialização de dados.",
                "tags": ["REST", "API"],
            },
            {
                "slug": "comunicacao-async",
                "title": "Comunicação Assíncrona",
                "summary": "Uso de fetch/AJAX e WebSockets, tratamento de erros e CORS.",
                "tags": ["AJAX", "WebSockets"],
            },
            {
                "slug": "seguranca-web",
                "title": "Segurança Web",
                "summary": "Prevenção de ataques comuns (SQL injection, XSS, CSRF) e boas práticas de autenticação.",
                "tags": ["segurança", "OWASP"],
            },
            {
                "slug": "performance-web",
                "title": "Desempenho Web",
                "summary": "Minificação, caching, uso de CDN e análise de performance com ferramentas como Lighthouse.",
                "tags": ["performance", "caching"],
            },
            {
                "slug": "projeto-fullstack",
                "title": "Projeto Fullstack",
                "summary": "Integração de front-end, API e base de dados, testes e deploy.",
                "tags": ["fullstack", "deploy"],
            },
        ],
    },

    {
        "code": "19411022",
        "slug": "19411022-inteligencia-artificial",
        "title": "Inteligência Artificial",
        "ects": 5,
        "semester": 5,
        "description": "Fundamentos de IA, busca em espaços de estados, representação de conhecimento, heurísticas, aprendizagem e aplicações.",
        "summary": "Explora técnicas clássicas de IA incluindo busca heurística, lógica, planeamento e algoritmos inspirados biologicamente.",
        "language": "pt",
        "prerequisites": ["19411011", "19411013"],
        "learning_outcomes": [
            "Representar problemas como espaços de estados e resolver com algoritmos de busca informada.",
            "Construir sistemas baseados em lógica e regras, aplicando inferência para tomada de decisão.",
            "Experimentar técnicas de IA como redes neurais simples ou algoritmos evolutivos em pequenos projetos.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Introdução à IA, resolução de problemas, busca cega/heurística (A*), representação de conhecimento (lógica proposicional e de predicados), sistemas especialistas.
        - Aprendizagem automática resumida, inteligência computacional (redes neurais básicas, algoritmos genéticos) e aplicações (PLN, robótica, visão).
        """,
        "topics": [
            {
                "slug": "busca-estados",
                "title": "Busca em Espaços de Estados",
                "summary": "Busca não informada e informada (BFS, DFS, A*) e propriedades de completude e optimalidade.",
                "tags": ["busca", "heurísticas"],
            },
            {
                "slug": "logica-inferencia",
                "title": "Lógica e Inferência",
                "summary": "Lógica proposicional/predicados, método de resolução e encadeamento em sistemas especialistas.",
                "tags": ["lógica", "inferência"],
            },
            {
                "slug": "planeamento",
                "title": "Planeamento Automático",
                "summary": "Representação de ações, planeamento em espaço de estados e abordagens hierárquicas.",
                "tags": ["planeamento", "HTN"],
            },
            {
                "slug": "aprendizagem-ia",
                "title": "Aprendizagem em IA",
                "summary": "Revisão de aprendizagem supervisionada, não supervisionada e reforço.",
                "tags": ["ML", "reforço"],
            },
            {
                "slug": "algoritmos-evolutivos",
                "title": "Algoritmos Evolutivos",
                "summary": "Noções de algoritmos genéticos, operadores de seleção, cruzamento e mutação.",
                "tags": ["genéticos", "otimização"],
            },
            {
                "slug": "pln-e-outros",
                "title": "PLN e Outras Áreas",
                "summary": "Introdução a processamento de linguagem natural, visão computacional e impactos éticos.",
                "tags": ["PLN", "ética"],
            },
            {
                "slug": "sistema-inteligente-proj",
                "title": "Projeto de Sistema Inteligente",
                "summary": "Implementação de mini-projeto com técnica de IA (ex.: jogo, sistema especialista ou otimização).",
                "tags": ["projeto", "IA"],
            },
        ],
    },

    {
        "code": "19411031",
        "slug": "19411031-laboratorio-iot",
        "title": "Laboratório IoT",
        "ects": 5,
        "semester": 5,
        "description": "Fundamentos de Internet das Coisas, hardware com sensores/atuadores, comunicação sem fio, plataformas cloud IoT e projeto prático.",
        "summary": "Permite conceber protótipos IoT integrando microcontroladores conectados, protocolos e dashboards na nuvem.",
        "language": "pt",
        "prerequisites": ["19411025"],
        "learning_outcomes": [
            "Selecionar hardware IoT adequado e integrar sensores e atuadores em protótipos funcionais.",
            "Configurar protocolos de comunicação (Wi-Fi, MQTT, BLE/LoRa) e transmitir dados de forma fiável.",
            "Armazenar e visualizar dados IoT em plataformas cloud garantindo segurança básica.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos de IoT, plataformas de prototipagem (ESP32/Arduino), protocolos sem fio, gestão de dados e segurança.
        - Projeto prático integrando dispositivos IoT, rede e aplicação cloud.
        """,
        "topics": [
            {
                "slug": "fundamentos-iot",
                "title": "Fundamentos de IoT",
                "summary": "Conceito de IoT e principais casos de uso em contextos domésticos e industriais.",
                "tags": ["IoT", "aplicações"],
            },
            {
                "slug": "hardware-iot",
                "title": "Hardware IoT",
                "summary": "Microcontroladores conectados, sensores e atuadores comuns em protótipos IoT.",
                "tags": ["sensores", "microcontroladores"],
            },
            {
                "slug": "comunicacao-iot",
                "title": "Comunicação IoT",
                "summary": "Protocolos como Wi-Fi, BLE, ZigBee e LoRaWAN, bem como MQTT e modelos publish/subscribe.",
                "tags": ["MQTT", "protocolos"],
            },
            {
                "slug": "dados-iot",
                "title": "Dados em IoT",
                "summary": "Formato de dados leves (JSON), plataformas cloud IoT e dashboards em tempo real.",
                "tags": ["JSON", "cloud IoT"],
            },
            {
                "slug": "seguranca-iot",
                "title": "Segurança em IoT",
                "summary": "Autenticação de dispositivos, encriptação de comunicação e segmentação de rede para IoT.",
                "tags": ["segurança", "TLS"],
            },
            {
                "slug": "prototipo-iot",
                "title": "Protótipo IoT",
                "summary": "Desenvolvimento de um sistema IoT completo com recolha, envio e visualização de dados.",
                "tags": ["projeto", "IoT"],
            },
        ],
    },

    {
        "code": "19411041",
        "slug": "19411041-opcao-v-livre",
        "title": "Opção V – UC Optativa (5 ECTS)",
        "ects": 5,
        "semester": 5,
        "description": "UC optativa alternativa ao Laboratório IoT, escolhida conforme oferta institucional.",
        "summary": "Possibilita substituir o Laboratório IoT por outra UC de 5 ECTS alinhada aos objetivos do estudante.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Escolher uma UC optativa coerente com a trajetória académica no 3.º ano.",
            "Gerir cronograma e avaliações da unidade selecionada de forma autónoma.",
            "Relacionar as competências desenvolvidas com oportunidades profissionais ou de investigação.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pela UC optativa selecionada em substituição ao Laboratório IoT.
        """,
        "topics": [
            {
                "slug": "selecao-opcao-v",
                "title": "Seleção da Opção V",
                "summary": "Processo de escolha e articulação da optativa com o percurso formativo.",
                "tags": ["optativas", "planeamento"],
            },
            {
                "slug": "conteudos-opcao-v",
                "title": "Conteúdos da Opção V",
                "summary": "Temas abordados de acordo com a ficha oficial da UC escolhida.",
                "tags": ["conteúdos", "variável"],
            },
        ],
    },

    {
        "code": "19411049",
        "slug": "19411049-ciberseguranca",
        "title": "Cibersegurança",
        "ects": 5,
        "semester": 5,
        "description": "Segurança da informação, criptografia, redes seguras, segurança de sistemas e aplicações, políticas e laboratórios de ataque/defesa.",
        "summary": "Cobrir os pilares de segurança, técnicas de proteção e exercícios práticos de avaliação de vulnerabilidades.",
        "language": "pt",
        "prerequisites": ["19411014"],
        "learning_outcomes": [
            "Aplicar princípios CIA, análise de risco e políticas de segurança organizacionais.",
            "Utilizar criptografia, firewalls e mecanismos de controlo de acesso para proteger redes e sistemas.",
            "Identificar vulnerabilidades comuns em aplicações web e sistemas, propondo medidas corretivas.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos de segurança da informação, criptografia, segurança de redes e sistemas, segurança web, normas e políticas, laboratórios de ataque/defesa.
        """,
        "topics": [
            {
                "slug": "principios-ciberseguranca",
                "title": "Princípios de Cibersegurança",
                "summary": "Pilares CIA, autenticidade, análise de risco e políticas gerais.",
                "tags": ["CIA", "risco"],
            },
            {
                "slug": "criptografia-basica",
                "title": "Criptografia Básica",
                "summary": "Algoritmos simétricos, assimétricos, funções hash e assinaturas digitais.",
                "tags": ["criptografia", "hash"],
            },
            {
                "slug": "seguranca-redes",
                "title": "Segurança de Redes",
                "summary": "Firewalls, VPNs, TLS/IPSec e deteção de intrusão.",
                "tags": ["firewalls", "VPN"],
            },
            {
                "slug": "seguranca-sistemas",
                "title": "Segurança de Sistemas",
                "summary": "Gestão de patches, controlo de acessos, mitigação de malware.",
                "tags": ["sistemas", "malware"],
            },
            {
                "slug": "seguranca-web",
                "title": "Segurança Web",
                "summary": "OWASP Top 10, validação de entradas, cabeçalhos de segurança e hashing de senhas.",
                "tags": ["OWASP", "XSS"],
            },
            {
                "slug": "normas-e-politicas",
                "title": "Normas e Políticas",
                "summary": "Políticas organizacionais, ISO 27001 e frameworks de cibersegurança.",
                "tags": ["ISO 27001", "políticas"],
            },
            {
                "slug": "laboratorio-ataques",
                "title": "Laboratório de Ataques e Defesa",
                "summary": "Exercícios práticos com scanners, exploração de vulnerabilidades e aplicação de correções.",
                "tags": ["pentest", "hardening"],
            },
        ],
    },

    {
        "code": "19411042",
        "slug": "19411042-opcao-vi-livre",
        "title": "Opção VI – UC Optativa (5 ECTS)",
        "ects": 5,
        "semester": 5,
        "description": "UC optativa alternativa à Cibersegurança, selecionada pelo estudante.",
        "summary": "Permite direcionar a formação para outra área de interesse caso não curse Cibersegurança.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Escolher uma UC alternativa coerente com os objetivos profissionais.",
            "Gerir as atividades e avaliações da optativa escolhida.",
            "Integrar as competências adquiridas ao portefólio académico e profissional.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pela unidade optativa selecionada em substituição à Cibersegurança.
        """,
        "topics": [
            {
                "slug": "planeamento-opcao-vi",
                "title": "Planeamento da Opção VI",
                "summary": "Seleção da UC e alinhamento com metas individuais.",
                "tags": ["optativas", "planeamento"],
            },
            {
                "slug": "conteudos-opcao-vi",
                "title": "Conteúdos da Opção VI",
                "summary": "Temas abordados conforme a ficha oficial da unidade escolhida.",
                "tags": ["conteúdos", "variável"],
            },
        ],
    },

    {
        "code": "19411050",
        "slug": "19411050-desenvolvimento-low-code",
        "title": "Desenvolvimento de Aplicações com Low-Code",
        "ects": 5,
        "semester": 5,
        "description": "Plataformas low-code/no-code, modelagem visual, integração com APIs e projeto de aplicação empresarial.",
        "summary": "Apresenta ferramentas low-code para prototipagem rápida, modelação de dados e implementação de soluções empresariais.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Identificar cenários adequados ao uso de plataformas low-code e comparar com desenvolvimento tradicional.",
            "Modelar dados, interfaces e fluxos lógicos utilizando ferramentas low-code.",
            "Integrar APIs externas e publicar aplicações desenvolvidas na plataforma escolhida.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Conceitos de plataformas low-code/no-code, exploração de ferramenta (OutSystems/Power Apps/AppInventor), modelagem visual e integração com APIs.
        - Projeto de uma aplicação completa usando low-code.
        """,
        "topics": [
            {
                "slug": "plataformas-lowcode",
                "title": "Plataformas Low-Code",
                "summary": "Características de ferramentas low-code, vantagens e limitações.",
                "tags": ["low-code", "ferramentas"],
            },
            {
                "slug": "desenho-visual",
                "title": "Desenho Visual",
                "summary": "Modelagem de dados, interfaces e fluxos lógicos em ambientes visuais.",
                "tags": ["modelagem", "UI"],
            },
            {
                "slug": "integracao-lowcode",
                "title": "Integração em Low-Code",
                "summary": "Ligação a bases de dados e APIs, uso de conectores e componentes personalizados.",
                "tags": ["integração", "APIs"],
            },
            {
                "slug": "desenvolvimento-rapido",
                "title": "Desenvolvimento Rápido",
                "summary": "Benefícios de produtividade, gestão de versões e implantação.",
                "tags": ["prototipagem", "deploy"],
            },
            {
                "slug": "projeto-lowcode",
                "title": "Projeto Low-Code",
                "summary": "Construção de uma aplicação empresarial completa na plataforma estudada.",
                "tags": ["projeto", "low-code"],
            },
        ],
    },

    {
        "code": "19411033",
        "slug": "19411033-introducao-a-robotica",
        "title": "Introdução à Robótica",
        "ects": 5,
        "semester": 5,
        "description": "Fundamentos de robótica, cinemática, sensores e atuadores, microcontroladores/ROS, controlo e programação de robôs.",
        "summary": "Introduz conceitos e práticas básicas de robótica móvel e manipuladores com foco em prototipagem.",
        "language": "pt",
        "prerequisites": ["19411025"],
        "learning_outcomes": [
            "Descrever cinemática de robôs simples e calcular trajetórias básicas.",
            "Selecionar sensores/atuadores e integrar com microcontroladores ou ROS.",
            "Programar comportamentos básicos (seguir linha, evitar obstáculos) e discutir aplicações e ética.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Cinemática de robôs, sensores/atuadores, plataformas de robótica, controlo (PID básico), programação de robôs e aplicações/ética.
        """,
        "topics": [
            {
                "slug": "cinematica-robot",
                "title": "Cinemática de Robôs",
                "summary": "Representação de posições/orientações e cálculo de trajetórias para manipuladores simples.",
                "tags": ["cinemática", "trajetórias"],
            },
            {
                "slug": "sensores-atuadores",
                "title": "Sensores e Atuadores",
                "summary": "Tipos de sensores e atuadores usados em robôs e sua interface com controladores.",
                "tags": ["sensores", "atuadores"],
            },
            {
                "slug": "plataforma-robotica",
                "title": "Plataformas Robóticas",
                "summary": "Uso de kits e microcontroladores (Arduino, ROS) para construção de robôs móveis ou manipuladores.",
                "tags": ["Arduino", "ROS"],
            },
            {
                "slug": "controle-movimento",
                "title": "Controlo de Movimento",
                "summary": "Controlo em malha fechada, noções de PID e experiências de seguimento de linha/distância.",
                "tags": ["PID", "controlo"],
            },
            {
                "slug": "programacao-robot",
                "title": "Programação de Robôs",
                "summary": "Algoritmos de navegação básica e sequências de movimento para manipuladores.",
                "tags": ["programação", "robôs"],
            },
            {
                "slug": "aplicacoes-robotica",
                "title": "Aplicações e Ética",
                "summary": "Casos de uso industriais/domésticos e discussão de impactos sociais/éticos.",
                "tags": ["aplicações", "ética"],
            },
        ],
    },

    {
        "code": "19411043",
        "slug": "19411043-opcao-vii-livre",
        "title": "Opção VII – UC Optativa (5 ECTS)",
        "ects": 5,
        "semester": 5,
        "description": "UC optativa livre alternativa ao conjunto de opções VII.",
        "summary": "Permite selecionar outra disciplina de 5 ECTS para complementar as competências no último ano.",
        "language": "pt",
        "prerequisites": [],
        "learning_outcomes": [
            "Avaliar e escolher uma UC optativa relevante para objetivos de carreira.",
            "Gerir estudo e entregas da unidade selecionada de forma autónoma.",
            "Relacionar o conteúdo optativo com projetos finais ou interesses de investigação.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pela UC optativa escolhida dentro das opções VII.
        """,
        "topics": [
            {
                "slug": "selecao-opcao-vii",
                "title": "Seleção da Opção VII",
                "summary": "Processo de escolha da UC e alinhamento com objetivos de especialização.",
                "tags": ["optativas", "planeamento"],
            },
            {
                "slug": "conteudos-opcao-vii",
                "title": "Conteúdos da Opção VII",
                "summary": "Conteúdos variáveis definidos pela ficha da unidade frequentada.",
                "tags": ["conteúdos", "variável"],
            },
        ],
    },

    {
        "code": "19411034",
        "slug": "19411034-projeto-na-empresa-iv",
        "title": "Projeto na Empresa IV",
        "ects": 5,
        "semester": 5,
        "description": "Projeto avançado em contexto empresarial, continuando ou ampliando o trabalho iniciado no Projeto III.",
        "summary": "Aproxima o estudante de desafios profissionais complexos, reforçando gestão, desenvolvimento e comunicação de projetos.",
        "language": "pt",
        "prerequisites": ["19411030"],
        "learning_outcomes": [
            "Aprofundar análise de requisitos e planeamento em projetos de maior escopo.",
            "Integrar múltiplos sistemas ou componentes entregando soluções robustas.",
            "Produzir documentação abrangente e defender resultados perante banca avaliadora.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos conforme o projeto realizado, incluindo definição detalhada, metodologia, implementação, colaboração, documentação e apresentação pública.
        """,
        "topics": [
            {
                "slug": "definicao-projeto",
                "title": "Definição do Projeto",
                "summary": "Levantamento aprofundado do problema e requisitos com o parceiro.",
                "tags": ["requisitos", "escopo"],
            },
            {
                "slug": "metodologia-trabalho",
                "title": "Metodologia de Trabalho",
                "summary": "Seleção de abordagem de desenvolvimento ou investigação adequada, acompanhamento e ajustes.",
                "tags": ["metodologia", "gestão"],
            },
            {
                "slug": "implementacao-solucao",
                "title": "Implementação da Solução",
                "summary": "Design, desenvolvimento e testes da solução com foco em qualidade.",
                "tags": ["implementação", "qualidade"],
            },
            {
                "slug": "gestao-colaboracao",
                "title": "Gestão e Colaboração",
                "summary": "Trabalho com equipas da empresa, comunicação e adaptação a mudanças de escopo.",
                "tags": ["equipa", "comunicação"],
            },
            {
                "slug": "relatorio-avaliacao",
                "title": "Relatório e Avaliação",
                "summary": "Documentação dos resultados, avaliação crítica e lições aprendidas.",
                "tags": ["relatório", "avaliação"],
            },
            {
                "slug": "apresentacao-publica",
                "title": "Apresentação Pública",
                "summary": "Preparação e apresentação final demonstrando a solução desenvolvida.",
                "tags": ["apresentação", "defesa"],
            },
        ],
    },

    {
        "code": "19411035",
        "slug": "19411035-estagio",
        "title": "Estágio",
        "ects": 30,
        "semester": 6,
        "description": "Estágio profissional supervisionado em empresa ou instituição, com execução de atividades e relatório final.",
        "summary": "Proporciona imersão profissional de longa duração, aplicando competências do curso em ambiente real.",
        "language": "pt",
        "prerequisites": ["19411034"],
        "learning_outcomes": [
            "Integrar-se em equipas profissionais respeitando normas, ética e comunicação organizacional.",
            "Executar tarefas técnicas e de engenharia atribuídas, gerindo tempo e recursos sob supervisão.",
            "Documentar atividades em relatório de estágio e apresentar resultados de forma clara.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pelo plano de estágio acordado com a empresa/instituição parceira.
        """,
        "topics": [
            {
                "slug": "integracao-profissional",
                "title": "Integração Profissional",
                "summary": "Adaptação ao ambiente de trabalho, estrutura organizacional e comunicação profissional.",
                "tags": ["integração", "profissional"],
            },
            {
                "slug": "atividade-tecnica",
                "title": "Atividades Técnicas",
                "summary": "Execução de tarefas técnicas alinhadas ao plano de estágio (desenvolvimento, suporte, administração).",
                "tags": ["tarefas", "engenharia"],
            },
            {
                "slug": "gestao-tempo-projetos",
                "title": "Gestão de Tempo e Projetos",
                "summary": "Utilização de ferramentas internas, cumprimento de prazos e reporte de progresso.",
                "tags": ["gestão", "report"],
            },
            {
                "slug": "aprendizagem-continuada",
                "title": "Aprendizagem Continuada",
                "summary": "Aquisição de novas ferramentas ou tecnologias exigidas pelas atividades de estágio.",
                "tags": ["aprendizagem", "tecnologias"],
            },
            {
                "slug": "etica-e-profissionalismo",
                "title": "Ética e Profissionalismo",
                "summary": "Conformidade com normas de conduta, confidencialidade e responsabilidades profissionais.",
                "tags": ["ética", "profissionalismo"],
            },
            {
                "slug": "relatorio-estagio",
                "title": "Relatório de Estágio",
                "summary": "Produção de relatório final e apresentação oral perante avaliadores.",
                "tags": ["relatório", "apresentação"],
            },
        ],
    },

    {
        "code": "19411036",
        "slug": "19411036-projeto-final",
        "title": "Projeto",
        "ects": 30,
        "semester": 6,
        "description": "Projeto final de curso integrador, envolvendo definição de tema, metodologia, implementação/testes e monografia.",
        "summary": "Permite conduzir um projeto ou investigação completa, consolidando conhecimentos adquiridos ao longo da licenciatura.",
        "language": "pt",
        "prerequisites": ["19411034"],
        "learning_outcomes": [
            "Definir tema relevante, objetivos e plano metodológico para o projeto final.",
            "Executar desenvolvimento ou investigação com rigor técnico/científico, realizando testes e análises.",
            "Redigir monografia detalhada e defender resultados perante banca avaliadora.",
        ],
        "youtube_playlists": [],
        "body": """
        **Conteúdos Programáticos**

        - Definidos pelo tema do projeto selecionado, incluindo revisão bibliográfica, metodologia, desenvolvimento, análise de resultados, documentação e defesa final.
        """,
        "topics": [
            {
                "slug": "escolha-tema",
                "title": "Escolha do Tema",
                "summary": "Definição do problema e objetivos, com revisão inicial da literatura.",
                "tags": ["tema", "revisão"],
            },
            {
                "slug": "metodologia-projeto",
                "title": "Metodologia do Projeto",
                "summary": "Planeamento das etapas, critérios de sucesso e abordagem científica ou de engenharia.",
                "tags": ["metodologia", "planeamento"],
            },
            {
                "slug": "execucao-desenvolvimento",
                "title": "Execução e Desenvolvimento",
                "summary": "Implementação da solução ou condução de experimentos conforme o plano.",
                "tags": ["desenvolvimento", "experimentos"],
            },
            {
                "slug": "analise-resultados",
                "title": "Análise de Resultados",
                "summary": "Testes funcionais, avaliação de desempenho e discussão de limitações.",
                "tags": ["análise", "resultados"],
            },
            {
                "slug": "documentacao-monografia",
                "title": "Documentação e Monografia",
                "summary": "Elaboração do documento final com estrutura académica completa.",
                "tags": ["monografia", "documentação"],
            },
            {
                "slug": "defesa-projeto",
                "title": "Defesa do Projeto",
                "summary": "Preparação e apresentação oral perante banca, respondendo a questões técnicas.",
                "tags": ["defesa", "apresentação"],
            },
        ],
    },

]


def main() -> None:
    for uc in UCS:
        uc_dir = COURSE_DIR / "uc" / uc["slug"]
        frontmatter = {
            "title": uc["title"],
            "code": uc["code"],
            "description": uc["description"],
            "ects": uc["ects"],
            "semester": uc["semester"],
            "language": uc.get("language", "pt"),
            "prerequisites": uc.get("prerequisites", []),
            "learning_outcomes": uc.get("learning_outcomes", []),
            "youtube_playlists": uc.get("youtube_playlists", []),
            "summary": uc.get("summary", uc["description"]),
            "layout": "single",
            "type": "uc",
            "cascade": {"type": "topic"},
            "contributors": [],
        }
        write_markdown(uc_dir / "_index.md", frontmatter, dedent(uc["body"]))

        for topic in uc.get("topics", []):
            topic_front = {
                "slug": topic["slug"],
                "title": topic["title"],
                "summary": topic["summary"],
                "tags": topic.get("tags", []),
                "youtube_playlists": topic.get("youtube_playlists", []),
                "contributors": [],
            }
            topic_body_text = topic.get("body") or topic_body(topic["summary"])
            write_markdown(uc_dir / f"{topic['slug']}.md", topic_front, dedent(topic_body_text))

    print(f"Gerados {len(UCS)} UCs.")


if __name__ == "__main__":
    main()
