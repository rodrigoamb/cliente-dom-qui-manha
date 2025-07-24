const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes");
const modalEditar = document.getElementById("modal-editar");
const modalExcluir = document.getElementById("modal-excluir");

//---- inputs -----

const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputCpf = document.getElementById("cpf");
const inputEmail = document.getElementById("email");

// ---- inputs do modal editar -----

const inputEditNome = document.getElementById("edit-nome");
const inputEditSobrenome = document.getElementById("edit-sobrenome");
const inputEditCpf = document.getElementById("edit-cpf");
const inputEditEmail = document.getElementById("edit-email");

const formEdicao = document.getElementById("form-edicao");
const btnCancelarEdicao = document.getElementById("cancelar-edicao");
const btnConfirmarExclusao = document.getElementById("confirmar-exclusao");
const btnCancelarExclusao = document.getElementById("cancelar-exclusao");

const espacoMensagem = document.querySelector("#mensagem");

const clientes = [];

let indexEditando = null;
let indexExcluindo = null;

function renderizarTabela() {
  tabela.innerHTML = "";

  clientes.forEach((cliente, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${cliente.nome}</td>
    <td>${cliente.sobrenome}</td>
    <td>${cliente.cpf}</td>
    <td>${cliente.email}</td>
    `;

    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");
    btnEditar.onclick = () => abrirModalEditar(cliente, index);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("excluir");
    btnExcluir.onclick = () => abrirModalExcluir(index);

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    tabela.appendChild(tr);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); //bloqueia o recarregamento da página

  const nome = inputNome.value;
  const sobrenome = inputSobrenome.value;
  const cpf = inputCpf.value;
  const email = inputEmail.value;

  if (!nome || !sobrenome || !cpf || !email) {
    espacoMensagem.textContent = "Preencha todos os campos";
    return;
  }

  const objCliente = {
    nome,
    sobrenome,
    cpf,
    email,
  };

  clientes.push(objCliente);

  form.reset();
  renderizarTabela();
});

function abrirModalExcluir(index) {
  console.log("Clicou no index: ", index);
  indexExcluindo = index;

  modalExcluir.style.display = "flex";
}

function fecharModalExcluir() {
  indexExcluindo = null;
  modalExcluir.style.display = "none";
}

function abrirModalEditar(cliente, index) {
  console.log(cliente);
  console.log(index);

  indexEditando = index;
  modalEditar.style.display = "flex";

  inputEditNome.value = cliente.nome;
  inputEditSobrenome.value = cliente.sobrenome;
  inputEditCpf.value = cliente.cpf;
  inputEditEmail.value = cliente.email;
}

btnCancelarExclusao.addEventListener("click", fecharModalExcluir);

renderizarTabela();
