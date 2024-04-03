let participantes = [
  {
    nome: "Guilherme Kalleu",
    email: "guillys@gmail.com",
    dataInscricao: new Date(2024, 1, 22, 19, 20),
    dataCheckIn: new Date(2024, 3, 01, 22, 13)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 1, 02, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    dataInscricao: new Date(2024, 0, 15, 10, 45),
    dataCheckIn: new Date(2024, 0, 18, 12, 30)
  },
  {
    nome: "João Souza",
    email: "joao.souza@example.com",
    dataInscricao: new Date(2023, 11, 10, 15, 10),
    dataCheckIn: new Date(2023, 11, 13, 16, 40)
  },
  {
    nome: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    dataInscricao: new Date(2023, 10, 5, 8, 55),
    dataCheckIn: new Date(2023, 10, 8, 10, 20)
  },
  {
    nome: "Pedro Santos",
    email: "pedro.santos@example.com",
    dataInscricao: new Date(2023, 9, 20, 12, 30),
    dataCheckIn: new Date(2023, 9, 23, 14, 15)
  },
  {
    nome: "Juliana Lima",
    email: "juliana.lima@example.com",
    dataInscricao: new Date(2023, 8, 25, 17, 20),
    dataCheckIn: null
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    dataInscricao: new Date(2023, 7, 30, 9, 10),
    dataCheckIn: new Date(2023, 8, 02, 10, 50)
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda.costa@example.com",
    dataInscricao: new Date(2023, 6, 12, 14, 50),
    dataCheckIn: new Date(2023, 6, 15, 16, 30)
  },
  {
    nome: "Rafael Oliveira",
    email: "rafael.oliveira@example.com",
    dataInscricao: new Date(2023, 5, 28, 11, 25),
    dataCheckIn: new Date(2023, 6, 01, 13, 10)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
    Confirmar check-in
    </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document.querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
    )

    if(participanteExiste) {
      alert('Email já cadastrado!')
      return
    }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

    // confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if(confirm(mensagemConfirmacao) == false) {
      return
    }
    // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  // atualizar check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)
}