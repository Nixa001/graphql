export const createTab = (projetValides) => {
    let index = 1
    projetValides.forEach(projet => {
        let name = projet.object.name
        let tableProject = document.querySelector("tbody")
        let line = document.createElement("tr")
        let rank = document.createElement("td")
        let nameProject = document.createElement("td")
        let xp = document.createElement("td")
        let state = document.createElement("td")

        rank.innerHTML = index
        index++
        nameProject.innerText = name
        xp.innerHTML = projet.amount / 1000
        state.innerHTML = "Success"
        state.style.color = "#17ae3e"
        if (projet.amount > 999) {

            line.appendChild(rank)
            line.appendChild(nameProject)
            line.appendChild(xp)
            line.appendChild(state)
            tableProject.appendChild(line)
        }
        // console.log(name);

    });
}
export function createSVGGraph(data) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1500 400');

    const maxAmount = Math.max(...data.map(item => item.amount));
    const scaleFactor = 100 / maxAmount;

    // Axe y
    for (let i = 0; i <= 100; i += 10) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', i * 4);
        line.setAttribute('x2', '1500');
        line.setAttribute('y2', i * 4);
        line.setAttribute('stroke', '#ccc');
        svg.appendChild(line);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '-20');
        text.setAttribute('y', i * 4 + 5);
        text.setAttribute('text-anchor', 'end');
        text.textContent = (100 - i) + '%';
        svg.appendChild(text);
    }

    // Axe x
    data.forEach((item, index) => {
        if (index < 10) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', index * 150);
            rect.setAttribute('y', 400 - item.amount * scaleFactor - 300);
            rect.setAttribute('width', 120);
            rect.setAttribute('height', item.amount * scaleFactor + 300);
            rect.setAttribute('fill', '#e0e0e0');

            rect.addEventListener('mouseenter', () => {
                rect.setAttribute('fill', '#ff983f');
                const amountText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                amountText.setAttribute('x', index * 150 + 60);
                amountText.setAttribute('y', 400 - item.amount * scaleFactor - 310);
                amountText.setAttribute('text-anchor', 'middle');
                amountText.setAttribute('class', 'amount-text');
                amountText.setAttribute('fill', '#ff983f');
                amountText.textContent = item.amount / 1000;
                svg.appendChild(amountText);
            });

            rect.addEventListener('mouseleave', () => {
                rect.setAttribute('fill', '#e0e0e0');
                const amountText = svg.querySelector('.amount-text');
                if (amountText) {
                    svg.removeChild(amountText);
                }
            });

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', index * 150 + 60);
            text.setAttribute('y', 420);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#e0e0e0');
            text.textContent = item.object.name.slice(0, 18);

            svg.appendChild(rect);
            svg.appendChild(text);
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


export function chartRadar(data) {

    const width = 500;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    const svg = document.getElementById("radar-chart");

    const axes = data.map((d, i) => {
        const angle = (Math.PI * 2 * i) / data.length;
        const x = centerX + Math.cos(angle) * 100;
        const y = centerY + Math.sin(angle) * 100;
        return { x, y };
    });

    const lines = data.map(d => {
        const angle = (Math.PI * 2 * data.indexOf(d)) / data.length;
        const length = (d.amount / 100) * 120;
        const x = centerX + Math.cos(angle) * length;
        const y = centerY + Math.sin(angle) * length;
        return { x, y };
    });

    axes.forEach(axe => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", axe.x);
        line.setAttribute("y2", axe.y);
        line.setAttribute("stroke", "#ff983f");
        svg.appendChild(line);
    });

    const radarLine = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    radarLine.setAttribute("points", lines.map(point => `${point.x},${point.y}`).join(" "));
    radarLine.setAttribute("fill", "#ff6600");
    radarLine.setAttribute("fill-opacity", "0.7");
    svg.appendChild(radarLine);

    data.forEach((d, i) => {
        const angle = (Math.PI * 2 * i) / data.length;
        const labelX = centerX + Math.cos(angle) * 150;
        const labelY = centerY + Math.sin(angle) * 125;
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", labelX);
        label.setAttribute("y", labelY);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("fill", "#e0e0e0");
        label.textContent = d.type;
        svg.appendChild(label);
    });
}