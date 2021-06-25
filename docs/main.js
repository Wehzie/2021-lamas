import { Game } from "./modules/game.js"

let game = null
let mode = 0    // menu mode to control the game
let first_round = true  // whether it is the first game round

function startGame() {
    const maxRank = Number(13)
    game = new Game(maxRank)
}

function button_play_round() {
    game.play_round(chosen_agent, chosen_card)
    
    // change button name from Draw to End when the deck is empty
    if (!game.deck.draw_possible()) {
        document.getElementById("drawEnd").innerText = "End Turn"
    }
}

// generate a series of card choices based on the max rank
// that a game of Go Fish is played with
function genCardChoice(maxRank=13) {
    let outHTML = ""
    let cardSeries = "0 A 2 3 4 5 6 7 8 9 10 J Q K".split(" ")
    let cS = cardSeries
    for (let rank = 1; rank <= maxRank; rank++) {
        outHTML += "<button id='card"+rank+"'>" + cS[rank] + "</button>\n"
    }
    return outHTML
}

// disable buttons for cards that the player doesn't have on their hand
function disable_invalid_cards() {
    for (let rank = 1; rank <= 13; rank++) {
        let card_button = document.getElementById("card"+rank)
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
        if(agent instanceof AI){
            // show enabled when ai has cards
            let ai_button = document.getElementById("AI"+agent.number)
            ai_button.removeAttribute("disabled")
            // show disabled when ai has cards
            if (!agent.has_cards) {
                ai_button.setAttribute("disabled")
            }
        }
    });
}

// toggle the card menu between three different states
function toggleCardMenu() {
    const ai_c = document.getElementById("aiChoice")
    const card_c = document.getElementById("cardChoice")
    // after the first toggle remove the event listener
    if (first_round) {
        document.getElementById("startGame").remove()
        first_round = false
    }
    // show the AI menu
    if (mode == 0) {
        ai_c.removeAttribute("hidden")
        card_c.setAttribute("hidden", "")
    // show the Card menu
    } else if (mode == 1) {
        disable_invalid_cards()
        ai_c.setAttribute("hidden", "")
        card_c.removeAttribute("hidden")
    }
    mode = (mode + 1) % 2
}

//1-2
let chosen_agent = null
function button_set_agent(val) {
    chosen_agent = val
    toggleCardMenu()
    // further processing
}

//1-13
let chosen_card = null
function button_set_card(val) {
    toggleCardMenu()
    chosen_card = val
}

document.getElementById("cardChoice").innerHTML = genCardChoice()
for (let rank = 1; rank <= 13; rank++) {
    document.getElementById("card"+rank).addEventListener('click', function(){button_set_card(rank)});
    document.getElementById("card"+rank).addEventListener('click', button_play_round);
}

document.getElementById("startGame").addEventListener('click', startGame);
document.getElementById("startGame").addEventListener('click', toggleCardMenu);

document.getElementById("AI1").addEventListener("click", function(){button_set_agent(1)})
document.getElementById("AI2").addEventListener("click", function(){button_set_agent(2)})