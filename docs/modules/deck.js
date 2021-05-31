import { Card } from "./card.js"

class Deck {
    constructor(number_of_cards) {
        this.number_of_cards = this.obtain_card_num(number_of_cards)
        this.card_list = this.fill_deck()
        this.size = this.card_list.length
    }
    get_number_of_cards() {
        return this.number_of_cards
    }
    draw_possible(){
        return this.size > 0
    }

    obtain_card_num(num) {
        if (num > 13) return 13
        else return num
    }
    deal(agent){
        agent.receive_card(this.card_list.pop())
        this.size = this.card_list.length
    }

    fill_deck() {
        let cards = []
        for (let i = 1; i < this.number_of_cards; i++) {
            let newHeart = new Card(i, "hearts")
            let newDiamond = new Card(i, "diamonds")
            let newClub = new Card(i, "clubs")
            let newSpade = new Card(i, "spades")
            cards.push(newHeart)
            cards.push(newDiamond)
            cards.push(newClub)
            cards.push(newSpade)
        }
        return this.shuffle(cards)
    }

    shuffle(deck) {
        let shuffled = deck
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
        return shuffled
    }
}

export { Deck }
