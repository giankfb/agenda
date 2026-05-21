/* ==========================================
   GET ELEMENTO
========================================== */
function getElemento(id){

  return document.getElementById(id);

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