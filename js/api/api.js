const API_URL = "https://script.google.com/macros/s/AKfycbzjpyVwVem362WtWvkYVj4E5D7ecLbUP3HGXGaLWAeHxrWOQtTINna0hPh--IS7FXo/exec";

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