import { Hand } from "./hand.js"
import { Knowledge } from "./knowledge.js"
import { num2card_val, card_val2num, Card } from "./card.js"
import { pick_agent, pick_card } from "./strat.js"

class Agent {
    /**
     * A Go Fish playing agent
     */
    constructor() {
        this.hand = new Hand()
        this.books = 0
        this.has_cards = false
        this.name = null
        this.kn = null
    }

    has_specific_cards(value) {
        /**
         * @return {boolean} True when an agent has a card of the asked rank (value)
         */
        return this.hand.query(value)
    }

    init_knowledge(max_rank, agents) {
        /**
         * @return {Knowledge}  Initial knowledge at the start of a game
         */
        this.kn = new Knowledge(max_rank, agents, this)
    }

    show_hand() {
        console.log(`${this.name}'s hand:`)
        this.hand.print_hand()
    }

    receive_card(card) {
        /**
         * Receive a card and check whether a book is formed
         * @param {Card} card The card received by an agent
         * @return {int} 1 when book formed, else 0
         */
        this.hand.add_card(card)
        this.has_cards = true
        if (this.hand.check_if_book(card)) {
            this.hand.remove_cards(card.value)
            this.books++
            if (this.hand.size == 0) {
                this.has_cards = false
                console.log(`${this.name} has no more cards`)
            }
            return 1
        }
        return 0
    }

    give_cards(agent, value) {
        let cards = this.hand.remove_cards(value)
        let obtained_books = 0
        cards.forEach((card) => {
            obtained_books += agent.receive_card(card)
        })
        if (this.hand.size == 0) {
            this.has_cards = false
            console.log(`${this.name} has not more cards`)
        }
        return obtained_books
    }
}

class Player extends Agent {
    constructor(name = "Gerald") {
        super()
        if (name.length == 0) name = "Gerald"
        this.name = name
    }

    select_agent(agent_list) {
        let chosen_agent_index = 0
        let first = true
        while (
            chosen_agent_index != 1 &&
            chosen_agent_index != 2 &&
            agent_list[chosen_agent_index].has_cards
        ) {
            if (first) {
                chosen_agent_index = prompt(
                    "Which agent would you like to ask? Type a number.\n1: AI1\n2: AI2"
                )
                first = false
            } else {
                chosen_agent_index = prompt(
                    "Invalid input, choose either the value 1 or 2!\n1: AI1\n2: AI2"
                )
            }
        }
        return agent_list[chosen_agent_index]
    }

    choose_card_value() {
        let first = true
        let chosen_card_value = null
        while (true) {
            if (first) {
                chosen_card_value = prompt(
                    "What card would like to as for?\n2-10 or A, J, Q, K\nNote: You must have a card of same rank in your hand!"
                )
                first = false
            } else {
                chosen_card_value = prompt(
                    "Invalid input, choose an integer between 2 and 10 or the uppercase letters: A, J, Q, K\nMake sure you have a card of that rank in your hand!"
                )
            }
            chosen_card_value = card_val2num(chosen_card_value)

            if (
                (chosen_card_value > 0 ||
                    chosen_card_value < this.num_of_card_sets) &&
                this.has_specific_cards(chosen_card_value)
            ) {
                break
            }
        }
        return chosen_card_value
    }
}

class AI extends Agent {
    constructor(number, strat) {
        super()
        this.strat = strat
        this.number = number
        this.name = `AI ${this.number}`
    }
    choose_card_value(max_rank, chosen_agent) {
        return pick_card(this.strat, this, max_rank, chosen_agent)
    }
    select_agent(agent_list) {
        return pick_agent(this.strat, this, agent_list)
    }
}

export { Agent, Player, AI }
