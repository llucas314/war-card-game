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
    placeCard = () => this.cardsInHand.pop();
    hasCardsLeft(){
        if (this.cardsInHand.length !== 0){
            return true;
        } else return false;
    }
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
        let round = 1;
        while(this.gameStillInProgress()){
            this.startRound(round);
            console.log(`***** At the end of round ${round}, ${this.players[0].name} has ${this.players[0].cardsInHand.length} cards and ${this.players[1].name} has ${this.players[1].cardsInHand.length} cards *****`)
            round++;
        }
        if (this.players[1].hasCardsLeft()){
            console.log(`***** Game over. ${this.players[0].name} is out of cards. ${this.players[1].name} won! *****`);
        } else if (this.players[0].hasCardsLeft()){
            console.log(`***** Game over. ${this.players[1].name} is out of cards. ${this.players[0].name} won! *****`);
        }
    }
    startRound(counter){
        console.log(`***** Round ${counter} ******`)
        if (this.playCards()){
            console.log('***** Players draw a card *****')
            this.compareCards();
            return true;
        } return false;
    }
    compareCards(){
            let playerOneCard = this.cardsInPlay[this.cardsInPlay.length-2].value;
            let playerTwoCard = this.cardsInPlay[this.cardsInPlay.length-1].value;
            if (playerOneCard === playerTwoCard){
                this.flipTopCards();
                console.log("It's a tie!")
                this.war();
            } else if (playerOneCard > playerTwoCard){
                this.flipTopCards();
                this.takeCardsInPlay(this.players[0])
            } else if(playerOneCard < playerTwoCard){
                this.flipTopCards();
                this.takeCardsInPlay(this.players[1])
            }
         }
    
    flipTopCards(){
        let cip = this.cardsInPlay;
        cip[cip.length-1].isFlipped = true;
        cip[cip.length-2].isFlipped = true;
        console.log(`${this.players[0].name} flipped up a ${cip[cip.length-2].rank} of ${cip[cip.length-2].suit}`)
        console.log(`${this.players[1].name} flipped up a ${cip[cip.length-1].rank} of ${cip[cip.length-1].suit}`)
    }
    playCards(){
        if (this.players[0].hasCardsLeft() && this.players[1].hasCardsLeft()){
            let playerOneCard = this.players[0].placeCard();
            let playerTwoCard = this.players[1].placeCard();
            this.cardsInPlay.push(playerOneCard);
            this.cardsInPlay.push(playerTwoCard);
            return true;
        } else if (!this.players[0].hasCardsLeft()){
            console.log(`***** ${this.players[0].name} does not have enough cards to finish war *****`);
            this.takeCardsInPlay(this.players[1].name);
            return false;
        } else{
            console.log(`***** ${this.players[1]} does not have enough cards to finish war *****`);
            this.takeCardsInPlay(this.players[0]);
            return false;
        };
    }
    war(){
        if (this.playCards()){
            console.log('"I..."');
            if(this.playCards()){
                console.log('"De-..."');
                if (this.playCards()){
                    console.log('"-clare..."');
                    if (this.playCards()){
                        console.log('"War!!!"');
                        this.compareCards(); 
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            } else{
                return;
            }
        } else return;
    }
    takeCardsInPlay(handWinner){
        this.cardsInPlay.sort((a, b) => 0.5 - Math.random());
        handWinner.cardsInHand = [...this.cardsInPlay,...handWinner.cardsInHand];
        this.cardsInPlay = [];
        console.log(`***** ${handWinner.name} wins the round! *****`);
    }
    gameStillInProgress(){
        if ((!this.players[0].hasCardsLeft() || !this.players[1].hasCardsLeft()) && this.cardsInPlay.length === 0){
            return false;
        } else return true;
    }
}
let board = new Board;
board.init();
// if player x does not have a card to playl player y needs to pick them up. something in war.