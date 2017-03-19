const should = require('should');
const cardFunctions = require('./interviewcards.js');

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
      cardFunctions.isStraight(['10D', '11D', '12D', '13D', '14S']).should.be.true();
    });
    it('should return false if card hand is a straight', function () {
      cardFunctions.isStraight(['2D', '3D', '13D', '5D', '4S']).should.be.false();
    });
    it('should still return true if the straight is ace-5', function () {
      cardFunctions.isStraight(['14C', '2C', '3C', '4C', '5C']).should.be.true();
    })
    it('should return false if ace is present not in a straight', function () {
      cardFunctions.isStraight(['4D', '2D', '11S', '14H', '8H']).should.be.false();
    })
  })
  describe('checkHandRank()', function () {
    it('should return a rank of 1 if it is a Royal flush');
    it('should return a rank of 2 if it is a straight flush', function () {
      cardFunctions.checkHandRank(['2D', '3D', '6D', '5D', '4D']).should.be.eql(2);
    })
    it('should return a rank of 3 if it is a 4 of a kind');
    it('should return a rank of 4 if it is a full house');
    it('should return a rank of 5 if it is a regular flush', function () {
      cardFunctions.checkHandRank(['AC', '2C', '5C', '6C', '10C']).should.be.eql(5);
    })
    it('should return a rank of 6 if it is a straight', function () {
      cardFunctions.checkHandRank(['9D', '10D', 'JD', 'QD', 'KS'])
    });
    it('should return a rank of 7 if it is a three of a kind');
    it('should return a rank of 8 if it is a two pair');
    it('should return a rank of 9 if it is a pair');
    it('should return a rank of 10 if it a high card', function () {
      cardFunctions.checkHandRank(['AC', '3D', '5S', '8C', '10H']).should.be.eql(10);
    });
  })
});