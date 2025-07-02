const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const caixaTextoAdicionarTarefa = document.querySelector('.app__form-textarea');
let tarefas = [];

botaoAdicionarTarefa.addEventListener('click', (evento)=>{
    formularioAdicionarTarefa.classList.toggle('hidden');
});
formularioAdicionarTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    let tarefa = {
        descricao: caixaTextoAdicionarTarefa.value
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});