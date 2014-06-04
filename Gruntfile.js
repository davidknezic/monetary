module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      monetary: {
        src: [
        ],
        options: {
          keepRunner: true,
          specs: [
            "spec/*.spec.js"
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', []);
};
