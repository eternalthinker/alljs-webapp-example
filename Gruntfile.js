
var pkg = require('./package.json');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-remove-logging');

  var userConfig = {
    build_dir: "client/_build",

    app_files: {
      js: ["client/src/**/*.js"],
      jade: ["client/src/app/**/*.jade"],
      less: ["client/src/imports.less"],
      layout: ["client/src/index.jade"]
    },

     vendor_files: {
       js: [
         "client/bower_components/angular/angular.js",  
         "client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
         "client/bower_components/angular-ui-router/release/angular-ui-router.js"
       ],
       css: [
         "client/bower_components/bootstrap/dist/css/bootstrap.min.css"
       ],
       assets: []
     } 
  } 

  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner:
      '/**\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' */\n'
    },

    module_prefix: "function (window, angular, undefined) {",
    module_suffix: "})(window, window.angular);",
    
    clean: {
      all: ['<%= build_dir %>'],
      dev: ['<%= build_dir %>/*', 
            '!<%= build_dir %>/assets', 
            '!<%= build_dir %>/*.html'
           ]
    },

    copy: {
      app_assets: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= build_dir %>/assets/',
            cwd: 'client/assets/',
            expand: true
          }
        ]
      },
      vendor_assets: {
        files: [
          {
            src: [ '<%= vendor_files.assets %>' ],
            dest: '<%= build_dir %>/assets/',
            cwd: 'client',
            expand: true,
            flatten: true
          }
        ]
      },
      appjs: {
        files: [
          {
            src: [ 'src/**/*.js' ],
            dest: '<%= build_dir %>/',
            cwd: 'client',
            expand: true
          }
        ]
      }
    },
 
    concat: {
      build_css: {
        src: [
          '<%= vendor_files.css %>',
          '<%= build_dir %>/assets/<%= pkg.name %>.css'
        ],
        dest: '<%= build_dir %>/assets/<%= pkg.name %>.css'
      },
      
      appjs: {
        src: [
          '<%= build_dir %>/src/**/*.js'
        ],
        dest: '<%= build_dir %>/src.js'
      },

      alljs: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          '<%= vendor_files.js %>',
          '<%= module_prefix %>',
          '<%= concat.appjs.dest %>',
          '<%= html2js.main.dest %>',
          '<%= module_suffix %>'
        ],
        dest: '<%= build_dir %>/assets/<%= pkg.name %>.js'
      } 
    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      build: {
        files: {
          '<%= concat.appjs.dest %>': [ '<%= concat.appjs.dest %>' ]
        },
      }
    },

    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.alljs.dest %>': '<%= concat.alljs.dest %>'
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ['client/src/imports.less']
        },
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>.css': '<%= app_files.less %>'
        },
        compress: false
      },
      production: {
        options: {
          paths: ['client/src/imports.less']
        },
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>.css': '<%= app_files.less %>'
        },
        compress: true
      }
    },

    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: '<%= build_dir %>/assets/',
            src: ['*.css', '!*.min.css'],
            dest: '<%= build_dir %>/assets/',
            ext: '.css'
          }
        ]
      }
    },

    jade: {
      options: {
        pretty: true
      },
      compile2html: {
        files: [
          {
            src: ['src/app/**/*.jade'],
            cwd: 'client',
            dest: '<%= build_dir %>',
            expand: true,
            ext: '.html'
          }
        ]
      },
      index: {
        options: { data: { pkg: pkg } },
        files:{ "<%= build_dir %>/index.html": "<%= app_files.layout %>" }
      }
    },

    html2js: {
      main: {
        options: {
          base: '<%= build_dir %>/src',
          module: 'testApp.templates'
        },
        src: [ '<%= build_dir %>/src/**/*.html' ],
        dest: '<%= build_dir %>/templates.js'
      }
    },

    removelogging: {
      dist: {
        files: { '<%= concat.alljs.dest %>': '<%= concat.alljs.dest %>' }
      }
    },


  };

  grunt.initConfig( grunt.util._.extend(taskConfig, userConfig) ); 

  grunt.registerTask( 'default', [ 'build', 'compile' ] );
  grunt.registerTask( 'build', [
    'clean:all', 'jade', 'html2js', 'less:development', 
    'copy:app_assets', 'copy:vendor_assets', 'copy:appjs',
    'concat:build_css', 'concat:appjs', 'ngAnnotate:build', 'concat:alljs'
  ]);
  grunt.registerTask( 'compile', [
    'clean:dev', 'less:production', 'cssmin', 'concat:build_css', 'removelogging', 'uglify'
  ]);

};

