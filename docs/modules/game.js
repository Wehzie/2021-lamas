import { Card } from "./card.js"
import { Deck } from "./deck.js"
import { Player, AI, Agent } from "./player.js"
import { Round } from "./round.js"
import { toggleCardMenu } from "./../main.js"

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
        this.round = new Round(this.deck, this.agents, this.max_rank)
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
         * @param {BigInt} player_ai_choice     The agent the player wants to ask
         * @param {BigInt} player_card_choice The card the player asks for 
         */
        

        // is the game over?
        // the number of books that can be determined is equivalent ...
        // ... to the maximum card rank

        // if (this.round != null) {
        //     console.log('round complete?', this.round.player_turn_complete )
        //     console.log('draw card?',this.round.draw_card )
        // }
        if (this.total_books == this.max_rank) {
            let winner = this.get_winner()
            console.log(`${winner.name} wins in round ${this.round_count}`)
            this.is_over = true
            return
        }
        if (player_ai_choice == 'deal'){
            console.log('####### ', 'round complete?',this.round.round_complete, 'player complete?', this.round.player_turn_complete ,'draw card?',this.round.draw_card  )
        }

        // initialize a new round if the previous round was completed
        if (this.round_count == 0 || this.round.round_complete == true) {
            this.round_count ++
            this.set_new_round()
            console.log(`Round ${this.round_count}`)
            console.log(`${this.deck.size} cards left in deck`)
            console.log('\n')
        }
        
        // when the player turn is completed let the AIs play
        if (this.round.player_turn_complete == true) {
            // AIs take their turns
            console.log("AIs taking turns.")
            this.agents.forEach(agent => {
                if (agent instanceof AI){
                    this.round.start_turn(agent)
                }
            })
        
            // count how many books were collected during the round
            this.total_books += this.round.get_new_books()
            console.log(`total books obtained:${this.total_books}`)

            // give back control to the player
            this.round.round_complete = true
            this.player_turn_complete = false
        }

        
        // a player takes a single turn
        if (this.round.player_turn_complete == false && this.round.draw_card == false) {
            console.log("Player takes a single turn.")
            let chosen_ai = this.agents[Number(player_ai_choice)]
            this.round.draw_card = Boolean(this.round.player_single_turn(this.player, chosen_ai, player_card_choice))
            // console.log(this.round.draw_card)
            if(this.round.draw_card) toggleCardMenu(2)
            else toggleCardMenu(0)
            
        }

        // draw a card, finished turn
        if (this.round.player_turn_complete == false && this.round.draw_card == true) {
            console.log("Player finish your turn by drawing a card.")
            this.round.player_turn_complete = Boolean(this.round.draw_end_turn(this.player))
            
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
