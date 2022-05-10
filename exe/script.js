nb_dis = getDisque();

function init(n) {
    t = { "A": [], "B": [], "C": [] };
    for (let i = n; i > 0; i--) {
        t["A"].push(i);
    }
}

function gettime(abs, ord) {
    for (let i = 0; i <= nb_dis; i++) {
        console.log(i);
        abs.push(i);
        let starTime = new Date().getTime();
        init(i);
        console.log("Nombre de déplacement = " + hanoï(i, "A", "C", "B", t));
        endTime = new Date().getTime()
        timeTaked = endTime - starTime;
        ord.push(timeTaked);
    }
    diagram = [abs, ord];
    return diagram;
}
diagram = gettime([], []);

const graph = document.getElementById("graph");
ctx = graph.getContext('2d');

let myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: diagram[0],
        datasets: [
            {
                label: "Temps mis",
                data: diagram[1],
                backgroundColor: ["green", "gray", "red"],
                hoverBorderWidth: 5
            },
        ],
    },
    options: {
        legend: {
            display: false
        }
    },
});