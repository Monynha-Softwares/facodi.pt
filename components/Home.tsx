
import React from 'react';

interface HomeProps {
  onExplore: () => void;
  onRoadmap: () => void;
}

const Home: React.FC<HomeProps> = ({ onExplore, onRoadmap }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] border border-black/20 px-3 py-1 mb-8 inline-block">
              ENSINO SUPERIOR ACESSÍVEL, ABERTO E COMUNITÁRIO
            </span>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
              FACODI — <br/>
              FACULDADE <br/>
              COMUNITÁRIA <br/>
              DIGITAL
            </h1>
            <p className="text-lg lg:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mb-12">
              Organizamos currículos de licenciaturas e recheamos cada unidade com playlists abertas para que qualquer pessoa estude, compartilhe e brilhe junto com a comunidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onExplore}
                className="bg-primary text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest stark-border hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                EXPLORAR TRILHAS
              </button>
              <button className="bg-white text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest stark-border hover:bg-brand-muted transition-all">
                CONHEÇA O ECOSSISTEMA
              </button>
            </div>
            <p className="mt-8 text-[9px] font-bold uppercase text-gray-400 tracking-[0.2em]">
              <span className="bg-black text-white px-2 py-0.5 mr-2 italic">ABERTO E GRATUITO</span>
              CURRÍCULOS OFICIAIS E MATERIAIS PÚBLICOS SEM PAYWALL, DO JEITINHO QUE A COMUNIDADE MERECE.
            </p>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-brand-muted p-10 stark-border relative">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10">EM NÚMEROS COMUNITÁRIOS</h4>
              <div className="space-y-12">
                <div>
                  <p className="text-6xl font-black tracking-tighter">2</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CURSOS OFICIAIS ORGANIZADOS</p>
                </div>
                <div>
                  <p className="text-6xl font-black tracking-tighter">87</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">UNIDADES CURRICULARES COM PLAYLISTS E MATERIAIS LIVRES</p>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-black/10 text-[10px] font-medium leading-relaxed italic text-gray-500">
                Criado pela <strong>Monynha Softwares</strong> para democratizar tecnologia, combater hipocrisia e amplificar quem aprende fora do padrão.
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary stark-border"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Audience Section */}
      <section className="bg-brand-muted/30 border-y border-black/5 py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">PROPÓSITO E VALORES QUE GUIAM A FACODI</h2>
            <ul className="space-y-6">
              {[
                { label: 'Acesso gratuito', text: 'todo conteúdo permanece aberto, sem barreiras financeiras nem pegadinhas.' },
                { label: 'Comunidade', text: 'estudantes, professoras, professores e voluntárias(os) curam o material coletivamente.' },
                { label: 'Transparência', text: 'cada trilha está ligada aos currículos oficiais, garantindo credibilidade.' },
                { label: 'Inclusão e diversidade', text: 'linguagem clara, acessibilidade digital e orgulho das nossas culturas.' },
                { label: 'Sustentabilidade', text: 'aproveitamos conteúdos públicos existentes e reduzimos custos de produção.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-black mt-2 shrink-0"></div>
                  <p className="text-sm font-medium leading-relaxed"><strong className="font-black uppercase tracking-tight">{item.label}:</strong> {item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">PRA QUEM É ESSE ROLÊ</h2>
            <ul className="space-y-6">
              {[
                'Estudantes universitários que querem revisar ou aprofundar as unidades curriculares com autonomia.',
                'Pessoas interessadas em formação livre que buscam caminhos acadêmicos bem estruturados sem precisar se matricular.',
                'Educadoras(es) e tutoras(es) que necessitam de acervos curados para ampliar suas aulas.',
                'Toda a comunidade global que acredita em educação aberta como ferramenta de transformação social.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-black mt-2 shrink-0"></div>
                  <p className="text-sm font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 border-b border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center mb-16">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] bg-brand-muted px-3 py-1 mb-6 inline-block">EXPERIÊNCIA FACODI</span>
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">EXPERIÊNCIA FACODI NA PALMA DA MÃO</h2>
          <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mt-4">TECNOLOGIA ABERTA PARA ORGANIZAR O CURRÍCULO, APOIAR QUEM ESTUDA E VALORIZAR CADA CONTRIBUIÇÃO DA COMUNIDADE.</p>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: 'map', title: 'MAPA CURRICULAR INTERATIVO', desc: 'Navegue por cursos, semestres e disciplinas com uma visão organizada dos currículos oficiais.' },
            { icon: 'playlist_play', title: 'PLAYLISTS INTEGRADAS', desc: 'Cada unidade curricular recebe playlists do YouTube e materiais públicos selecionados pela comunidade.' },
            { icon: 'check_circle', title: 'MARCAÇÃO DE PROGRESSO', desc: 'Acompanhe o que já foi estudado e celebre cada módulo concluído no seu tempo.' },
            { icon: 'groups', title: 'CURADORIA DIVERSA', desc: 'Um coletivo vibrante garante acessibilidade, linguagem acolhedora e representatividade real.' },
          ].map((feat, i) => (
            <div key={i} className="stark-border p-10 hover:bg-primary transition-all group">
              <span className="material-symbols-outlined text-4xl mb-8 group-hover:scale-110 transition-transform">{feat.icon}</span>
              <h4 className="text-sm font-black uppercase tracking-tight mb-4">{feat.title}</h4>
              <p className="text-xs font-medium text-gray-500 group-hover:text-black leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-brand-muted/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-end mb-16">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] mb-4 block">CURRÍCULOS ABERTOS</span>
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">CURSOS EM DESTAQUE NA <br/>COMUNIDADE FACODI</h2>
          </div>
          <button className="hidden lg:block stark-border px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
            VER TODOS OS CURSOS
          </button>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[
            { title: 'LICENCIATURA EM DESIGN DE COMUNICAÇÃO', desc: 'Curso orientado para o desenvolvimento de competências em design gráfico, comunicação visual e experiências multimídia.', ects: 180, semesters: 6, units: 38 },
            { title: 'LICENCIATURA EM ENGENHARIA DE SISTEMAS E TECNOLOGIAS DA INFORMAÇÃO', desc: 'Plano 2025/2026 com formação sólida em matemática, computação, engenharia de software e projetos aplicados.', ects: 180, semesters: 6, units: 43 },
          ].map((course, i) => (
            <div key={i} className="bg-white stark-border p-12 group hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-black/10 px-2 py-1 mb-8 inline-block">PLANO 2025/2026</span>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-sm font-medium text-gray-500 mb-12 leading-relaxed">{course.desc}</p>
              <div className="flex justify-between items-end pt-8 border-t border-black/10">
                <div className="flex gap-12">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">ECTS</p>
                    <p className="text-xs font-bold">{course.ects}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">SEMESTRES</p>
                    <p className="text-xs font-bold">{course.semesters}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary stark-border px-3 py-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">grid_view</span>
                    <span className="text-[10px] font-black">{course.units} UNIDADES JÁ MAPEADAS</span>
                  </div>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 border-y border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] mb-4 block">TRILHA COMUNITÁRIA</span>
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-16">COMO ROLA A JORNADA FACODI</h2>
          <div className="space-y-12">
            {[
              { n: '1', title: 'ESCOLHA UM CURRÍCULO OFICIAL E VISUALIZE SEMESTRES, CARGAS HORÁRIAS, VERSÕES E CONTEXTO INSTITUCIONAL.', color: 'text-primary' },
              { n: '2', title: 'MERGULHE NAS UNIDADES CURRICULARES COM RESULTADOS DE APRENDIZAGEM, TÓPICOS RELACIONADOS E PLAYLISTS ABERTAS.', color: 'text-primary' },
              { n: '3', title: 'MARQUE O PROGRESSO, COMPARTILHE MATERIAIS COM A COMUNIDADE E MANTENHA VIVO O HISTÓRICO DE REVISÕES.', color: 'text-primary' },
            ].map((step, i) => (
              <div key={i} className="flex gap-8 items-start">
                <span className={`text-6xl font-black italic leading-none ${step.color}`}>{step.n}</span>
                <p className="text-lg lg:text-xl font-black uppercase tracking-tighter mt-2 max-w-2xl">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 text-center border border-black/10 py-24 px-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] mb-12 block text-gray-400">MANIFESTO MONYNHA SOFTWARES</span>
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
            DEMOCRATIZAR TECNOLOGIA, COMBATER HIPOCRISIA E DAR VOZ A QUEM CRIA FORA DO PADRÃO
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-12 max-w-2xl mx-auto uppercase text-xs tracking-widest">
            A FACODI nasce desse compromisso político-social: usar tecnologia acessível para abrir caminhos na educação superior, respeitando diversidade cultural e celebrando conhecimentos populares.
          </p>
          <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] underline decoration-primary decoration-4 underline-offset-8 hover:bg-primary transition-all">CONHEÇA O MANIFESTO COMPLETO</a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter mb-12 italic">BORA COLAR COM A FACODI?</h2>
          <p className="text-lg font-medium text-gray-500 mb-12 max-w-2xl mx-auto uppercase tracking-widest">Traga playlists, PDFs públicos, artigos e ideias para fortalecer a faculdade comunitária digital e deixar o currículo cada vez mais diverso.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={onExplore}
              className="bg-primary text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] stark-border hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              VER CURSOS E UNIDADES CURRICULARES
            </button>
            <button className="bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] stark-border hover:bg-brand-muted transition-all">
              FALAR COM A MONYNHA E SUGERIR MATERIAIS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
