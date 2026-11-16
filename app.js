const components = [
  {
    name: "Soquete do processador", type: "Processamento", x: 330, y: 151,
    purpose: "Recebe o processador (CPU) e conecta seus contatos elétricos à placa-mãe. O tipo de soquete ajuda a determinar quais processadores podem ser instalados.",
    location: "Na metade superior do diagrama, procure o encaixe quadrado com moldura metálica e alavanca."
  },
  {
    name: "Slots de memória RAM (DIMM)", type: "Memória", x: 520, y: 116,
    purpose: "Recebem os módulos de memória RAM. A RAM guarda temporariamente os dados e instruções usados pelos programas em execução.",
    location: "À direita do soquete da CPU, observe os quatro encaixes longos e paralelos."
  },
  {
    name: "Slot PCI Express x16", type: "Expansão", x: 320, y: 267,
    purpose: "Permite instalar placas de expansão que usam PCI Express, como uma placa de vídeo dedicada. O formato x16 comporta até 16 pistas de comunicação, conforme a ligação da placa-mãe.",
    location: "É o slot horizontal mais comprido, logo abaixo do soquete da CPU."
  },
  {
    name: "Slot PCI Express x1", type: "Expansão", x: 267, y: 357,
    purpose: "Permite instalar placas de expansão que usam uma pista PCI Express, como algumas placas de rede, som ou controladoras USB.",
    location: "Procure o encaixe horizontal curto abaixo do conector M.2, um pouco à esquerda."
  },
  {
    name: "Conector M.2", type: "Armazenamento", x: 430, y: 313,
    purpose: "Recebe um SSD em formato M.2 compatível. A interface do SSD pode ser PCI Express (usada por NVMe) ou SATA, conforme o suporte da placa-mãe.",
    location: "No centro inferior da placa, observe o pequeno conector e os pontos de fixação alinhados à sua esquerda."
  },
  {
    name: "Portas SATA", type: "Armazenamento", x: 599, y: 346,
    purpose: "Conectam o cabo de dados de discos rígidos, SSDs SATA e unidades ópticas compatíveis. A alimentação da unidade vem da fonte por um cabo próprio.",
    location: "Na borda direita, identifique o conjunto de portas com contatos em formato de L."
  },
  {
    name: "Chipset", type: "Comunicação", x: 531, y: 278,
    purpose: "Coordena parte da comunicação entre o processador e interfaces da placa-mãe, como portas USB, SATA e algumas pistas PCI Express. As funções variam conforme a plataforma.",
    location: "Neste diagrama, está sob o dissipador retangular com aletas, à direita do conector M.2."
  },
  {
    name: "Bateria da placa-mãe (CMOS/RTC)", type: "Relógio", x: 454, y: 394,
    purpose: "Mantém o relógio de tempo real (RTC) funcionando quando o computador fica sem alimentação externa. Em alguns projetos, também mantém dados de configuração armazenados em CMOS.",
    location: "Na parte inferior da placa, procure a bateria circular prateada, semelhante a uma moeda."
  },
  {
    name: "Conector ATX de 24 pinos", type: "Alimentação", x: 596, y: 200,
    purpose: "Recebe o cabo principal da fonte e fornece alimentação elétrica à placa-mãe por meio de um conjunto de linhas de tensão e sinais de controle.",
    location: "Na borda direita, ao lado dos slots de memória, procure o conector longo com duas fileiras de contatos."
  },
  {
    name: "Conector EPS de 8 pinos", type: "Alimentação", x: 226, y: 45,
    purpose: "Leva a alimentação de 12 volts da fonte aos reguladores de tensão que alimentam o processador. O cabo costuma ser identificado como CPU ou EPS.",
    location: "Na borda superior, à esquerda, procure o conector agrupado em duas fileiras de quatro contatos."
  },
  {
    name: "Painel traseiro de entrada e saída", type: "Conectividade", x: 116, y: 148,
    purpose: "Reúne portas externas da placa-mãe para ligar periféricos, rede, áudio e, conforme o modelo e a configuração do computador, um monitor.",
    location: "Observe os blocos metálicos alinhados na borda esquerda. Eles ficam voltados para fora do gabinete."
  },
  {
    name: "Conector do painel frontal", type: "Conectividade", x: 550, y: 442,
    purpose: "Liga à placa-mãe os botões de ligar e reiniciar e as luzes indicadoras do gabinete. A posição e a polaridade dos LEDs devem seguir o manual da placa.",
    location: "No canto inferior direito, procure o grupo de pinos pequeno ao lado da borda."
  },
  {
    name: "Conector da ventoinha da CPU", type: "Refrigeração", x: 431, y: 46,
    purpose: "Alimenta a ventoinha do cooler do processador e permite monitorar sua rotação. Em um conector de quatro pinos, o sinal PWM pode controlar a velocidade.",
    location: "Na borda superior, acima e um pouco à direita do soquete, procure o grupo de quatro pinos (CPU_FAN em muitas placas)."
  },
  {
    name: "Conector USB do painel frontal", type: "Conectividade", x: 360, y: 441,
    purpose: "Conecta as portas USB frontais do gabinete aos circuitos USB da placa-mãe. O encaixe e a capacidade dependem da geração USB suportada.",
    location: "Na borda inferior, perto do centro, procure o grupo de pinos alinhados em duas fileiras e com uma posição vazia."
  }
];

const modes = {
  study: { title: "Modo estudo", icon: "book", progress: "Componentes explorados" },
  exercise: { title: "Modo exercício", icon: "edit", progress: "Componentes com nome e função preenchidos" },
  correction: { title: "Modo correção", icon: "checklist", progress: "Componentes com nome e função preenchidos" }
};
const storageKey = "laboratorio-placa-mae:respostas:v1";
const emptyAnswer = { name: "", purpose: "" };
const twoDigits = (num) => String(num).padStart(2, "0");
const byId = (id) => document.getElementById(id);
const visited = new Set([0]);
let answers = readAnswers();
let mode = "study";
let selected = 0;
let correctionVisible = false;

function readAnswers() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) ? components.map((_, index) => ({
      name: typeof saved[index]?.name === "string" ? saved[index].name.slice(0, 120) : "",
      purpose: typeof saved[index]?.purpose === "string" ? saved[index].purpose.slice(0, 600) : ""
    })) : [];
  } catch {
    return [];
  }
}

function saveAnswers() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(answers));
    return true;
  } catch {
    return false;
  }
}

function create(tag, classes, text) {
  const element = document.createElement(tag);
  if (classes) element.className = classes;
  if (text !== undefined) element.textContent = text;
  return element;
}

function icon(name) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  element.setAttribute("class", "icon");
  element.setAttribute("aria-hidden", "true");
  use.setAttribute("href", "#i-" + name);
  element.append(use);
  return element;
}

function select(index, scroll = false) {
  if (index < 0 || index >= components.length) return;
  selected = index;
  if (mode === "study") visited.add(index);
  render();
  announce();
  if (scroll && matchMedia("(max-width: 820px)").matches) {
    const panel = byId("detalhes");
    const bounds = panel.getBoundingClientRect();
    if (bounds.top < 0 || bounds.top + 185 > window.innerHeight) {
      panel.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }
}

function announce(message) {
  byId("announcements").textContent = message ??
    (revealsAnswers() ? components[selected].name : "Componente " + twoDigits(selected + 1));
}

function revealsAnswers() {
  return mode === "study" || (mode === "correction" && correctionVisible);
}

function updateNavigation() {
  const number = twoDigits(selected + 1);
  const locked = mode === "correction" && !correctionVisible;
  byId("position").textContent = number + " / " + components.length;
  byId("previous").disabled = selected === 0;
  byId("next").disabled = selected === components.length - 1;
  byId("component-nav").hidden = locked;

  const completed = components.map((_, index) => Boolean(answers[index]?.name.trim() && answers[index]?.purpose.trim()));
  const explored = mode === "study" ? visited.size : completed.filter(Boolean).length;
  const progress = byId("progress");
  progress.hidden = locked;
  progress.setAttribute("aria-label", modes[mode].progress);
  progress.setAttribute("aria-valuenow", String(explored));
  progress.firstElementChild.style.width = (100 * explored / components.length) + "%";
  for (const [index, button] of markerButtons.entries()) {
    button.setAttribute("aria-pressed", String(index === selected));
    button.setAttribute("aria-label", "Componente " + twoDigits(index + 1));
  }
  for (const [index, button] of numberButtons.entries()) {
    button.setAttribute("aria-pressed", String(index === selected));
    const done = mode === "study" ? visited.has(index) : completed[index];
    button.dataset.done = String(done);
    button.setAttribute("aria-label", "Componente " + twoDigits(index + 1) + (done ? (mode === "study" ? ", explorado" : ", preenchido") : ""));
  }
}

function componentBadge(type) {
  const meta = create("div", "component-meta");
  const number = create("span", "component-number", twoDigits(selected + 1));
  number.setAttribute("aria-hidden", "true");
  meta.append(number, create("span", "component-type", type));
  return meta;
}

function showComponent(body) {
  const component = components[selected];
  const details = create("dl", "component-detail");
  details.append(create("dt", "", "Função principal"), create("dd", "", component.purpose));
  const location = create("div", "position-note");
  const locationText = create("div");
  locationText.append(create("strong", "", "Como localizar"), document.createTextNode(component.location));
  location.append(icon("info"), locationText);
  body.append(componentBadge(component.type), create("h3", "", component.name), details, location);

  if (mode === "correction") {
    const answer = answers[selected] ?? emptyAnswer;
    const work = create("div", "work-copy");
    work.append(create("strong", "", "Resposta registrada neste navegador"));
    if (answer.name.trim() || answer.purpose.trim()) {
      work.append(create("p", "", "Nome: " + (answer.name.trim() || "—")));
      work.append(create("p", "", "Função: " + (answer.purpose.trim() || "—")));
    } else {
      work.append(create("p", "", "Ainda não há resposta para este componente."));
    }
    body.append(work);
    const actions = create("div", "button-row");
    const hide = create("button", "action-button", "Ocultar gabarito");
    hide.type = "button";
    hide.addEventListener("click", () => toggleCorrection(false));
    actions.append(hide);
    body.append(actions);
  }
}

function showExercise(body) {
  const answer = answers[selected] ?? emptyAnswer;
  const number = twoDigits(selected + 1);
  const form = create("form");
  const note = create("p", "save-note", "O preenchimento é salvo neste navegador.");
  note.setAttribute("role", "status");
  form.addEventListener("submit", (event) => event.preventDefault());

  for (const [key, labelText, placeholder, maxLength] of [
    ["name", "Nome do componente", "Digite o nome", 120],
    ["purpose", "Função principal", "Descreva o que ele faz", 600]
  ]) {
    const group = create("div", "field-group");
    const field = create(key === "name" ? "input" : "textarea");
    field.id = "answer-" + key;
    field.autocomplete = "off";
    field.spellcheck = false;
    field.maxLength = maxLength;
    field.placeholder = placeholder;
    field.value = answer[key];
    if (key === "purpose") field.rows = 2;
    field.addEventListener("input", () => {
      answers[selected] = { ...(answers[selected] ?? emptyAnswer), [key]: field.value };
      const saved = saveAnswers();
      const message = saved ? "O preenchimento é salvo neste navegador." : "O navegador bloqueou o salvamento. Os campos são mantidos nesta sessão.";
      if (note.textContent !== message) note.textContent = message;
      updateNavigation();
    });
    const label = create("label", "", labelText);
    label.htmlFor = field.id;
    group.append(label, field);
    form.append(group);
  }
  body.append(componentBadge("Identificação"), create("h3", "", "Componente " + number),
    create("p", "mode-help", "Observe o ponto selecionado no diagrama e escreva o nome e a função do componente."), form, note);
}

function showCorrectionPrompt(body) {
  const explanation = create("p", "mode-help", "Abra o gabarito para consultar as 14 respostas e comparar com o preenchimento deste navegador.");
  const button = create("button", "action-button primary", "Exibir gabarito");
  button.id = "show-key";
  button.type = "button";
  button.addEventListener("click", () => toggleCorrection(true));
  body.append(componentBadge("Área de correção"), create("h3", "", "Gabarito do professor"), explanation, button);
}

function toggleCorrection(visible) {
  correctionVisible = visible;
  render();
  if (visible) {
    const heading = byId("inspector-body").querySelector("h3");
    heading.tabIndex = -1;
    heading.focus();
    announce("Gabarito exibido.");
  } else {
    byId("show-key").focus();
    announce("Gabarito oculto.");
  }
}

function renderAnswerKey() {
  const visible = mode === "correction" && correctionVisible;
  byId("answer-key").hidden = !visible;
  const list = byId("key-list");
  if (!visible) {
    list.replaceChildren();
    return;
  }
  if (list.childElementCount) return;
  for (const [index, component] of components.entries()) {
    const item = create("li");
    const button = create("button", "key-select", twoDigits(index + 1));
    const answer = create("div");
    button.type = "button";
    button.setAttribute("aria-label", "Ver componente " + twoDigits(index + 1) + " no diagrama");
    button.addEventListener("click", () => {
      select(index);
      markerButtons[index].focus({ preventScroll: true });
      byId("diagrama").scrollIntoView({ block: "start" });
    });
    answer.append(create("strong", "", component.name), create("p", "", component.purpose));
    item.append(button, answer);
    list.append(item);
  }
}

function render() {
  updateNavigation();
  const body = byId("inspector-body");
  body.replaceChildren();
  if (revealsAnswers()) showComponent(body);
  else if (mode === "exercise") showExercise(body);
  else showCorrectionPrompt(body);
  renderAnswerKey();
}

function addNumberButton(component, index, onBoard) {
  const number = twoDigits(index + 1);
  const button = create("button", onBoard ? "marker" : "number-button");
  button.type = "button";
  button.append(create("span", "", number));
  if (onBoard) {
    button.style.setProperty("--x", component.x / 7 + "%");
    button.style.setProperty("--y", component.y / 4.88 + "%");
  }
  button.addEventListener("click", () => select(index, true));
  byId(onBoard ? "markers" : "number-list").append(button);
  return button;
}

const markerButtons = components.map((component, index) => addNumberButton(component, index, true));
const numberButtons = components.map((component, index) => addNumberButton(component, index, false));
const modeButtons = [...document.querySelectorAll("[data-mode]")];
for (const button of modeButtons) {
  button.addEventListener("click", () => {
    const requested = button.dataset.mode;
    if (requested === mode) return;
    mode = requested;
    correctionVisible = false;
    if (mode === "study") visited.add(selected);
    for (const item of modeButtons) item.setAttribute("aria-pressed", String(item === button));
    byId("inspector-title").textContent = modes[mode].title;
    byId("inspector-icon").setAttribute("href", "#i-" + modes[mode].icon);
    render();
    announce(modes[mode].title);
  });
}
byId("previous").addEventListener("click", () => {
  select(selected - 1);
  if (selected === 0) byId("next").focus();
});
byId("next").addEventListener("click", () => {
  select(selected + 1);
  if (selected === components.length - 1) byId("previous").focus();
});
render();
