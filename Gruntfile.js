'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/javascript/ToolsForFieldLinguistics.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    jasmine_node: {
      specNameMatcher: 'spec',
      projectRoot: './',
      requirejs: false,
      forceExit: true,
      isVerbose: true,
      showColors: true,
      jUnit: {
        report: true,
        savePath: './build/reports/jasmine/',
        consolidate: true,
        useDotNotation: false
      }
    },
    jshint: {
      options: {
        jshintrc: 'test/javascript/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        options: {
          jshintrc: 'src/javascript/.jshintrc'
        },
        src: ['src/javascript/*.js']
      },
      test: {
        src: ['test/javascript/**/*.js']
      },
    },
    jsdoc: {
      dist: {
        jsdoc : 'node_modules/.bin/jsdoc',
        src: ['src/javascript/**/*.js', 'test/javascript/**/*.js'],
        options: {
          destination: 'doc/javascript'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'jasmine_node']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'jasmine_node']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('docs', ['jsdoc']);
  grunt.registerTask('default', ['jshint', 'jasmine_node', 'concat', 'uglify']);

};