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

    jasmine: {
      monetary: {
        src: [
          "monetary.js",
          "currencies/*.js"
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
          'build/monetary.min.js': 'monetary.js'
        }
      }
    },

    watch: {
      options: {
        interrupt: true,
      },
      monetary: {
        files: ["monetary.js", "currencies/*.js"],
        tasks: ["default"]
      }
    }
  });

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
    "uglify:minified"
  ]);
  grunt.registerTask("test", "Run the tests.", [
    "jasmine:monetary"
  ]);
  grunt.registerTask("develop", "Build and test the library on each save.", [
    "watch:monetary"
  ]);
};
