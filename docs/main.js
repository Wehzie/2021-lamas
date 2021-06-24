import { Game } from "./modules/game.js"

let game = null

function startGame() {
    const maxRank = Number(13)
    game = new Game(maxRank)
}
document.getElementById("startGame").addEventListener('click', startGame);

function button_play_round() {
    game.play_round(chosen_agent, chosen_card)
    // 1open new round if none exists
    // 2take single player turns until done
    // 3execute AI turns
    // 4 
}

for (let rank = 1; rank <= 13; rank++) {
    document.getElementById("takeTurn").addEventListener('click', event_single_turn);
}
