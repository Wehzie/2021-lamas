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
        let value = this.value_of_card(this.value)
        switch (this.suit) {
            case "hearts":
                return `♡ ${value}`
            case `diamonds`:
                return `♢ ${value}`
            case "clubs":
                return `♧ ${value}`
            case "spades":
                return `♤ ${value}`
        }
    }
}
function test() {
    prompt('testing this crap')
}

export { Card, test }
