function mostrarToast(
  mensagem,
  tipo='sucesso'
){

  const container =
    document.getElementById(
      'toastContainer'
    );

  const toast =
    document.createElement('div');

  toast.className =
    `toast ${tipo}`;

  toast.innerText = mensagem;

  container.appendChild(toast);

  setTimeout(() => {

    toast.remove();

  },3000);

}