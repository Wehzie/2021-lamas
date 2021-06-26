class Card {
    constructor(value, suit) {
        this.value = value
        this.suit = suit
        this.colour = this.get_colour(suit)
    }

    get_colour() {
        if (this.suit == "hearts" || this.suit == "diamonds") return "Red"
        return "Black"
    }

    print_card() {
        /**
         * @return {String} String representation of a playing card
         */
        let value = num2card_val(this.value)
        switch (this.suit) {
            case "hearts":
                return `${value}♡`
            case `diamonds`:
                return `${value}♢`
            case "clubs":
                return `${value}♧`
            case "spades":
                return `${value}♤`
        }
    }
}

function num2card_val(num) {
    switch (num) {
        case 1:
            return "A"
        case 11:
            return "J"
        case 12:
            return "Q"
        case 13:
            return "K"
        default:
            return `${num}`
    }
}

function card_val2num(card_val) {
    switch (card_val) {
        case "A":
            return 1
        case "J":
            return 11
        case "Q":
            return 12
        case "K":
            return 13
        default:
            return Number(card_val)
    }
}

export { Card, num2card_val, card_val2num }
