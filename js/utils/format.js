/* ==========================================
   FORMATAR MOEDA
========================================== */
function formatarMoeda(valor){

  return Number(valor || 0)

    .toLocaleString(

      'pt-BR',

      {
        style:'currency',
        currency:'BRL'
      }

    );

}


/* ==========================================
   FORMATAR DATA
========================================== */
function formatarData(data){

  if(!data){

    return '-';

  }

  const dataFormatada =
    new Date(data);

  if(
    isNaN(dataFormatada)
  ){

    return '-';

  }

  return dataFormatada
    .toLocaleDateString(
      'pt-BR'
    );

}


/* ==========================================
   FORMATAR TELEFONE
========================================== */
function formatarTelefone(telefone){

  telefone = String(
    telefone || ''
  ).replace(/\D/g,'');

  if(
    telefone.length === 11
  ){

    return telefone.replace(

      /(\d{2})(\d{5})(\d{4})/,

      '($1) $2-$3'

    );

  }

  return telefone;

}