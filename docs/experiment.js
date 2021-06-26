import { Game } from "./modules/game.js"
const maxRank = 13
var random = 0
var high_card = 0
var first_order = 0
var second_order = 0
for (let match = 0; match < 10000; match++){
    
    const game = new Game(maxRank)
    game.start_game_loop()
    let winner = game.get_winner()
    // a = (1/0)
    switch(winner.strat){
        case 'random':
            random ++ 
            break
        case 'high_card':
            high_card ++ 
            break
        case 'first_order':
            first_order ++ 
            break
        case 'second_order':
            second_order ++
            break
    }
}
// console.log(`random:${random} wins\nhigh_card:${high_card} wins\nfirst_order:${first_order} wins`)
// console.log(`random:${random} wins\nhigh_card:${high_card} wins\nsecond_order:${second_order} wins`)
console.log(`random:${random} wins\nfirst_order:${first_order} wins\nsecond_order:${second_order} wins`)
// console.log(`high_card:${high_card} wins\nfirst_order:${first_order} wins\nsecond_order:${second_order} wins`)


