const API_URL =
'https://script.google.com/macros/s/AKfycbyHgCUE2j3izJsviAgl3S8RooK6VeQNF4weJYJO6OJQwENq1I6zBWOq-iMsFThaRO0/exec';


/* =========================================
                GET
========================================= */
async function api(action){

  const response =
    await fetch(
      `${API_URL}?action=${action}`
    );

  return await response.json();

}


/* =========================================
                POST
========================================= */
async function post(dados){

  const response =
    await fetch(API_URL, {

      method:'POST',

      body:JSON.stringify(dados)

    });

  return await response.json();

}