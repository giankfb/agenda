const API_URL =
'https://script.google.com/macros/s/AKfycbwFWU3UDkTIH6iNoG23sO2Ef4k8w6HbjqnLsQapJVzYBo9exCD2hBSpVcgWJ3RY2JQh/exec';


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