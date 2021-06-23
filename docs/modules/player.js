import { Hand } from "./hand.js"
import { randomFromTo } from "./utils.js"
import { Knowledge } from "./knowledge.js"
import { num2card_val, card_val2num } from "./card.js"

class Agent {
    constructor() {
        this.hand = new Hand()
        this.books = 0
        this.has_cards = false
        this.name = null
        //max_rank, agents, me
        this.kn = null
    }

    has_specific_cards(value) {
        return this.hand.query(value)
    }

    init_knowledge(max_rank, agents){
        this.kn = new Knowledge(max_rank, agents, this)
    }


    show_hand(){
        console.log(`${this.name}'s hand:`)
        this.hand.print_hand()
    }

    //returns 1 when book is made
    receive_card(card) {
        this.hand.add_card(card)
        this.has_cards = true
        if (this.hand.check_if_book(card)) {
            this.hand.remove_cards(card.value)
            this.books ++
            if (this.hand.size == 0) {
                this.has_cards = false
                console.log(`${this.name} has not more cards`)
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
    constructor(name) {
        super()
        this.name = name
    }

    select_agent(agent_list){
        let chosen_agent_index = 0
        let first = true
        while (chosen_agent_index != 1 && chosen_agent_index != 2 && agent_list[chosen_agent_index].has_cards) {
            if (first) {
                chosen_agent_index = prompt(
                    "Type the number of who you wish to ask\n1: AI1\n2:AI2"
                )
                first = false
            } else {
                chosen_agent_index = prompt(
                    "Invalid input, choose either the value 1 or 2\n1: AI1\n2:AI2"
                )
            }
        }
        return agent_list[chosen_agent_index]
    }
    
    choose_card_value(){
        let first = true
        let chosen_card_value = null
        while (true) {
            if (first) {
                chosen_card_value = prompt(
                    "Type the which value of cards you would like to ask the player\n 2-10 or A, J, Q, K\nNote: you must have that card value in your hand")
                first = false
            } else {
                chosen_card_value = prompt(
                    "Invalid input, choose an int between 2 and 10 or the uppercase letters: A, J, Q, K\nMake sure you have that card value in your hand")
            }
            chosen_card_value = card_val2num(chosen_card_value)

            if ((chosen_card_value > 0 ||
                chosen_card_value < this.num_of_card_sets) &&
                this.has_specific_cards(chosen_card_value)) {
                break
            }
        }
        return chosen_card_value
    }
}

class AI extends Agent {
    constructor(number) {
        super()
        this.number = number
        this.name = `AI ${this.number}`
    }
    choose_card_value(num_of_card_sets){
        let chosen_card_value = null
        let has_chosen_card = false
        while (!has_chosen_card) {
            chosen_card_value = randomFromTo(1, num_of_card_sets + 1) // chose random player to ask
            has_chosen_card = this.has_specific_cards(chosen_card_value)
        }
        return chosen_card_value
    }
    select_agent(agent_list){

        let other_agents = []
        agent_list.forEach(agent => {
            if (agent != this) other_agents.push(agent)
        });
        let chosen_index = Math.round(Math.random())
        let chosen_agent = other_agents[chosen_index]
        let other_agent = other_agents[Math.abs(chosen_index - 1)]
        console.log(chosen_agent)
        console.log(other_agent)
        if (chosen_agent.has_cards){
            return chosen_agent
        } else if (other_agent.has_cards){
            return other_agent
        } else {
            return false
        }
    }
  
}



export { Agent, Player, AI}
