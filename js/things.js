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
    poxY = 0;//default
    health = 10;//default
    dmg = 1;//default
    def = 0;//default
    name = "default";

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
        let val = this.linkedLvl.map[this.poxY - 1][this.posX];
        let valTop = this.linkedLvl.topMap[this.poxY - 1][this.posX];

        let passVal = (valTop != "" ? valTop : val);

        switch (passVal) {
            case floor:
            case wall:
            case stairs:
            case plyer:
            case mnster:
            default://this'll probably only be activated on undef or an id i havent added yet
        }
    }
    interactDown() {
        let val = this.linkedLvl.map[this.poxY + 1][this.posX];
    }
    interactLeft() {
        let val = this.linkedLvl.map[this.poxY][this.posX - 1];
    }
    interactRight() {
        let val = this.linkedLvl.map[this.poxY][this.posX + 1];
    }
}

class playable extends creature {
    constructor(lmap, posX, posY, health, name = "the player") {
        this.linkedLvl = lmap;
        this.posX = posX;
        this.posY = posY;
        this.health = health;
        this.name = name;
    }
}