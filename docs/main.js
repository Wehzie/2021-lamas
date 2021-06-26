import { Game } from "./modules/game.js"
import { AI } from "./modules/player.js"

let game = null
let first_round = true  // whether it is the first game round

function tableFillData(data) {
    /**
     * Print hand
     * @param {Array} data A 2D array
     * @return HTML Table
     */
    let table = document.createElement("table")
    let tbody = document.createElement('tbody')
    for (let row = 0; row < 4; row++) {
        let tr = document.createElement("tr")
        for (let col = 0; col < 13; col++) {
            let td = document.createElement("td")
            // Notice the reverse access of rows and cols
            // Because the hand is length 13 
            // And each element has a max length 4
            if (data[col][row] != undefined) {
                td.innerHTML = data[col][row].print_card()
            }
            else {
                td.innerHTML = ""
            }
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    return table
}

function startGame() {
    const maxRank = Number(13)
    game = new Game(maxRank)
}

function button_play_round() {
    game.play_round(chosen_agent, chosen_card)
}

// generate a series of card choices based on the max rank
// that a game of Go Fish is played with
function genCardChoice(maxRank = 13) {
    let outHTML = ""
    let cardSeries = "0 A 2 3 4 5 6 7 8 9 10 J Q K".split(" ")
    let cS = cardSeries
    for (let rank = 1; rank <= maxRank; rank++) {
        outHTML += "<button id='card" + rank + "'>" + cS[rank] + "</button>\n"
    }
    return outHTML
}

// disable buttons for cards that the player doesn't have on their hand
function disable_invalid_cards() {
    for (let rank = 1; rank <= 13; rank++) {
        let card_button = document.getElementById("card" + rank)
        // enable a card first
        card_button.removeAttribute("disabled")
        // if player doesn't have some card disable
        if (!game.player.has_specific_cards(rank))
            card_button.setAttribute("disabled", "")
    }
}

// disable AI button when the AI doesn't have any cards
function disable_invalid_AI() {
    game.agents.forEach(agent => {
        if (agent instanceof AI) {
            // show enabled when ai has cards
            let ai_button = document.getElementById("AI" + agent.number)
            ai_button.removeAttribute("disabled")
            // show disabled when ai has cards
            if (!agent.has_cards) {
                ai_button.setAttribute("disabled", "")
            }
        }
    });
}

function update_hand2() {
    let hand = game.player.hand.get_hand_str()
    document.getElementById("playerHand").innerText = hand
}

function update_hand() {
    let hand = game.player.hand.ordered_array
    let table = document.getElementById("playerHand")
    
    if (hand == undefined) return
    table.innerText = ""
    table.appendChild(tableFillData(hand))
}

// toggle the card menu between three different states
function toggleCardMenu(mode = 0) {
    update_hand()
    //console.log(`Menu Mode: ${mode}`)
    const ai_c = document.getElementById("aiChoice")
    const card_c = document.getElementById("cardChoice")
    const draw_end = document.getElementById("drawEnd")

    // after the first toggle remove the event listener
    if (first_round) {
        document.getElementById("startGame").remove()
        first_round = false
    }

    if (mode == 0) { // ai select
        disable_invalid_AI()
        ai_c.removeAttribute("hidden")
        card_c.setAttribute("hidden", "")
        draw_end.setAttribute("hidden", "")
    }
    else if (mode == 1) { // card select
        console.log('it is your turn')
        disable_invalid_cards()
        ai_c.setAttribute("hidden", "")
        card_c.removeAttribute("hidden")
        draw_end.setAttribute("hidden", "")
    }
    else if (mode == 2) { // draw card, next turn 
        ai_c.setAttribute("hidden", "")
        card_c.setAttribute("hidden", "")
        draw_end.removeAttribute("hidden")
    }
}

/**
 * 
 * @param {string} location id where there message should be sent
 * @param {string} string sting you want to display
 * @param {boolean} delay do you want to delay the execution after displaying the message
 * @param {int} time number of senconds delay should last
 */
async function display(location,string, delay = false, time = 1){
    let text_area = document.getElementById(location)
    text_area.scrollTop = text_area.scrollHeight;
    if (!delay){
        text_area.innerHTML += `\n${string}`
    } else {
        setTimeout(function(){display_delay(text_area, string)}, 1000 * time)
    }
    
}
function display_delay(text_area, string){
    text_area.innerHTML += `\n${string}`
}
//1-2
let chosen_agent = null
function button_set_agent(val) {
    chosen_agent = val
}

//1-13
let chosen_card = null
function button_set_card(val) {
    chosen_card = val
}


//AI choice
document.getElementById("AI1").addEventListener("click", function () {
    button_set_agent(1)
    toggleCardMenu(1)
})
document.getElementById("AI2").addEventListener("click", function () {
    button_set_agent(2)
    toggleCardMenu(1)
})


//card buttons
document.getElementById("cardChoice").innerHTML = genCardChoice()
for (let rank = 1; rank <= 13; rank++) {
    document.getElementById("card" + rank).addEventListener('click', function () { button_set_card(rank) });
    document.getElementById("card" + rank).addEventListener('click', button_play_round);
}

//start game button
document.getElementById("startGame").addEventListener('click', startGame);
document.getElementById("startGame").addEventListener('click', function () { toggleCardMenu(0) });

//draw button
document.getElementById("drawEnd").addEventListener("click", function () {
    game.play_round("deal", "deal")
    toggleCardMenu(0)
})

<<<<<<< HEAD
export { toggleCardMenu , display}
=======


export { toggleCardMenu }
>>>>>>> f189232... hand shown
