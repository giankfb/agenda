const API_URL =
'https://script.google.com/macros/s/AKfycbyNFznHGci-atvcSeQebAIntBzKnqaox2oO3b9lqMk1fajzd5jiaph1a4tKdat6aDo/exec';


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