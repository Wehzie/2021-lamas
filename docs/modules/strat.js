//---random---
function select_random_agent(me, agent_list){
    let other_agents = []
    agent_list.forEach(agent => {
        if (agent != me) other_agents.push(agent)
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
function choose_random_card(me, num_of_card_sets){
    let chosen_card_value = null
    let has_chosen_card = false
    while (!has_chosen_card) {
        chosen_card_value = randomFromTo(1, num_of_card_sets + 1) // chose random player to ask
        has_chosen_card = me.has_specific_cards(chosen_card_value)
    }
    return chosen_card_value
}

//---high card---

function choose_high_card(me, num_of_card_sets){
    let chosen_card_value = null
    let highest = 0
    let temp = 0
    for (let card_val = 1; card_val <= num_of_card_sets; card_val++){
        temp = me.hand.how_many_of_value(card_val)
        if (temp > highest){
            highest = temp
            chosen_card_value = card_val
        }
    }
    return chosen_card_value
}
//---first order---

function choose_first_order_agent(me, agent_list){
    let agent = me.kn.get_best_agent()
    if (agent) return agent
    else return select_random_agent(me, agent_list)
}

function choose_first_order_card(me, chosen_agent){
    return me.kn.get_best_card(chosen_agent)
}



//---second order---

function pick_agent(strat, me, agent_list){
    switch(strat){
        case 'random':
            return select_random_agent(me, agent_list)
        case 'high card':
            return select_random_agent(me, agent_list)
        case 'first order':
            return choose_first_order_agent(me, agent_list)
        case 'second order':
            break
    }
}

function pick_card(strat, max_rank, chosen_agent){
    switch(strat){
        case 'random':
            return choose_random_card(me, max_rank)
        case 'high card':
            return choose_high_card(me, max_rank)
        case 'first order':
            return choose_first_order_card(me, chosen_agent)
        case 'second order':
            break
    }
}