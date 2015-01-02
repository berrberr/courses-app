ContactManager.module("ContactsApp.Show", function(Show, ContactManager,
Backbone, Marionette, $, _) {
  Show.MissingContact = Marionette.ItemView.extend({
    template: "#missing-contact-view"
  });

  Show.Contact = Marionette.ItemView.extend({
    template: "#contact-view",

    events: {
      "click a.js-back": "listContactsClicked",
      "click a.js-edit": "editClicked"
    },

    listContactsClicked: function(e) {
      e.preventDefault();
      ContactManager.trigger("contacts:list");
    },

    editClicked: function(e) {
      e.preventDefault();
      this.trigger("contact:edit", this.model);
    }
  });
});
