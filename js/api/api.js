const API_URL = "https://script.google.com/macros/s/AKfycby-cEZgZqIMUtwVsrKlDlFnOTJedVxHfYBBiTtJM3hCvJTbE5sZVZpkf4D_fWknfX8c/exec";

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