class Hand{
    constructor(deck){
        this.ordered_array = this.create_ordered_array();
        this.deck = deck;
        this.size = 0;
    }

    create_ordered_array(){
        let ordered = [];
        for (let i = 0; i < this.deck.number_of_cards(); i++){
            let new_arr = [];
            ordered.push(new_arr);
        }
    }

    add_card(card){
        let current = this.ordered_array[card.value - 1];
        current.push(card);
        let newSet = [];
        for (card in current) if (card.suit == 'hearts') newSet.push(card);
        for (card in current) if (card.suit == 'clubs') newSet.push(card);
        for (card in current) if (card.suit == 'diamonds') newSet.push(card);
        for (card in current) if (card.suit == 'spades') newSet.push(card);
        this.ordered_array[card.value - 1] = newSet;
    }

    remove_cards(value){
        let cards = this.ordered_array[value - 1] 
        let empty = [];
        this.ordered_array[value - 1] = empty;
        return cards;
    }

    query(value){
        if (this.ordered_array[value-1].length > 0){
            return this.remove_cards(value);
        } else {
            return false
        }
    }
}