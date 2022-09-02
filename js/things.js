//will be sourced in the html file so it should be able to access everything

//player class
//  constructor with name and (id?) map it will traverse
//  player inv, x, and y
//  functions for moving up, down, left, and right
//  functions for picking up items

//collision detection will just be through the moving commands for now
//maybe ill make the items a separate class and/or file?

//i think ill have a generic creature class 
//the player will use 05 and monsters use 06;
let plyer = "05";
let mnster = "06";
class creature {
    linkedLvl = {};
    posX = 0;//default
    posY = 0;//default
    health = 10;//default
    dmg = 1;//default
    def = 0;//default
    name = "default";
    texture = "";

    constructor() {
        this.linkedLvl = {};
        this.posX = 0;//default
        this.posY = 0;//default
        this.health = 10;//default
        this.dmg = 1;//default
        this.def = 0;//default
        this.name = "default";
        this.texture = "";
    };
    attack(target) {
        //get target.health and target.def
        //get attacker this.dmg
        //how the heck do i calc defence 
        //i hate it but i think ill just do a flat reduction of damage
        target.health -= Math.abs(this.attack - target.def);

        return target.health;//ill have the indiv player and moster classes decide what to do with the targets health
    }
    receiveDmg(target, ammount, useDef = true) {//ill use this for like traps or idk items?
        if (useDef === true) {
            target.health -= Math.abs(ammount - target.def)
        }
        else {
            target.health -= ammount;
        }
    }
    //interact fucntion, should be called eachtime a creature tries to move to the next squre, will return whats on the next square
    interactUp() {
        let val = this.linkedLvl.map[this.posY - 1][this.posX];
        let valTop = this.linkedLvl.topMap[this.posY - 1][this.posX];

        let passVal = (valTop != "" ? valTop : val);
        //console.log(passVal);

        switch (passVal) {
            case floor:
                this.linkedLvl.topMap[this.posY - 1][this.posX] = this.texture;
                this.linkedLvl.topMap[this.posY][this.posX] = "";
                this.posY -= 1;

                break;
            case empty:
                //it would just say in console that it cant go there
                break;
            case stairs:
                mscre.end();
                alert("you win!");
                //progress to the next level
                break;
            case plyer:
                //this is for monsters, if its a player it'll run attack();
                break;
            case mnster:
                //this is for players, if its a monster it'll run attack();
                break;
            default://this'll probably only be activated on undef or an id i havent added yet
                break;
        }
    }
    interactDown() {
        let val = this.linkedLvl.map[this.posY + 1][this.posX];
        let valTop = this.linkedLvl.topMap[this.posY + 1][this.posX];

        let passVal = (valTop != "" ? valTop : val);
        //console.log(passVal);

        switch (passVal) {
            case floor:
                this.linkedLvl.topMap[this.posY + 1][this.posX] = this.texture;
                this.linkedLvl.topMap[this.posY][this.posX] = "";
                this.posY += 1;

                break;
            case empty:
                //it would just say in console that it cant go there
                break;
            case stairs:
                mscre.end();
                alert("you win!");
                //progress to the next level
                break;
            case plyer:
                //this is for monsters, if its a player it'll run attack();
                break;
            case mnster:
                //this is for players, if its a monster it'll run attack();
                break;
            default://this'll probably only be activated on undef or an id i havent added yet
                break;
        }
    }
    interactLeft() {
        let val = this.linkedLvl.map[this.posY][this.posX - 1];
        let valTop = this.linkedLvl.topMap[this.posY][this.posX - 1];

        let passVal = (valTop != "" ? valTop : val);
        //console.log(passVal);

        switch (passVal) {
            case floor:
                this.linkedLvl.topMap[this.posY][this.posX - 1] = this.texture;
                this.linkedLvl.topMap[this.posY][this.posX] = "";
                this.posX -= 1;

                break;
            case empty:
                //it would just say in console that it cant go there
                break;
            case stairs:
                mscre.end();
                alert("you win!");
                //progress to the next level
                break;
            case plyer:
                //this is for monsters, if its a player it'll run attack();
                break;
            case mnster:
                //this is for players, if its a monster it'll run attack();
                break;
            default://this'll probably only be activated on undef or an id i havent added yet
                break;
        }
    }
    interactRight() {
        let val = this.linkedLvl.map[this.posY][this.posX + 1];
        let valTop = this.linkedLvl.topMap[this.posY][this.posX + 1];

        let passVal = (valTop != "" ? valTop : val);
        //console.log(passVal);

        switch (passVal) {
            case floor:
                this.linkedLvl.topMap[this.posY][this.posX + 1] = this.texture;
                this.linkedLvl.topMap[this.posY][this.posX] = "";
                this.posX += 1;

                break;
            case empty:
                //it would just say in console that it cant go there
                break;
            case stairs:
                mscre.end();
                alert("you win!");
                //progress to the next level
                break;
            case plyer:
                //this is for monsters, if its a player it'll run attack();
                break;
            case mnster:
                //this is for players, if its a monster it'll run attack();
                break;
            default://this'll probably only be activated on undef or an id i havent added yet
                break;
        }
    }
}

class playable extends creature {
    constructor(lmap, posX, posY, health, name = "the player") {
        super();
        this.linkedLvl = lmap;
        this.posX = posX;
        this.posY = posY;
        this.health = health;
        this.name = name;
        this.texture = plyer;

        this.linkedLvl.topMap[this.posY][this.posX] = this.texture;
    }
}