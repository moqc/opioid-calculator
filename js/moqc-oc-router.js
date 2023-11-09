
AppRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "home": "home",
        "reports": "reports",
    }
    
});

var router = new AppRouter;


router.on('route:home', function(){
    
    homeOpCalculatorView.render();
    
});

router.on('route:reports', function(){
    
    reportsView.render();
    
});


Backbone.history.start();


