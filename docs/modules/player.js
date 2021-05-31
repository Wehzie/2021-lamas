import { Hand } from "./hand.js"

class Agent {
    constructor() {
        this.hand_ = new Hand()
        this.books_ = 0
        this.has_cards = false
        this.name = null
        //this.Knowledge = new this.Knowledge();
    }
    get books() {
        return this.books_
    }
    get hand() {
        return this.hand_
    }

    has_specific_cards(value) {
        return this.hand_.query(value)
    }

    receive_card(card) {
        this.hand_.add_card(card)
        this.has_cards = true
        if (this.hand_.check_if_book(card)) {
            return true
        }
        return false
    }

    give_cards(agent, value) {
        let cards = this.hand_.remove_cards(value)
        let obtained_books = 0
        for (card in cards) {
            if (agent.receive_card(card)) books += 1
        }
        if (this.hand_.size == 0) {
            this.has_cards = false
        }
        this.books_ += obtained_books
        return obtained_books
    }
}

class Player extends Agent {
    constructor(name) {
        super()
        this.name = name
    }
}

class AI extends Agent {
    constructor(number) {
        super()
        this.number = number
        this.name = `AI ${this.number}`
    }
}

export { Agent, Player, AI }
