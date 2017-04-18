var RE_FL = /FL\d+/g;
var RE_CLOUD_COVER_RANGE = /(NSC|FEW|SCT|BKN|OVC)\/(NSC|FEW|SCT|BKN|OVC)/g;
var RE_CLOUD_COVER = /NSC|FEW|SCT|BKN|OVC/g;
var RE_FEET_RANGE = /\d+ bis \d+ FT/g;
var RE_FEET = /\d+\s*FT/g;
var RE_KNOTS_RANGE = /\d+ bis \d+ KT/g;
var RE_KNOTS = /\d+\s*KT/g;

function convertFlightLevels(tempData) {
  return tempData.replace(RE_FL, function(e) {
    return '<code>' + (100 * Math.round(parseInt(e.split('FL')[1]) * 100 * 0.3048 / 100)) + 'm</code>';
  });
}

function convertCloudCover(tempData) {
  // cloud cover combined
  var cloudCoverNumbers = {
    NSC: {
      start: 0,
      end: 0
    },
    FEW: {
      start: 1,
      end: 2
    },
    SCT: {
      start: 3,
      end: 4
    },
    BKN: {
      start: 5,
      end: 7
    },
    OVC: {
      start: 8,
      end: 8
    }
  };

  // Cloud cover
  var cloudCover = {
    NSC: 'keine Bewölkung',
    FEW: '1 bis 2 Achtel',
    SCT: '3 bis 4 Achtel',
    BKN: '5 bis 7 Achtel',
    OVC: '8 Achtel'
  };

  return tempData.replace(RE_CLOUD_COVER_RANGE, function(e) {
    var tempCloudCoverString = cloudCoverNumbers[e.split('/')[0]].start + ' bis ' + cloudCoverNumbers[e.split('/')[1]].end + ' Achtel'
    return '<code>' + tempCloudCoverString + '</code>';
  }).replace(RE_CLOUD_COVER, function(e) {
    return '<code>' + cloudCover[e] + '</code>';
  });
}

function convertFeet(tempData) {
  return tempData.replace(RE_FEET_RANGE, function(e) {
    var tempFootCombined = (100 * Math.round(parseInt(e.split(' bis ')[0]) * 0.3048 / 100)) + ' bis ' + (100 * Math.round(parseInt(e.split(' bis ')[1]) * 0.3048 / 100)) + 'm'
    return '<code>' + tempFootCombined + '</code>';
  }).replace(RE_FEET, function(e) {
    return '<code>' + (100 * Math.round(parseInt(e.split("FT")[0]) * 0.3048 / 100)) + "m" + '</code>';
  });
}

function convertKnots(tempData) {
  return tempData.replace(RE_KNOTS_RANGE, function(e) {
    var tempKnotsCombined = Math.round(parseInt(e.split(' bis ')[0]) * 1.852) + ' bis ' + Math.round(parseInt(e.split(' bis ')[1]) * 1.852) + 'km/h'
    return '<code>' + tempKnotsCombined + '</code>';
  }).replace(RE_KNOTS, function(e) {
    return '<code>' + Math.round(parseInt(e.split("KT")[0]) * 1.852) + "km/h" + '</code>';
  });
}

function convert(tempData) {
  tempData = convertFlightLevels(tempData);
  tempData = convertCloudCover(tempData);
  tempData = convertFeet(tempData);
  tempData = convertKnots(tempData);

  return tempData.replace(/\r?\n/g, '<br />');
}

function request() {
  $('#content').html('Loading...');

  $.get("https://crossorigin.me/https://www.dwd.de/DE/fachnutzer/luftfahrt/teaser/luftsportberichte/fbeu40_edze_node.html", function(data) {

    var tempData = convert($(data).find('pre').html());

    $('#content').html(tempData);
  });
}
