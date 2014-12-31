module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var jsFiles = grunt.file.expand(["code/assets/js/**/*.js", "!code/assets/js/vendor/*"]),
      sassFiles = grunt.file.expand(["code/assets/sass/*"])
      htmlFiles = grunt.file.expand(["code/*.html"]);

  grunt.initConfig({

    copy: {
      main: {
        files: [ {
          expand: true,
          cwd: "code/",
          src: ["**", "!js/**", "!**/*.md", "!**/*.scss"],
          dest: "build/"
        }, {
          expand: true,
          cwd: "bower_components/bootstrap-sass-official/assets/stylesheets/",
          src: ["**/*.scss"],
          dest: "code/assets/sass/vendor"
        } ]
      }
    },

    clean: ["build/*"],

    bower_concat: {
      all: {
        dest: "code/assets/js/vendor/vendor.js",
        dependencies: {
          "underscore": "jquery",
          "backbone": ["jquery", "underscore"],
          "marionette": ["jquery", "underscore", "backbone"]
        }
      }
    },

    bowercopy: {
      dist: {
        options: {
          destPrefix: "code/assets/js/vendor"
        },
        files: {
          "require.js": "requirejs/require.js",
          "jquery.js": "jquery/dist/jquery.js",
          "underscore.js": "underscore/underscore.js",
          "json2.js": "json2/json2.js",
          "backbone.js": "backbone/backbone.js",
          "backbone.localStorage.js": "Backbone.localStorage/backbone.localStorage.js",
          "backbone.marionette.js": "marionette/lib/backbone.marionette.js",
          "bootstrap.js": "bootstrap-sass-official/assets/javascripts/bootstrap.js",
          "spin.js": "spin.js/spin.js"
        }
      },
      sass: {
        options: { destPrefix: "code/assets/sass/vendor/" },
        files: { "bootstrap": "bootstrap-sass-official/assets/stylesheets/*" }
      },
      fonts: {
        options: { destPrefix: "code/assets/fonts/vendor/" },
        files: { "bootstrap": "bootstrap-sass-official/assets/fonts/bootstrap/*" }
      }
    },

    jshint: {
      all: jsFiles,
      options: {
        jshintrc: true
      }
    },

    lintspaces: {
      all: {
        src: [jsFiles, "!*.min.js"],
        options: {
          editorconfig: ".editorconfig",
          ignores: ["js-comments"]
        }
      }
    },

    watch: {
      files: [jsFiles, sassFiles, htmlFiles],
      tasks: ["dev"]
    },

    sass: {
      dist: {
        files: {
          "code/assets/css/main.css": "code/assets/sass/main.scss"
        }
      }
    }
  });

  grunt.registerTask("init", ["bowercopy"]);
  grunt.registerTask("lint", ["jshint", "lintspaces"]);
  grunt.registerTask("dev", ["jshint", "lintspaces", "clean", "sass", "copy"]);
};
