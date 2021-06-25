import { Game } from "./modules/game.js"

let game = null

function startGame() {
    const maxRank = Number(13)
    game = new Game(maxRank)
}
document.getElementById("startGame").addEventListener('click', startGame);

function button_play_round() {
    game.play_round(chosen_agent, chosen_card)
    
    // change button name from Draw to End when the deck is empty
    if (!game.deck.draw_possible()) {
        document.getElementById("drawEnd").innerText = "End Turn"
    }
}

document.getElementById("startGame").addEventListener('click', toggleCardMenu);

document.getElementById("takeTurn").addEventListener('click', button_play_round);


for (let rank = 1; rank <= 13; rank++) {
}
