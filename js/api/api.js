const API_URL = "https://script.google.com/macros/s/AKfycbx86RUU5J-SnvOpNhhMOMV0_LdX0ix681A092oc-Njafl4P-mfZ_gnFLf_OInGvr6yv/exec";

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