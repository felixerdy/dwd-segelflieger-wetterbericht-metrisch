$(document).ready(function() {
  $('#content').html('Loading...');
    $.get("https://crossorigin.me/https://www.dwd.de/DE/fachnutzer/luftfahrt/teaser/luftsportberichte/fbeu40_edze_node.html", function(data) {

        var tempData = $(data).find('pre').html()

        // FL....
        var FL = new RegExp(/FL\d+/g)
        var foundFL = tempData.match(FL)

        $.each(foundFL, function(i, e) {
            tempData = tempData.replace(e, '<code>' + (100 * Math.round(parseInt(e.split('FL')[1]) * 100 * 0.3048 / 100)) + 'm</code>')
        });


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
        }

        var cloudCombinedRegex = new RegExp(/(NSC|FEW|SCT|BKN|OVC)\/(NSC|FEW|SCT|BKN|OVC)/g)
        var foundCloudCombined = tempData.match(cloudCombinedRegex)
        $.each(foundCloudCombined, function(i, e) {
          var tempCloudCoverString = cloudCoverNumbers[e.split('/')[0]].start + ' bis ' + cloudCoverNumbers[e.split('/')[1]].end + ' Achtel'
          tempData = tempData.replace(e, '<code>' + tempCloudCoverString + '</code>')
        });

        // Cloud cover
        var cloudCover = {
            NSC: 'keine Bewölkung',
            FEW: '1 bis 2 Achtel',
            SCT: '3 bis 4 Achtel',
            BKN: '5 bis 7 Achtel',
            OVC: '8 Achtel'
        }

        var cloudRegex = new RegExp(/NSC|FEW|SCT|BKN|OVC/g)
        var foundCloud = tempData.match(cloudRegex)

        $.each(foundCloud, function(i, e) {
          tempData = tempData.replace(e, '<code>' + cloudCover[e] + '</code>')
        });

        // combined foot
        var footCombinedRegex = new RegExp(/\d+ bis \d+ FT/g)
        var footCombined = tempData.match(footCombinedRegex)

        $.each(footCombined, function(i, e) {
          console.log(e)
          var tempFootCombined = (100 * Math.round(parseInt(e.split(' bis ')[0]) * 0.3048 / 100)) + ' bis ' + (100 * Math.round(parseInt(e.split(' bis ')[1]) * 0.3048 / 100)) + 'm'
          tempData = tempData.replace(e, '<code>' + tempFootCombined + '</code>')
        });

        // foot
        var footRegex = new RegExp(/\d+FT/g)
        var foundFoot = tempData.match(footRegex)

        $.each(foundFoot, function(i, e) {
          //console.log(e.split("FT")[0])
          tempData = tempData.replace(e, '<code>' + (100 * Math.round(parseInt(e.split("FT")[0]) * 0.3048 / 100)) + "m" + '</code>')
        });

        // foot
        var footRegexft = new RegExp(/\d+ FT/g)
        var foundFootft = tempData.match(footRegexft)

        $.each(foundFootft, function(i, e) {
          //console.log(e.split(" FT")[0])
          tempData = tempData.replace(e, '<code>' + (100 * Math.round(parseInt(e.split("FT")[0]) * 0.3048 / 100)) + "m" + '</code>')
        });


        // combined knots
        var knotsCombinedRegex = new RegExp(/\d+ bis \d+ KT/g)
        var knotsCombined = tempData.match(knotsCombinedRegex)

        $.each(knotsCombined, function(i, e) {
          //console.log(e)
          var tempKnotsCombined = Math.round(parseInt(e.split(' bis ')[0]) * 0.539957) + ' bis ' + Math.round(parseInt(e.split(' bis ')[1]) * 0.539957) + 'km/h'
          tempData = tempData.replace(e, '<code>' + tempKnotsCombined + '</code>')
        });

        // knots
        var knotsRegex = new RegExp(/\d+ KT/g)
        var foundKnots = tempData.match(knotsRegex)

        $.each(foundKnots, function(i, e) {
          //console.log(e.split(" KT")[0])
          tempData = tempData.replace(e, '<code>' + Math.round(parseInt(e.split("KT")[0]) * 0.539957) + "km/h" + '</code>')
        });

        // knots
        var knotsRegexkt = new RegExp(/\d+KT/g)
        var foundKnotskt = tempData.match(knotsRegexkt)

        $.each(foundKnotskt, function(i, e) {
          //console.log(e.split(" KT")[0])
          tempData = tempData.replace(e, '<code>' + Math.round(parseInt(e.split("KT")[0]) * 0.539957) + "km/h" + '</code>')
        });


        tempData = tempData.replace(/\r?\n/g, '<br />')
        $('#content').html(tempData);
        $('[data-toggle="popover"]').popover();

    });
})
