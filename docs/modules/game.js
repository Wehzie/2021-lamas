import { Deck } from "./deck.js"
import { Player, AI } from "./player.js"
import { Round } from "./round.js"

const possible_strats = ['random', 'high card', 'first order', 'second order']

class Game {
    constructor(max_rank) {
        this.max_rank = max_rank
        this.deck = new Deck(max_rank)
        this.is_over = false
        this.total_books = 0
        this.AI1 = new AI("1",possible_strats[3])
        this.AI2 = new AI("2", possible_strats[3])
        this.AI3 = new AI("3", possible_strats[3])
        this.player = new Player("Gerald")
        this.agents = [this.AI1, this.AI2, this.AI3]
        // this.agents = [this.player, this.AI1, this.AI2]
        
    }

    initialize() {        
        let size_of_initial_hand = obtain_dealt_card_number(this.max_rank)

        this.agents.forEach((agent) => {
            agent.init_knowledge(this.max_rank, this.agents, agent)    
            agent.hand.init_deck = this.deck
            for(let i = 0; i < size_of_initial_hand; i++){
                this.total_books += this.deck.deal(agent)
            }
        })
        console.log("Players initialized.")
    }

    start_game_loop(){
        let round_count = 1
        while (this.total_books < this.max_rank) {
            if(round_count == 100) print(1/0)
            console.log(`Round ${round_count}`)
            console.log(`${this.deck.size} cards left in deck`)
            const new_round = new Round(this.deck, this.agents, this.max_rank)
            new_round.start_round()
            this.total_books += new_round.get_new_books()
            round_count ++
            console.log(`total books obtained:${this.total_books}`)

        }
        // all books have been achieved.
        let winner = this.get_winner()
        console.log(`${winner.name} wins in round ${round_count}`)
    }

    get_winner() {
        let winner = null
        let highest_books = 0
        for (let i = 0; i < this.agents.length; i++) {
            if (this.agents[i].books > highest_books)
            winner = this.agents[i]
            highest_books = this.agents[i].books 
        }
        return winner
    }
}

function obtain_dealt_card_number(max_rank){
    if (max_rank - 6 > 0) return max_rank - 6
    else return max_rank
}
export { Game }
