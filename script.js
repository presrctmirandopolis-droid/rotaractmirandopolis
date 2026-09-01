const navbar = document.getElementById('navbar');
const glow = document.querySelector('.cursor-glow');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

window.addEventListener('pointermove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', open);

  // Sempre abre o painel no topo. Isso evita que o modo escuro
  // preserve uma posição de rolagem anterior e esconda os primeiros itens.
  if (open && nav) {
    nav.scrollTop = 0;
  }
});

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.12;
    const y = (e.clientY - r.top - r.height / 2) * 0.12;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('pointerleave', () => btn.style.transform = '');
});

const tilt = document.querySelector('.tilt');
if (tilt) {
  tilt.addEventListener('pointermove', (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 6}deg) rotateZ(4deg)`;
  });
  tilt.addEventListener('pointerleave', () => tilt.style.transform = 'rotateZ(4deg)');
}


// Modo claro/escuro — a identidade rosa do clube permanece inalterada.
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('rotaract-theme');
const prefersDark = false;

function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', dark);
    themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
    themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
    themeToggle.querySelector('.theme-label').textContent = dark ? 'Modo claro' : 'Modo escuro';
  }
}

setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeToggle?.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark-mode');
  setTheme(dark);
  localStorage.setItem('rotaract-theme', dark ? 'dark' : 'light');
});

// Ao mudar o tema, o menu mobile permanece no estado atual sem perder o painel.
// Ao navegar por um item, ele é fechado normalmente.


// Associados oficiais — dados e biografias fornecidos pelo clube.
const associados = [{"nome": "Amanda dos Santos da Silva", "cargo": "Vice-Presidente e Imagem Pública · Gestão 2026–2027", "foto": "assets/members/Amanda dos Santos.png", "bio": "Amanda dos Santos da Silva, 22 anos, ingressou no Rotaract Club de Mirandópolis em 27 de agosto\nde 2022, aos 18 anos. Desde então, construiu uma trajetória marcada pelo voluntariado, liderança,\ncomprometimento e participação ativa em projetos voltados à comunidade.\n\n        Ao longo de sua caminhada no Rotaract, Amanda teve a oportunidade de exercer diferentes funções\ne assumir responsabilidades que contribuíram significativamente para seu desenvolvimento pessoal e\nprofissional. Na gestão 2023–2024, atuou como Protocolo. Na gestão 2024–2025, exerceu novamente a\nfunção de Protocolo, além de atuar na Fundação Rotária. Já na gestão 2025–2026, assumiu os cargos de\nPresidente e DQA, vivenciando de forma ainda mais intensa os desafios e aprendizados relacionados à\nliderança e à gestão de um clube. Atualmente, na gestão 2026–2027, atua como Vice-Presidente e Imagem\nPública. Durante esses anos, participou ativamente de diversos projetos e ações sociais promovidos pelo\nclube. Entre eles, destacam-se o Cuidando de Quem Cuida, o Setembro Amarelo, realizado com pais de\ncrianças do espectro autista, o Aulão para o ENEM, o Agosto Lilás, voltado à conscientização e ao combate\nà violência contra a mulher, a tradicional Hamburgada, que proporcionou experiências de liderança,\norganização e trabalho em equipe, a Páscoa Vale-Bis, que arrecadou chocolates destinados às crianças do\nSER Criança, professores e funcionários, e o Projeto do Lixo Eletrônico, voltado à arrecadação e destinação\ncorreta de materiais eletrônicos.\n\n       Cada projeto e cada função exercida representaram uma oportunidade de aprendizado e\ncrescimento. Ao longo dessa trajetória, Amanda desenvolveu e aprimorou habilidades como liderança,\nresponsabilidade, comunicação, organização, trabalho em equipe e capacidade de gestão, além de\naprender a lidar com desafios e diferentes realidades.\n\n        Mais do que experiências relacionadas a cargos e projetos, sua trajetória no Rotaract também foi\nmarcada pelo aprendizado sobre voluntariado, empatia e serviço ao próximo. A participação em ações\nsociais permitiu compreender, na prática, a importância de dedicar tempo, conhecimento e disposição em\nbenefício de outras pessoas e da comunidade.\n\n        O Rotaract também proporcionou a Amanda a oportunidade de conhecer pessoas, construir\namizades, enfrentar desafios, sair da zona de conforto e descobrir novas capacidades. Ao olhar para sua\ntrajetória desde os 18 anos, reconhece o quanto amadureceu e cresceu ao longo dessa caminhada.\n\n       Hoje, Amanda considera que sua história no Rotaract vai muito além dos cargos que ocupou ou dos\nprojetos dos quais participou. O clube tornou-se uma parte importante de sua formação e contribuiu\ndiretamente para a construção da pessoa que é hoje. Carrega consigo orgulho por tudo o que viveu,\ngratidão por todas as pessoas que conheceu e, principalmente, a satisfação de ter podido contribuir para a\nvida de outras pessoas por meio do voluntariado e da prestação de serviços à comunidade.\n\nSua trajetória é marcada pelo propósito de “Dar de Si Antes de Pensar em Si”, levando consigo os valores\nde companheirismo, liderança, responsabilidade e serviço que encontrou no Rotaract."}, {"nome": "Larissa Raquel", "cargo": "Associada · experiência em liderança distrital", "foto": "assets/members/Larissa Raquel.png", "bio": "Ingressou no Rotaract Club de Mirandópolis em 2022, após quatro anos de participação no Interact,\ndando continuidade à sua trajetória no movimento rotário e ao compromisso com o voluntariado e a\nprestação de serviços à comunidade.\n\n       Desde sua entrada no Rotaract, teve a oportunidade de assumir diferentes responsabilidades dentro\ndo clube. Iniciou sua trajetória atuando no Protocolo e, em menos de um ano, assumiu a Presidência,\nvivenciando desde cedo os desafios e aprendizados proporcionados pela liderança. Ao longo dos anos,\ntambém exerceu as funções de Vice-Presidente, Secretária e Diretora de Projetos, ampliando sua\nexperiência em diferentes áreas da gestão e atuação do clube.\n\n        Sua trajetória também se estendeu ao âmbito distrital, onde teve a oportunidade de atuar como\nRDA da Área 2 e Secretária Distrital, experiências que contribuíram para ampliar sua visão sobre o\nmovimento, fortalecer sua capacidade de liderança e proporcionar contato com diferentes clubes, pessoas\ne realidades.\n\n       Para ela, ser voluntária do Rotaract representa muito mais do que participar de projetos. É uma\noportunidade constante de aprender, crescer, construir relacionamentos e, principalmente, contribuir\npara transformar a realidade ao seu redor.\n\n       O lema “Dar de Si Antes de Pensar em Si” representa profundamente os valores que acredita e\nprocura colocar em prática por meio do voluntariado. Ao longo de sua caminhada, aprendeu que pequenos\ngestos podem gerar grandes impactos e que, enquanto contribuímos para transformar o mundo, também\nsomos transformados por ele.\n\n       Sua trajetória no Rotaract é, portanto, marcada não apenas pelos cargos ocupados e pelas\nexperiências adquiridas, mas pelo propósito de servir, aprender, compartilhar e fazer a diferença na vida\ndas pessoas e na comunidade."}, {"nome": "Guilherme Orioli", "cargo": "1º Protocolo e 2º Secretário", "foto": "assets/members/Guilherme.png", "bio": "Guilherme Orioli, 21 anos, é estudante de Direito e integrante do Rotaract Club de Mirandópolis.\nSua trajetória no clube teve início a partir de um convite para participar do Dia do Convidado. A\nexperiência despertou seu interesse pelo movimento e, desde então, passou a frequentar as reuniões e\nparticipar ativamente dos projetos desenvolvidos pelo clube.\n\n       Ao longo de sua caminhada no Rotaract, Guilherme teve a oportunidade de participar de diversas\nações voltadas à prestação de serviços e ao auxílio à comunidade, entre elas arrecadações de chocolates,\nmontagem de cestas, bingo, leilões, entre outros projetos que tiveram como propósito contribuir com\naqueles que necessitam de apoio.\n\n       Dentro do clube, também assumiu responsabilidades na gestão. Iniciou sua trajetória ocupando o\ncargo de Segundo Protocolo e, atualmente, exerce as funções de Primeiro Protocolo e Segundo Secretário,\nampliando sua experiência em organização, comunicação, responsabilidade e trabalho em equipe.\n\n      Para Guilherme, o voluntariado representa uma experiência de grande importância e gratificação.\nAlém da oportunidade de ajudar outras pessoas, o trabalho voluntário proporciona aprendizados sobre\nresponsabilidade, empatia, união e solidariedade.\n\n       Sua experiência no Rotaract contribuiu para desenvolver um olhar mais atento às necessidades do\npróximo e para compreender que pequenas atitudes podem gerar grandes impactos. Para ele, o Rotaract\nrepresenta amor ao próximo, solidariedade e, acima de tudo, a vontade de fazer a diferença na vida das\npessoas e na comunidade."}, {"nome": "Julia Suemi Yoshida", "cargo": "Imagem Pública e Assessora Distrital de Imagem Pública · Gestão 2026–2027", "foto": "assets/members/Julia Yoshida.png", "bio": "Julia Suemi Yoshida, 22 anos, integra o Rotaract Club de Mirandópolis desde 14 de dezembro de\n2022. Sua trajetória no voluntariado dentro da Família Rotária começou ainda cedo, por meio do Interact,\nonde teve seus primeiros contatos com o voluntariado, o companheirismo e o propósito de servir ao\npróximo.\n\n        Ao ingressar no Rotaract, Julia iniciou uma nova fase de sua caminhada. Em um período da vida\nmarcado por novos desafios, como a faculdade, o trabalho e a construção de sua trajetória pessoal e\nprofissional, encontrou no Rotaract um espaço para desenvolver ainda mais valores como\nresponsabilidade, liderança, comprometimento e iniciativa.\n\n       Durante sua trajetória no clube, teve a oportunidade de exercer diferentes funções. Na gestão\n2023–2024, atuou como Secretária; em 2024–2025, como Segunda Tesoureira; na gestão 2025–2026,\nexerceu as funções de Protocolo e Segunda Imagem Pública. Atualmente, na gestão 2026–2027, atua\ncomo Imagem Pública do clube e Assessora Distrital de Imagem Pública.\n\n       Cada função assumida trouxe novos desafios e oportunidades de aprendizado, contribuindo para o\ndesenvolvimento de habilidades como organização, responsabilidade, comunicação, liderança e trabalho\nem equipe. Além da experiência adquirida dentro do clube, o Rotaract também proporcionou a Julia a\noportunidade de conhecer pessoas de diferentes lugares, construir amizades e estabelecer conexões que\nultrapassam o ambiente do voluntariado, contribuindo também para sua vida pessoal e profissional.\n\n        Para Julia, o Rotaract vai muito além dos cargos ocupados. Representa amizade, aprendizado,\nconexão, oportunidades e família. É estar cercada por pessoas que compartilham o desejo de fazer o bem\ne que, ao mesmo tempo em que trabalham para transformar a comunidade, também transformam umas às\noutras.\n\n       Ser voluntária por meio do Rotaract, para ela, significa compreender que cada pessoa pode\ncontribuir com aquilo que possui: seu tempo, suas habilidades, suas ideias e sua vontade de fazer a\ndiferença.\n\n       Ao olhar para sua trajetória, Julia carrega consigo um sentimento de gratidão por todas as\nexperiências, pessoas e aprendizados que fizeram parte de sua caminhada. Reconhece o quanto o Rotaract\ncontribuiu para a pessoa que é hoje e acredita que essa história está longe de terminar, tendo ainda muitos\ncapítulos a serem escritos, novas experiências a serem vividas e novas formas de servir e contribuir."}, {"nome": "Rafael Suzuki", "cargo": "DQA — Diretor(a) de Quadro Associativo", "foto": "assets/members/Rafael Suzuki.png", "bio": "Há três anos, o Rotaract passou a fazer parte de sua vida, iniciando uma trajetória marcada por\naprendizado, desafios, voluntariado e crescimento pessoal.\n\n       Como muitos novos integrantes, começou seu caminho durante o período de aprovação, que durou\naproximadamente um ano. Essa fase foi fundamental para conhecer melhor o movimento, observar seu\nfuncionamento, compreender seus valores e descobrir, na prática, o significado de fazer parte de uma\norganização dedicada ao companheirismo, à liderança e à prestação de serviços à comunidade.\n\n        Após esse período, teve a oportunidade de assumir a função de Diretor(a) de Projetos, cargo que\nexerceu durante dois anos. Essa experiência transformou sua maneira de enxergar o trabalho em equipe e\na liderança. Ao longo desse período, enfrentou desafios, projetos que não saíram conforme o planejado,\nreuniões prolongadas e momentos de cansaço, mas também vivenciou conquistas e aprendizados\nsignificativos.\n\n       Entre as experiências mais marcantes, estão a satisfação de ver projetos serem realizados com\nsucesso, perceber o impacto das ações na comunidade e, principalmente, construir vínculos e amizades\nque ultrapassaram o ambiente do clube.\n\n       Atualmente, assume um novo desafio como DQA — Diretor(a) de Quadro Associativo, função que\nproporciona uma aproximação ainda maior com um dos elementos mais importantes do Rotaract: as\npessoas. Nessa posição, busca contribuir para a construção de um quadro associativo mais engajado,\nacolhedor e em constante desenvolvimento, compreendendo que um clube forte começa com pessoas que\nse sentem pertencentes, valorizadas e motivadas a participar.\n\n        Para ele(a), ser voluntário(a) no Rotaract representa um equilíbrio entre propósito e crescimento. É\nsair da zona de conforto, aprender na prática, enfrentar erros, buscar soluções e compreender que\npequenas ações, quando realizadas em conjunto, podem gerar grandes transformações.\n\n        Sua trajetória é marcada por cada cargo assumido, cada projeto realizado, cada desafio enfrentado\ne, principalmente, pelas pessoas que fizeram parte desse caminho. Experiências que deixaram marcas não\napenas na comunidade beneficiada pelas ações, mas também em sua própria formação e na maneira como\nenxerga o voluntariado, a liderança e o trabalho coletivo."}, {"nome": "Bruno Cornacine Montalvão", "cargo": "Associado", "foto": "assets/members/Bruno.png", "bio": "Bruno Cornacine Montalvão encontrou no Rotaract uma oportunidade de crescimento que\nultrapassa os limites do voluntariado. Desde seu ingresso no movimento, teve a oportunidade de construir\nnovas amizades, desenvolver habilidades e vivenciar experiências que contribuíram significativamente para\nsua formação pessoal e profissional.\n\n       Ao longo dessa trajetória, o Rotaract também abriu portas para seu desenvolvimento profissional,\nprincipalmente por meio das conexões e oportunidades proporcionadas pelo networking construído\ndentro do movimento. O contato com diferentes pessoas e realidades permitiu ampliar sua visão, fortalecer\nrelacionamentos e adquirir experiências importantes para sua vida profissional.\n\n       No âmbito pessoal, sua participação no Rotaract contribuiu para que desenvolvesse ainda mais a\nempatia e um olhar mais humano diante das diferentes situações e realidades encontradas. Aprendeu a\ncompreender que cada pessoa possui sua própria história e que, muitas vezes, é necessário olhar além das\ncircunstâncias para realmente entender suas necessidades.\n\n       Para Bruno, o voluntariado é uma experiência única e transformadora. Poder se conectar com\npessoas que necessitam de ajuda, oferecer seu tempo e sua dedicação e, em troca, receber o carinho e a\ngratidão daqueles que foram auxiliados são experiências que considera verdadeiramente impagáveis.\n\n      Sua trajetória no Rotaract representa, portanto, uma combinação de amizade, desenvolvimento,\noportunidades e propósito, mostrando que, ao contribuir para a transformação da vida de outras pessoas,\ntambém somos transformados e crescemos como indivíduos."}, {"nome": "Marllow Hudson Guinami da Silva", "cargo": "Presidente · Gestão 2026–2027", "foto": "assets/members/Marllow Guinami.png", "bio": "Marllow Hudson Guinami da Silva, 22 anos, iniciou sua trajetória na Família Rotária ainda na\nadolescência, por meio do Interact Club de Mirandópolis. Foi nesse período que teve seus primeiros\ncontatos com o voluntariado e começou a compreender, na prática, um dos princípios que se tornaria\nfundamental em sua caminhada: “Dar de Si Antes de Pensar em Si”.\n\n       Durante sua passagem pelo Interact, teve a oportunidade de assumir diferentes responsabilidades e\ncargos de confiança, entre eles Primeiro Tesoureiro e Diretor de Protocolo. Essas experiências\ncontribuíram para seu desenvolvimento, proporcionando os primeiros aprendizados relacionados à\nliderança, responsabilidade, organização e trabalho em equipe.\n\n       Com o passar dos anos e ao atingir a maioridade, deu continuidade à sua trajetória na Família\nRotária por meio do Rotaract Club de Mirandópolis, onde assumiu inicialmente a função de Tesoureiro.\nPosteriormente, recebeu a oportunidade de assumir um dos maiores desafios de sua trajetória dentro do\nmovimento: a Presidência do Rotaract Club de Mirandópolis, na gestão 2026–2027.\n\n       Sua caminhada dentro da Família Rotária transformou não apenas sua maneira de enxergar o\nvoluntariado, mas também sua forma de observar o mundo. As experiências vivenciadas ao longo dos anos\nfizeram com que desenvolvesse um olhar mais atento às necessidades do próximo e compreendesse a\nimportância de utilizar seu tempo, suas habilidades e sua disposição em benefício da comunidade.\n\n       Para Marllow, o voluntariado representa a decisão de sair da zona de conforto para fazer a\ndiferença. Acredita que jovens dispostos a dedicar parte de seu tempo ao próximo possuem a capacidade\nde promover mudanças significativas na sociedade. Mesmo quando os impactos parecem pequenos, são\nações que podem deixar marcas profundas e duradouras na vida daqueles que são alcançados.\n\n       Sua trajetória é, portanto, marcada por liderança, aprendizado, serviço e propósito. Desde os\nprimeiros passos no Interact até a presidência do Rotaract, cada experiência contribuiu para a construção\nde sua visão sobre o voluntariado e sobre o papel que os jovens podem desempenhar na transformação da\ncomunidade.\n\n        Para Marllow, fazer parte da Família Rotária é mais do que ocupar cargos ou participar de projetos. É\nservir, aprender, transformar e ser transformado, acreditando que, quando pessoas se unem por um\npropósito maior, pequenas ações podem se tornar grandes mudanças."}, {"nome": "Luís Felipe", "cargo": "Associado", "foto": "assets/members/Luiz Felipe.png", "bio": "Luís Felipe, 23 anos, é uma pessoa que acredita que a vida é construída por momentos,\naprendizados e, principalmente, pelas pessoas que encontramos ao longo da caminhada.\n\n       Atualmente, atua profissionalmente no Grupo Assessor, na área de Helpdesk. Seu interesse pela\ntecnologia sempre esteve presente em sua trajetória e, ao longo de sua experiência profissional, encontrou\nnesse segmento não apenas uma profissão, mas também uma área que proporciona constante\naprendizado, desafios e oportunidades para solucionar problemas e transformar ideias em resultados\nconcretos.\n\n       Recentemente, iniciou uma nova etapa de sua trajetória ao ingressar no Rotaract Club de\nMirandópolis. Mesmo com pouco tempo de participação, a experiência já se tornou significativa,\npermitindo conhecer melhor o propósito do movimento e compreender que o Rotaract vai muito além de\nprojetos e ações sociais.\n\n        Por meio dos encontros, atividades e momentos compartilhados, encontrou no clube um ambiente\nmarcado pelo companheirismo, amizade, conexão e vontade de fazer a diferença. Nesse curto período, já\nteve a oportunidade de construir novas amizades e estabelecer laços que acredita que levará consigo por\nmuitos anos.\n\n       Para Luís Felipe, fazer parte do Rotaract representa uma oportunidade de aprender, contribuir e\ncrescer ao lado de outras pessoas, entendendo que cada experiência e cada encontro podem deixar\nmarcas positivas em nossa trajetória.\n\n       Atualmente, segue buscando seu crescimento profissional e pessoal, sempre disposto a aprender,\nenfrentar novos desafios e aproveitar as oportunidades que surgem ao longo do caminho. Acredita que\nainda possui muito a viver, aprender e conquistar, e vê no Rotaract mais uma oportunidade de construir\nexperiências significativas, contribuir com a comunidade e fazer parte de uma história que está apenas\ncomeçando."}, {"nome": "Lucas Goulart da Silva", "cargo": "Secretário · Gestão 2026–2027", "foto": "assets/members/Lucas Goulart.png", "bio": "Lucas Goulart da Silva ingressou no Rotaract Club de Mirandópolis em 2025, após ser convidado\npor Marlon. Embora inicialmente conhecesse pouco sobre o movimento, teve a oportunidade de vivenciar\nna prática o propósito do Rotaract por meio do projeto Aulão ENEM. A experiência despertou seu interesse\ne mostrou que o clube poderia representar muito mais do que simplesmente participar de encontros e\nações.\n\n       A partir de então, passou a se envolver em diferentes projetos e atividades, encontrando no\nvoluntariado e no companheirismo uma nova maneira de enxergar a comunidade e compreender o seu\npróprio papel dentro dela.\n\n        Sua trajetória também o levou a compreender de forma mais profunda o verdadeiro significado de\nservir: não apenas ajudar quando existe uma necessidade, mas estar disposto a identificar desafios,\nmobilizar pessoas e construir soluções capazes de transformar realidades.\n\n       Na Gestão 2026/2027, Lucas assume, pela primeira vez, uma função dentro do clube, como\nSecretário. Aceitou esse desafio por acreditar que fazer parte do Rotaract também significa assumir\nresponsabilidades e contribuir ativamente para que o clube cresça, se fortaleça e tenha uma atuação cada\nvez mais relevante na comunidade.\n\n       Para esta gestão, pretende contribuir especialmente com a organização do clube, o envolvimento\ndos associados, o desenvolvimento de novos projetos e a aproximação de novos jovens, ajudando a\nconstruir um Rotaract cada vez mais participativo, atuante e capaz de gerar impacto positivo.\n\n       Para Lucas, o Rotaract representa uma oportunidade de servir, aprender, liderar e transformar.\n\n       É com esse propósito que inicia sua primeira experiência como dirigente, buscando não apenas\nocupar uma função, mas deixar uma contribuição significativa e ajudar a fazer com que, ao final da gestão,\no clube esteja ainda melhor do que estava quando começou.\n\n       “Servir é mais do que ajudar. É escolher fazer parte da mudança.”"}, {"nome": "Higor Fogassa Costalongo", "cargo": "1º Tesoureiro · Gestão 2026–2027", "foto": "assets/members/Higor.png", "bio": "Advogado | Associado desde 2025\n\n       Higor Fogassa Costalongo encontrou no voluntariado uma forma concreta de retribuir à sociedade e\ncontribuir para o desenvolvimento de sua comunidade. Em busca de uma instituição que estivesse à altura\ndesse propósito, encontrou na família rotária um movimento reconhecido por sua credibilidade,\ncompanheirismo e compromisso com o serviço.\n\n       Ingressou no Rotaract Club de Mirandópolis em 2025, encontrando no clube não apenas um\nespaço para realizar ações voluntárias, mas também uma oportunidade de desenvolver novas habilidades,\nconstruir relacionamentos e participar ativamente de iniciativas capazes de gerar impacto positivo.\n\n        Em 2026, ampliou ainda mais seu envolvimento com o movimento ao tornar-se também associado\ndo Rotary Club de Mirandópolis, passando a atuar como duplo associado e fortalecendo sua conexão com\na família rotária.\n\n       Para Higor, servir representa uma escolha consciente de dedicar tempo e conhecimento em\nbenefício do próximo. É movido pela convicção de que o tempo doado ao próximo é um dos\ninvestimentos de maior retorno que alguém pode realizar em sua própria comunidade.\n\n       Cargos Diretivos\n\n       Na Gestão “Crie Impacto Duradouro” — 2026/2027, Higor assume responsabilidades tanto no\nRotaract quanto no Rotary Club de Mirandópolis:\n\n   •   1º Tesoureiro do Rotaract Club de Mirandópolis/SP;\n\n   •   1º Imagem Pública do Rotary Club de Mirandópolis/SP.\n\n        Ao assumir essas funções, coloca sua experiência, dedicação e compromisso a serviço do\nfortalecimento das instituições das quais faz parte, contribuindo para uma gestão organizada, transparente\ne cada vez mais conectada com a comunidade.\n\n      Para Higor, fazer parte da família rotária significa transformar disposição em ação, tempo em\nimpacto e serviço em legado."}];
const membersGrid = document.getElementById('membersGrid');
const membersNote = document.getElementById('membersNote');
const memberSearch = document.getElementById('memberSearch');
const memberModal = document.getElementById('memberModal');
const memberModalPhoto = document.getElementById('memberModalPhoto');
const memberModalName = document.getElementById('memberModalName');
const memberModalRole = document.getElementById('memberModalRole');
const memberModalBio = document.getElementById('memberModalBio');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' })[char]);
}

function renderMembers(filter = '') {
  if (!membersGrid) return;
  const term = filter.trim().toLowerCase();
  const filtered = associados.filter(member =>
    `${member.nome} ${member.cargo || ''} ${member.bio || ''}`.toLowerCase().includes(term)
  );

  membersGrid.innerHTML = filtered.map((member, index) => `
    <button class="member-card reveal visible" type="button" data-member="${associados.indexOf(member)}" aria-label="Ver perfil de ${escapeHtml(member.nome)}">
      <img class="member-photo" src="${member.foto}" alt="Foto de ${escapeHtml(member.nome)}" loading="lazy">
      <b>✦</b>
      <div class="member-card-info">
        <h3>${escapeHtml(member.nome)}</h3>
        <p>${escapeHtml(member.cargo || 'Associado')}</p>
        <span>Ver trajetória <i>↗</i></span>
      </div>
    </button>
  `).join('');

  membersGrid.querySelectorAll('[data-member]').forEach(card => {
    card.addEventListener('click', () => openMember(Number(card.dataset.member)));
  });

  if (!filtered.length) {
    membersNote.textContent = 'Nenhum associado encontrado para essa busca.';
  } else {
    membersNote.textContent = `${filtered.length} associado${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}.`;
  }
}

function openMember(index) {
  const member = associados[index];
  if (!member || !memberModal) return;
  memberModalPhoto.src = member.foto;
  memberModalPhoto.alt = `Foto de ${member.nome}`;
  memberModalName.textContent = member.nome;
  memberModalRole.textContent = member.cargo || 'Associado';
  memberModalBio.innerHTML = member.bio
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map(paragraph => `<p>${escapeHtml(paragraph).replace(/\n/g, ' ')}</p>`)
    .join('');
  memberModal.classList.add('open');
  memberModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeMember() {
  if (!memberModal) return;
  memberModal.classList.remove('open');
  memberModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-close-member]').forEach(el => el.addEventListener('click', closeMember));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && memberModal?.classList.contains('open')) closeMember();
});

renderMembers();
memberSearch?.addEventListener('input', e => renderMembers(e.target.value));


// Projetos oficiais — informações e registros fornecidos pelo clube.
const projetos = [
  {categoria:'CAUSA GLOBAL · END POLIO NOW', nome:'End Polio Now', foto:'assets/projects/end-polio-now.png', texto:[
    'Juntos, podemos construir um mundo livre da poliomielite.',
    'A End Polio Now é uma das maiores iniciativas humanitárias da família Rotary, dedicada à erradicação mundial da poliomielite. Por meio da conscientização, mobilização das comunidades, apoio às campanhas de vacinação e arrecadação de recursos, trabalhamos para que nenhuma criança precise sofrer com uma doença que pode ser prevenida.',
    'Como parte da família Rotary, o Rotaract Club de Mirandópolis acredita que grandes transformações começam com pequenas atitudes. Por isso, buscamos contribuir para essa causa por meio de ações que aproximam a comunidade, incentivam a prevenção e fortalecem a importância da vacinação.',
    'Cada gota conta. Cada ação importa. Cada pessoa pode fazer a diferença. Nosso compromisso é continuar mobilizando pessoas, levando informação e apoiando iniciativas que nos aproximem de um futuro 100% livre da pólio.'
  ]},
  {categoria:'SAÚDE · COMUNIDADE', nome:'Campanha da Pólio + Dia das Crianças', foto:'assets/projects/campanha-polio-dia-criancas.png', texto:['Uma ação que une conscientização e mobilização em torno da prevenção da poliomielite com momentos especiais dedicados às crianças.','Os registros mostram o envolvimento do clube e da comunidade em uma iniciativa de informação, convivência e serviço.']},
  {categoria:'END POLIO NOW', nome:'Eu quero erradicar a pólio!', foto:'assets/projects/eu-quero-erradicar-polio.png', texto:['Campanha de conscientização em apoio à erradicação da poliomielite, reforçando a importância da vacinação e da participação de toda a comunidade.','A mensagem central é simples: cada pessoa pode fazer a diferença na construção de um mundo livre da pólio.']},
  {categoria:'INFÂNCIA · INCLUSÃO', nome:'Crianças em Movimento', foto:'assets/projects/criancas-em-movimento.png', texto:['Projeto desenvolvido com foco em crianças e no estímulo ao movimento e à participação, em parceria com iniciativas da comunidade.','A ação valoriza experiências de inclusão, desenvolvimento e bem-estar por meio de atividades pensadas para o público infantil.']},
  {categoria:'SUSTENTABILIDADE', nome:'Campanha do Lixo Eletrônico', foto:'assets/projects/lixo-eletronico.png', texto:['Campanha voltada à arrecadação e à conscientização sobre o descarte correto de materiais eletrônicos.','Além de mobilizar a comunidade, a iniciativa reforça a importância da responsabilidade ambiental e da destinação adequada desses resíduos.']},
  {categoria:'ASSISTÊNCIA SOCIAL', nome:'Entrega das Cestas Básicas', foto:'assets/projects/entrega-cestas-basicas.png', texto:['Uma mobilização solidária para arrecadar e entregar alimentos, apoiando famílias e aproximando o voluntariado das necessidades da comunidade.','Os registros mostram o trabalho em equipe desde a organização até a entrega das cestas.']},
  {categoria:'SOLIDARIEDADE · PÁSCOA', nome:'Páscoa Vale Bis', foto:'assets/projects/pascoa-vale-bis.png', texto:['Ação de arrecadação e entrega de chocolates para compartilhar alegria e carinho durante o período da Páscoa.','Uma iniciativa construída com o propósito de transformar pequenos gestos em momentos especiais para quem recebe.']}
];
const projectModal=document.getElementById('projectModal');
const projectModalPhoto=document.getElementById('projectModalPhoto');
const projectModalCategory=document.getElementById('projectModalCategory');
const projectModalName=document.getElementById('projectModalName');
const projectModalText=document.getElementById('projectModalText');
function openProject(index){const p=projetos[index];if(!p||!projectModal)return;projectModalPhoto.src=p.foto;projectModalPhoto.alt=`Registro do projeto ${p.nome}`;projectModalCategory.textContent=p.categoria;projectModalName.textContent=p.nome;projectModalText.innerHTML=p.texto.map(t=>`<p>${escapeHtml(t)}</p>`).join('');projectModal.classList.add('open');projectModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
function closeProject(){if(!projectModal)return;projectModal.classList.remove('open');projectModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
document.querySelectorAll('[data-project]').forEach(el=>el.addEventListener('click',()=>openProject(Number(el.dataset.project))));
document.querySelectorAll('[data-close-project]').forEach(el=>el.addEventListener('click',closeProject));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&projectModal?.classList.contains('open'))closeProject();});
