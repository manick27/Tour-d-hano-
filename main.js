const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 600;

qPressed = false;
dPressed = false;
zPressed = false;
sPressed = false;
// qTour = false;
// dTour = false;
const tourSel = new Tour(-1, 'rgb(197, 194, 194)');
mvt = {
    lastTour : 0,
    nbr_mvt : 0
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createTour();
    drawDisk();
    if(win()) return;
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 38) {
        zPressed = true;
    } else if (e.keyCode == 40) {
        sPressed = true;
    } else if (e.keyCode == 37) {
        if (oneUp) {
            qPressed = true;
        } else if (selected > 0) {
            updSelect(-1);
        }
    } else if (e.keyCode == 39) {
        if (oneUp) {
            dPressed = true;
        } else if (selected < 2) {
            updSelect(1);
        }
    }
});