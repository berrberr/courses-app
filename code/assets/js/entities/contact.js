ContactManager.module("Entities", function(Entities, ContactManager,
  Backbone, Marionette, $, _) {

  Entities.Contact = Backbone.Model.extend({
    urlRoot: "contacts"
  });

  Entities.configureStorage(Entities.Contact);
  
  Entities.ContactCollection = Backbone.Collection.extend({
    url: "contacts",
    model: Entities.Contact,
    comparator: "firstName"
  });

  var contacts;

  var initializeContacts = function() {
    contacts = new Entities.ContactCollection([
      { id: 1, firstName: "Alice", lastName: "Artes", phoneNumber: "555-0184" },
      { id: 2, firstName: "Bob", lastName: "Mar", phoneNumber: "222-0184" },
      { id: 3, firstName: "Jimmy", lastName: "Bag", phoneNumber: "333-0184" }
    ]);
  };

  var API = {
    getContactEntities: function() {
      if(contacts === undefined) {
        initializeContacts();
      }
      return contacts;
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function() {
    return API.getContactEntities();
  });
});
