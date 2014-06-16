module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ["dist/*.js"],
      tmp: ["tmp/"]
    },

    copy: {
      monetary: {
        src: "monetary.js",
        dest: "dist/monetary.js"
      },
    },

    embedCurrencies: {
      src: "monetary.js",
      dest: "tmp/monetary.js"
    },

    embedLocales: {
      src: "tmp/monetary.js",
      dest: "dist/monetary.full.js"
    },

    uglify: {
      options: {
        preserveComments: "some"
      },
      minified: {
        files: {
          "dist/monetary.min.js": "dist/monetary.js",
          "dist/monetary.full.min.js": "dist/monetary.full.js"
        }
      }
    },

    jasmine: {
      monetary: {
        src: [
          "monetary.js",
          "currencies/*.js",
          "locales/*.js"
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
        files: ["monetary.js", "currencies/*.js", "locales/*.js"],
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

  grunt.loadTasks("tasks");

  grunt.registerTask("default", ["build", "test"]);
  grunt.registerTask("build", ["clean:dist", "copy:monetary", "embedCurrencies", "embedLocales", "clean:tmp", "uglify:minified"]);
  grunt.registerTask("test", ["jasmine:monetary"]);
  grunt.registerTask("develop", ["watch:monetary"]);
};
