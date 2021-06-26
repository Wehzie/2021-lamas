import { num2card_val } from "./card.js"
const BOOK = -100
const QUERY = -50
const UNK = -1
class Knowledge{
    constructor(max_rank, agents, me) {
        this.max_rank = max_rank
        this.me = me
        
        this.agent1 = assign_agent1(agents,this.me)
        this.agent2 = assign_agent2(agents,this.me, this.agent1)
        this.kn_1 = new Array(this.max_rank).fill(UNK)
        this.kn_2 = new Array(this.max_rank).fill(UNK)
        this.second_order = new Array(this.max_rank).fill(UNK)
    }

    update_knowledge(subject, card_value, amount){
        let kn = this.get_knowledge(subject)        
        increase_index(kn, card_value, amount)
        
    }
    
    get_knowledge(agent){
        switch(agent){
            case this.agent1:
                return this.kn_1
            case this.agent2:
                return this.kn_2
            case this.me:
                return this.second_order
        }
    } 


    display_knowledge(){
        let agent1_kn = `${this.agent1.name}:   ${get_knowledge_to_print(this.get_knowledge(this.agent1))}`
        let agent2_kn = `${this.agent2.name}:   ${get_knowledge_to_print(this.get_knowledge(this.agent2))}`
        let self_kn = `Second Order:   ${get_knowledge_to_print(this.get_knowledge(this.me))}`
        console.log(`${this.me.name} knows that:\n${agent1_kn}\n${agent2_kn}\n${self_kn}\n\n`)
    }

    reset_unknowns(subject){
        // console.log(`I am ${this.me.name} and i am resetting ${subject.name}'s knowledge`)
        let kn = this.get_knowledge(subject)
        reset_unknown(kn)
    }

    get_best_agent(conceal = false){
        let highest_agent1 = 0
        let highest_agent2 = 0
        let temp_agent1 = 0
        let temp_agent2 = 0
        let have_card = false
        let open_card = false
        let my_amount = 0
        for (let card_val = 1; card_val <= this.max_rank; card_val++){
            temp_agent1 = this.kn_1[card_val - 1]
            temp_agent2 = this.kn_2[card_val - 1]
            have_card = this.me.has_specific_cards(card_val)
            open_card = this.second_order[card_val - 1] != UNK
            if(have_card)
            my_amount = this.me.hand.how_many_of_value(card_val)
            if(conceal){
                if(have_card && open_card && temp_agent1 > 0 && temp_agent1 + my_amount > highest_agent1) highest_agent1 = temp_agent1
                if(have_card && open_card && temp_agent1 > 0 && temp_agent2 + my_amount > highest_agent2) highest_agent2 = temp_agent2
            } else {
                if(have_card && temp_agent1 > 0 && temp_agent1 + my_amount > highest_agent1) highest_agent1 = temp_agent1
                if(have_card && temp_agent1 > 0 && temp_agent2 + my_amount > highest_agent2) highest_agent2 = temp_agent2
            }
        }
        if (highest_agent1 > highest_agent2) return this.agent1
        else if (highest_agent2 > highest_agent1) return this.agent2
        else return false //equal
    }


    get_best_card(agent, conceal = false){
        let kn = this.get_knowledge(agent)
        let highest_amount = 0
        let chosen_card = false
        let temp = 0
        let have_card = false
        let open_card = false
        for (let card_val = 1; card_val <= this.max_rank; card_val++){
            temp = kn[card_val - 1]
            have_card = this.me.has_specific_cards(card_val)
            open_card = this.second_order[card_val - 1] != UNK
            if (conceal){
                if(have_card && open_card && temp > highest_amount){
                    highest_amount = temp
                    chosen_card = card_val
                }
            } else {
                if(have_card && temp > highest_amount){
                    highest_amount = temp
                    chosen_card = card_val
                }
            }
        }
        return chosen_card
    }




    book_possible(agent){
        let my_hand = this.me.hand
        let kn = this.get_knowledge(agent)
        for (let card_val = 1; card_val <= this.max_rank; card_val++){
            if(my_hand.how_many_of_value(card_val) + kn[card_val-1] == 4){
                 return card_val
            }
        }
        return false
    }

    can_conceal(){
        for (let card_val = 1; card_val <= this.max_rank; card_val++){
            if(this.second_order[card_val - 1] != UNK) return true
        }
        return false
    }
    knowledge_available(agent){
        let kn = this.get_knowledge(agent)
        for (let card_val = 1; card_val <= this.max_rank; card_val++){
            if(kn[card_val - 1] != UNK) return true
        }
        return false
    }
}

function increase_index(kn, card_val, amount){
    let val  = card_val - 1
    //query, if current knowledge is unk or 0 -> 1 else same
    if (amount == QUERY && (kn[val] == UNK || kn[val] == 0)) kn[val] = 1
    else if (amount == QUERY ) kn[val] = kn[val]
    //removing cards, if previously unknown, set to 0, 
    //if known and knowledge and removing the amount would go below 0, set to 0 also
    else if (kn[val] == UNK && amount < 0) kn[val] = 0 
    else if (amount + kn[val] < 0 && amount + kn[val] > - 4) kn[val] = 0
    //adding cards/removing cards, if knowledge is above 1 add the amount to the knowledge
    else if (kn[val] >= 1)kn[val] += amount
    //if book complete, mark value
    if (kn[val] == 4) kn[val] = BOOK
}

function get_knowledge_to_print(kn){
    let kn_string = ''
    for (let i = 0; i<kn.length; i++){
        kn_string = `${kn_string}  ${num2card_val(i + 1)}:${kn[i]}`
    }
    return kn_string
}


function reset_unknown(kn){
    for (var i = 0; i<kn.length; i++){
        let g = kn[i] 
        if (kn[i] == 0){
            kn[i] = UNK
        } 
    }
    
}

function assign_agent1(agents, me){
    if (agents[1] == me) return agents[0]
    return agents[1]
}

function assign_agent2(agents, me, agent1){
    if (agents[0] != me && agents[0] != agent1) return agents[0]
    if (agents[1] != me && agents[1] != agent1) return agents[1]
    if (agents[2] != me && agents[2] != agent1) return agents[2]
}

export { Knowledge, reset_unknown }