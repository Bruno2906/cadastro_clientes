const nome = document.getElementById('nome')
const email = document.getElementById('email')
const salvar = document.getElementById('salvar')
const limpar = document.getElementById('limpar')
const lista = document.getElementById('lista-clientes')

let clientes = JSON.parse(localStorage.getItem('clientes')) || []
let editIndex = null

// Salvar cliente
function salvarCliente() {

    if (nome.value === '' || email.value === '') {
        alert('Preencha todos os campos!')
        return
    }

    const cliente = {
        nome: nome.value,
        email: email.value
    }

    //se estiver editando
    if(editIndex !== null) {
        clientes[editIndex] = cliente
        editIndex = null
    } else {
        clientes.push(cliente)
    }

    localStorage.setItem('clientes', JSON.stringify(clientes))

    renderizar()
    limparCampos()
}

// Renderizar tabela
function renderizar() {
    lista.innerHTML = ''

    clientes.forEach((cliente, index) => {

        let linha = document.createElement('tr')

        linha.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>
    <button onclick="editar(${index})">Editar</button>
    <button onclick="deletar(${index})">Excluir</button>
            </td>
        `

        lista.appendChild(linha)
    })
}

// Deletar cliente
function deletar(index) {
    clientes.splice(index, 1)
    localStorage.setItem('clientes', JSON.stringify(clientes))
    renderizar()
}

// função editar
function editar(index) {
    nome.value = clientes[index].nome
    email.value = clientes[index].email

    editIndex = index

    alert("modo edição ativado!")

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Limpar campos
function limparCampos() {
    nome.value = ''
    email.value = ''
}

// Limpar tudo
function limparTudo() {
    if (confirm('Deseja limpar tudo?')) {
        clientes = []
        localStorage.removeItem('clientes')
        renderizar()
    }
}

// Eventos
salvar.addEventListener('click', salvarCliente)
limpar.addEventListener('click', limparTudo)
 

// Carregar ao iniciar
renderizar()

window.editar = editar
window.deletar = deletar
