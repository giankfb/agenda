/* ==========================================
   TOAST
========================================== */
function mostrarToast(
  mensagem,
  tipo = 'sucesso'
){

  let container =
    document.getElementById(
      'toastContainer'
    );

  /* ======================================
     cria container se não existir
  ====================================== */
  if(!container){

    container =
      document.createElement('div');

    container.id =
      'toastContainer';

    document.body.appendChild(
      container
    );

  }

  /* ======================================
     limite de toasts
  ====================================== */
  const maxToasts = 4;

  while(
    container.children.length
      >= maxToasts
  ){

    container.firstChild.remove();

  }

  /* ======================================
     ícone
  ====================================== */
  let icone = '✓';

  if(tipo === 'erro'){

    icone = '⚠';

  }

  if(tipo === 'aviso'){

    icone = '⏳';

  }

  /* ======================================
     toast
  ====================================== */
  const toast =
    document.createElement('div');

  toast.className =
    `toast ${tipo}`;

  toast.innerHTML = `

    <div class="toast-content">

      <span class="toast-icon">
        ${icone}
      </span>

      <span class="toast-message">
        ${mensagem}
      </span>

    </div>

  `;

  container.appendChild(toast);

  /* ======================================
     anima saída
  ====================================== */
  setTimeout(() => {

    toast.classList.add(
      'toast-saindo'
    );

    setTimeout(() => {

      toast.remove();

    },300);

  },3000);

}