const should = require('should');
const cardFunctions = require('./card-functions.js');

describe('testing should', function () {
  it('true if 4 is 4', function () {
    should.equal(1, 1);
  })
})

describe('cardFunctions', function() {
  describe('convertValue()', function() {
    it('should return an array', function () {
      cardFunctions.convertValue(['2D', '3D', '4D', '5D', '6D']).should.be.Array();
    })
    it('should return [2D, 3D, 4D, 5D, 6D] given [2D, 3D, 4D, 5D, 6D]', function () {
      cardFunctions.convertValue(['2D', '3D', '4D', '5D', '6D']).should.eql(['2D', '3D', '4D', '5D', '6D']);
    });
    it('should return [14D, 2D, 11D, 12D, 13D] given [AD, 2D, JD, QD, KD]', function () {
      cardFunctions.convertValue(['AD', '2D', 'JD', 'QD', 'KD']).should.eql(['14D', '2D', '11D', '12D', '13D']);
    });
  });

  describe('isFlush()', function () {
    it('should return true if card hand is a flush', function () {
      cardFunctions.isFlush(['2D', '3D', '4D', '5D', '6D']).should.be.true();
    });
    it('should return false if card hand is not a flush', function () {
      cardFunctions.isFlush(['2D', '3D', '4D', '5D', '6S']).should.be.false();
    })
  });

  describe('isStraight', function () {
    it('should return true if card hand is a straight (10-ace)', function () {
      cardFunctions.isStraight(['10', '11', '12', '13', '14']).should.be.true();
    });
    it('should return false if card hand is a straight', function () {
      cardFunctions.isStraight(['2', '3', '4', '5', '13']).should.be.false();
    });
    it('should still return true if the straight is ace-5', function () {
      cardFunctions.isStraight(['2', '3', '4', '5', '14']).should.be.true();
    })
    it('should return false if ace is present not in a straight', function () {
      cardFunctions.isStraight(['2', '4', '8', '11', '14']).should.be.false();
    })
  })
  describe('checkHandRank()', function () {
    it('should return a rank of 1 if it is a Royal flush', function () {
      cardFunctions.checkHandRank(['JD', '10D', 'QD', 'KD', 'AD']).should.be.eql(1);
    });
    it('should return a rank of 2 if it is a straight flush', function () {
      cardFunctions.checkHandRank(['2D', '3D', '6D', '5D', '4D']).should.be.eql(2);
    })
    it('should return a rank of 3 if it is a 4 of a kind', function () {
      cardFunctions.checkHandRank(['JD', 'JD', 'JD', 'JS', 'AD']).should.be.eql(3);
    });
    it('should return a rank of 4 if it is a full house', function () {
      cardFunctions.checkHandRank(['JD', 'JD', 'JD', 'QS', 'QD']).should.be.eql(4);
    });
    it('should return a rank of 5 if it is a regular flush', function () {
      cardFunctions.checkHandRank(['AC', '2C', '5C', '6C', '10C']).should.be.eql(5);
    })
    it('should return a rank of 6 if it is a straight', function () {
      cardFunctions.checkHandRank(['9D', '10D', 'JD', 'QD', 'KS'])
    });
    it('should return a rank of 7 if it is a three of a kind', function () {
      cardFunctions.checkHandRank(['JD', 'JD', 'JD', 'KS', 'AD']).should.be.eql(7);
    });
    it('should return a rank of 8 if it is a two pair', function () {
      cardFunctions.checkHandRank(['JD', 'JD', 'QD', 'QS', 'AD']).should.be.eql(8);
    });
    it('should return a rank of 9 if it is a pair', function () {
      cardFunctions.checkHandRank(['JD', 'JD', 'QD', 'KS', 'AD']).should.be.eql(9);
    });
    it('should return a rank of 10 if it a high card', function () {
      cardFunctions.checkHandRank(['AC', '3D', '5S', '8C', '10H']).should.be.eql(10);
    });
  })
  describe('compareHands()', function () {
    it('should return "Winner: hand1" if hand1 has a higher rank than hand 2 (2 pair vs 1 pair)', function () {
      cardFunctions.compareHands(['9D', '9S', 'JD', '4D', '4S'],['9D', '10D', 'JD', '9S', 'KS']).should.be.eql('Winner: hand1')
    })
    it('should return "Winner: hand2" if hand2 has a higher rank than hand 1', function () {
      cardFunctions.compareHands(['9D', '9S', 'JD', 'QD', 'KS'],['9D', '9S', 'JD', 'JS', 'KS']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both highcard && diff number)', function () {
      cardFunctions.compareHands(['JD', '8D', '2D', '3S', '7D'],['10D', 'JD', 'QD', '2S', 'KD']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both highcard && same number)', function () {
      cardFunctions.compareHands(['JD', '8D', '2D', '3S', 'KD'],['10D', 'JD', 'QD', '2S', 'KS']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both pairs && diff number)', function () {
      cardFunctions.compareHands(['JD', '8D', '10D', '10S', 'KD'],['10D', 'JS', 'QD', '5C', '5H']).should.be.eql('Winner: hand1')
    })
    it('should be able to handle two card hands of the same type (both pairs && same number)', function () {
      cardFunctions.compareHands(['JD', '8D', '2D', '2S', 'KD'],['10D', 'JS', 'QD', '2C', '2H']).should.be.eql('Winner: hand1')
    })
    it('should be able to handle two card hands of the same type (both two pairs && diff number)', function () {
      cardFunctions.compareHands(['JD', '8S', '10D', '10S', '8D'],['10H', 'JH', 'JC', '10C', '5H']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both two pairs && same number)', function () {
      cardFunctions.compareHands(['JD', '8S', '10D', '10S', '8D'],['10H', '8H', '8C', '10C', '5H']).should.be.eql('Winner: hand1')
    })
    it('should be able to handle two card hands of the same type (both three of a kind)', function () {
      cardFunctions.compareHands(['JD', '8S', '10D', '10S', '10D'],['10H', '8H', '8C', '8S', '5H']).should.be.eql('Winner: hand1')
    })
    it('should be able to handle two card hands of the same type (both reg straight)', function () {
      cardFunctions.compareHands(['2D', '3S', '4D', '5S', '6D'],['3H', '4H', '5C', '6S', '7H']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both reg straight && same number)', function () {
      cardFunctions.compareHands(['2D', '3S', '4D', '5S', '6S'],['2H', '3H', '4C', '5C', '6C']).should.be.eql('Winner: hand1')
    })
    it('should be able to handle two card hands of the same type (both reg flush)', function () {
      cardFunctions.compareHands(['8D', '3D', '4D', '5D', '10D'],['3H', '4H', '5H', '6H', '9H']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both reg flush && same suit)', function () {
      cardFunctions.compareHands(['8D', '3D', '4D', '5D', '7D'],['3D', '4D', '5D', '6D', '9D']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both reg full house)', function () {
      cardFunctions.compareHands(['JD', 'JS', '10D', '10S', '10D'],['8S', '8H', '8C', 'JH', 'JC']).should.be.eql('Winner: hand1')
    })
    it('should be able to handle two card hands of the same type (both 4 of a kind)', function () {
      cardFunctions.compareHands(['JD', '10S', '10D', '10H', '10D'],['JH', 'JC', 'JS', 'JD', '5H']).should.be.eql('Winner: hand2')
    })
    it('should be able to handle two card hands of the same type (both straight flush)')
    it('should be able to handle two card hands of the same type (both royal flush)')
  })
});