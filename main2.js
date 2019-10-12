class Deck{
    suits = ['Spades','Clubs','Diamonds','Hearts'];
    ranks = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];
    values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
    card;
    constructor(){
        this.cards = [];
    }
    init(){
        for (let i = 0; i < this.suits.length; i++){
            for(let j = 0; j < this.ranks.length; j++){
                this.card = new Card(this.suits[i], this.ranks[j], this.values[j]);
                this.cards.push(this.card);
            }
        }
    }
    shuffle(){
        this.cards.sort((a, b) => 0.5 - Math.random())
        console.log('*****Shuffling cards*****')
    }
}
class Card{
    constructor(suit, rank, value){
        this.suit = suit;
        this.rank = rank;
        this.value = value;
        this.isFlipped = false;
    }
}
class Player{
    constructor(name){
        this.name = name;
        this.cardsInHand = [];
    }
}
class Board{
    constructor(){
        this.players = [];
        this.cardInPlay = [];
    }
}