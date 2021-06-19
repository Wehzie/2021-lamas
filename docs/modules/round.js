import { Deck } from "./deck.js"
import { Player, select_agent} from "./player.js"
import { randomFromTo } from "./utils.js"
import { num2card_val } from "./card.js"

class Round {
    constructor(deck, players, num_of_card_sets) {
        this.deck = deck
        this.players = players
        this.num_of_card_sets = num_of_card_sets
        this.obtained_books = 0
    }

    start_round() {
        console.log("start round")
        this.players.forEach((player) => {
            if (player instanceof Player) {
                this.start_turn_player(player)
            } else {
                this.start_turn_AI(player)
            }
        })
        console.log(`${this.players[0].name} has ${this.players[0].books}`)
        console.log(`${this.players[1].name} has ${this.players[1].books}`)
        console.log(`${this.players[2].name} has ${this.players[2].books}`)
        console.log(`In this round ${this.obtained_books} books were obtained`)

    }
    get_new_books() {
        return this.obtained_books
    }
    start_turn_AI(ai) {
        console.log(`${ai.name}'s turn`)
        let turn = true
        let otherAI = get_other_ai(ai, this.players)
        console.log(`${otherAI.name}`)
        while (turn) {
            ai.show_hand()
            turn = this.ai_ask_agent(ai)
        }

    }

    ai_ask_agent(ai) {
        if(ai.has_cards){
            let chosen_player = select_agent(this.players[0], get_other_ai(ai,this.players))
            if(chosen_player){
                let chosen_card_value = ai.choose_card_value(this.num_of_card_sets)
                console.log(`${ai.name} asks ${chosen_player.name} if they have any ${num2card_val(chosen_card_value)}'s`)
                // ask other player for specific card that was chosen
                if (chosen_player.has_specific_cards(chosen_card_value)) {
                    chosen_player.show_hand()
                    this.obtained_books += chosen_player.give_cards(ai,chosen_card_value)
                    console.log(`${chosen_player.name} has ${chosen_player.hand.how_many_of_value(chosen_card_value)} ${num2card_val(chosen_card_value)}'s and gives them to ${ai.name}`)
                    console.log(`${ai.name} has another turn`)
                    return true
                } else {
                    console.log("GO FISH")
                    if (this.deck.draw_possible()) {
                        console.log(`${ai.name} draws a card and finishes their turn`)
                        this.obtained_books += this.deck.deal(ai)
                    } else {
                        console.log(`${ai.name} finished their turn`)
                        console.log(`${ai.name} no card can be drawn because the deck is empty`)
                    }
                    return false // finish turn
                } 
            }           
        }
        if (this.deck.draw_possible()) {
            console.log(`${ai.name} draws a card`)
            this.obtained_books += this.deck.deal(ai)
            return true
        } else {
            return false
        }
    }

    start_turn_player(player) {
        let turn = true
        while (turn) {
            player.show_hand()
            console.log('player turn')
            turn = this.player_ask_agent(player)
        }
        console.log('finished turn')
    }

    player_ask_agent(player) {
        // choose player to ask for cards
        if(player.has_cards){
            if(this.players[1].has_cards || this.players[1].has_cards){
                let chosen_player = player.choose_player(this.players)
                chosen_player.show_hand()
                let chosen_card_value = player.choose_card_value()
                console.log(`${player.name} asks ${chosen_player.name} if they have any ${num2card_val(chosen_card_value)}'s`)
                if (chosen_player.has_specific_cards(chosen_card_value)) {
                    console.log(`${chosen_player.name} has ${chosen_player.hand.how_many_of_value(chosen_card_value)} ${num2card_val(chosen_card_value)}'s and gives them to ${player.name}`)
                    console.log(`${player.name} has another turn`)
                    this.obtained_books += chosen_player.give_cards(player,chosen_card_value)
                    return true
                } else {
                    console.log("GO FISH")
                    if (this.deck.draw_possible()) {
                        console.log(`${player.name} draws a card and finishes their turn`)
                        this.obtained_books += this.deck.deal(player)
                    } else {
                        console.log(`${player.name} finished their turn`)
                        console.log(`${player.name} no card can be drawn because the deck is empty`)
                    }
                    return false // finish turn
                }
            }
        } 
        // if we get here, either the player has no cards, or both other players have no cards
        if (this.deck.draw_possible()) {
            console.log(`${player.name} draws a card`)
            this.obtained_books += this.deck.deal(player)
            return true
        } else {
            return false
        }

    }
}

function get_other_ai(me, players){
    if (players[1] != me){
        return players[1]
    }
    return players[2]

}

export { Round }
