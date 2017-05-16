// -----------------------------
// -----------GLOBALS-----------
// -----------------------------

$(document).ready(function(){
    // console.log('Sanity Check');
    // ---------------------------
    // ----MAIN FUNCTION VARS-----
    // ---------------------------
    const freshDeck = createDeck();
    var theDeck = freshDeck;
    var playersHand = [];
    var dealersHand = [];

    function createDeck(){
        var newDeck = []; // local var within createDeck, NO ONE knows about this but me
        const suits = ['h', 's', 'd', 'c'] // local var that will not be changed
        // loop for suits (outter loop)
        for(let s = 0; s < suits.length; s++){
            // loop for card values (inner loop)
            for(let c = 1; c <= 13; c++){
                newDeck.push(c + suits[s]);
            }
        }
        return newDeck;
    }

    $('.deal-button').click(function(){
        console.log('User clicked deal')
        theDeck = shuffleDeck();
        // the Deck is now shuffled big time!
        // Update the player's and dealer's hand
        // The player always gets the first card in the deck...
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        console.log(theDeck.length);
        placeCard('player',1,playersHand[0])
        placeCard('dealer',1,dealersHand[0])
        placeCard('player',2,playersHand[1])
        placeCard('dealer',2,dealersHand[1])
    });

    function placeCard(who, where, cardToPlace){
        var classSelector = '.' + who + '-cards .card-' + where;
        // console.log(classSelector);
        $(classSelector).html('<img src="cards/'+cardToPlace+'.png">');

    }

    function shuffleDeck(){
        // Loop a big number of times
        // Each time through, switch two elements in the array
        // When loop is done, array will be shuffled
        for(let i = 0; i < 50000; i++){
            var randomCard1 = Math.floor(Math.random() * theDeck.length);
            var randomCard2 = Math.floor(Math.random() * theDeck.length);
            // console.log(randomCard1);
            // console.log(randomCard2);
            // switch theDeck[randomCard1] with theDeck[randomCard2]
            // Stash the value of randomCard1 to the side to save the value
            var temp = theDeck[randomCard1];
            theDeck[randomCard1] = theDeck[randomCard2];
            theDeck[randomCard2] = temp;
        }
        return theDeck;
    }
});