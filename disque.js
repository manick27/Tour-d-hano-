elements = [[], [], []];
selected = 0;
do{
    nbr_dis = getDisque();
}while(isNaN(nbr_dis) || nbr_dis > 18 || nbr_dis < 1);
oneUp = false;
lastTour = 0;

class Disque {
    constructor(i) {
        this.id = i;
        this.x = (i * 10);
        this.width = (1200 / 3) - (i * 20);
        this.height = 30;
        this.y = 600 - this.height - (i * this.height);
        if ((i + 1) % 3 == 0) {
            this.color = 'red';
        } else if ((i + 1) % 3 == 1) {
            this.color = 'green';
        } else {
            this.color = 'white';
        }
        this.top = null;
        if (elements[0][i - 1]) elements[0][i - 1].top = i;
        this.up = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function createDisque(nbr_dis) {
    if (elements[0].length != nbr_dis) {
        for (let i = 0; i < nbr_dis; i++) {
            const disque = new Disque(i);
            elements[0].push(disque);
        }
        console.log(elements);
    }
}
createDisque(nbr_dis);

function up() {
    if (elements[selected][elements[selected].length - 1] && elements[selected][elements[selected].length - 1].top == null) {
        elements[selected][elements[selected].length - 1].y = 0;
        elements[selected][elements[selected].length - 1].up = true;
        oneUp = true;
        mvt.lastTour = selected;
    }
    // console.log(mvt);
}

function down() {
    if (elements[selected][elements[selected].length - 1] && elements[selected][elements[selected].length - 1].up) {
        if (elements[selected][elements[selected].length - 2]) {
            if (elements[selected][elements[selected].length - 2].id < elements[selected][elements[selected].length - 1].id) {
                // console.log(selected);
                elements[selected][elements[selected].length - 1].y = posY(elements[selected]);
                elements[selected][elements[selected].length - 1].up = false;
                elements[selected][elements[selected].length - 1].top = null;
                oneUp = false;
            }
        }
        else {
            // console.log(selected);
            elements[selected][elements[selected].length - 1].y = posY(elements[selected]);
            elements[selected][elements[selected].length - 1].up = false;
            elements[selected][elements[selected].length - 1].top = null;
            oneUp = false;
        }
        console.log(elements);
    }
    if (mvt.lastTour != selected) mvt.nbr_mvt++;
    document.querySelector('#nbr').innerHTML = ': ' + mvt.nbr_mvt;
    // console.log(mvt);
}

function drawDisk() {
    for (let i = 0; i < nbr_dis; i++) {
        if (zPressed && !oneUp) {
            up();
            zPressed = false;
            // console.log(elements);
            return
        }
        if (sPressed) {
            down();
            sPressed = false;
            return
        }
        if (qPressed) {
            mvt.newTour = selected;
            if (elements[selected][elements[selected].length - 1] && elements[selected][elements[selected].length - 1].up) {
                if (elements[selected][elements[selected].length - 2]) {
                    elements[selected][elements[selected].length - 2].top = null;
                }
                if (selected != 0) {
                    updSelect(-1);
                    elements[selected + 1][elements[selected + 1].length - 1].x -= (1200 / 3) - (i * 20) + (i * 10);
                    elements[selected].push(elements[selected + 1][elements[selected + 1].length - 1]);
                    if (elements[selected][elements[selected].length - 2]) {
                        elements[selected][elements[selected].length - 2].top = elements[selected + 1][elements[selected + 1].length - 1].id;
                    }
                    elements[selected + 1].pop();
                }
            }
            qPressed = false;
            return
        }
        if (dPressed) {
            mvt.newTour = selected;
            if (elements[selected][elements[selected].length - 1] && elements[selected][elements[selected].length - 1].up) {
                if (elements[selected][elements[selected].length - 2]) {
                    elements[selected][elements[selected].length - 2].top = null;
                }
                if (selected != 2) {
                    updSelect(1);
                    elements[selected - 1][elements[selected - 1].length - 1].x += (1200 / 3) - (i * 20) + (i * 10);
                    elements[selected].push(elements[selected - 1][elements[selected - 1].length - 1]);
                    if (elements[selected][elements[selected].length - 2]) {
                        elements[selected][elements[selected].length - 2].top = elements[selected - 1][elements[selected - 1].length - 1].id;
                    }
                    elements[selected - 1].pop();
                }
            }
            dPressed = false;
            // console.log(mvt);
            // console.log(elements);
            return
        }
        if (elements[0][i]) elements[0][i].draw();

        if (elements[1][i]) elements[1][i].draw();
        
        if (elements[2][i]) elements[2][i].draw();
    }
}

function posY(tab) {
    let h = 0;
    for (let i = 0; i < tab.length; i++) {
        h += tab[i].height;
    }
    return 600 - h;
}

function win() {
    if (elements[2].length == nbr_dis && !oneUp) {
        alert("Vous avez gagné en effectuant " + mvt.nbr_mvt + " déplacements");
        document.querySelector("#replay").style.display = "block";
        return true;
    }
}

function updSelect(i) {
    selected += i;
    tourSel.x += 400 * i;
}