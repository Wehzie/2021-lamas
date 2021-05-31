import { Hand } from "./hand.js"

class Agent {
    constructor() {
        this.hand = new Hand()
        this.books = 0
        this.has_cards = false
        //this.Knowledge = new this.Knowledge();
    }
    get books(){
        return this.books
    }
    get hand(){
        return this.hand
    }

    has_specific_cards(value){
        return this.hand.query(value)
    }

    receive_card(card){
        this.hand.add_card(card)
        this.has_cards = true
        if (this.hand.check_if_book(card)){
            return true
        }
        return false
    }

    give_cards(agent, value){
        let cards = this.hand.remove_cards(value)
        let obtained_books = 0
        for (card in cards){
            if(agent.receive_card(card)) books +=1
        }
        if (this.hand.size == 0){
            this.has_cards = false
        }
        this.books += obtained_books
        return obtained_books;
    }


}

class Player extends Agent {
    constructor(name) {
        super();
        this.name = name
    }
}

class AI extends Agent {
    constructor(number) {
        super();
        this.number = number
        this.name = `AI ${this.name}`
    }
}

export { Agent, Player, AI }
