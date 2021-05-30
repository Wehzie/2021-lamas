import { Deck } from "./deck.js"
import { Player } from "./player.js"

class Round {
    constructor(deck, players) {
        this.deck = deck
        this.players = players
    }
}

export { Round }
