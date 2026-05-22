/* ==========================================
   GET ELEMENTO
========================================== */
function getElemento(id){

  const elemento =
    document.getElementById(id);

  if(!elemento){

    console.warn(
      `Elemento não encontrado: ${id}`
    );

  }

  return elemento;

}


/* ==========================================
   NORMALIZAR TEXTO
========================================== */
function normalizarTexto(texto){

  return String(texto || '')

    .normalize('NFD')

    .replace(/[\u0300-\u036f]/g,'')

    .toLowerCase()

    .trim();

}