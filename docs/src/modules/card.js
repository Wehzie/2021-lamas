class Card {
    constructor(value, suit) {
        this.value = value
        this.suit = suit
        this.colour = this.get_colour(suit)
    }
    get_value() {
        return this.value
    }
    get_suit() {
        return this.suit
    }
    get_colour() {
        return this.colour
    }
    value_of_card(value) {
        switch (value) {
            case 1:
                return "A"
            case 11:
                return "J"
            case 12:
                return "Q"
            case 13:
                return "K"
            default:
                return `${value}`
        }
    }

    get_colour() {
        if (this.suit == "hearts" || this.suit == "diamonds") return "Red"
        return "Black"
    }

    print_card() {
        switch (this.suit) {
            case "hearts":
                return `♡ ${this.value}`
            case `diamonds`:
                return `♢ ${this.value}`
            case "clubs":
                return `♧ ${this.value}`
            case "spades":
                return `♤ ${this.value}`
        }
    }
}
function test() {
    return "fuck"
}

export { Card, test }
