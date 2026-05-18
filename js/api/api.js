const API_URL = "https://script.google.com/macros/s/AKfycbzsOmtv0V5g5_1_HNjJ69tiNU764VoKELJCu4iIIA51hGJSmoKMCpJOxvIel1JNNXYc/exec";

async function api(action) {
  const response = await fetch(
    `${API_URL}?action=${action}`
  );

  return await response.json();
}