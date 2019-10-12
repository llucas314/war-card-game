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
    placeCard = () => this.cardsInHand.pop()
}
class Board{
    constructor(){
        this.players = [];
        this.cardInPlay = [];
    }
    dealCards(deck){
        let numOfPlayers = this.players.length;
        console.log('*****Dealing cards*****')
        this.players[0].cardsInHand = deck.cards.slice(0, deck.cards.length/numOfPlayers);
        console.log(`Player ${this.players[0].name} has been dealt ${this.players[0].cardsInHand.length} cards.`)
        this.players[1].cardsInHand = deck.cards.slice(deck.cards.length/numOfPlayers, deck.cards.length);
        console.log(`Player ${this.players[1].name} has been dealt ${this.players[1].cardsInHand.length} cards.`)
    }
    init(){
        let deck = new Deck;
        let player;
        deck.init();
        deck.shuffle();
        for (let i = 0; i < 2; i++){
            player = new Player(`Player ${i + 1}`);
            this.players.push(player);
        }
        this.dealCards(deck);
    }
    startRound(){
        let playerOneCard = this.players[0].placeCard();
        let playerTwoCard = this.players[1].placeCard()
        this.cardInPlay.push(playerOneCard)
        this.cardInPlay.push(playerTwoCard)
    }
}
let board = new Board;
board.init();
board.startRound();
