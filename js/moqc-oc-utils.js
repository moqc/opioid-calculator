
// https://stackoverflow.com/a/33946647
function copyToClipboard(textToCopy) {
    // Create a dummy input to copy the string array inside it
    var dummy = document.createElement("textarea");

    // Add it to the document
    document.body.appendChild(dummy);

    // Set its ID
    dummy.setAttribute("id", "dummy_id");

    // Output the array into it
    document.getElementById("dummy_id").value=textToCopy;

    // Select it
    dummy.select();

    // Copy its contents
    document.execCommand("copy");

    // Remove it as its not needed anymore
    document.body.removeChild(dummy);
}

function hoverInfoIcon(element) {
    element.setAttribute('src', 'images/info-icon-64x64.png');
}

function unhoverInfoIcon(element) {
    element.setAttribute('src', 'images/info-icon-grey-64x64.png');
}

function getFormDataElement(formData, name) {
    for(var i = 0; i < formData.length; i++) {
        if(formData[i].name == name)
        {
            return formData[i].value;
        }
    }

    return "";
}



const apiProxyUrl = 'https://yn93pvnpg4.execute-api.us-east-2.amazonaws.com/proxy/storeOpioidCalculatorLog';

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

    const headers = {
        'Content-Type': 'application/json', // Set the content type to JSON
        'access-control-allow-origin' : '*',
    };
    
    $.ajax({
        url: apiProxyUrl,
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


function getLogReportFromDB() {
    return new Promise((resolve, reject) => {
        const headers = {
            'access-control-allow-origin' : '*',
        };

        $.ajax({
            url: apiProxyUrl,
            type: 'GET',
            headers: headers,
            success: function(data) {
                console.log("SUCCESS", data);
                resolve(data); // Resolve the promise with the data
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus, errorThrown);
                reject(errorThrown); // Reject the promise with the error thrown
            }
        });
    });
}
