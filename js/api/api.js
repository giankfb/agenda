/* =========================================
                GET
========================================= */
async function api(action){

  const response =
    await fetch(
      `${API_URL}?action=${action}`
    );

  if(!response.ok){

    throw new Error(
      'Erro na API'
    );

  }

  return await response.json();

}


/* =========================================
                POST
========================================= */
async function post(dados){

  const response =
    await fetch(API_URL, {

      method:'POST',

      headers:{
        'Content-Type':
          'application/json'
      },

      body:JSON.stringify(dados)

    });

  if(!response.ok){

    throw new Error(
      'Erro na API'
    );

  }

  return await response.json();

}