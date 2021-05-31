import { Deck } from "./deck.js"
import { Player, AI } from "./player.js"
import { Round } from "./round.js"

class Game {
    constructor(number_of_card_sets) {
        this.number_of_card_sets = number_of_card_sets
        this.num_players = 3
        this.deck = new Deck(number_of_card_sets)
        this.is_over = false
        this.total_books = 0

    }
    
    play(){
        console.log('start round')

        let AI1 = new AI('1')
        let AI2 = new AI('2')
        let player = new Player(prompt('What is your name'))
        //deal each player 7 cards
        let players = [player, AI1, AI2]
        console.log(' players defined')
        for (player in players){
            //player.hand.deck(this.deck)
            console.log(player.name)
            player.hand.deck = this.deck
        }
        while (this.total_books < this.number_of_card_sets){
            new_round = new Round(this.deck, players)
            this.total_books += new_round.get_new_books()
        }
        // all books have been achieved. 
        let winner = this.get_winner(players)
        console.log(`${winner.name} wins`)
    }

    get_winner(players){
        counts = []
        for (i in Range(players.length)){
            counts.push(players[i].books)
        }
    }

}

export { Game }
