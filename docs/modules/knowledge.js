const BOOK = -100
class Knowledge{
    constructor(max_rank, agents, me) {
        this.max_rank = max_rank
        this.me = me
        this.agent1 = assign_agent1(agents,this.me)
        this.agent2 = assign_agent2(agents,this.me)
        this.kn_1 = [-1] * this.max_rank
        this.kn_2 = [-1] * this.max_rank
        this.second_order = [-1] * this.max_rank
    }

    update_knowledge(agent, value, amount ){
        kn = this.get_knowledge(agent)
        if(has_card) increase_index(kn, value, amount)
        else kn[value - 1] = 0
    }

    get_knowledge(agent){
        switch(agent){
            case this.this.agent1:
                return this.kn_1
            case this.agent2:
                return this.kn_2
            case this.me:
                return this.second_order
        }
    }  
}

function increase_index(kn, val, amount){
    if (kn[val-1] == -1) kn[val-1] = amount
    else if (kn[val-1] >= 0) kn[val-1] += amount
    if (kn[val] == 4) kn[val] == BOOK
}

function reset_unknown(kn){
    for (var i = 0; i<kn.length; i++){
        if (kn[i] == 0) kn[i] == -1
    }
}

function assign_agent1(agents, me){
    if (agents[1] == me) return agents[0]
    return agents[1]
}

function assign_agent2(agents, me){
    if (agents[2] == me) return agents[1]
    return agents[2]
}