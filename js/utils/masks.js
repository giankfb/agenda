/* ==========================================
   MÁSCARA TELEFONE
========================================== */
function mascaraTelefone(input){

  let valor =

    input.value.replace(/\D/g,'');

  valor = valor.substring(0,11);

  if(valor.length > 10){

    valor = valor.replace(
      /^(\d{2})(\d{5})(\d{4}).*/,
      '($1) $2-$3'
    );

  }else{

    valor = valor.replace(
      /^(\d{2})(\d{4})(\d{4}).*/,
      '($1) $2-$3'
    );

  }

  input.value = valor;

}


/* ==========================================
   MÁSCARA MOEDA
========================================== */
function mascaraNumero(input){

  input.value = input.value
    .replace(',','.')
    .replace(/[^\d.]/g,'');

}


/* ==========================================
   MÁSCARA HORA
========================================== */
function mascaraHorario(input){

  let valor =

    input.value.replace(/\D/g,'');

  valor = valor.substring(0,4);

  if(valor.length >= 3){

    valor = valor.replace(
      /(\d{2})(\d{1,2})/,
      '$1:$2'
    );

  }

  input.value = valor;

}