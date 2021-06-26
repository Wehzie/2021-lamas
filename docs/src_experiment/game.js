import { Deck } from "./deck.js"
import { Player, AI, Agent } from "./player.js"
import { Round } from "./round.js"

// possible strategies an AI can take
const possible_strats = ["random", "high card", "first order", "second order"]

class Game {
    /**
     *
     * @param {BigInt} max_rank The maximum card rank the game is played with
     */
    constructor(max_rank, allow_human = true) {
        this.max_rank = max_rank // the maximum card rank in the deck
        this.deck = new Deck(max_rank) // filled card deck
        this.is_over = false // wether a game is completed
        this.total_books = 0 // number of books already completed
        // initialize three AI agents and a human player
        this.AI1 = new AI("1", possible_strats[2])
        this.AI2 = new AI("2", possible_strats[3])
        this.AI3 = new AI("3", possible_strats[3])
        this.player = new Player("Gerald")

        // depending on allow_human
        // either a human plays against two AIs
        // or three AIs play against each other
        if (allow_human) {
            this.agents = [this.player, this.AI1, this.AI2]
        } else {
            this.agents = [this.AI1, this.AI2, this.AI3]
        }
        //
        this.complete_agent_init()
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
            for (let i = 0; i < size_of_initial_hand; i++) {
                this.total_books += this.deck.deal(agent)
            }
        })
        console.log("Players initialized.")
    }

    start_game_loop() {
        /**
         * Play rounds until the all books have been completed.
         */
        let round_count = 1
        // the number of books that can be determined is equivalent ...
        // ... to the maximum card rank
        while (this.total_books < this.max_rank) {
            console.log(`Round ${round_count}`)
            console.log(`${this.deck.size} cards left in deck`)
            // initialize and start a new round
            const new_round = new Round(this.deck, this.agents, this.max_rank)
            new_round.start_round()
            // count how many books were collected during the round
            this.total_books += new_round.get_new_books()
            round_count++
            console.log(`total books obtained:${this.total_books}`)
        }
        // all books have been achieved
        let winner = this.get_winner()
        console.log(`${winner.name} wins in round ${round_count}`)
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

function obtain_dealt_card_number(max_rank) {
    /**
     * @return {int}    The number of cards that a player is dealt at the start of the game
     */
    if (max_rank - 6 > 0) return max_rank - 6
    else return max_rank
}

export { Game }
