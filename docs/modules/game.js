import { Deck } from "./deck.js"
import { Player, AI } from "./player.js"
import { Round } from "./round.js"

class Game {
    constructor(number_of_card_sets) {
        this.number_of_card_sets = number_of_card_sets
        this.num_players = 3
        this.deck = new Deck(number_of_card_sets)
        this.is_over = false
        this.total_books = 0
        this.players = null
        this.AI1 = new AI("1")
        this.AI2 = new AI("2")
        this.player = new Player("Gerald")
        this.players = [this.player, this.AI1, this.AI2]
        
    }

    initialize() {
        console.log("start round")


        //deal each player 7 cards
        console.log("Players initialized.")

        this.players.forEach((player) => {
            console.log(player.name)
            player.hand.init_deck = this.deck
            for(let i = 0; i<7; i++){
                this.deck.deal(player)
            }
        })
    }

    start_game_loop(){
        let round_count = 1
        console.log(this.total_books)
        console.log(this.number_of_card_sets)
        while (this.total_books < this.number_of_card_sets) {
            console.log(`Round ${round_count}`)
            console.log(`${this.deck.size} cards left in deck`)
            const new_round = new Round(this.deck, this.players, this.number_of_card_sets)
            new_round.start_round()
            this.total_books += new_round.get_new_books()
            round_count ++
            console.log(`#######BOOKS ${this.total_books}`)

        }
        // all books have been achieved.
        let winner = this.get_winner(players)
        console.log(`${winner.name} wins`)
    }

    get_winner(players) {
        counts = []
        for (i in Range(players.length)) {
            counts.push(players[i].books)
        }
    }
}

export { Game }
