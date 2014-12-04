/*global define */

define([
  'marionette'
], function (Marionette) {
  'use strict';

  var app = new Marionette.Application();

  app.addRegions({
    mainRegion: "#main",
    mainListRegion: "#main-list"
  });

  app.StaticView = Marionette.ItemView.extend({
    id: "static-view",
    tagName: "span",
    className: "instruction",
    template: "#static-template"
  });

  app.ListItemView = Marionette.ItemView.extend({
    template: "#list-item-template"
  });

  app.Contact = Backbone.Model.extend({
    defaults: {
      firstName: "Jimmy"
    }
  });
  app.ContactCollection = Backbone.Collection.extend({
    model: app.Contact,

    comparator: function($a, $b) {
      console.log($a);
      if($a.get("firstName") > $b.get("firstName")) return 1;
      if($a.get("firstName") < $b.get("firstName")) return -1;

      if($a.get("lastName") > $b.get("lastName")) return 1;
      if($a.get("lastName") < $b.get("lastName")) return -1;

      return 0;
    }
  });

  app.ContactItemView = Marionette.ItemView.extend({
    tagName: "li",
    template: "#contact-list-item",

    events: {
      "click li": "alertPhoneNumber"
    },

    alertPhoneNumber: function() {
      alert(this.model.escape("phoneNumber"));
    }
  });
  app.ContactsView = Marionette.CollectionView.extend({
    tagName: "ul",
    childView: app.ContactItemView
  });

  app.on("start", function() {
    var staticView = new app.StaticView();

    var contacts = new app.ContactCollection([
      {
        firstName: "Alice",
        lastName: "Zed",
        phoneNumber: "905-7654"
      },
      {
        lastName: "Tables",
        phoneNumber: "123-4567"
      },
      {
        firstName: "Alice",
        lastName: "Relish",
        phoneNumber: "905-7654"
      },
      {
        firstName: "Wang",
        lastName: "Chung",
        phoneNumber: "289-0932"
      }
    ]);
    var contactsListView = new app.ContactsView({
      collection: contacts
    });

    app.mainRegion.show(contactsListView);
  });

  return app;
});
