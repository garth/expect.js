describe('expect.js', function () {

  var user;
  before(function () {
    var user = {
        name: 'tj'
      , pets: ['tobi', 'loki', 'jane', 'bandit']
      , age: 25
    };
  });

  describe('ok', function () {
    it('should pass true', function () {
      expect(true).to.be.ok();
    });
    it('should not pass false', function () {
      try { expect(false).to.be.ok(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass yey', function () {
      expect('yay').to.be.ok();
    });
    it('should not pass ""', function () {
      try { expect('').to.be.ok(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass 1', function () {
      expect(1).to.be.ok();
    });
    it('should not pass 0', function () {
      try { expect(0).to.be.ok(); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('not ok', function () {
    it('should pass false', function () {
       expect(false).to.not.be.ok();
    });
    it('should not pass true', function () {
      try { expect(true).to.not.be.ok(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass ""', function () {
      expect('').to.not.be.ok();
    });
    it('should not pass "yey"', function () {
      try { expect('yey').to.not.be.ok(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass 0', function () {
      expect(0).to.not.be.ok();
    });
    it('should not pass 1', function () {
      try { expect(1).to.not.be.ok(); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('true', function () {
    it('should pass true', function () {
      expect(true).to.be.true();
    });
    it('should not pass false', function () {
      try { expect(false).to.be.true(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass not 1', function () {
      expect(1).to.not.be.true();
    });
    it('should not pass 1', function () {
      try { expect(1).to.be.true(); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('false', function () {
    it('should pass false', function () {
      expect(false).to.be.false();
    });
    it('should not pass true', function () {
      try { expect(true).to.be.false(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass not 0', function ()  {
      expect(0).to.not.be.false();
    });
    it('should not pass 0', function ()  {
      try { expect(0).to.be.false(); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('arguments', function () {
    var args = (function(){ return arguments; })(1,2,3);
    it('should pass an arguments', function () {
      expect(args).to.be.arguments();
    });
    it('should not pass not an arguments', function () {
      try { expect(args).to.not.be.arguments(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass not an array', function () {
      expect([]).to.not.be.arguments();
    });
    it('should not pass an array', function () {
      try { expect([]).to.be.arguments(); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('empty', function () {
    it('should pass an empty array', function () {
      expect([]).to.be.empty();
    });
    it('should not pass a not empty array', function () {
      try { expect([1,2]).to.be.empty(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass an empty string', function () {
      expect('').to.be.empty();
    });
    it('should not pass a not empty string', function () {
      try { expect('1,2').to.be.empty(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass an object with a property of length 0', function () {
      expect({ length: 0 }).should.be.empty();
    });
    it('should not pass an object without a length property', function () {
      try { expect({}).should.be.empty(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should not pass an object with a property of length not 0', function () {
      try { expect({ length: -1 }).should.be.empty(); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('not empty', function () {
    it('should pass a not empty array', function () {
      expect([1, 2]).to.not.be.empty();
    });
    it('should not pass an empty array', function () {
      try { expect([]).to.not.be.empty(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass a not empty string', function () {
      expect('1.2').to.not.be.empty();
    });
    it('should not pass an empty string', function () {
      try { expect('').to.not.be.empty(); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass an object with a property of length not 0', function () {
      expect({ length: 1 }).should.not.be.empty();
    });
    it('should pass an object without a length property', function () {
      try { expect({}).should.not.be.empty(); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('eql', function () {
    it('should pass two objects with the same properties', function () {
      expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
    });
    it('should not pass two objects with different properties', function () {
      try { expect({ foo: 'bar' }).to.eql({ foo: 'bar', extra: 'val' }); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass two arrays with the same values', function () {
      expect([1,2,3]).to.eql([1,2,3]);
    });
    it('should not pass two arrays with different values', function () {
      try { expect([1,2,4]).to.eql([1,2,3]); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('not eql', function () {
    it('should pass two objects with different properties', function () {
      expect({ foo: 'bar' }).to.not.eql({ foobar: 'bar' });
    });
    it('should not pass two objects with the same properties', function () {
      try { expect({ foo: 'bar' }).to.not.eql({ foo: 'bar' }); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass two arrays with different values', function () {
      expect([1,2,3]).to.not.eql([2,3]);
    });
    it('should not pass two arrays with the same values', function () {
      try { expect([1,2,3]).to.not.eql([1,2,3]); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('equal', function () {
    it('should pass two numbers which are the same', function () {
      expect(3).to.equal(3);
    });
    it('should not pass different numbers', function () {
      try { expect(3).to.equal(-3); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass two strings which are the same', function () {
      expect('test').to.equal('test');
    });
    it('should not pass different strings', function () {
      try { expect('test').to.equal('tesx'); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should not pass two objects with the same properties', function () {
      try { expect({ foo: 'bar' }).to.equall({ foo: 'bar' }); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should not pass two arrays with the same values', function () {
      try { expect([1,2,3]).to.equal([1,2,3]); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('within', function () {
    it('should pass when a number is within the range', function () {
      expect(25).to.be.within(5, 50);
      expect(5).to.be.within(5, 50);
      expect(50).to.be.within(5, 50);
    });
    it('should not pass when a number below the range', function () {
      try { expect(4).to.be.within(5, 50); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should not pass when a number above the range', function () {
      try { expect(51).to.be.within(5, 50); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('not within', function () {
    it('should not pass when a number is within the range', function () {
      try { expect(25).to.not.be.within(5, 50); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass when a number below the range', function () {
      expect(4).to.not.be.within(5, 50);
    });
    it('should pass when a number above the range', function () {
      expect(51).to.not.be.within(5, 50);
    });
  });

  describe('a', function () {
    it('should pass when given an object', function () {
      expect({}).to.be.a('object');
    });
    it('should not pass when not given an object', function () {
      try { expect(1).to.be.a('object'); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass when given a string', function () {
      expect('string').to.be.a('string');
    });
    it('should not pass when not given a string', function () {
      try { expect([]).to.be.a('string'); } catch (e) { return; }
      throw 'Did not throw';
    });
  });

  describe('not a', function () {
    it('should not pass when given an object', function () {
      try { expect({}).to.not.be.a('object'); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass when not given an object', function () {
      expect(1).to.not.be.a('object');
    });
    it('should not pass when given a string', function () {
      try { expect('string').to.not.be.a('string'); } catch (e) { return; }
      throw 'Did not throw';
    });
    it('should pass when not given a string', function () {
      expect([]).to.not.be.a('string');
    });
  });
});
