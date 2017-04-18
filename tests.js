var expect = chai.expect;

describe('convert()', function() {
  it('returns text', function() {
    expect(convert('foobar')).to.equal('foobar');
  });
});
