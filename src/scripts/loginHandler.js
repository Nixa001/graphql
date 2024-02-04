import { loginLayout } from "../components/loginPage.js";

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

    const base64Credentials = btoa(
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
      console.log("sdfdsf");
      //   window.jwt = data;
      //   setCookie("jwToken", window.jwt, 1);

      //   const loginPage = document.querySelector(".loginDiv");
      //   loginPage.remove();

      //   homePage();
      //   getData(window.jwt);
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
