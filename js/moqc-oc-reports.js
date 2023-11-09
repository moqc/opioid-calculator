
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

            //TODO: generate the report from the db
            getLogReportFromDB().then(data => {
                console.log('Data received:', data);
                // handle the data
            }).catch(error => {
                console.error('Error fetching report:', error);
                // handle the error
            });

        });

    }
});
var reportsView = new ReportsView();