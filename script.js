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


// Cadastre os associados oficiais neste array.
// Cada associado recebe automaticamente uma URL individual a partir do nome.
// Você também pode informar um slug manual: { nome: 'Nome Sobrenome', cargo: 'Presidente', slug: 'nome-sobrenome', iniciais: 'NS' }
const associados = [];
const membersGrid = document.getElementById('membersGrid');
const membersNote = document.getElementById('membersNote');
const memberSearch = document.getElementById('memberSearch');
const memberModal = document.getElementById('memberModal');
const memberModalName = document.getElementById('memberModalName');
const memberModalRole = document.getElementById('memberModalRole');
const memberModalAvatar = document.getElementById('memberModalAvatar');
const memberModalText = document.getElementById('memberModalText');
const memberProfileUrl = document.getElementById('memberProfileUrl');
const copyMemberUrl = document.getElementById('copyMemberUrl');
const openMemberUrl = document.getElementById('openMemberUrl');

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function memberSlug(member) {
  return slugify(member.slug || member.nome);
}

function memberUrl(member) {
  const url = new URL(window.location.href);
  url.searchParams.set('associado', memberSlug(member));
  url.hash = '';
  return url.href;
}

function findMemberBySlug(slug) {
  return associados.find(member => memberSlug(member) === slug);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderMembers(filter = '') {
  if (!membersGrid) return;
  const term = filter.trim().toLowerCase();
  const filtered = associados.filter(member =>
    `${member.nome} ${member.cargo || ''}`.toLowerCase().includes(term)
  );

  membersGrid.innerHTML = filtered.map(member => {
    const initials = member.iniciais || member.nome.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
    return `
      <button class="member-card reveal visible" type="button" data-member-slug="${escapeHtml(memberSlug(member))}" aria-label="Abrir perfil de ${escapeHtml(member.nome)}">
        <span class="member-avatar">${escapeHtml(initials)}</span>
        <b>↗</b>
        <span class="member-card-name">${escapeHtml(member.nome)}</span>
        <span class="member-card-role">${escapeHtml(member.cargo || 'Associado')}</span>
        <span class="member-card-hint">Ver perfil individual</span>
      </button>
    `;
  }).join('');

  if (!associados.length) {
    membersNote.textContent = 'A lista de associados será exibida aqui assim que os nomes oficiais forem cadastrados no arquivo script.js.';
  } else if (!filtered.length) {
    membersNote.textContent = 'Nenhum associado encontrado para essa busca.';
  } else {
    membersNote.textContent = `${filtered.length} associado${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}.`;
  }
}

function openMember(member, updateUrl = true) {
  if (!member || !memberModal) return;
  const initials = member.iniciais || member.nome.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
  const url = memberUrl(member);

  memberModalName.textContent = member.nome;
  memberModalRole.textContent = member.cargo || 'Associado';
  memberModalAvatar.textContent = initials;
  memberModalText.textContent = member.bio || 'Associado do Rotaract Club de Mirandópolis, integrante do Distrito 4470.';
  memberProfileUrl.value = url;
  openMemberUrl.href = url;

  memberModal.classList.add('is-open');
  memberModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('member-modal-open');
  document.querySelector('.member-modal-close')?.focus();

  if (updateUrl) {
    history.pushState({ associado: memberSlug(member) }, '', url);
  }
}

function closeMember(updateUrl = true) {
  if (!memberModal) return;
  memberModal.classList.remove('is-open');
  memberModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('member-modal-open');

  if (updateUrl && new URLSearchParams(window.location.search).has('associado')) {
    const url = new URL(window.location.href);
    url.searchParams.delete('associado');
    history.pushState({}, '', url.href);
  }
}

function openMemberFromUrl() {
  const slug = new URLSearchParams(window.location.search).get('associado');
  if (!slug) return;
  const member = findMemberBySlug(slug);
  if (member) openMember(member, false);
}

renderMembers();
memberSearch?.addEventListener('input', e => renderMembers(e.target.value));

membersGrid?.addEventListener('click', e => {
  const card = e.target.closest('[data-member-slug]');
  if (!card) return;
  const member = findMemberBySlug(card.dataset.memberSlug);
  if (member) openMember(member);
});

document.querySelectorAll('[data-close-member]').forEach(el => {
  el.addEventListener('click', () => closeMember());
});

copyMemberUrl?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(memberProfileUrl.value);
    copyMemberUrl.textContent = 'Copiado!';
    setTimeout(() => { copyMemberUrl.textContent = 'Copiar'; }, 1400);
  } catch {
    memberProfileUrl.select();
    document.execCommand('copy');
    copyMemberUrl.textContent = 'Copiado!';
    setTimeout(() => { copyMemberUrl.textContent = 'Copiar'; }, 1400);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && memberModal?.classList.contains('is-open')) closeMember();
});

window.addEventListener('popstate', () => {
  const slug = new URLSearchParams(window.location.search).get('associado');
  if (slug) {
    const member = findMemberBySlug(slug);
    if (member) openMember(member, false);
  } else {
    closeMember(false);
  }
});

openMemberFromUrl();
