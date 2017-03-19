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
          output = item[0]
      }
      output +=  item[1]
      return output
    })
    return outputHand;
  },

  isFlush: (hand) => {
    let unique = {}
    hand.forEach(item => {
      unique[item.slice(-1)] = item.slice(-1);
    })
    return Object.keys(unique).length === 1;
  },

  isStraight: (hand) => {
    let handValues = hand.map(item => {
      return item.slice(0, -1);
    })
    handValues.sort(function(a, b) {
      return a - b;
    });
    let output = true;
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
      aceHandValues[aceHandValues.length - 1] = 1;
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

  checkHandRank: (hand) => {
    let rank = 10;
    let convertedHand = module.exports.convertValue(hand);
    let flush = false;
    let straight = false;
    if (module.exports.isStraight(convertedHand)) {
      straight = true;
      rank = 6
    }
    if (module.exports.isFlush(hand)) {
      flush = true;
      rank = 5
    }
    if (flush && straight) {
      rank = 2;
    }

    // returns an integer, 1 being royal flush, 10 being high card.
    return rank;
  },

  compareHands: (hand1, hand2) => {
    let handType1 = checkHandType(hand1)
    let handType2 = checkHandType(hand2)
  }
}
let test = module.exports.checkHandRank(['2D', '3D', '6D', '5D', '4D']);
console.log(test);
