const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const caixaTextoAdicionarTarefa = document.querySelector('.app__form-textarea');
console.log(caixaTextoAdicionarTarefa)
const listaTarefas = document.querySelector('.app__section-task-list')
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function criarItemTarefa(tarefa) {
    const itemLista = document.createElement('li');
    itemLista.classList.add('app__section-task-list-item');
    const itemStatusTarefa = document.createElement('svg');
    itemStatusTarefa.innerHTML = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafoItemtarefa = document.createElement('p');
    paragrafoItemtarefa.classList.add('app__section-task-list-item-description');
    paragrafoItemtarefa.textContent = tarefa.nome;

    const botaoEditarTarefa = document.createElement('button');
    botaoEditarTarefa.classList.add('app_button-edit');
    const imagemEditarTarefa = document.createElement('img');
    imagemEditarTarefa.setAttribute('src' , 'imagens/edit.png')
    botaoEditarTarefa.appendChild(imagemEditarTarefa);

    itemLista.append(itemStatusTarefa);
    itemLista.append(paragrafoItemtarefa);
    itemLista.append(botaoEditarTarefa);

    return itemLista
}

botaoAdicionarTarefa.addEventListener('click', (evento) => {
    formularioAdicionarTarefa.classList.toggle('hidden');
});
formularioAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let tarefa = {
        nome: caixaTextoAdicionarTarefa.value
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    const elementoTarefa = criarItemTarefa(tarefa);
    listaTarefas.append(elementoTarefa)
    caixaTextoAdicionarTarefa.value = "";
    formularioAdicionarTarefa.classList.add('hidden')
});
tarefas.forEach(tarefa => {
    const elementoTarefa = criarItemTarefa(tarefa);
    listaTarefas.append(elementoTarefa);
});