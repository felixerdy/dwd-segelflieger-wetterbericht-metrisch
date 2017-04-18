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

describe('convertCloudCover()', function() {
  it('convert "NSC" to "keine Bewölkung"', function() {
    expect(convertCloudCover('NSC')).to.equal('<code>keine Bewölkung</code>');
  });

  it('convert "FEW" to "1 bis 2 Achtel"', function() {
    expect(convertCloudCover('FEW')).to.equal('<code>1 bis 2 Achtel</code>');
  });

  it('convert "SCT" to "3 bis 4 Achtel"', function() {
    expect(convertCloudCover('SCT')).to.equal('<code>3 bis 4 Achtel</code>');
  });

  it('convert "BKN" to "5 bis 7 Achtel"', function() {
    expect(convertCloudCover('BKN')).to.equal('<code>5 bis 7 Achtel</code>');
  });

  it('convert "OVC" to "8 Achtel"', function() {
    expect(convertCloudCover('OVC')).to.equal('<code>8 Achtel</code>');
  });

  it('convert "FEW/SCT" to "1 bis 4 Achtel"', function() {
    expect(convertCloudCover('FEW/SCT')).to.equal('<code>1 bis 4 Achtel</code>');
  });

  it('convert "NSC/OVC" to "0 bis 8 Achtel"', function() {
    expect(convertCloudCover('NSC/OVC')).to.equal('<code>0 bis 8 Achtel</code>');
  });

  it('does not fail without matches', function() {
    expect(convertCloudCover('foobar')).to.equal('foobar');
  });
});

describe('convert()', function() {
  it('returns text', function() {
    expect(convert('foobar')).to.equal('foobar');
  });
});
