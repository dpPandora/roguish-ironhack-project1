let map = new level;
map.roomGen();
map.mapRooms();

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

let pixel = 8;

let currentX = map.rooms[0].roomX + (Math.floor(map.rooms[0].roomW / 2));
let currentY = map.rooms[0].roomY + (Math.floor(map.rooms[0].roomH / 2));
let resY = mscre.dispArea.height;
let resX = mscre.dispArea.width;

function mapDemo() {
    ctx = mscre.ctx;
    ctx.clearRect(0, 0, 512, 384);
    let relativeX = currentX - Math.floor((resX / pixel) / 2);
    let relativeY = currentY - Math.floor((resY / pixel) / 2);
    let overlayX = relativeX;
    let overlayY = relativeY;
    let overlayXmax = overlayX + Math.floor(resX / pixel);
    let overlayYmax = overlayY + Math.floor(resY / pixel);

    for(let y = 0; y < resY; y += pixel) {
        for(let x = 0; x < resX; x += pixel) {
            let val = undefined;
            try {
                val = map.map[relativeY][relativeX];
            }
            catch {
                //currentX = 0;
                //currentY = 0;
            }

            if (val === undefined) {
                ctx.strokeStyle = "green";
                ctx.strokeRect(x, y, pixel, pixel);                
            }
            else if (val === "00") {
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, pixel, pixel);
                ctx.strokeStyle = 'black';
                ctx.strokeRect( x, y, pixel, pixel);
            }
            else if (val === "01") {
                //ctx.strokeStyle = "green";
                //ctx.strokeRect(x, y, pixel, pixel);   
            }
            relativeX++;
        }
        relativeX = currentX - Math.floor((resX / pixel) / 2);
        relativeY++;
    }
    let dispRooms = [];

    map.rooms.forEach((e) => {
        //x or x + width and y or y + height falls between overlay
        //x > overlayX || x + width > overlayX && y > overlayY || y + height > overlayY
        //if(e.roomX > overlayX || e.roomX + e.roomW > overlayX && e.roomY > overlayY || e.roomY + e.roomH > overlayY) 
    })

    //currentX++;
    //currentY++;
}

mapDemo();

document.addEventListener('keydown', (e) => {
    //console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            currentY--;
            mapDemo();
            break;
        case "ArrowDown":
            currentY++;
            mapDemo();
            break;
        case "ArrowLeft":
            currentX--;
            mapDemo();
            break;
        case "ArrowRight":
            currentX++;
            mapDemo();
            break;
    }
})

//let interval = setInterval(mapDemo, 100);