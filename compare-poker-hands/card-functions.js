// Write a program in C# or JavaScript that determines the highest-ranking of 2 regular 5-card Poker hands. The program should accomplish the following 2 points:
// ·         Provide a way to input the 5 cards in each of the 2 hands
// ·         Analyze and display the winning hand
// If using C#, the program should compile and run on Windows 7+ (any version of the .Net framework). If using JavaScript, the program should run in either Chrome or Firefox.

// Suits: D > C > H > S
// Values: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K
// A hand - [2D, 3C, 5H, 6H, 7S]

// 5 Card Hands Royal flush > Straight flush > Flush > Straight >4 of a kind > triple > two pair >single pair > high card


module.exports = {

  convertValue: (hand) => {
    // converts A -> 1, J -> 11, Q -> 12 & K -> 13
    let outputHand = hand.map(item => {
      let output = '';
      switch(item[0]) {
        case 'A':
          output = '14';
          break;
        case 'J':
          output = '11';
          break;
        case 'Q':
          output = '12';
          break;
        case 'K':
          output = '13';
          break;
        default:
          output = item[0];
      }
      output +=  item[1];
      // handle 10
      if (item[2]) { output+= (item[2])};
      return output
    })
    return outputHand;
  },

  isFlush: (hand) => {
    // hand in format [10D, JD, QD, KD, AD] or [10D, 11D, 12D, 13D, 14D]
    let unique = {}
    // build an object with a key for each unique card suit, if the length of Object.keys is 1, then they are all the same card suit
    hand.forEach(item => {
      unique[item.slice(-1)] = item.slice(-1);
    })
    return Object.keys(unique).length === 1;
  },

  isStraight: (hand) => {
    // hand in sorted format [10, 11, 12, 13, 14]
    // since we are changing the array below, we need to make a new array without reference to the original, therefore, slice()
    let handValues = hand.slice();
    let output = true;
    // starting at index 1, check the value of the card in the index before, subtract it. If it is not 1, then the value is not consecutive.
    handValues.forEach((item, index) => {
      if (index >= 1) {
        if (item - handValues[index-1]!== 1) {
          output = false;
        }
      }
    });
    let aceStraight = false;
    if (handValues.includes('14')) {
      aceStraight = true;
      let aceHandValues = handValues;
      // change the ace of value 14 to 1;
      aceHandValues[aceHandValues.length - 1] = '1';
      aceHandValues.sort(function(a,b) {return a - b});
      aceHandValues.forEach((item, index) => {
        if (index >= 1) {
          if (item - handValues[index-1]!== 1) {
            aceStraight = false;
          }
        }
      })
    }
    return output || aceStraight;
  },

  createDuplicateObject: (hand) => {
    let duplicates = {};
    hand.forEach(item => {
      if (duplicates.hasOwnProperty(item)) {
        duplicates[item] += 1;
      } else {
        duplicates[item] = 1
      }
    })
    return duplicates;
  },

  checkDuplicates: (hand) => {
    // in sorted format [2, 3, 4, 5, 6]
    // checks duplicates and returns rank
    let duplicates = module.exports.createDuplicateObject(hand);
    let fourOfAKind = false;
    let threeOfAkind = false;
    let pairs = 0;
    for (card in duplicates) {
      switch (duplicates[card]) {
        case 2:
          pairs += 1;
          break;
        case 3:
          threeOfAkind = true;
          break;
        case 4:
          fourOfAKind = true;
          break;
      }
    }
    let outputRank = 10;
    if (pairs === 1) {
      outputRank = 9;
    }
    if (pairs === 2) {
      outputRank = 8;
    }
    if (threeOfAkind) {
      outputRank = 7;
    }
    if (threeOfAkind && pairs) {
      outputRank = 4;
    }
    if (fourOfAKind) {
      outputRank = 3;
    }
    return outputRank;
  },

  sortLowToHigh: (hand) => {
    // hand in format [ '10D', '11D', '12D', '13D', '14D' ] -> [ '10', '11', '12', '13', '14' ]
    let handValues = hand.map(item => {
      return item.slice(0, -1);
    })
    handValues.sort(function(a, b) { return a - b });
    return handValues;
  },

  checkHandRank: (hand) => {
    // hand in format ['JD', '10D', 'QD', 'KD', 'AD'];
    // convert hand into values, such as JD -> 11D, then sort them. Then check conditions and return rank, highest rank (lowest number), at the bottom
    let rank = 10;

    let convertedHand = module.exports.convertValue(hand); // returns in format [ '10D', '11D', '12D', '13D', '14D' ]
    let sortedHand = module.exports.sortLowToHigh(convertedHand); // returns in format[ '10', '11', '12', '13', '14' ]

    rank = module.exports.checkDuplicates(sortedHand);
    let flush = false;
    let straight = false;
    if (module.exports.isStraight(sortedHand)) {
      straight = true;
      if (rank > 6) {
        rank = 6;
      }
    }
    if (module.exports.isFlush(hand)) {
      flush = true;
      if (rank > 5) {
        rank = 5;
      }
    }
    if (flush && straight) {
      // use a regex here
      // if (convertedHand includes 10 and 14) it must be a royal flush
      if (sortedHand[0].match('10') && sortedHand[4].match('14')) {
        rank = 1;
      } else {
        rank = 2;
      }
    }

    // returns an integer, 1 being royal flush, 10 being high card.
    return rank;
  },

  convertSuit: (suit) => {
    // Spade = 1, Heart = 2, Club = 3, Diamond = 4
    let output = 0;
    switch (suit) {
      case 'S':
        output = 1;
        break;
      case 'H':
        output = 2;
        break;
      case 'C':
        output = 3;
        break;
      case 'D':
        output = 4;
        break;
    }
    return output;
  },

  returnSuit: (hand, cardValue) => {
    // hand in format [ '10D', '11D', '12D', '13D', '14D' ]
    // I realize now that I don't need to make a regex, I could just use parseInt()
    let outputSuit = '';
    let regex = new RegExp(cardValue,"g");
    hand.find(card => {
      if (card.match(regex)) {
        outputSuit = card.slice(-1);
      }
    })
    return outputSuit;
  },

  findHighestDuplicate: (handObj, num) => {
    // num === 2 for pairs, 3 for 3 of a kind, 4 for ... yknow
    let output = 0;
    for (let card in handObj) {
      if (handObj[card] === num && card > output) {
        output = card;
      }
    }
    return output;
  },

  returnSuitRank: (hand, cardValue) => {
    // hand in converted format
    // suit ranks 1 = spade, 4 = diamond, 5 is a placeholder
    let outputRank = 5;
    hand.forEach(card => {
      if (parseInt(card) == cardValue) {
        let rank = module.exports.convertSuit((card.slice(-1)));
        if (rank < outputRank) {
          outputRank = rank;
        }
      }
    })
    return outputRank;
  },

  returnWinnerOfPairs: (duplicates1, duplicates2, convertedHand1, convertedHand2) => {
    let winner;
    let highPair1 = parseInt(module.exports.findHighestDuplicate(duplicates1, 2));
    let highPair2 = parseInt(module.exports.findHighestDuplicate(duplicates2, 2));
    if (highPair1 > highPair2) {winner = 1 };
    if (highPair1 < highPair2) {winner = 2};
    if (highPair1 === highPair2) {
      let suit1Rank = module.exports.returnSuitRank(convertedHand1, highPair1);
      let suit2Rank = module.exports.returnSuitRank(convertedHand2, highPair2);
      if (suit1Rank < suit2Rank) {winner = 1};
      if (suit1Rank > suit2Rank) {winner = 2};
    }
    return winner;
  },

  handleTie: (hand1, hand2, handRank) => {
    // for high card and straights, just get highest number
    let convertedHand1 = module.exports.convertValue(hand1); // returns in format [ '10D', '11D', '12D', '13D', '14D' ]
    let sortedHand1 = module.exports.sortLowToHigh(convertedHand1); // returns in format[ '10', '11', '12', '13', '14' ]
    let convertedHand2 = module.exports.convertValue(hand2); // returns in format [ '10D', '11D', '12D', '13D', '14D' ]
    let sortedHand2 = module.exports.sortLowToHigh(convertedHand2); // returns in format[ '10', '11', '12', '13', '14' ]
    let duplicates1 = module.exports.createDuplicateObject(sortedHand1);
    let duplicates2 = module.exports.createDuplicateObject(sortedHand2);

    let winner;
    switch (handRank) {
      case 10:
      // highcard
        let highcard1= Math.max.apply(null, sortedHand1);
        let highcard2 = Math.max.apply(null, sortedHand2);
        if (highcard1 > highcard2) { winner = 1};
        if (highcard1 < highcard2) {winner = 2};
        if (highcard1 === highcard2) {
          let suit1 = module.exports.returnSuit(convertedHand1, highcard1);
          let suit2 = module.exports.returnSuit(convertedHand2, highcard1);
          let suit1Rank = module.exports.convertSuit(suit1);
          let suit2Rank = module.exports.convertSuit(suit2);
          if (suit1Rank < suit2Rank) {winner = 1};
          if (suit1Rank > suit2Rank) {winner = 2};
        }
        break;
      case 9:
      // pair
        winner = module.exports.returnWinnerOfPairs(duplicates1, duplicates2, convertedHand1, convertedHand2);

        break;
      case 8:
      // two pair
        winner = module.exports.returnWinnerOfPairs(duplicates1, duplicates2, convertedHand1, convertedHand2);
        break;
      case 7:
      // 3 of a kind
        let triplet1 = parseInt(module.exports.findHighestDuplicate(duplicates1, 3));
        let triplet2 = parseInt(module.exports.findHighestDuplicate(duplicates2, 3));
        if (triplet1 > triplet2) {winner = 1};
        if (triplet1 < triplet2) {winner = 2};
        break;
      case 6:
      // straight
        break;
      case 5:
      // flush
        break;
      case 4:
      // full house, same logic as triplet
        let fullTriplet1 = parseInt(module.exports.findHighestDuplicate(duplicates1, 3));
        let fullTriplet2 = parseInt(module.exports.findHighestDuplicate(duplicates2, 3));
        if (fullTriplet1 > fullTriplet2) {winner = 1};
        if (fullTriplet1 < fullTriplet2) {winner = 2};
        break;
      case 3:
      // four of a kind
        let quadruplet1 = parseInt(module.exports.findHighestDuplicate(duplicates1, 4));
        let quadruplet2 = parseInt(module.exports.findHighestDuplicate(duplicates2, 4));
        if (quadruplet1 > quadruplet2) {winner = 1};
        if (quadruplet1 < quadruplet2) {winner = 2};
        break;
      case 2:
      // straight flush
        break;
      case 1:
      // royal flush
        break;
    }

    // for pairs, check high
    return `Winner: hand${winner}`;
  },

  compareHands: (hand1, hand2) => {
    let handRank1 = module.exports.checkHandRank(hand1);
    let handRank2 = module.exports.checkHandRank(hand2);
    if (handRank1 === handRank2) {
      return module.exports.handleTie(hand1, hand2, handRank1);
    }
    if (handRank1 < handRank2) {
      return 'Winner: hand1'
    }
    if (handRank1 > handRank2) {
      return 'Winner: hand2'
    }
  }
}
let test = module.exports.compareHands(['JD', '8S', '10D', '10S', '10D'],['10H', '8H', '8C', '8S', '5H']);
console.log(test);
