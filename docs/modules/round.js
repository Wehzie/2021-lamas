import { Deck } from "./deck.js"
import { Player} from "./player.js"
import { num2card_val } from "./card.js"
const BOOK = -100
const QUERY = -50

class Round {
    constructor(deck, agents, num_of_card_sets) {
        this.deck = deck
        this.agents = agents
        this.num_of_card_sets = num_of_card_sets
        this.obtained_books = 0
        this.player = this.agents[0]
        this.AI1 = this.agents[1]
        this.AI2 = this.agents[2]
    }

    start_round() {
        // console.log("start round")
        this.agents.forEach((agent) => {
            this.start_turn(agent)
        })
        console.log(`${this.player.name} has ${this.player.books}`)
        console.log(`${this.AI1.name} has ${this.AI1.books}`)
        console.log(`${this.AI2.name} has ${this.AI2.books}`)
        console.log(`In this round ${this.obtained_books} books were obtained`)

    }
    get_new_books() {
        return this.obtained_books
    }
    start_turn(agent) {
        console.log(`${agent.name}'s turn`)
        let turn = true
        while (turn) {
            agent.show_hand()
            turn = this.single_turn(agent)
        }

    }

    single_turn(me) {
        if(me.has_cards){
            let chosen_agent = me.select_agent(this.agents)
            console.log(`${me.name} choses ${chosen_agent.name}`)
            if(chosen_agent){
                chosen_agent.show_hand()
                let chosen_card_value = me.choose_card_value(this.num_of_card_sets, chosen_agent)
                console.log(`${me.name} asks ${chosen_agent.name} if they have any ${num2card_val(chosen_card_value)}'s`)
                // console.log(`KNOWLEDGE UPDATE: QUERY:`)
                update_knowledge_all(me, this.agents, chosen_card_value, QUERY)
                // check_knowledge(this.agents)
                // ask other player for specific card that was chosen
                if (chosen_agent.has_specific_cards(chosen_card_value)) {
                    let chosen_card_amount = chosen_agent.hand.how_many_of_value(chosen_card_value)
                    //each player now knows that i have 1 + chosen_agent.hand.how_many_of_value(chosen_card_value) and chosen player has 0
                    // console.log(`KNOWLEDGE UPDATE: ASKED FOR ${chosen_card_value}'s:  SUCCESS`)
                    console.log(`${chosen_agent.name} has ${chosen_card_amount} ${num2card_val(chosen_card_value)}'s and gives them to ${me.name}`)

                    update_knowledge_all(me, this.agents,  chosen_card_value, chosen_card_amount)
                    // check_knowledge(this.agents)
                    // console.log(`KNOWLEDGE UPDATE: OTHER HAS GIVEN AWAY`)
                    update_knowledge_all(chosen_agent, this.agents,  chosen_card_value, -1 * chosen_card_amount)
                    // check_knowledge(this.agents)
                    this.obtained_books += chosen_agent.give_cards(me, chosen_card_value)
                    console.log(`${me.name} has another turn`)
                    return true
                } else {
                    console.log("GO FISH")
                    // console.log(`KNOWLEDGE UPDATE: GO FISH`)
                    update_knowledge_all(chosen_agent, this.agents,  chosen_card_value, 0)
                    // check_knowledge(this.agents)

                    if (this.deck.draw_possible()) {
                        // console.log(`KNOWLEDGE UPDATE: RESET`)
                        reset_0s(me, this.agents) 
                        // check_knowledge(this.agents)
                        console.log(`${me.name} draws a card and finishes their turn`)
                        this.obtained_books += this.deck.deal(me)
                    } else {
                        console.log(`${me.name} finished their turn`)
                        console.log(`${me.name} no card can be drawn because the deck is empty`)
                    }
                    return false // finish turn
                } 
            }           
        }
        if (this.deck.draw_possible()) {
            // console.log(`KNOWLEDGE UPDATE: RESET`)
            reset_0s(me, this.agents)
            // check_knowledge(this.agents)
            console.log(`${me.name} draws a card`)
            this.obtained_books += this.deck.deal(me)
            return true
        } else {
            return false
        }
    }
}

function update_knowledge_all(subject, agent_list, card_val, amount){
    agent_list.forEach((agent) => {
        // console.log(agent.name)
        agent.kn.update_knowledge(subject, card_val, amount)
    })
}

function reset_0s(subject ,agent_list){
    agent_list.forEach(agent => {
        agent.kn.reset_unknowns(subject)
    })
}

function check_knowledge(agent_list){
    agent_list.forEach(agent => {
        agent.kn.display_knowledge()
    })
}

export { Round }
