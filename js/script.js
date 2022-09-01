window.addEventListener('load', () => {
    alert("this is just an extremely basic \"working\" demo, you can move with arrow keys and moving into the yellow box ends the game");
})

let map = new level;
map.roomGen();
map.mapRooms();

let player = new playable(map, (map.rooms[0].roomX + (Math.floor(map.rooms[0].roomW / 2))), (map.rooms[0].roomY + (Math.floor(map.rooms[0].roomH / 2))), 10)
//god this entire file is gonna have to be like remade

const mscre = {
    dispArea: document.querySelector('#dispArea'),
    ctx: dispArea.getContext('2d'),
    start() {

    },
    clear() {

    },
    end() {

    }
}

let lastRoomX = map.rooms.at(-1).roomX;
let lastRoomY = map.rooms.at(-1).roomY;

map.map[lastRoomY][lastRoomX] = stairs;

let pixel = 16;

let currentX = player.posX;
let currentY = player.posY;
let resY = mscre.dispArea.height;
let resX = mscre.dispArea.width;

function mapDemo() {
    currentX = player.posX;
    currentY = player.posY;

    ctx = mscre.ctx;
    ctx.clearRect(0, 0, 512, 384);
    let relativeX = currentX - Math.floor((resX / pixel) / 2);
    let relativeY = currentY - Math.floor((resY / pixel) / 2);
    //let overlayX = relativeX;
    //let overlayY = relativeY;
    //let overlayXmax = overlayX + Math.floor(resX / pixel);
    //let overlayYmax = overlayY + Math.floor(resY / pixel);

    for(let y = 0; y < resY; y += pixel) {
        for(let x = 0; x < resX; x += pixel) {
            let val = undefined;
            let valB = undefined;
            let valA = undefined;
            try {
                valB = map.map[relativeY][relativeX];
                valA = map.topMap[relativeY][relativeX];
                val = (valA != "" ? valA : valB);
            }
            catch {
                //currentX = 0;
                //currentY = 0;
            }

            if (val === undefined) {
                ctx.strokeStyle = "green";
                ctx.strokeRect(x, y, pixel, pixel);                
            }
            else if (val === empty) {
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, pixel, pixel);
                ctx.strokeStyle = 'black';
                //ctx.strokeRect( x, y, pixel, pixel);
            }
            else if (val === floor) {
                //ctx.strokeStyle = "green";
                //ctx.strokeRect(x, y, pixel, pixel);   
            }
            else if (val === debug) {
                ctx.fillStyle = "purple";
                ctx.fillRect(x, y, pixel, pixel);
                ctx.strokeStyle = 'black';
                ctx.strokeRect( x, y, pixel, pixel);
            }
            else if (val === plyer) {
                ctx.fillStyle = "purple";
                ctx.fillRect(x, y, pixel, pixel);
                ctx.strokeStyle = 'black';
                ctx.strokeRect( x, y, pixel, pixel);
            }
            else if (val === stairs) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(x, y, pixel, pixel);
            }
            relativeX++;
        }
        relativeX = currentX - Math.floor((resX / pixel) / 2);
        relativeY++;
    }
   // let dispRooms = [];
/*
    map.rooms.forEach((e) => {
        //x or x + width and y or y + height falls between overlay
        //x > overlayX || x + width > overlayX && y > overlayY || y + height > overlayY
        //if(e.roomX > overlayX || e.roomX + e.roomW > overlayX && e.roomY > overlayY || e.roomY + e.roomH > overlayY) 
    })
*/
    //currentX++;
    //currentY++;
}

mapDemo();

document.addEventListener('keydown', (e) => {
    //console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            player.interactUp();
            mapDemo();
            break;
        case "ArrowDown":
            player.interactDown();
            mapDemo();
            break;
        case "ArrowLeft":
            player.interactLeft();
            mapDemo();
            break;
        case "ArrowRight":
            player.interactRight();
            mapDemo();
            break;
    }
})

//let interval = setInterval(mapDemo, 100);