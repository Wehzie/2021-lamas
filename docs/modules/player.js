import { Hand } from "./hand.js"

class Player {
    constructor() {
        this.Hand = new Hand()
        //this.Knowledge = new this.Knowledge();
    }
}

class Human extends Player {
    constructor() {}
}

class AI extends Player {
    constructor() {}
}

export { Player, Human, AI }
