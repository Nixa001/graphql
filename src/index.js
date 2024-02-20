import { profilePage } from "./components/profilePage.js";
import { fetchData } from "./scripts/fetchData.js";
import { loginHandler } from "./scripts/loginHandler.js";

window.addEventListener("DOMContentLoaded", () => {
    // loginHandler()

    let body = document.querySelector("body")
    body.innerHTML = profilePage()
    fetchData(data)
});
const data = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNTExIiwiaWF0IjoxNzA4NDM0MjYzLCJpcCI6IjE1NC4xMjUuMTIyLjE0MywgMTcyLjE4LjAuMiIsImV4cCI6MTcwODUyMDY2MywiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtY2FtcHVzZXMiOiJ7fSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMjUxMSIsIngtaGFzdXJhLXRva2VuLWlkIjoiMGE3ZmQyYmMtOGU5YS00YzdmLWI1ODItMzZlODkwNjg1M2FhIn19.2KBW9q9jsGBqdiVkNtkP8Y_f_itey_nZ0_3DX8R_ck8`