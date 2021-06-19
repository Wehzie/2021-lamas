import { Game } from "./modules/game.js"

function startGame() {
    const maxRank = document.getElementById("maxRank")
    const game = new Game(maxRank)
    game.initialize()
    game.start_game_loop()
    game.get_winner()
}

document.getElementById("startGame").addEventListener('click', startGame);
