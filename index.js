$(document).ready(function() {
    $.get("http://www.dwd.de/DE/fachnutzer/luftfahrt/teaser/luftsportberichte/fbeu40_edze_node.html", function(data) {

        var tempData = $(data).find('pre').html()

        // FL....
        var FL = new RegExp(/FL\d+/g)
        var foundFL = tempData.match(FL)

        $.each(foundFL, function(i, e) {
            tempData = tempData.replace(e, (100 * Math.round(parseInt(e.split('FL')[1]) * 100 * 0.3048 / 100)) + 'm')
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
          tempData = tempData.replace(e, tempCloudCoverString)
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
          tempData = tempData.replace(e, cloudCover[e])
        });

        // combined foot
        var footCombinedRegex = new RegExp(/\d+ bis \d+ FT/g)
        var footCombined = tempData.match(footCombinedRegex)

        $.each(footCombined, function(i, e) {
          var tempFootCombined = (100 * Math.round(parseInt(e.split(' bis ')[0]) * 0.3048 / 100)) + ' bis ' + (100 * Math.round(parseInt(e.split(' bis ')[1]) * 0.3048 / 100)) + 'm'
          tempData = tempData.replace(e, tempFootCombined)
        });

        // foot
        var footRegex = new RegExp(/\d+FT/g)
        var foundFoot = tempData.match(footRegex)

        $.each(foundFoot, function(i, e) {
          console.log(e.split("FT")[0])
          tempData = tempData.replace(e, (100 * Math.round(parseInt(e.split("FT")[0]) * 0.3048 / 100)) + "m")
        });

        // foot
        var footRegexft = new RegExp(/\d+ FT/g)
        var foundFootft = tempData.match(footRegexft)

        $.each(foundFootft, function(i, e) {
          console.log(e.split(" FT")[0])
          tempData = tempData.replace(e, (100 * Math.round(parseInt(e.split("FT")[0]) * 0.3048 / 100)) + "m")
        });

        tempData = tempData.replace(/\r?\n/g, '<br />')
        $('#content').html(tempData);
    });
})
