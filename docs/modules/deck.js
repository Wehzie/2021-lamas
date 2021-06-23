import { Card } from "./card.js"

class Deck {
    constructor(number_of_cards) {
        this.number_of_cards = this.obtain_card_num(number_of_cards)
        this.card_list = this.fill_deck()
        this.size = this.card_list.length
    }

    draw_possible() {
        return this.size > 0
    }

    obtain_card_num(num) {
        if (num > 13) return 13
        else return num
    }
    deal(agent) {
        let books = 0
        let card = this.card_list.pop()
        books += agent.receive_card(card)
        this.size = this.card_list.length
        return books
    }

    fill_deck() {
        let cards = []
        for (let i = 1; i <= this.number_of_cards; i++) {
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
