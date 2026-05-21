/* ==========================================
   VALIDAR TELEFONE
========================================== */
function validarTelefone(telefone){

  const numero =

    String(telefone || '')
      .replace(/\D/g,'');

  return numero.length >= 10;

}