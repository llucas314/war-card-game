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
        this.cardsInPlay = [];
    }
    dealCards(deckOnBoard){
        let numOfPlayers = this.players.length;
        console.log('*****Dealing cards*****')
        this.players[0].cardsInHand = deckOnBoard.cards.slice(0, deckOnBoard.cards.length/numOfPlayers);
        console.log(`Player ${this.players[0].name} has been dealt ${this.players[0].cardsInHand.length} cards.`)
        this.players[1].cardsInHand = deckOnBoard.cards.slice(deckOnBoard.cards.length/numOfPlayers, deckOnBoard.cards.length);
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
        this.cardsInPlay.push(playerOneCard)
        this.cardsInPlay.push(playerTwoCard)
        this.compareCards(playerOneCard, playerTwoCard);
    }
    compareCards(card1, card2){
        if (card1.value === card2.value){
            console.log("It's WAR!")
            this.flipTopCards();
            // war();
        } else if (card1.value > card2.value){
            this.flipTopCards();
            this.players[0].cardsInHand = [...this.cardsInPlay,...this.players[0].cardsInHand]
            this.cardsInPlay = [];
        } else {
            this.flipTopCards();
            this.players[1].cardsInHand = [...this.cardsInPlay,...this.players[1].cardsInHand]
            this.cardsInPlay = [];
        }
    }
    flipTopCards(){
        let cip = this.cardsInPlay;
        cip[cip.length-1].isFlipped = true;
        cip[cip.length-2].isFlipped = true;
        console.log(`${this.players[0].name} flipped up a ${cip[cip.length-1].rank} of ${cip[cip.length-1].suit}`)
        console.log(`${this.players[1].name} flipped up a ${cip[cip.length-2].rank} of ${cip[cip.length-2].suit}`)
    }
}
let board = new Board;
board.init();
board.startRound();
