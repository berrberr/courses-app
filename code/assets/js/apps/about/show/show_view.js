ContactManager.module("AboutApp.Show", function(Show, ContactManager,
Backbone, Marionette, $, _) {
  Show.View = Marionette.ItemView.extend({
    template: "#about-message"
  });
});
