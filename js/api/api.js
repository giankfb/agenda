const API_URL = "https://script.google.com/macros/s/AKfycbyEy6JA50kJnPIQawoWRa_UHpEiLiE5-BFtdpw5csQbONnye2uWHjK3DHndr87J9s1L/exec";

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