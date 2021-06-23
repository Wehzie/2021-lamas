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
        let size_of_initial_hand = obtain_dealt_card_number(this.max_rank)

        this.agents.forEach((agent) => {
            agent.init_knowledge(this.max_rank, this.agents, agent)    
            agent.hand.init_deck = this.deck
            for(let i = 0; i < size_of_initial_hand; i++){
                this.deck.deal(agent)
            }
        })
        console.log("Players initialized.")
    }

    start_game_loop(){
        let round_count = 1
        console.log(this.total_books)
        console.log(this.max_rank)
        while (this.total_books < this.max_rank) {
            console.log(`Round ${round_count}`)
            console.log(`${this.deck.size} cards left in deck`)
            const new_round = new Round(this.deck, this.agents, this.max_rank)
            new_round.start_round()
            this.total_books += new_round.get_new_books()
            round_count ++
            console.log(`#######BOOKS ${this.total_books}`)

        }
        // all books have been achieved.
        let winner = this.get_winner()
        console.log(`${winner.name} wins`)
    }

    get_winner() {
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
    console.log(max_rank - 6)
    if (max_rank - 6 > 0) return max_rank - 6
    else return max_rank
}
export { Game }
