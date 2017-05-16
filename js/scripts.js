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

        calculateTotal(dealersHand,'dealer');
        calculateTotal(playersHand,'player');
    });

    $('.hit-button').click(function(){
        console.log("User clicked hit")
        playersHand.push(theDeck.shift());
        placeCard('player',playersHand.length,playersHand[playersHand.length-1]);
        calculateTotal(playersHand,'player');
    });

    $('.stand-button').click(function(){
        // console.log("User clicked on stand");
        // What happens to the player when they stand?
        // Nothing.
        // Control goes to dealer.
        // Rules of Blackjack for dealer:
        // If I have < 17, must hit
        // If I have > 17, I cannot hit
        var dealerTotal = calculateTotal(dealersHand,'dealer');
        // console.log(dealerTotal);
        while(dealerTotal < 17){
            dealersHand.push(theDeck.shift());
            placeCard('dealer',dealersHand.length,dealersHand[dealersHand.length-1]);
            dealerTotal = calculateTotal(dealersHand,'dealer');
        }
        checkWin()''
    });

    function checkWin(){
        var playerTotal = calculateTotal(playersHand,'player');
        var dealerTotal = calculateTotal(dealersHand,'dealer');
        // if player > 21... player loses
        // if dealer > 21... dealer loses
        // if player > dealer, player wins
        // if dealer > player, dealer wins
        // else... tie.
    }

    function calculateTotal(hand,who){
        // console.log(hand);
        // init total at 0
        var total = 0;
        // create a temp value for this card's value
        var thisCardValue = 0;
        // Loop through the hand (array)
        // Grab the number in the element and add the total
        for(let i = 0; i <hand.length; i++){
            thisCardValue = Number(hand[i].slice(0,-1));
            total += thisCardValue;
        }
        console.log(total);
        var classSelector = '.' + who + '-total-number';
        $(classSelector).html(total);
        return total;
    }

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