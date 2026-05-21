const API_URL =
'https://script.google.com/macros/s/AKfycbzvbQs5GStlTQnsAKnP3PsbT6YCV0dd5LP_CNtF3Hl0M4wksLoOi2S_PbgVAglk6eJk/exec';


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