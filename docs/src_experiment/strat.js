//---random---
function choose_random_agent(me, agent_list){
    let other_agents = get_other_agents(me, agent_list)
    let chosen_index = Math.round(Math.random())
    let chosen_agent = other_agents[chosen_index]
    let other_agent = other_agents[Math.abs(chosen_index - 1)]
    // console.log(chosen_agent)
    // console.log(other_agent)
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
    let chosen_card_value = false
    let highest = 0
    let temp = 0
    let has_chosen_card = false
    for (let card_val = 1; card_val <= num_of_card_sets; card_val++){
        has_chosen_card = me.has_specific_cards(card_val)
        // console.log(has_chosen_card)
        temp = me.hand.how_many_of_value(card_val)
        if (has_chosen_card && temp > highest){
            highest = temp
            chosen_card_value = card_val
        }
    }
    if (chosen_card_value) return chosen_card_value
    else return choose_random_card(me, num_of_card_sets)
}
//---first order---

function choose_first_order_agent(me, agent_list){
    let agent = me.kn.get_best_agent()
    if (agent) {
        // console.log('first order agentfound')
        return agent
    }
    else{
        // console.log('first order choosing random')
         return choose_random_agent(me, agent_list)
    }
}

function choose_first_order_card(me, chosen_agent, max_rank){
    let chosen_card = 0
    if (me.kn.knowledge_available(chosen_agent)){
        // console.log('first order, knowledge is there')
        chosen_card = me.kn.get_best_card(chosen_agent)
    }
    else{
        // console.log('first order, no knowledge, choosing highest card')

         return choose_high_card(me, max_rank)

    }
    if(chosen_card) return chosen_card
    else return choose_high_card(me, max_rank)
}

//---second order---
function choose_second_order_agent(me, agent_list, max_rank){
    let other_agents = get_other_agents(me, agent_list)
    //check if book possible
    let agent1book = me.kn.book_possible(other_agents[0])
    let agent2book = me.kn.book_possible(other_agents[1])
    if (agent1book && agent2book) return choose_random_agent(me, agent_list)
    else if(agent1book) return other_agents[0]
    else if(agent2book) return other_agents[1]

    if (me.kn.can_conceal()){
        let agent_conceal = me.kn.get_best_agent(true)
        if (agent_conceal) return agent_conceal
        else return choose_random_agent(me, agent_list)
    } else return choose_first_order_agent(me, agent_list, max_rank)
}

function choose_second_order_card(me, agent, max_rank){
    let agent_book_card = me.kn.book_possible(agent)
    if (agent_book_card) {
        // console.log(agent_book_card)
        // console.log('second order, found book')
        return agent_book_card
    }
    if (me.kn.can_conceal()){
        // console.log('second order, can conceal')
        let conceal_card = me.kn.get_best_card(agent, true)
        if (conceal_card) return conceal_card
        else return  choose_first_order_card(me, agent, max_rank)
    } else return  choose_first_order_card(me, agent, max_rank)
}

function pick_agent(strat, me, agent_list){
    switch(strat){
        case 'random':
            return choose_random_agent(me, agent_list)
        case 'high card':
            return choose_random_agent(me, agent_list)
        case 'first order':
            return choose_first_order_agent(me, agent_list)
        case 'second order':
            return choose_second_order_agent(me, agent_list)
    }
}

function pick_card(strat, me, max_rank, chosen_agent){
    switch(strat){
        case 'random':
            return choose_random_card(me, max_rank)
        case 'high card':
            return choose_high_card(me, max_rank)
        case 'first order':
            return choose_first_order_card(me, chosen_agent, max_rank)
        case 'second order':
            return choose_second_order_card(me, chosen_agent, max_rank)
    }
}
function get_other_agents(me, agent_list){
    let new_agent_list = []
    agent_list.forEach(agent => {
        if (agent != me) new_agent_list.push(agent)
    });
    return new_agent_list
}
function randomFromTo(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

export {pick_card, pick_agent}