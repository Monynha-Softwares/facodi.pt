
import { CurricularUnit, Category, Difficulty } from '../types';

export const COURSE_UNITS: CurricularUnit[] = [
  // ==========================================
  // LESTI - ANO 1
  // ==========================================
  {
    id: '19411003',
    name: 'Álgebra Linear e Geometria Analítica',
    description: 'Fundamentos de álgebra linear e geometria analítica aplicados à resolução de problemas em R³.',
    ects: 5, semester: 1, year: 1,
    category: Category.MATHEMATICS, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'FACODI Core', tags: ['Math', 'Algebra'], courseId: 'LESTI'
  },
  {
    id: '19411002',
    name: 'Análise Matemática I',
    description: 'Fundamentos de análise real com foco em limites, derivação e integração de funções reais.',
    ects: 5, semester: 1, year: 1,
    category: Category.MATHEMATICS, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'FACODI Core', tags: ['Math', 'Calculus'], courseId: 'LESTI'
  },
  {
    id: '19411008',
    name: 'Análise Matemática II',
    description: 'Cálculo multivariável, integrais múltiplas e equações diferenciais aplicadas à engenharia.',
    ects: 7, semester: 1, year: 1,
    category: Category.MATHEMATICS, difficulty: Difficulty.INTERMEDIATE,
    duration: '210 Horas', contributor: 'FACODI Core', tags: ['Math', 'Calculus'], courseId: 'LESTI',
    prerequisites: ['19411002']
  },
  {
    id: '19411005',
    name: 'Arquitetura de Computadores',
    description: 'Introdução à organização interna de computadores, lógica digital e arquitetura de processadores.',
    ects: 5, semester: 1, year: 1,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.INTERMEDIATE,
    duration: '150 Horas', contributor: 'Hardware Guild', tags: ['Hardware', 'CPU'], courseId: 'LESTI'
  },
  {
    id: '19411004',
    name: 'Física',
    description: 'Fundamentos de mecânica clássica aplicados a sistemas de partículas e corpos rígidos.',
    ects: 5, semester: 1, year: 1,
    category: Category.ENGINEERING, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'Physics Dept', tags: ['Physics'], courseId: 'LESTI'
  },
  {
    id: '19411000',
    name: 'Programação',
    description: 'Introdução prática à programação em Python, algoritmia e estruturas fundamentais.',
    ects: 5, semester: 1, year: 1,
    category: Category.ENGINEERING, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'Monynha Devs', tags: ['Python', 'Logic'], courseId: 'LESTI'
  },
  {
    id: '19411009',
    name: 'Sistemas Operativos',
    description: 'Fundamentos de sistemas operativos, gestão de recursos e administração básica de Windows e Linux.',
    ects: 5, semester: 1, year: 1,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.INTERMEDIATE,
    duration: '150 Horas', contributor: 'SysAdmin Node', tags: ['Linux', 'Kernel'], courseId: 'LESTI',
    content: `
# Sistemas Operativos

A camada de software que permite que o hardware seja útil. Focamos no kernel, gestão de processos e sistemas de ficheiros.

## Programa Detalhado
1. **Gestão de Processos**: Estados de um processo, threads e escalonamento (Scheduling).
2. **Memória**: Paginação, segmentação e memória virtual.
3. **Sistemas de Ficheiros**: Estrutura de diretórios, inodes e journaling.
4. **Shell Scripting**: Automação em ambiente Linux (Bash).

### Snippet Essencial
\`\`\`bash
# Verificar processos que consomem mais CPU
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head
\`\`\`
    `
  },

  // ANO 1 - SEMESTRE 2
  {
    id: '19411010',
    name: 'Gestão',
    description: 'Introdução a conceitos de gestão empresarial e gestão de projetos tradicionais e ágeis.',
    ects: 5, semester: 2, year: 1,
    category: Category.MANAGEMENT, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'Business Node', tags: ['Agile', 'Business'], courseId: 'LESTI'
  },
  {
    id: '19411007',
    name: 'Tecnologias Web',
    description: 'Fundamentos de desenvolvimento web cliente-servidor com HTML, CSS, JavaScript e PHP.',
    ects: 5, semester: 2, year: 1,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'Web Guild', tags: ['Frontend', 'Backend'], courseId: 'LESTI'
  },

  // ==========================================
  // LESTI - ANO 2
  // ==========================================
  {
    id: '19411013',
    name: 'Aprendizagem Automática',
    description: 'Introdução aos fundamentos, algoritmos e ferramentas de aprendizagem de máquina.',
    ects: 5, semester: 3, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.ADVANCED,
    duration: '150 Horas', contributor: 'AI Node', tags: ['ML', 'Data'], courseId: 'LESTI',
    prerequisites: ['19411018']
  },
  {
    id: '19411012',
    name: 'Base de Dados I',
    description: 'Fundamentos de sistemas de gestão de bases de dados relacionais e introdução a NoSQL.',
    ects: 5, semester: 3, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.INTERMEDIATE,
    duration: '150 Horas', contributor: 'Data Guild', tags: ['SQL'], courseId: 'LESTI'
  },
  {
    id: '19411015',
    name: 'Computação Visual',
    description: 'Integra conceitos de computação gráfica, processamento de imagem e visão computacional.',
    ects: 5, semester: 3, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.ADVANCED,
    duration: '150 Horas', contributor: 'Graphics Guild', tags: ['OpenCV', 'Graphics'], courseId: 'LESTI'
  },
  {
    id: '19411014',
    name: 'Redes de Computadores',
    description: 'Fundamentos de redes de computadores, modelos OSI/TCP-IP e protocolos das principais camadas.',
    ects: 5, semester: 3, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.INTERMEDIATE,
    duration: '150 Horas', contributor: 'Network Ops', tags: ['TCP/IP', 'Networking'], courseId: 'LESTI',
    content: `
# Redes de Computadores

Como os dados viajam pelo mundo. Do cabo de fibra ótica aos protocolos de aplicação.

## Tópicos Principais
- **Modelo OSI vs TCP/IP**: As camadas da comunicação.
- **Protocolos de Transporte**: TCP (Fiável) vs UDP (Rápido).
- **Endereçamento IP**: IPv4, IPv6 e Subnetting.
- **Roteamento**: Protocolos OSPF e BGP.

### Ferramentas de Estudo
- Wireshark para análise de pacotes.
- Cisco Packet Tracer para simulação de topologias.
    `
  },
  {
    id: '19411017',
    name: 'Base de Dados II',
    description: 'Arquitetura interna de SGBDs, SQL avançado, tuning, transações e segurança.',
    ects: 5, semester: 4, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.ADVANCED,
    duration: '150 Horas', contributor: 'Data Guild', tags: ['Advanced SQL', 'Performance'], courseId: 'LESTI',
    prerequisites: ['19411012'],
    content: `
# Base de Dados II (Tuning & Performance)

Vá além do SELECT básico. Aprenda como funcionam os motores de busca e como otimizar consultas massivas.

## Foco de Estudo
1. **Planos de Execução**: Como o SGBD interpreta a tua query.
2. **Indexação**: B-Trees, Hash Indexes e GiST.
3. **Concorrência**: Isolamento de transações (ACID) e MVCC.
4. **NoSQL**: Document stores (MongoDB) e Key-Value stores (Redis).

\`\`\`sql
-- Analisar performance de uma query
EXPLAIN ANALYZE 
SELECT * FROM users WHERE last_login < '2023-01-01';
\`\`\`
    `
  },
  {
    id: '19411019',
    name: 'Computação Móvel',
    description: 'Desenvolvimento de aplicações móveis considerando hardware, UI/UX e frameworks modernos.',
    ects: 5, semester: 4, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.INTERMEDIATE,
    duration: '150 Horas', contributor: 'Mobile Guild', tags: ['React Native', 'Android', 'iOS'], courseId: 'LESTI'
  },
  {
    id: '19411016',
    name: 'Engenharia de Software',
    description: 'Processos, metodologias ágeis, UML e gestão de ciclo de vida de software.',
    ects: 5, semester: 4, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.INTERMEDIATE,
    duration: '150 Horas', contributor: 'FACODI Core', tags: ['Agile', 'UML', 'DevOps'], courseId: 'LESTI'
  },
  {
    id: '19411018',
    name: 'Probabilidades e Estatística',
    description: 'Fundamentos de probabilidade, inferência, testes de hipóteses e regressão.',
    ects: 5, semester: 4, year: 2,
    category: Category.MATHEMATICS, difficulty: Difficulty.INTERMEDIATE,
    duration: '150 Horas', contributor: 'FACODI Core', tags: ['Stats', 'Data Science'], courseId: 'LESTI'
  },
  {
    id: '19411029',
    name: 'Computação em Nuvem',
    description: 'Fundamentos de cloud computing, virtualização e modelos de serviço (IaaS, PaaS, SaaS).',
    ects: 5, semester: 4, year: 2,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.ADVANCED,
    duration: '150 Horas', contributor: 'Cloud Ops', tags: ['AWS', 'Docker', 'K8s'], courseId: 'LESTI',
    content: `
# Computação em Nuvem (Cloud Computing)

A infraestrutura moderna. Saia do servidor local para a escalabilidade global.

## Módulos
1. **Virtualização e Contentores**: Docker e isolamento de recursos.
2. **Orquestração**: Kubernetes para gestão de frotas de microserviços.
3. **Serverless**: Funções como serviço (AWS Lambda).
4. **Infraestrutura como Código (IaC)**: Terraform e CloudFormation.

> "A Nuvem é apenas o computador de outra pessoa, mas gerido por APIs poderosas."
    `
  },

  // ==========================================
  // LESTI - ANO 3
  // ==========================================
  {
    id: '19411049',
    name: 'Cibersegurança',
    description: 'Fundamentos de segurança da informação, criptografia e segurança de redes.',
    ects: 5, semester: 5, year: 3,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.ADVANCED,
    duration: '150 Horas', contributor: 'Security Node', tags: ['Security', 'Pentest'], courseId: 'LESTI',
    prerequisites: ['19411014']
  },
  {
    id: '19411021',
    name: 'Desenvolvimento de Aplicações Web',
    description: 'Arquiteturas modernas (SPA/SSR), APIs back-end e segurança avançada.',
    ects: 5, semester: 5, year: 3,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.ADVANCED,
    duration: '150 Horas', contributor: 'Web Guild', tags: ['React', 'Node.js'], courseId: 'LESTI',
    prerequisites: ['19411007']
  },
  {
    id: '19411050',
    name: 'Desenvolvimento Low-Code',
    description: 'Introdução a plataformas low-code para desenvolvimento rápido de soluções empresariais.',
    ects: 5, semester: 5, year: 3,
    category: Category.COMPUTER_SCIENCE, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'Business Node', tags: ['OutSystems', 'PowerApps'], courseId: 'LESTI'
  },
  {
    id: '19411035',
    name: 'Estágio',
    description: 'Integração em ambiente profissional para aplicação de competências adquiridas.',
    ects: 30, semester: 6, year: 3,
    category: Category.ENGINEERING, difficulty: Difficulty.ADVANCED,
    duration: '900 Horas', contributor: 'Career Office', tags: ['Work', 'Internship'], courseId: 'LESTI'
  },
  {
    id: '19411036',
    name: 'Projeto',
    description: 'Trabalho final de licenciatura envolvendo investigação e desenvolvimento original.',
    ects: 30, semester: 6, year: 3,
    category: Category.ENGINEERING, difficulty: Difficulty.EXPERT,
    duration: '900 Horas', contributor: 'FACODI Core', tags: ['Thesis', 'Final Project'], courseId: 'LESTI'
  },

  // ==========================================
  // LDCOM - DESIGN DE COMUNICAÇÃO
  // ==========================================
  {
    id: '14541142',
    name: 'Desenho',
    description: 'Prática de desenho de observação e exploração de meios expressivos.',
    ects: 5, semester: 1, year: 1,
    category: Category.DESIGN, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'Arts Node', tags: ['Drawing'], courseId: 'LDCOM'
  },
  {
    id: '14541000',
    name: 'Design de Comunicação I',
    description: 'Metodologias de projeto e fundamentos da linguagem visual.',
    ects: 9, semester: 1, year: 1,
    category: Category.DESIGN, difficulty: Difficulty.FOUNDATIONAL,
    duration: '270 Horas', contributor: 'Design Ops', tags: ['Basics', 'Project'], courseId: 'LDCOM'
  },
  {
    id: '14541153',
    name: 'Tipografia I',
    description: 'História e anatomia da letra. Composição tipográfica clássica.',
    ects: 5, semester: 1, year: 1,
    category: Category.DESIGN, difficulty: Difficulty.FOUNDATIONAL,
    duration: '150 Horas', contributor: 'Fonts Collective', tags: ['Type'], courseId: 'LDCOM'
  }
];
