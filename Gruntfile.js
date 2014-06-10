module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      version: "<%= pkg.version %>",
      author: "<%= pkg.author %>",
      license: "<%= pkg.license %>",
      banner: [
        "/*!",
        " * Monetary JavaScript library <%= meta.version %>",
        " * (c) <%= meta.author %>",
        " * License: <%= meta.license %>",
        " */",
        ""
      ].join("\n"),
    },

    clean: {
      build: ["build/"]
    },

    preprocess: {
      monetary: {
        src: "src/main.js",
        dest: "build/monetary.js"
      }
    },

    template: {
      monetary: {
        files: {
          "build/monetary.js": "build/monetary.js"
        }
      }
    },

    jasmine: {
      monetary: {
        src: [
        ],
        options: {
          keepRunner: true,
          specs: [
            "spec/*.js"
          ]
        }
      }
    },

    uglify: {
      options: {
        banner: "<%= meta.banner %>"
      },
      minified: {
        files: {
          'build/monetary.min.js': 'build/monetary.js'
        }
      }
    },

    watch: {
      options: {
        interrupt: true,
      },
      monetary: {
        files: ["src/**/*.js"],
        tasks: ["default"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("default", "Build the library and run the tests.", [
    "build",
    "test"
  ]);
  grunt.registerTask("build", "Build the library.", [
    "clean:build",
    "preprocess:monetary",
    "template:monetary",
    "uglify:minified"
  ]);
  grunt.registerTask("test", "Run the tests.", [
    "jasmine:monetary"
  ]);
  grunt.registerTask("develop", "Build and test the library on each save.", [
    "watch:monetary"
  ]);
};
