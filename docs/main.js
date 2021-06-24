import { Game } from "./modules/game.js"

function startGame() {
    const maxRank = Number(13)
    const game = new Game(maxRank)
    game.start_game_loop()
    game.get_winner()
}
document.getElementById("startGame").addEventListener('click', startGame);
