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
               if (isFlipped === false){
                   isFlipped = true;
               } else{
                   isFlipped = false;
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
    if(players[0].cardsInHand.length === 0){
        console.log('Player 2 wins!')
    } else if (players[1].cardsInHand.length === 0){
        console.log('Player 1 wins!')
    } else
    players[0].placeCard();
    players[1].placeCard();
}
function compareCards(card1, card2){
    if (card1.value === card2.value){
        console.log("It's WAR!")
        flipTopCards();
        war();
    } else if (card1.value > card2.value){
        flipTopCards();
        players[0].cardsInHand = [...players[0].cardsInPlay,...players[0].cardsInHand]
        players[0].cardsInHand = [...players[1].cardsInPlay,...players[0].cardsInHand]
    } else {
        flipTopCards();
        players[1].cardsInHand = [...players[1].cardsInPlay,...players[1].cardsInHand]
        players[1].cardsInHand = [...players[0].cardsInPlay,...players[1].cardsInHand]
    }
}
function flipTopCards(){
    flipped1 = players[0].cardsInPlay[cardsInPlay.length-1];
    flipped1.flipCard();
    flipped2 = players[1].cardsInPlay[cardsInPlay.length-1];
    flipped2.flipCard();

}
function war(){
    playCards();
    playCards();
    playCards();
    flipTopCards();
    compareCards(flipped1,flipped2);
}
function startRound(){
    playCards();
    flipTopCards();
    compareCards();
}
shuffleCards();
dealCards();

console.log(players[0])
