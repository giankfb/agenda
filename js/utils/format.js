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

  return new Date(data)

    .toLocaleDateString('pt-BR');

}