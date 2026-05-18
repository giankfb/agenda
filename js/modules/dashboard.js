async function carregarDashboard() {
  const eventos = await api('listarEventos');

  console.log(eventos);
}