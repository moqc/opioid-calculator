

HomeOpCalculatorView = Backbone.View.extend({
    el:'#mainpage',
    render: function() {
        var that = this;

        //render header
        var data = {
        };

        var ocHeaderTemplate = _.template($('#oc-header-template').html())(data);
        $('#header').html(ocHeaderTemplate);

        //render mainpage buttons
        var ocHomeTemplate = _.template($('#oc-home-template').html())(DATAMAP);
        $('#mainpage').html(ocHomeTemplate);

        $('.updateScore').click(updateScore);

        
        $('.admitted-buttons').click(function() {

            console.log("admitted clicked");

            setTimeout(function () {
                var formData = $('#ocForm').serializeArray();
                var admitted = getFormDataElement(formData, "admitted")

                console.log(admitted)

                if(admitted == "true")
                {
                    var ocAdmittedTemplate = _.template($('#oc-admitted-template').html())(DATAMAP);
                    $('#moreInfoDiv').html(ocAdmittedTemplate);
                }
                else if(admitted == "false")
                {
                    var ocNonAdmittedTemplate = _.template($('#oc-nonadmitted-template').html())(DATAMAP);
                    $('#moreInfoDiv').html(ocNonAdmittedTemplate);
                }
                
                $('.updateScore').click(updateScore);

                // scroll
                // $("body,html").animate(
                //     {
                //     scrollTop: $("#admitted-div").offset().top
                //     },
                //     500 //speed
                // );
            }, 50);

        });

        $('#calculateFormButton').click(function() {
            console.log("calculate clicked");
            setTimeout(function () {

                var formData = $('#ocForm').serializeArray();
                var score = calculateScore(formData);
                
                $("#calculateButtonDiv").attr('hidden', true);

                $("#countLabelDiv").attr('hidden', false);

                $('#countLabelDiv').html(score);

                sendLogReport(formData, score);

            }, 50);
        });
        
    }
});
var homeOpCalculatorView = new HomeOpCalculatorView();

function updateScore() {
    console.log("=== updating score ===");
    setTimeout(function () {
        var formData = $('#ocForm').serializeArray();
        var score = calculateScore(formData);
        $('#countLabelDiv').html(score);
    }, 50);
}

function calculateScore(formData) {

    //calculate score
    var score = 0;
    var hasRiskFactor = false;
    for(var i = 0; i < formData.length; i++) {

        if(formData[i].name.startsWith("score_"))
        {
            score += Number(formData[i].value);
        }

        if(formData[i].name.startsWith("risk_"))
        {
            if(Number(formData[i].value) > 0) {
                hasRiskFactor = true;
            }
        }
    }
    
    if(hasRiskFactor) {
        score += 2;
    }

    if(score < 0) {
        score = 0;
    }

    return score;
}

const apiUrl = 'https://qca1gb18f5.execute-api.us-east-2.amazonaws.com/default/storeOpioidCalculatorLog';

const headers = {
    'x-api-key': 'xKNxnXsFTZw1GfGlpJMy6jJgeh36gcC6u7glBBe0', // api key
    'Content-Type': 'application/json', // Set the content type to JSON
};
  

function sendLogReport(formData, score) {

    // console.log("formData ->");
    // console.log(formData);

    //copy the formData into a new object
    var postBody = [...formData];

    formData.forEach(data => {
        const found = DATAMAP[data.name].inputs.find(input => input.value === data.value);
        data["selection"] = found.text;
    });

    //add the score
    postBody.push({
        name:"pillCount",
        value:score,
        selection:""
    });

    console.log("Sending postBody ->");
    console.log(postBody);
    
    $.ajax({
        url: apiUrl,
        type: 'POST',
        headers: headers,
        data: JSON.stringify(postBody), // Convert the body data to string
        success: function(data) {
          console.log("SUCCESS");
          // Use the data from the API response
          console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Handle any errors that occurred during the request
          console.error('AJAX error:', errorThrown);
          console.error('AJAX error:', textStatus);
          console.error(jqXHR);
        }
      });
}


function showWarning() {

    bootbox.dialog({
        message: function() {
            return _.template($('#oc-warning-template').html())({});
        },
        backdrop: true,
        closeButton: false,
        onEscape: function() {
            router.navigate("");
            window.location.reload();
        },
        buttons: {
            ok: {
                label: 'I Agree',
                className: 'btn-primary',
                callback: function(){
                                    
                }
            },
            cancel: {
                label: 'I Disagree',
                className: 'btn-error',
                callback: function(){
                    window.location.href = "https://moqc.org/initiatives/gynecologic-oncology/";
                }
            },
        }
    }).find("div.modal-dialog").addClass("modal-xl");
}

