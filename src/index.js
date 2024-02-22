import { profilePage } from "./components/profilePage.js";
import { fetchData } from "./scripts/fetchData.js";
import { loginHandler } from "./scripts/loginHandler.js";
import { CheckToken, deleteCookie, getCookie } from "./scripts/utils.js";

window.addEventListener("DOMContentLoaded", () => {
    // loginHandler()


    const token = getCookie('Token')
    const isConn = CheckToken(token)
      console.log(isConn);
    // if (isConn) {
    //     document.querySelector('body').innerHTML = profilePage()
    //     document.querySelector('.logoutBtn').addEventListener('click', function () {
    //         deleteCookie('Token')
    //         loginHandler()
    //     });
    //     fetchData(token)
    // } else {
    //     loginHandler()
    // }

    // let body = document.querySelector("body")
    // body.innerHTML = profilePage()
    // fetchData(data)
});
const data = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNTExIiwiaWF0IjoxNzA4NTIwNzYzLCJpcCI6IjE1NC4xMjUuMTIyLjE0MywgMTcyLjE4LjAuMiIsImV4cCI6MTcwODYwNzE2MywiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtY2FtcHVzZXMiOiJ7fSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMjUxMSIsIngtaGFzdXJhLXRva2VuLWlkIjoiMjNmMmUwYTEtODRlNy00ZmQ4LWJhZjEtOWJiYzllMTFjYTFmIn19.3HFQ484edw5pTb3It2ViZ_c8S5ADbIXJVYlbvg_PDTI`