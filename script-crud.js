const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const caixaTextoAdicionarTarefa = document.querySelector('.app__form-textarea');
const listaTarefas = document.querySelector('.app__section-task-list');
const botaoCancelar = document.getElementById('botao_cancelar');
const paragrafoTarefaSelecionada = document.querySelector('.app__section-active-task-description');
let tarefaSelecionada = null;
let itemTarefaSelecionada = null;
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const botaoRemoverTarefasConcluidas = document.querySelector('#btn-remover-concluidas');
const botaoRemoverTodasTarefas = document.querySelector('#btn-remover-todas');
function salvarLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
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
    imagemEditarTarefa.setAttribute('src', 'imagens/edit.png');
    botaoEditarTarefa.appendChild(imagemEditarTarefa);
    botaoEditarTarefa.addEventListener('click', () => {
        let novoNomeTarefa = prompt('Qual o novo nome para a tarefa?');
        if (novoNomeTarefa) {
            paragrafoItemtarefa.textContent = novoNomeTarefa;
            tarefa.nome = novoNomeTarefa;
            salvarLocalStorage();
        }
    })

    itemLista.append(itemStatusTarefa);
    itemLista.append(paragrafoItemtarefa);
    itemLista.append(botaoEditarTarefa);

    if (tarefa.concluida) {
        itemLista.classList.add('app__section-task-list-item-complete');
        botaoEditarTarefa.setAttribute('disabled', 'disabled');
    } else {
        itemLista.addEventListener('click', () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            });
            if (tarefaSelecionada == tarefa) {
                paragrafoTarefaSelecionada.textContent = '';
                tarefaSelecionada = null;
                itemTarefaSelecionada = null;
                return;
            };
            tarefaSelecionada = tarefa;
            itemTarefaSelecionada = itemLista;
            paragrafoTarefaSelecionada.textContent = tarefa.nome;
            itemLista.classList.add('app__section-task-list-item-active');
        });
    }

    return itemLista;
}

botaoAdicionarTarefa.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.toggle('hidden');
});
botaoCancelar.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.add('hidden');
});

formularioAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let tarefa = {
        nome: caixaTextoAdicionarTarefa.value
    }
    tarefas.push(tarefa);
    salvarLocalStorage();
    const elementoTarefa = criarItemTarefa(tarefa);
    listaTarefas.append(elementoTarefa);
    caixaTextoAdicionarTarefa.value = "";
    formularioAdicionarTarefa.classList.add('hidden');
});
tarefas.forEach(tarefa => {
    const elementoTarefa = criarItemTarefa(tarefa);
    listaTarefas.append(elementoTarefa);
});
document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && itemTarefaSelecionada) {
        itemTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        itemTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        itemTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        paragrafoTarefaSelecionada.textContent = '';
        tarefaSelecionada.concluida = true;
        salvarLocalStorage();
    };
});
function removerTarefas (todasTarefas) {
    let seletorTarefas = '.app__section-task-list-item-complete'
    if (todasTarefas) {
        seletorTarefas = '.app__section-task-list-item'
    }
    document.querySelectorAll(seletorTarefas).forEach(elemento => {
        elemento.remove()
    });
    tarefas =  todasTarefas ? [] : tarefas.filter(tarefa => !tarefa.concluida);
    salvarLocalStorage();
}
botaoRemoverTarefasConcluidas.onclick = () => removerTarefas(false);
botaoRemoverTodasTarefas.onclick = () => removerTarefas(true);