class Tour {
    constructor(i, color) {
        this.id = i;
        this.x = 185;
        // if(i < 0) this.x = 0;
        this.y = 20;
        this.width = 30;
        this.height = 600;
        if(i == 1){
            this.x += 400;
        }else if(i == 2){
            this.x += 800;
        }
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


function createTour(){
    tabTour = new Array();
    for(let i = 0; i < 3; i++){
        const tour = new Tour(i, 'black');
        tabTour[i] = tour;
        // elements.push(tabTour[i]);
        tabTour[i].draw();
    }
    tourSel.draw();
    // tabTour[-1] = tourSel; 
    // console.log(tourSel);
}