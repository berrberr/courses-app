var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region",
  dialogRegion: Marionette.Region.Dialog.extend({
    el: "#dialog-region"
  }),
  summaryRegion: "#summary-region"
});

ContactManager.navigate = function(route, options) {
  options = options || {};
  Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function() {
  return Backbone.history.fragment;
};

ContactManager.on("start", function() {
  if(Backbone.history) {
    Backbone.history.start();

    // Root route
    if(this.getCurrentRoute() === "") {
      ContactManager.trigger("contacts:list");
    }
  }
});
