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