const API_URL = "https://script.google.com/macros/s/AKfycbxMOCg9_7ongIvJOxN1TRPxqQvUxX7UusVZYVF1JMMhHNGRLFoMj_982djIZbCIUtR_/exec";

async function api(action){

  const response = await fetch(
    `${API_URL}?action=${action}`
  );

  return await response.json();
}

async function post(dados){

  const response = await fetch(API_URL,{
    method:'POST',
    body:JSON.stringify(dados)
  });

  return await response.json();
}