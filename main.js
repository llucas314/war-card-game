let cards = [];
const ranks = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];
let values = [];
const suits = ['Spades','Clubs','Diamonds','Hearts'];

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
        playCard: function(){
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
function startRound(){
    players[0].pla
}
shuffleCards();
dealCards();
players[0].playCards();
console.log(players[0])
