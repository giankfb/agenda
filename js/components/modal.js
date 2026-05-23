/* ==========================================
   MODAL
========================================== */
function getModal(){

  return document.getElementById(
    'modalEvento'
  );

}


/* ==========================================
   ABRIR
========================================== */
function abrirModal(){

  const modal =
    getModal();

  if(!modal) return;

  const btnExcluir =
    document.getElementById(
      'btnExcluir'
    );

  const titulo =
    document.querySelector(
      '#modalEvento h2'
    );

  /* ======================================
     modo novo evento
  ====================================== */
  if(!eventoEditando){

    limparFormulario();

    if(titulo){

      titulo.innerText =
        'Novo Evento';

    }

    if(btnExcluir){

      btnExcluir.style.display =
        'none';

    }

  }

  /* ======================================
     modo edição
  ====================================== */
  else{

    if(titulo){

      titulo.innerText =
        'Editar Evento';

    }

    if(btnExcluir){

      btnExcluir.style.display =
        'block';

    }

  }

  /* ======================================
     abre modal
  ====================================== */
  modal.classList.remove(
    'hidden'
  );

  /* ======================================
     foco no cliente
  ====================================== */
  setTimeout(() => {

    const cliente =
      document.getElementById(
        'cliente'
      );

    if(cliente){

      cliente.focus();

    }

  },100);

}


/* ==========================================
   FECHAR
========================================== */
function fecharModal(){

  const modal =
    getModal();

  if(!modal) return;

  modal.classList.add(
    'hidden'
  );

  limparFormulario();

  eventoEditando = null;

}


/* ==========================================
   LIMPAR FORMULÁRIO
========================================== */
function limparFormulario(){

  const campos = {

    data:'',

    tipo:
      tiposEventoGlobais[0]?.NOME ||
       '',

    cliente:'',

    telefone:'',

    valor:'',

    sinal:'',

    restante:'R$ 0,00',

    status:'Pendente',

    local:'',

    horario:'',

    observacoes:''

  };

  Object.entries(campos)

    .forEach(([id,valor]) => {

      const campo =
        document.getElementById(id);

      if(campo){

        campo.value = valor;

      }

    });

}


/* ==========================================
   FECHAR AO CLICAR FORA
========================================== */
window.addEventListener(
  'click',
  function(e){

    const modal =
      getModal();

    if(
      e.target === modal
    ){

      fecharModal();

    }

  }
);


/* ==========================================
   FECHAR NO ESC
========================================== */
window.addEventListener(
  'keydown',
  function(e){

    if(
      e.key === 'Escape'
    ){

      fecharModal();

    }

  }
);