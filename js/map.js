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

let test = new level;
test.roomGen();
test.mapRooms();
//testLevel.printMap();