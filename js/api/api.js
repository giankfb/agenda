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

  const formData =
    new URLSearchParams();

  formData.append(
    'dados',
    JSON.stringify(dados)
  );

  const response =
    await fetch(API_URL, {

      method:'POST',

      body:formData

    });

  return await response.json();

}