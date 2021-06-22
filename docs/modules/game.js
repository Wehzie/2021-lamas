import { Deck } from "./deck.js"
import { Player, AI } from "./player.js"
import { Round } from "./round.js"

class Game {
    constructor(max_rank) {
        this.max_rank = max_rank
        this.deck = new Deck(max_rank)
        this.is_over = false
        this.total_books = 0
        this.AI1 = new AI("1")
        this.AI2 = new AI("2")
        this.player = new Player("Gerald")
        this.agents = [this.player, this.AI1, this.AI2]
        
    }

    initialize() {
        console.log("start round")

        //deal each player 7 cards
        console.log("Players initialized.")
        size_of_initial_hand = obtain_dealt_card_number(this.max_rank)

        this.agents.forEach((agent) => {
            agent.init_knowledge(this.max_rank, this.agents)                
            agent.hand.init_deck = this.deck
            for(let i = 0; i < size_of_initial_hand; i++){
                this.deck.deal(agent)
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
        let winner = this.get_winner()
        console.log(`${winner.name} wins`)
    }

    get_winner(players) {
        let winner = null
        let highest_books = 0
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].books > highest_books)
            winner = this.players[i]
            highest_books = this.players[i].books 
        }
        return winner
    }
}
function obtain_dealt_card_number(max_rank){
    if (max_rank - 6 > 0) return max_rank - 6
    else return max_rank
}
export { Game }
