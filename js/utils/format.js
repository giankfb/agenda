/* ==========================================
   FORMATAR MOEDA
========================================== */
function formatarMoeda(valor){

  if(
    valor === null
    || valor === undefined
    || valor === ''
  ){

    return 'R$ 0,00';

  }

  return Number(valor)

    .toLocaleString(

      'pt-BR',

      {
        style:'currency',
        currency:'BRL'
      }

    );

}

/* ==========================================
   MOEDA PARA NÚMERO
========================================== */
function moedaParaNumero(valor){

  if(!valor){

    return 0;

  }

  return Number(

    String(valor)

      .replace(/\s/g,'')

      .replace('R$','')

      .replace(/\./g,'')

      .replace(',','.')

  ) || 0;

}


/* ==========================================
   FORMATAR DATA
========================================== */
function formatarData(data){

  if(!data){

    return '-';

  }

  const partes =

    String(data)
      .split('T')[0]
      .split('-');

  if(partes.length !== 3){

    return '-';

  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;

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

  if(
    telefone.length === 10
  ){

    return telefone.replace(

      /(\d{2})(\d{4})(\d{4})/,

      '($1) $2-$3'

    );

  }

  return telefone;

}