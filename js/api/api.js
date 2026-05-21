const API_URL =
'https://script.google.com/macros/s/AKfycbwTYX6LGZ8X9UST3LXC1Nd6Pljo2p9uh1ubgF7iw427zO0jsN8CGr1VOcxtY-Rh00xm/exec';


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