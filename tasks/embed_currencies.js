module.exports = function (grunt) {
  var umdPattern = /function \(root, factory\) \{[^]*\}(?=\(this, function \(monetary\) \{)/gm,
      umdReplacement = 'function (root, factory) {\n    factory(monetary);\n}';

  grunt.registerTask('embedCurrencies', function () {
    var config = grunt.config('embedCurrencies');

    var files = grunt.file.expand("currencies/*.js");
    var content = determineContent(files);

    var oldContent = grunt.file.read(config.src);
    var newContent = oldContent.replace('/* EMBED_CURRENCIES */', function () {
      return content;
    });

    grunt.file.write(config.dest, newContent);
  });

  function determineContent(files) {
    var content = '';

    files.forEach(function (file) {
      content += transformFile(file) + '\n';
    });

    return content;
  }

  function transformFile(file) {
    var content = grunt.file.read(file);

    if (!content.match(umdPattern)) {
      grunt.warn("All currency files must be wrapped by the UMD pattern. Failed: " + file);
    }

    return content.replace(umdPattern, umdReplacement);
  }
};
