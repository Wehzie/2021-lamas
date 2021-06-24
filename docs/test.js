import { Game } from "./modules/game.js"
const maxRank = 13

var high_card = 0
var first_order = 0
var second_order = 0
for (let match = 0; match < 10000; match++){
    
    const game = new Game(maxRank)
    game.initialize()
    game.start_game_loop()
    let winner = game.get_winner()
    
    switch(Number(winner)){
        case 1:
            high_card ++ 
            break
        case 2:
            first_order ++ 
            break
        case 3:
            second_order ++
            break
    }
}
// console.log(`random:${high_card} wins\nhigh_card:${first_order} wins\nfirst_order:${second_order} wins`)
// console.log(`random:${high_card} wins\nhigh_card:${first_order} wins\nsecond_order:${second_order} wins`)
console.log(`random:${high_card} wins\nfirst_order:${first_order} wins\nsecond_order:${second_order} wins`)
// console.log(`high_card:${high_card} wins\nfirst_order:${first_order} wins\nsecond_order:${second_order} wins`)


