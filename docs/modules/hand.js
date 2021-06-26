//import { Deck } from "./deck"

class Hand {
    constructor() {
        this.deck = null
        this.size = 0
        this.ordered_array = null
    }

    set init_deck(deck) {
        this.deck = deck
        this.ordered_array = this.create_ordered_array()
    }

    print_hand() {
        /**
         * Print a hand
         */
        let omitted_index = []
        for (let i = 0; i < 4; i++) {
            let row = ""
            for (let j = 0; j < 13; j++) {
                if (i == 0 && this.ordered_array[j].length == 0) {
                    omitted_index.push(j)
                }
                if (!inList(j, omitted_index)) {
                    if (i < this.ordered_array[j].length) {
                        row = `${row}\t${this.ordered_array[j][i].print_card()}`
                    } else {
                        row = `${row}\t${" "}`
                    }
                }
            }
            console.log(row)
        }
    }

    get_hand_str() {
        /**
         * Return hand as string
         */

        let out = ""
        let omitted_index = []
        for (let i = 0; i < 4; i++) {
            let row = ""
            for (let j = 0; j < 13; j++) {
                if (i == 0 && this.ordered_array[j].length == 0) {
                    omitted_index.push(j)
                }
                if (!inList(j, omitted_index)) {
                    if (i < this.ordered_array[j].length) {
                        row = `${row}\t${this.ordered_array[j][i].print_card()}`
                    } else {
                        row = `${row}\t${" "}`
                    }
                }
            }
            out += row + "\n"
        }
        return out
    }

    create_ordered_array() {
        /**
         * @return {Array}  Empty 2D array
         */
        let ordered = []
        for (let i = 0; i < this.deck.number_of_cards; i++) {
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
        this.size++
    }

    check_if_book(card) {
        let set = this.ordered_array[card.value - 1]
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
        this.size -= amount
        return cards
    }

    query(value) {
        if (this.ordered_array[value - 1].length != 0) {
            return true
        } else {
            return false
        }
    }

    how_many_of_value(value) {
        return this.ordered_array[value - 1].length
    }
}
function inList(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return true
        }
    }
    return false
}
export { Hand }
