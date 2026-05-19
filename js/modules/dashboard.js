async function carregarDashboard(){

  const eventos =
    await api('listarEventos');

  renderizarCards(eventos);

  renderizarCalendario(eventos);

}

document
  .getElementById('btnNovoEvento')
  .addEventListener(
    'click',
    abrirModal
  );