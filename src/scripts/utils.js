import { profilePage } from "../components/profilePage.js";
import { fetchData } from "./fetchData.js";
import { loginHandler } from "./loginHandler.js";


export function getCookie(name) {
  var cookies = document.cookie.split('; ');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split('=');
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }

  return null;
}
export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


export function setCookie(name, value, daysToExpire) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  var cookieString = name + "=" + encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/";
  document.cookie = cookieString;
}
export function CheckToken(token) {
  fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: QueryUserData
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data?.data) {
        document.querySelector('body').innerHTML = profilePage()
        document.querySelector('.logoutBtn').addEventListener('click', function () {
          deleteCookie('Token')
          loginHandler()
        });
        fetchData(token)
      } else {
        loginHandler()
      }
    })
    .catch(error => {
      loginHandler()
      console.error('Invalide Token:');
    });
}

export const QueryUserData = `
 {
  user {
     id
    email
    firstName
    lastName
    login
    campus
    auditRatio

    # Level
    level: events(where:{event:{registrationId:{_eq:55}}}){
      level
    }

    # Les projets valides 
    projetValides: progresses(where:{isDone:{_eq:true},event:{registrationId:{_eq:55}}}) {
      userLogin
      object{
        name
      }
    }
  }

  # transaction pour recuperer le nombre de XP
  transaction_aggregate(
      where: {event: {registrationId: {_eq: 55}}, type: {_eq: "xp"}},
      order_by: {amount: desc} 
  ) {
      nodes {
      amount
      object {
          name
      }
      }
      aggregate {
      sum {
          amount
      }
      }
  }
  
  # transaction pour recuperer les skills
 skills: transaction_aggregate(
    where: {event: {registrationId: {_eq: 55}}, type: {_ilike: "skill_%" }},
    order_by: {amount: desc} 
) {
  nodes{
    type
    amount
  }
}




upRatio: transaction_aggregate(
  where: {event: {registrationId: {_eq: 55}}, type: {_eq: "up"}}
) {
  aggregate {
    sum {
      amount
    }
  }

}
downRatio: transaction_aggregate(
  where: {event: {registrationId: {_eq: 55}}, type: {_eq: "down"}}
) {
  aggregate {
    sum {
      amount
    }
  }

}

}
`