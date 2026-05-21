const API_URL = "https://script.google.com/macros/s/AKfycbxtsP7FsL5LtElUFo47uKBaX4gpr11su1tcNQ1djPlgV6-NENrFy77mvXV7NmeZnyQl/exec";

async function api(action){

  try{

    const response =
      await fetch(
        `${API_URL}?action=${action}`
      );

    const texto =
      await response.text();

    return JSON.parse(texto);

  }catch(erro){

    console.error(erro);

    mostrarToast(
      'Erro na API',
      'erro'
    );

    return [];

  }

}