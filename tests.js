var expect = chai.expect;

describe('convertFlightLevels()', function() {
  it('converts FLxxx to meters', function() {
    expect(convertFlightLevels('FL0')).to.equal('<code>0m</code>');
    expect(convertFlightLevels('FL1')).to.equal('<code>0m</code>');
    expect(convertFlightLevels('FL12')).to.equal('<code>400m</code>');
    expect(convertFlightLevels('FL100')).to.equal('<code>3000m</code>');
    expect(convertFlightLevels('FL123')).to.equal('<code>3700m</code>');
  });

  it('converts multiple FLs', function() {
    expect(convertFlightLevels('foo FL100 to FL150 bar'))
      .to.equal('foo <code>3000m</code> to <code>4600m</code> bar');
  });

  it('converts across line breaks', function() {
    expect(convertFlightLevels('foo\nFL100 to\nFL150 bar'))
      .to.equal('foo\n<code>3000m</code> to\n<code>4600m</code> bar');
  });

  it('does not fail without matches', function() {
    expect(convertFlightLevels('foobar')).to.equal('foobar');
  });
});

describe('convert()', function() {
  it('returns text', function() {
    expect(convert('foobar')).to.equal('foobar');
  });
});
