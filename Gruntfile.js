module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ["dist/"]
    },

    copy: {
      monetary: {
        src: "monetary.js",
        dest: "dist/monetary.js"
      },
    },

    concat: {
      currencies: {
        src: ["currencies/*.js"],
        dest: "dist/monetary.currencies.js"
      },
      full: {
        src: ["monetary.js", "currencies/*.js"],
        dest: "dist/monetary-with-currencies.js"
      }
    },

    uglify: {
      options: {
        preserveComments: "some"
      },
      minified: {
        files: {
          "dist/monetary.min.js": "dist/monetary.js",
          "dist/monetary.currencies.min.js": "dist/monetary.currencies.js",
          "dist/monetary-with-currencies.min.js": "dist/monetary-with-currencies.js"
        }
      }
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

    watch: {
      options: {
        interrupt: true,
      },
      monetary: {
        files: ["monetary.js", "currencies/*.js"],
        tasks: ["test"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("default", "Build the library and run the tests.", [
    "build",
    "test"
  ]);
  grunt.registerTask("build", "Build the library.", [
    "clean:dist",
    "copy:monetary",
    "concat",
    "uglify:minified"
  ]);
  grunt.registerTask("test", "Run the tests.", [
    "jasmine:monetary"
  ]);
  grunt.registerTask("develop", "Build and test the library on each save.", [
    "watch:monetary"
  ]);
};
