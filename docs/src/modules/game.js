import { Deck } from "./deck.js"
import { Player } from "./player.js"

class Game {
    constructor() {
        this.num_players = 3
        this.player1 = new Player()
        this.deck = new Deck(52)
    }
}

export { Game }
