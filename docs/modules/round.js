import { num2card_val } from "./card.js"
import { display } from "./../main.js"
const QUERY = -50

class Round {
    constructor(deck, agents, num_of_card_sets, round_count) {
        this.deck = deck
        this.agents = agents
        this.num_of_card_sets = num_of_card_sets
        this.obtained_books = 0
        this.player = this.agents[0]
        this.AI1 = this.agents[1]
        this.AI2 = this.agents[2]
        this.draw_card = false
        this.player_turn_complete = false
        this.round_complete = false
        this.round_count = round_count
    }

    start_round(player_ai_choice, player_card_choice) {
        /**
         * A round consists of at least three turns; one per agent.
         * An agent may take an extra turn whenever receiving a card from another agent.
         * 
         * @param {AI} player_ai_choice     The agent the player wants to ask
         * @param {Card} player_card_choice The card the player asks for 
         */
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
        /**
         * An agent's turn consists of a series of single turns.
         */
        // console.log(`${agent.name}'s turn`)
        display('logArea',`${agent.name}'s turn`, true, 1)
        let turn = true
        while (turn) {
            agent.show_hand()
            turn = this.single_turn(agent)
            
        }
    }


    // draw and end the player turn
    draw_end_turn(me) {
        if(this.deck.draw_possible()){
            this.obtained_books += this.deck.deal(me)
            reset_0s(me, this.agents)
        }
        return true
    }

    player_single_turn(me, chosen_agent, chosen_card_value){
        let query_message = `${me.name} asked ${chosen_agent.name} if they have any ${num2card_val(chosen_card_value)}s`
        display('logArea', query_message, true, 1)
        console.log(query_message)
        //people know player asked for chosen card
        update_knowledge_all(me, this.agents, chosen_card_value, QUERY)

        if(chosen_agent.has_specific_cards(chosen_card_value)) {
            let chosen_card_amount = chosen_agent.hand.how_many_of_value(chosen_card_value)
            let action_message = `${chosen_agent.name} has ${chosen_card_amount} ${num2card_val(chosen_card_value)}'s and gives them to ${me.name}`
            display('logArea', action_message, true, 1)
            console.log(action_message)
            update_knowledge_all(me, this.agents,  chosen_card_value, chosen_card_amount)
            update_knowledge_all(chosen_agent, this.agents,  chosen_card_value, -1 * chosen_card_amount)
            // check whether a book was formed
            this.obtained_books += chosen_agent.give_cards(me, chosen_card_value)
            // console.log(`${me.name} has another turn`)
            display('logArea', `${me.name} has another turn`, true, 1)
            // the player may take another single turn
            return false
        }
        // asked agent doesn't have the card
        else {
            // console.log("GO FISH")
            display('logArea', 'GO FISH', true, 1 )
            // everyone knows that the asked person doesn't have the card
            update_knowledge_all(chosen_agent, this.agents,  chosen_card_value, 0)
            // the agent shouldn't take another card
            return true
        }
    }

    single_turn(me) {
        /**
         * A single turn played by an agent
         * Multiple single turns may be played consecutively by the same agent
         * @returns {boolean} True when another single turn is to be played
         */
        if(me.has_cards){
            let chosen_agent = me.select_agent(this.agents)
            display('logArea', `${me.name} choses ${chosen_agent.name}`, true, 1)
            // console.log(`${me.name} choses ${chosen_agent.name}`)
            if(chosen_agent){
                chosen_agent.show_hand()
                let chosen_card_value = me.choose_card_value(this.num_of_card_sets, chosen_agent)
                let action_message2 = `${me.name} asks ${chosen_agent.name} if they have any ${num2card_val(chosen_card_value)}'s`
                display('logArea', action_message2, true, 1)
                // console.log(action_message2)
                // console.log(`KNOWLEDGE UPDATE: QUERY:`)
                update_knowledge_all(me, this.agents, chosen_card_value, QUERY)
                // check_knowledge(this.agents)
                // ask other player for specific card that was chosen
                if (chosen_agent.has_specific_cards(chosen_card_value)) {
                    let chosen_card_amount = chosen_agent.hand.how_many_of_value(chosen_card_value)
                    //each player now knows that i have 1 + chosen_agent.hand.how_many_of_value(chosen_card_value) and chosen player has 0
                    // console.log(`KNOWLEDGE UPDATE: ASKED FOR ${chosen_card_value}'s:  SUCCESS`)
                    let action_message3 = `${chosen_agent.name} has ${chosen_card_amount} ${num2card_val(chosen_card_value)}'s and gives them to ${me.name}`
                    // console.log(action_message3)
                    display('logArea', action_message3, true, 1)

                    update_knowledge_all(me, this.agents,  chosen_card_value, chosen_card_amount)
                    // check_knowledge(this.agents)
                    // console.log(`KNOWLEDGE UPDATE: OTHER HAS GIVEN AWAY`)
                    update_knowledge_all(chosen_agent, this.agents,  chosen_card_value, -1 * chosen_card_amount)
                    // check_knowledge(this.agents)
                    this.obtained_books += chosen_agent.give_cards(me, chosen_card_value)
                    display('logArea',`${me.name} has another turn`, true, 1 )
                    // console.log(`${me.name} has another turn`)
                    return true
                } else {
                    // console.log("GO FISH")
                    display('logArea', 'GO FISH', true, 1 )
                    // console.log(`KNOWLEDGE UPDATE: GO FISH`)
                    update_knowledge_all(chosen_agent, this.agents,  chosen_card_value, 0)
                    // check_knowledge(this.agents)

                    if (this.deck.draw_possible()) {
                        // console.log(`KNOWLEDGE UPDATE: RESET`)
                        reset_0s(me, this.agents) 
                        // check_knowledge(this.agents)
                        display('logArea', `${me.name} draws a card and finishes their turn`, true, 1 )
                        // console.log(`${me.name} draws a card and finishes their turn`)
                        this.obtained_books += this.deck.deal(me)
                    } else {
                        display('logArea', `${me.name} finished their turn`, true, 1 )
                        display('logArea', `${me.name} no card can be drawn because the deck is empty`, true, 1 )

                        // console.log(`${me.name} finished their turn`)
                        // console.log(`${me.name} no card can be drawn because the deck is empty`)
                    }
                    return false // finish turn
                } 
            }           
        }
        if (this.deck.draw_possible()) {
            // console.log(`KNOWLEDGE UPDATE: RESET`)
            reset_0s(me, this.agents)
            // check_knowledge(this.agents)
            display('logArea',`${me.name} draws a card`, true)
            // console.log(`${me.name} draws a card`)
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

function reset_0s(subject, agent_list){
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
