
ReportsView = Backbone.View.extend({
    el:'#mainpage',
    render: function() {
        var that = this;

        //render header
        var headerData = {
        };

        var ocHeaderTemplate = _.template($('#oc-reports-header-template').html())(headerData);
        $('#header').html(ocHeaderTemplate);

        var pageData = {
        };

        //render reports page
        var ocReportsTemplate = _.template($('#oc-reports-template').html())(pageData);
        $('#mainpage').html(ocReportsTemplate);

        
        $('#ocReportButton').click(function() {
            console.log("generate report clicked");
            getLogReportFromDB();
        });

    }
});
var reportsView = new ReportsView();


const getHeaders = {
    'Content-Type': 'application/json', // Set the content type to JSON
};

const reportCSVHeadings = [
    "guid",
    "timestamp",
    "pillCount",
    ...DATAMAP_KEYS_ORDERED
];


function getLogReportFromDB() {
    
    $.ajax({
        url: apiProxyUrl,  //thius is defined in moqc-oc.js
        type: 'GET',
        headers: getHeaders,
        success: function(data) {
            console.log("SUCCESS");
            // Use the data from the API response
            console.log(data);

            var csvString = "";

            //first generate the headers
            reportCSVHeadings.forEach(heading => {
                csvString += heading + ",";
            });
            csvString += "\n";

            //then generate each line in the CSV from the Items in the data
            data["Items"].forEach(item => {

                csvString += item.guid + ",";
                csvString += item.timestamp + ",";
                csvString += item.log["pillCount"].value + ",";

                DATAMAP_KEYS_ORDERED.forEach(key => {
                    csvString += (item.log[key] ? item.log[key].selection : "") + ",";
                });

                csvString += "\n";
            });

            // console.log("CSV: ");
            // console.log(csvString);

            //download the csv file
            downloadCSV(csvString, "moqc-opioid-calculator-report.csv");

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle any errors that occurred during the request
            console.error('AJAX error:', errorThrown);
            console.error('AJAX error:', textStatus);
            console.error(jqXHR);
        }
      });
}

function downloadCSV(csvData, fileName) {
    // Convert the CSV string into a Blob
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    // Create a link element
    var downloadLink = document.createElement("a");

    // Create a URL for the blob
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;

    // Set the download attribute with a default file name
    downloadLink.download = fileName;

    // Append the link to the document
    document.body.appendChild(downloadLink);

    // Programmatically click the link to trigger the download
    downloadLink.click();

    // Remove the link after starting the download
    document.body.removeChild(downloadLink);

    // Clean up the URL object
    URL.revokeObjectURL(url);
}