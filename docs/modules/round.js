import { Deck } from "./deck.js"
import { Player } from "./player.js"
import { randomFromTo } from "./utils.js"
import { value_of_card } from "./card.js"

class Round {
    constructor(deck, players, num_of_card_sets) {
        this.deck = deck
        this.players = players
        this.num_of_card_sets = num_of_card_sets
        this.obtained_books = 0
    }

    start_round() {
        console.log("start round")
        for (player in this.players) {
            if (typeof Player == player.GetType()) {
                this.start_turn_player(player)
            } else {
                this.start_turn_AI(player)
            }
        }
    }
    get_new_books() {
        return this.obtained_books
    }
    start_turn_AI(ai) {
        let turn = true
        while (turn) {
            if (ai.has_cards) {
                // cards in hand
                turn = this.ai_ask_agent(ai)
            } else {
                // no cards in hand
                if (this.deck.draw_possible()) {
                    this.deck.deal(ai)
                }
                turn = this.ai_ask_agent(ai)
            }
        }
    }

    ai_ask_agent(ai) {
        // choose player to ask for cards
        let chosen_player = null
        while (chosen_player != ai) {
            chosen_player = this.players[randomFromTo(0, this.players.length)] // chose random player to ask
        }
        // choose card to ask chosen player for
        let chosen_card_value = null
        let has_chosen_card = false
        while (!has_chosen_card) {
            chosen_card_value = randomFromTo(1, this.num_of_card_sets + 1) // chose random player to ask
            has_chosen_card = ai.has_specific_cards(chosen_card_value)
        }
        console.log(`${ai.name} asks ${chosen_player.name} if they have any ${value_of_card(chosen_card_value)}'s`)
        // ask other player for specific card that was chosen
        if (chosen_player.has_specific_cards(chosen_card_value)) {
            this.obtained_books += chosen_player.give_cards(ai,chosen_card_value)
            console.log(`${chosen_player.name} has ${chosen_player.hand.how_many_of_value(chosen_card_value)} ${value_of_card(chosen_card_value)}'s and gives them to ${ai.name}`)
            console.log(`${ai.name} has another turn`)

            return true // start turn again
        } else {
            // go fish
            console.log("GO FISH")
            
            if (this.deck.draw_possible()) {
                console.log(`${ai.name} draws a card and finishes their turn`)
                this.deck.deal(ai)
            } else {
                console.log(`${ai.name} finished their turn`)
                console.log(`${ai.name} no card can be drawn because the deck is empty`)
            }
            return false // finish turn
        }
    }

    start_turn_player(player) {
        
        let turn = true
        while (turn) {
            player.show_hand()
            console.log('player turn')
            if (player.has_cards) {
                // cards in hand
                turn = this.player_ask_agent(player)
            } else {
                // no cards in hand
                if (this.deck.draw_possible()) {
                    this.deck.deal(player)
                }
                turn = this.player_ask_agent(player)
            }
        }
        // console.log('finished turn')
    }

    player_ask_agent(player) {
        // choose player to ask for cards
        let chosen_player_index = 0
        let first = true
        while (chosen_player_index != 1 && chosen_player_index != 2) {
            console.log(chosen_player_index)
            if (first) {
                chosen_player_index = prompt(
                    "Type the number of who you wish to ask\n1: AI1\n2:AI2"
                )
                first = false
            } else {
                // chosen_player_index = prompt(
                //     "Invalid input, choose either the value 1 or 2\n1: AI1\n2:AI2"
                // )
                chosen_player_index = prompt(
                    `what ${chosen_player_index}`
                )
            }
        }

        let chosen_player = this.players[chosen_player_index]
        chosen_player.show_hand()
        let chosen_card_value = null
        first = true
        while (true) {
            if (first) {
                chosen_card_value = prompt(
                    "Type the which value of cards you would like to ask the player\n 2-10 or A, J, Q, K\nNote: you must have that card value in your hand"
                )
                first = false
            } else {
                chosen_card_value = prompt(
                    "Invalid input, choose an int between 2 and 10 or the uppercase letters: A, J, Q, K\nMake sure you have that card value in your hand"
                )
            }
            switch (chosen_card_value) {
                case "A":
                    chosen_card_value = 1
                    break
                case "J":
                    chosen_card_value = 11
                    break
                case "Q":
                    chosen_card_value = 12
                    break
                case "K":
                    chosen_card_value = 13
                    break
            }

            if (
                chosen_card_value > 0 ||
                chosen_card_value < this.num_of_card_sets ||
                chosen_card_value == "A" ||
                chosen_card_value == "J" ||
                chosen_card_value == "Q" ||
                chosen_card_value == "K"
            ) {
                console.log(`${player.name} asks ${chosen_player.name} if they have any ${value_of_card(chosen_card_value)}'s`)

                if (player.has_specific_cards(chosen_card_value) && chosen_player.has_specific_cards(chosen_card_value)) {
                    console.log(`${chosen_player.name} has ${chosen_player.hand.how_many_of_value(chosen_card_value)} ${value_of_card(chosen_card_value)}'s and gives them to ${player.name}`)
                    console.log(`${player.name} has another turn`)
                    this.obtained_books += chosen_player.give_cards(
                        player,
                        chosen_card_value
                    )
                    return true
                } else {
                    // go fish
                    console.log("GO FISH")
                    if (this.deck.draw_possible()) {
                        console.log(`${player.name} draws a card and finishes their turn`)
                        this.deck.deal(player)
                    } else {
                        console.log(`${player.name} finished their turn`)
                        console.log(`${player.name} no card can be drawn because the deck is empty`)
                    }
                    return false // finish turn
                }
            }
        }
    }
}

export { Round }
