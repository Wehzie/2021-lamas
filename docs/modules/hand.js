//import { Deck } from "./deck"

class Hand {
    constructor() {
        this.deck_ = null
        this._size = 0
        this.ordered_array = null
    }

    get size() {
        return this.size
    }
    set deck(deck) {
        console.log("helloo")
        this.deck_ = deck
        this.ordered_array = this.create_ordered_array()
    }

    // set size(val){
    //     this.size += val
    // }

    create_ordered_array() {
        let ordered = []
        for (let i = 0; i < this.deck_.number_of_cards; i++) {
            let new_arr = []
            ordered.push(new_arr)
        }
        return ordered
    }

    add_card(card) {
        let current = this.ordered_array[card.value - 1]
        current.push(card)
        let newSet = []
        for (card in current) if (card.suit == "hearts") newSet.push(card)
        for (card in current) if (card.suit == "clubs") newSet.push(card)
        for (card in current) if (card.suit == "diamonds") newSet.push(card)
        for (card in current) if (card.suit == "spades") newSet.push(card)
        this.ordered_array[card.value - 1] = newSet
    }

    check_if_book(card) {
        set = this.ordered_array[card.value - 1]
        if (set.length == 4) {
            return true
        }
        return false
    }

    remove_cards(value) {
        let cards = this.ordered_array[value - 1]
        let amount = cards.length
        let empty = []
        this.ordered_array[value - 1] = empty
        this._size -= amount
        return cards
    }

    query(value) {
        if (this.ordered_array[value - 1].length > 0) {
            return true
        } else {
            return false
        }
    }
}

export { Hand }
