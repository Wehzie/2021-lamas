import { Hand } from "./hand.js"

class Agent {
    constructor() {
        this.hand = new Hand()
        this.books = 0
        this.has_cards = false
        this.name = null
        //this.Knowledge = new this.Knowledge();
    }

    has_specific_cards(value) {
        return this.hand.query(value)
    }

    show_hand(){
        console.log(`${this.name}'s hand:`)
        this.hand.print_hand()
    }

    receive_card(card) {
        this.hand.add_card(card)
        this.has_cards = true
        if (this.hand.check_if_book(card)) {
            return true
        }
        return false
    }

    give_cards(agent, value) {
        let cards = this.hand.remove_cards(value)
        let obtained_books = 0
        cards.forEach((card) => {
            if (agent.receive_card(card)) {obtained_books += 1}
        })
        if (this.hand.size == 0) {
            this.has_cards = false
        }
        agent.books += obtained_books
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
