function getModal(){
  return document.getElementById('modalEvento');
}

/* ============ ABRIR ========== */
function abrirModal(){

  const btnExcluir =
    document.getElementById(
      'btnExcluir'
    );

  if(!eventoEditando){

    limparFormulario();

    btnExcluir.style.display =
      'none';

  }else{

    btnExcluir.style.display =
      'block';

  }

  getModal()
    .classList
    .remove('hidden');
}

/* ============ FECHAR ========== */
function fecharModal(){

  getModal()
    .classList
    .add('hidden');

  limparFormulario();

  eventoEditando = null;

}

/* ============ LIMPAR ========== */
function limparFormulario(){

  document.getElementById('data').value = '';

  document.getElementById('tipo').value =
    'Casamento';

  document.getElementById('cliente').value = '';

  document.getElementById('telefone').value = '';

  document.getElementById('valor').value = '';

  document.getElementById('sinal').value = ' ';

  document.getElementById('restante').value = '';

  document.getElementById('status').value = 'Pendente';

  document.getElementById('local').value = '';

  document.getElementById('horario').value = '';

  document.getElementById('observacoes').value = '';

}