let cards = [];
const ranks = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];
let values = [];
const suits = ['Spades','Clubs','Diamonds','Hearts'];
let flipped1 = null;
let flipped2 = null;
// initialize values array
for (let i = 0; i < 13; i++){
    values[i] = i + 2;
}

// initialize cards array with card objects
for (let i = 0; i < 4; i++){
    for (let j = 0; j < 13; j++){
       cards.push({
           rank: ranks[j],
           value: values[j],
           suit: suits[i],
           isFlipped: false,
           flipCard: function(){
               if (this.isFlipped === false){
                   this.isFlipped = true;
               } else{
                   this.isFlipped = false;
               }
           }
       })
    }
}

const players = [];
// initialize player profiles
for (let i = 0; i < 2; i++){
    players.push({
        player: (i+1),
        cardsInPlay: [],
        placeCard: function(){
           this.cardsInPlay.push(this.cardsInHand.pop());
        }
    })
}
function shuffleCards(){
    cards.sort((a, b) => 0.5 - Math.random())
}
function dealCards(){
    players[0].cardsInHand = cards.slice(0, cards.length/2);
    players[1].cardsInHand = cards.slice(cards.length/2, cards.length);
}
function playCards(){
    if (checkForWinner()){
        players[0].placeCard();
        players[1].placeCard();
        return true;
    } else return false;
}
function compareCards(card1, card2){
    if (card1 === card2){
        console.log("It's WAR!")
        flipTopCards();
        war();
    } else if (card1 > card2){
        flipTopCards();
        players[0].cardsInHand = [...players[0].cardsInPlay,...players[0].cardsInHand]
        players[0].cardsInHand = [...players[1].cardsInPlay,...players[0].cardsInHand]
        players[0].cardsInPlay = [];
        players[1].cardsInPlay = [];
    } else {
        flipTopCards();
        players[1].cardsInHand = [...players[1].cardsInPlay,...players[1].cardsInHand]
        players[1].cardsInHand = [...players[0].cardsInPlay,...players[1].cardsInHand]
        players[0].cardsInPlay = [];
        players[1].cardsInPlay = [];
    }
}
function flipTopCards(){
    flipped1 = players[0].cardsInPlay[players[0].cardsInPlay.length-1];
    flipped1.flipCard();
    flipped2 = players[1].cardsInPlay[players[1].cardsInPlay.length-1];
    flipped2.flipCard();

}
function war(){
    for (let i = 0; i < 3; i++){
        if (!playCards()){
        break;
        }
    }
    flipTopCards();
    compareCards(flipped1.value,flipped2.value);
}
function startRound(){
    playCards();
    flipTopCards();
    compareCards(flipped1.value,flipped2.value);
}
function checkForWinner(){
    if(players[0].cardsInHand.length === 0){
        console.log('Player 2 wins!');
        return false;
    } else if (players[1].cardsInHand.length === 0){
        console.log('Player 1 wins!');
        return false;
    } else return true;
}
shuffleCards();
dealCards();
while(checkForWinner()){
    startRound();
}

console.log(players[0].cardsInHand)
console.log(players[1].cardsInHand)