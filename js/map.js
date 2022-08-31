const mapWidth = 64;
const mapHeight = 64;

let empty = "00";
let floor = "01";
//const empty = `\u2593\u2593`;
//const floor = `\u2591\u2591`;

class roomTemp {
    constructor(roomW, roomH, roomY, roomX) {
        this.roomY = roomY;
        this.roomX = roomX;
        this.roomW = roomW;
        this.roomH = roomH;
    }
}

class level {
    constructor(width = mapWidth, height = mapHeight, complex = 10) {
        this.width = width;
        this.height = height;
        this.complexity = complex;

        this.map = [];
        this.emptyMap();

        this.rooms = [];
    }

    emptyMap() {
        let maxHeight = this.height;//y
        let maxWidth = this.width;//x

        console.log("Filling map array")
        for(let y = 0; y < maxHeight; y++) {
            this.map.push([]);
            for(let x = 0; x < maxWidth; x++) {
                this.map[y].push(empty);
            }
        }
    }

    roomGen() {
        //let maxHeight = this.height;//y
        //let maxWidth = this.width;//x
        let generatedRooms = [];
        console.log("Generating rooms");
        for(let ro = 0; ro < 100000; ro++) {
            let w = rand(15, 3);
            let h = rand(15, 3);
            let y = rand(this.height - h);
            let x = rand(this.width - w);

            generatedRooms.push(new roomTemp(w, h, y, x))
        }

        this.rooms.push(generatedRooms[0]);
        generatedRooms.unshift();

        generatedRooms.forEach((two) => {
            let isCollish = false;
            //console.log(two);
            this.rooms.forEach((one) => {
                //console.log(one);
                let diffy = Math.abs(two.roomY - one.roomY);
                let diffx = Math.abs(two.roomX - one.roomX);
                let largerW = (two.roomW < one.roomW ? one.roomW : two.roomW);
                let largerH = (two.roomH < one.roomH ? one.roomH : two.roomH);

                if (diffy < largerH + 1 && diffx < largerW + 1) isCollish = true;
            })
            if (!isCollish) this.rooms.push(two);
        })

        this.rooms = this.rooms.slice(0, this.complexity);

        //starting here is code for path between room generation

        this.rooms.sort((a, b) => {
            return b.roomY - a.roomY;
        })

        console.log(this.rooms)

        let pathy = [];
        let tempR = [];

        this.rooms.forEach((ele) => {
            //console.log(ele);
            tempR.push(ele);
        })

        console.log(tempR[0]);
        
        console.log(pathy);
        pathy.push(tempR[0]);
        tempR.shift();

        let pathyIndex = 0;
//rewrite
        while (tempR.length != 0) {
            //console.log(pathy);
            //console.log(tempR);
            //let closestRoom;
            let closestRoomDist = undefined;
            let closestIndex = undefined;
            for(let i = 0; i < tempR.length; i++) {
                //pathy[index]
                //tempR[i]
                //im going to compare the distance between the corner of each room, it going to be long ugly code but ffs itll work, i hope


                /*
                //let diffX, pathX, tempRX
                //if tempR[i].roomX < pathy[index].roomX then use tempR[i].roomW
                //else use pathy[index].roomW and tempR[i].roomX
                //what the x cords overlap but have different y?

                //let diffY, pathY, tempRY
                //if tempR[i].roomY < pathy[index].roomY then use tempR[i].roomH
                //else use pathy[index].roomH and tempR[i].roomY

                //should i test distance by x and y or by the like diagonal line (i cannot spell :<)
                //i dont really wanna handle two more variables so ill make it the line thing
                let diffX, pathX, tempRX;
                if (tempR[i].roomX < pathy[pathyIndex].roomX) {
                    pathX = pathy[pathyIndex].roomX;
                    tempRX = tempR[i].roomX + tempR[i].roomW;
                } else {
                    pathX = pathy[pathyIndex].roomX + pathy[pathyIndex].roomW;
                    tempRX = tempR[i].roomX;
                }

                diffX = pathX - tempRX;

                let diffY, pathY, tempRY;
                if (tempR[i].roomY < pathy[pathyIndex].roomY) {
                    pathY = pathy[pathyIndex].roomY;
                    tempRY = tempR[i].roomY + tempR[i].roomH;
                } else {
                    pathY = pathy[pathyIndex].roomY + pathy[pathyIndex].roomH;
                    tempRY = tempR[i].roomY;
                }

                diffY = pathY - tempRY;

                let dist = Math.sqrt((diffY * diffY) + (diffX * diffX));
                //console.log(diffY +" "+ diffX +" "+ dist);
                //console.log(dist);
                if (dist < closestRoomDist || closestRoomDist === undefined) {
                    closestRoomDist = dist;
                    closestIndex = i;
                }
*/
            }
            pathy.push(tempR[closestIndex]);
            tempR.splice(closestIndex, 1);
            console.log(pathy);
            console.log(tempR);
            pathyIndex++;
            break;
        }
       console.log(pathy);
       console.log(this.rooms);

       this.rooms = Array.from(pathy);
       
       console.log(pathy);
       console.log(this.rooms);
    }

    mapRooms() {
        console.log("Mapping rooms");
        for (let room = 0; room < this.rooms.length; room++) {
            let cordY = this.rooms[room].roomY;
            let cordX = this.rooms[room].roomX;
            let width = cordX + this.rooms[room].roomW;
            let height = cordY + this.rooms[room].roomH;

            for(let rY = cordY; rY < height; rY++) {
                for(let rX = cordX; rX < width; rX++) {
                    this.map[rY][rX] = floor;
                }
            }
        }

        for(let from = 0; from < this.rooms.length - 1; from++) {
            let to = from + 1;
            let location = "";
            //get current room and next room
            //check if the ycords of the reciver are above or below the sender
            //if (rooms[from].roomY < rooms[to].roomH || rooms[from].roomH > rooms[to].roomY) location top or bottom
            //if (rooms[from].roomX < rooms[to].roomW || rooms[from].roomW > rooms[to].roomX) location left or right
            if (this.rooms[from].roomY > (this.rooms[to].roomY + this.rooms[to].roomH)) location += "top";
            else if ((this.rooms[from].roomY + this.rooms[from].roomH) < this.rooms[to].roomY) location += "bottom";

            if ((this.rooms[to].roomX + this.rooms[to].roomW) < this.rooms[from].roomX) location += "left";
            else if ((this.rooms[from].roomX + this.rooms[from].roomW) < this.rooms[to].roomX) location += "right";
            //if (topleft) choose point on left edge of sender and point on bottom edge of reciver 
            //if (bottomleft)
            //if (topright)
            //if (bottomright)

            //if (top)
            //if (bottom)
            //if (left)
            //if (right)
            console.log(this.rooms[from]);
            console.log(location);
            console.log(this.rooms[to])
        }
    }

    printMap() {//test function, i dont think ill need this for the final version
        let tempLine= ""
        for(let y = 0; y < this.height; y++) {
            tempLine= ""
            for(let x = 0; x < this.width; x++) {
                tempLine += this.map[y][x];
            }
            console.log(tempLine);
        }
    }

    mapSnapsot(fromY, fromX, toY = fromY + 32, toX = fromX + 32) {
        let tempLine= "";
        let mapped = [];
        for(let y = fromY; y < toY; y++) {
            tempLine = "";
            for(let x = fromX; x < toX; x++) {
                tempLine = tempLine + this.map[y][x];
            }
            mapped.push(tempLine);
        }
        console.log(mapped);
    }
}

//let test = new level;
//test.roomGen();
//test.mapRooms();
//testLevel.printMap();