import { chartRadar, createSVGGraph, createTab } from "./chartSVG.js";
import { QueryUserData } from "./utils.js";

export const fetchData = (jwt) => {
    // const storedJwt = localStorage.getItem('jwt');
    return new Promise((resolve, reject) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                query: QueryUserData,
            }),
        };

        fetch(
            "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql",
            fetchOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    reject(new Error("GraphQL errors: " + JSON.stringify(data.errors)));
                    return;
                }
                const user = data.data.user;
                user.forEach((element) => {
                    // console.log(element.validAudits);
                    // console.log(element.invalidAudits);
                    let level = user[0].level
                    infoUserConnect(
                        element.firstName.toUpperCase(),
                        element.lastName.toUpperCase(),
                        element.login,
                        element.campus.toUpperCase(),
                        element.auditRatio,
                        level[0].level
                    );
                    element.level.forEach((el) => {
                        level.innerHTML = el.level
                    })
                    // console.log(data.data.transaction_aggregate.nodes);
                    createTab(data.data.transaction_aggregate.nodes)
                });
                let XPval = data.data.transaction_aggregate.aggregate.sum.amount / 1000;
                let nbrXp = document.querySelector(".xp");
                nbrXp.style.color = "#ff983f"
                nbrXp.innerHTML = XPval.toFixed(0) + "KB";
                resolve(user);
                createSVGGraph(data.data.transaction_aggregate.nodes)
                const aggregatedData = aggregateSkills(data.data.skills);
                chartRadar(aggregatedData)
                // console.log(data.data.upRatio.aggregate.sum.amount);
                // console.log(data.data.downRatio.aggregate.sum.amount);

                
            })
            .catch((error) => {
                reject(error);
            });
    });
};


const infoUserConnect = (
    firstName,
    lastName,
    userName,
    campus,
    auditRatio,
    myLevel
) => {
    let nameUser = document.querySelector(".fullnameUser");
    let gitea = document.querySelector(".username");
    let campusDiv = document.querySelector(".campus");
    let ratio = document.querySelector(".ratio");
    nameUser.innerHTML = firstName + " " + lastName + " @" + userName;
    gitea.innerHTML = " @" + userName;
    campusDiv.innerHTML = campus;
    if (auditRatio >= 1) {
        ratio.style.color = "#17ae3e"
    } else if (auditRatio > 0.6) {
        ratio.style.color = "orange"
    } else {
        ratio.style.color = "red"
    }
    ratio.innerHTML = auditRatio.toFixed(1);
    // level.innerHTML = myLevel
    updateDoughnutChart(myLevel)
};
function updateDoughnutChart(level) {
    //perimetre avec rayon 30
    const circumference = 377;
    const progress = (level / 50) * circumference;

    // attribut
    const progressCircle = document.getElementById('progress-circle');
    progressCircle.setAttribute('stroke-dasharray', `${progress} ${circumference - progress}`);
    progressCircle.setAttribute('stroke-dashoffset', -circumference + 1 / 4);

    // text
    const levelText = document.getElementById('level-text');
    levelText.textContent = level;
}


export function aggregateSkills(data) {
    const aggregatedSkills = {};
    data.nodes.forEach(item => {
        const skillType = item.type.slice(6).toUpperCase();
        if (!aggregatedSkills[skillType] || item.amount > aggregatedSkills[skillType]) {
            aggregatedSkills[skillType] = item.amount;
        }
    });

    const sortedResults = Object.keys(aggregatedSkills)
        .map(skillType => ({ type: skillType, amount: aggregatedSkills[skillType] }))
        .sort((a, b) => b.amount - a.amount);

    const result = sortedResults.slice(0, 6);

    return result;
}

