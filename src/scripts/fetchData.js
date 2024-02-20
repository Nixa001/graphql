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
                        element.firstName,
                        element.lastName,
                        element.login,
                        element.campus,
                        element.auditRatio,
                        level[0].level
                    );
                    element.level.forEach((el) => {
                        level.innerHTML = el.level
                    })
                    // let projetValides = element.projetValides
                    // createTab(projetValides)
                    console.log(data.data.transaction_aggregate.nodes[0].amount);
                });
                let XPval = data.data.transaction_aggregate.aggregate.sum.amount / 1000;
                console.log(XPval.toFixed(0));
                let nbrXp = document.querySelector(".xp");
                nbrXp.innerHTML = XPval.toFixed(0) + " KB";
                resolve(user);
                createSVGGraph(data.data.transaction_aggregate.nodes)
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// const createTab = (projetValides) => {
//     projetValides.forEach(projet => {
//         let name = projet.object.name
//         let tableProject = document.querySelector("tbody")
//         let line = document.createElement("tr")
//         let column = document.createElement("td")
//         column.innerText = name
//         line.appendChild(column)
//         tableProject.appendChild(line)
//         // console.log(name);

//     });
// }

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
    let level = document.querySelector(".level")
    nameUser.innerHTML = firstName + " " + lastName + " @" + userName;
    gitea.innerHTML = " @" + userName;
    campusDiv.innerHTML = campus;
    if (auditRatio >= 1) {
        ratio.style.color = "green"
    } else if (auditRatio > 0.6) {
        ratio.style.color = "orange"
    } else {
        ratio.style.color = "red"
    }
    ratio.innerHTML = auditRatio.toFixed(1);
    level.innerHTML = myLevel
};

function createSVGGraph(data) {
    // Créer dynamiquement un SVG basé sur les données
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1500 400'); 
    const maxAmount = Math.max(...data.map(item => item.amount));
    const scaleFactor = 100 / maxAmount;

    data.forEach((item, index) => {
        if (index < 15) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', index * 100); 
            rect.setAttribute('y', 70 - item.amount * scaleFactor);
            rect.setAttribute('width', 80); 
            rect.setAttribute('height', item.amount * scaleFactor + 400);
            rect.setAttribute('fill', '#e0e0e0');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', index * 50 + 11.5); 
            text.setAttribute('y', 100);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = item.object.name;

            svg.appendChild(rect);
            // svg.appendChild(text);
        }
    });

    const container = document.querySelector('.div1SecondSection');
    container.appendChild(svg);

    container.addEventListener('resize', () => {
        const parentWidth = container.clientWidth;
        const parentHeight = container.clientHeight;
        svg.setAttribute('viewBox', `0 0 ${parentWidth} ${parentHeight}`);
    });
}