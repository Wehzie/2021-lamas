import { Game } from "./modules/game.js"

function startGame() {
    const maxRank = document.getElementById("maxRank")
    console.log(Number(maxRank.value))
    const game = new Game(Number(maxRank.value))
    game.initialize()
    game.start_game_loop()
    game.get_winner()
}
//bug, when having less that all cards, make sure to deal less cards

document.getElementById("startGame").addEventListener('click', startGame);
