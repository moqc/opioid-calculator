
AppRouter = Backbone.Router.extend({
    routes: {
        "": "home"
    }
    
});

var router = new AppRouter;


router.on('route:home', function(){
    
    homeOpCalculatorView.render();
    
});


Backbone.history.start();


