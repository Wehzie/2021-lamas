import { Game } from "./modules/game.js"

let game = null

function startGame() {
    const maxRank = Number(13)
    game = new Game(maxRank)
}
document.getElementById("startGame").addEventListener('click', startGame);

function button_play_round() {
    game.play_round(chosen_agent, chosen_card)
}

document.getElementById("takeTurn").addEventListener('click', button_play_round);

for (let rank = 1; rank <= 13; rank++) {
}
