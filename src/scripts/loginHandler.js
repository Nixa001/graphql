import { loginLayout } from "../components/loginPage.js";
import { profilePage } from "../components/profilePage.js";
import { fetchData } from "./fetchData.js";
import { deleteCookie, setCookie } from "./utils.js";

export const loginHandler = () => {
  let body = document.querySelector("body");
  body.innerHTML = loginLayout();
  let submit_login = document.querySelector(".submit_login");

  submit_login.addEventListener("click", (event) => {
    event.preventDefault();
    loginFetch();
  });
};
async function loginFetch() {
  try {
    const apiUrl = "https://learn.zone01dakar.sn/api/auth/signin";
    const login = document.querySelector(".login__username");
    const password = document.querySelector(".login__password");

    const credentials = {
      login: login.value,
      password: password.value,
    };

    const base64Credentials = encodeBase64(
      `${credentials.login}:${credentials.password}`
    );

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    const data = await response.json();

    if (!data.error) {

      setCookie("Token", data, 1)
      let body = document.querySelector("body")
      body.innerHTML = profilePage()


      document.querySelector('.logoutBtn').addEventListener('click', function () {
        deleteCookie('Token')
        loginHandler()
      });

      fetchData(data)
    } else {
      const error = document.querySelector(".errorMsg");
      error.style.display = "block";
      error.innerHTML = data.error;

      setTimeout(() => {
        error.style.display = "none";
      }, 5000);
    }
  } catch (error) {
    console.error("Erreur lors de la requête POST :", error);
  }
}

function encodeBase64(str) {
  var encoder = new TextEncoder();
  var byteArray = encoder.encode(str);

  var base64String = arrayBufferToBase64(byteArray);

  return base64String;
}

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}