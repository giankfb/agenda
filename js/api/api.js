const API_URL =
'https://script.google.com/macros/s/AKfycbxrvUitWyp0fxZ-jVDdXtEwATr7Hh31IP1cg62YYr-BAgXSzJV1BQJPUSRKj1PhU2Y-/exec';


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