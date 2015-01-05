ContactManager.module("ContactsApp.List", function(List, ContactManager,
Backbone, Marionette, $, _) {
  List.Layout = Marionette.LayoutView.extend({
    template: "#contact-list-layout",

    regions: {
      panelRegion: "#panel-region",
      contactsRegion: "#contacts-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template: "#contact-list-panel",

    triggers: {
      "click button.js-new": "contact:new"
    },

    events: {
      "submit #filter-form": "filterContacts"
    },

    ui: {
      criterion: "input.js-filter-criterion"
    },

    filterContacts: function(e) {
      e.preventDefault();
      var criterion = this.$(".js-filter-criterion").val();
      this.trigger("contacts:filter", criterion);
    },

    onSetFilterCriterion: function(criterion) {
      this.ui.criterion.val(criterion);
    }
  });

  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",

    triggers: {
      "click td a.js-show": "contact:show",
      "click td a.js-edit": "contact:edit",
      "click td button.js-delete": "contact:delete"
    },

    events: {
      "click": "highlightName"
    },

    highlightName: function(e) {
      this.$el.toggleClass("warning");
      this.trigger("contact:logInfo", this.model);
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    },

    flash: function(cssClass) {
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function() {
        setTimeout(function() {
          $view.toggleClass(cssClass);
        }, 500);
      });
    }
  });

  // Empty view for contacts list
  var noContactsView = Marionette.ItemView.extend({
    template: "#contact-list-none",
    tagName: "tr",
    className: "warning"
  });

  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
    childView: List.Contact,
    emptyView: noContactsView,
    childViewContainer: "tbody",

    initialize: function() {
      this.listenTo(this.collection, "reset", function() {
        this.attachHtml = function(collectionView, childView, index) {
          collectionView.$el.append(childView.el);
        };
      });
    },

    onRenderCollection: function() {
      this.attachHtml = function(collectionView, childView, index) {
        collectionView.$el.prepend(childView.el);
      };
    },

    onChildviewContactDelete: function() {
      this.$el.fadeOut(100, function() {
        $(this).fadeIn(100);
      });
    }
  });
});
