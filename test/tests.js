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
    it('should not pass 1', function () {
      expect('1').to.not.be.true();
    });
  });

  describe('false', function () {
    it('should pass false', function () {
      expect(false).to.be.false();
    });
    it('should not pass 0', function ()  {
      expect(0).to.not.be.false();
    });
  });
});
