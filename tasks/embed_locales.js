module.exports = function (grunt) {
  var umdPattern = /function \(root, factory\) \{[^]*\}(?=\(this, function \(monetary\) \{)/gm,
      umdReplacement = 'function (root, factory) {\n    factory(monetary);\n}';

  grunt.registerTask('embedLocales', function () {
    var config = grunt.config('embedLocales');

    var files = grunt.file.expand("locales/*.js");
    var content = determineContent(files);

    var oldContent = grunt.file.read(config.src);
    var newContent = oldContent.replace('/* EMBED_LOCALES */', function () {
      return content;
    });

    grunt.file.write(config.dest, newContent);
  });

  function determineContent(files) {
    var content = '';

    files.forEach(function (file) {
      content += transformFile(file) + '\n';
    });

    content += "\n    monetary.lang(\'en\');\n";

    return content;
  }

  function transformFile(file) {
    var content = grunt.file.read(file);

    if (!content.match(umdPattern)) {
      grunt.warn("All locale files must be wrapped by the UMD pattern. Failed: " + file);
    }

    return content.replace(umdPattern, umdReplacement);
  }
};
