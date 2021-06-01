import { Game } from "./modules/game.js"
import { test } from "./modules/card.js"

const game = new Game(13)
game.initialize()
game.start_game_loop()
game.get_winner()
