import { Card } from "./card.js"
import { Deck } from "./deck.js"
import { Player, AI, Agent } from "./player.js"
import { Round } from "./round.js"

// possible strategies an AI can take
const possible_strats = ['random', 'high card', 'first order', 'second order']

class Game {
    /**
     * 
     * @param {BigInt} max_rank The maximum card rank the game is played with
     */
    constructor(max_rank, allow_human=true) {
        this.round = null
        this.round_count = 0            // the number of rounds played

        this.max_rank = max_rank        // the maximum card rank in the deck
        this.deck = new Deck(max_rank)  // filled card deck
        this.is_over = false            // wether a game is completed
        this.total_books = 0            // number of books already completed
        // initialize three AI agents and a human player
        this.AI1 = new AI("1", possible_strats[2])
        this.AI2 = new AI("2", possible_strats[3])
        this.AI3 = new AI("3", possible_strats[1])
        this.player = new Player("Gerald")

        // depending on allow_human
        // either a human plays against two AIs
        // or three AIs play against each other
        if (allow_human) {
            this.agents = [this.player, this.AI1, this.AI2]
        } else {
            this.agents = [this.AI1, this.AI2, this.AI3]
        }
        this.complete_agent_init()
    }

    set_new_round() {
        self.round = new Round(this.deck, this.agents, this.max_rank)
    }

    complete_agent_init() {
        /**
         * Complete the initialization of agents in the game
         */        
        let size_of_initial_hand = obtain_dealt_card_number(this.max_rank)

        this.agents.forEach((agent) => {
            // set each agent's initial knowledge
            agent.init_knowledge(this.max_rank, this.agents, agent)
            // assign the Game's deck to each agent
            agent.hand.init_deck = this.deck
            // deal each player a number of cards
            for(let i = 0; i < size_of_initial_hand; i++){
                this.total_books += this.deck.deal(agent)
            }
        })
        console.log("Players initialized.")
    }

    // this is called on each button press
    play_round(player_ai_choice, player_card_choice){
        /**
         * Play a round
         * Stop playing when all books have been completed
         * 
         * @param {AI} player_ai_choice     The agent the player wants to ask
         * @param {Card} player_card_choice The card the player asks for 
         */
        
        // the number of books that can be determined is equivalent ...
        // ... to the maximum card rank
        if (this.total_books == this.max_rank) {
            let winner = this.get_winner()
            console.log(`${winner.name} wins in round ${this.round_count}`)
            this.is_over = true
            return
        }

        // initialize a new round if the previous round was completed
        if (this.round.round_complete == true) {
            this.round_count ++
            this.set_new_round()
            console.log(`Round ${this.round_count}`)
            console.log(`${this.deck.size} cards left in deck`)
        }
        
        // when the player turn is completed let the AIs play
        if (this.round.turn_complete == true) {
            // AIs take their turns

            // count how many books were collected during the round
            this.total_books += this.get_new_books()
            console.log(`total books obtained:${this.total_books}`)
        }
        
        // a player takes a single turn
        if (this.round.turn_complete == false) {
            this.round.turn_complete = this.round.single_turn(player_ai_choice, player_card_choice)
        }
    }

    get_winner() {
        /**
         * Iterate over agents to find who has most books
         * @returns {Agent}    The winning agent
         */
        let winner = null
        let highest_books = 0
        for (let i = 0; i < this.agents.length; i++) {
            if (this.agents[i].books > highest_books) {
                winner = this.agents[i]
                highest_books = this.agents[i].books 
            highest_books = this.agents[i].books 
                highest_books = this.agents[i].books 
            }
        }
        return winner
    }
}

function obtain_dealt_card_number(max_rank){
    /**
     * @return {int}    The number of cards that a player is dealt at the start of the game
     */
    if (max_rank - 6 > 0) return max_rank - 6
    else return max_rank
}

export { Game }
