function getModal(){
  return document.getElementById('modalEvento');
}

function abrirModal(){

  if(!eventoEditando){
    limparFormulario();
  }

  getModal()
    .classList
    .remove('hidden');
}

function fecharModal(){

  getModal()
    .classList
    .add('hidden');
}

function limparFormulario(){

  document.getElementById('data').value = '';

  document.getElementById('tipo').value =
    'Casamento';

  document.getElementById('cliente').value = '';

  document.getElementById('telefone').value = '';

  document.getElementById('valor').value = '';

  document.getElementById('sinal').value = '';

}