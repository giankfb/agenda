const API_URL =
'https://script.google.com/macros/s/AKfycbyHgCUE2j3izJsviAgl3S8RooK6VeQNF4weJYJO6OJQwENq1I6zBWOq-iMsFThaRO0/exec';

/* ============================================*/
async function api(action){

  try{

    const response =
      await fetch(
        `${API_URL}?action=${action}`
      );

    const texto =
      await response.text();

    return JSON.parse(texto);

  }catch(erro){

    console.error(erro);

    mostrarToast(
      'Erro na API',
      'erro'
    );

    return [];

  }

}

/* ============================================*/
async function post(dados){

  try{

    const response =
      await fetch(API_URL,{

        method:'POST',

        body:JSON.stringify(dados)

      });

    const texto =
      await response.text();

    return JSON.parse(texto);

  }catch(erro){

    console.error(erro);

    mostrarToast(
      'Erro ao salvar',
      'erro'
    );

  }

}