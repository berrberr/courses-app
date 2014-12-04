require.config({
  paths: {
    underscore: './vendor/underscore',
    backbone: './vendor/backbone',
    marionette: './vendor/backbone.marionette',
    json2: './vendor/json2',
    jquery: './vendor/jquery'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    }
  },
  deps: ['jquery', 'underscore']
});

require([
  'app',
  'backbone'
], function (app, Backbone) {
  'use strict';

  app.start();

  Backbone.history.start();
});
