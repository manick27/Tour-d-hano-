function getDisque(){
    do{
        n = prompt("Entrer le nombre de disques");
    }while(isNaN(n));
    return n;    
}

if(document.querySelector("tbody")) n = getDisque();

etat = [];

t = { "A": [], "B": [], "C": [] };

for (let i = n; i > 0; i--) {
    t["A"].push(i);
}

function hanoï(n, i, j, k, t) {
    affiche(t);
    nbr_deplacement = 0;
    if (n > 0) {
        nbr_deplacement += hanoï(n - 1, i, k, j, t);
        saut(i, j, t);
        nbr_deplacement++;
        nbr_deplacement += hanoï(n - 1, k, j, i, t);
    }
    return nbr_deplacement;
}

function saut(i, j, t) {
    d = t[i].pop();
    console.log("Déplacer " + d + " de " + i + " vers " + j);
    t[j].push(d);
}

function affiche(t) {
    str = "";
    tab = [];
    // for (let i = 0; i < 3; i++) {
        str = "<tr>";
        str += "<td>" + t["A"] + "</td>";
        str += "<td>" + t["B"] + "</td>";
        str += "<td>" + t["C"] + "</td>";
        str += "</tr>";
        tab.push(str);
        // console.log(str);
    // }
    if (etat.indexOf(tab[0]) == -1) etat.push(tab[0]);

    v = (etat.toString()).replaceAll(',', '  ');
    
    if (document.querySelector("tbody")) document.querySelector("tbody").innerHTML = v;
    // console.log(et);
}
dep = hanoï(n, "A", "C", "B", t);
document.querySelector("#dep").innerHTML = "Nombre de déplacements = " + dep;