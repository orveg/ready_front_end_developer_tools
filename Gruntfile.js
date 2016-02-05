module.exports = function (grunt) {
    var path = require('path');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['build/assets/css/*'],
                dest: 'build/assets/css/'
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: grunt.file.readJSON('app/data/data.json')
                },
                files: [{
                    cwd: "app/views",
                    src: "*.jade",
                    dest: "build/",
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        copy: {
            files: {
                cwd: 'app/plugins',  // set working folder / root to copy
                src: '**/*',           // copy all files and subfolders
                dest: 'build/assets/plugins',    // destination folder
                expand: true           // required when using cwd
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/scss/',
                    src: ['*.scss'],
                    dest: 'build/assets/css/',
                    ext: '.css'
                }],
                options: {
                    noCache: true
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/assets/css',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            options: {
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            all: {
                files: {
                    src: ['Gruntfile.js', 'build/assets/js/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> \n <%= pkg.author %>*/\n'
            },
            build: {
                src: 'app/js/**/*.js',
                dest: 'build/assets/js/app.min.js'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './app/plugins/'
                }
            }
        },
        watch: {
            grunt: {files: ['Gruntfile.js']},
            jade: {
                files: 'app/views/**/*.jade',
                tasks: ['jade']
            }
        }
    });
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('Wacth', 'HTML canlı İzleme', ['jade', 'uglify', 'sass', 'cssmin', 'watch', 'concat']);
    grunt.registerTask('build-html', 'Jade Template HTML dönüştürü', ['jade']);
    grunt.registerTask('build-plugin-copy', 'Companetleri temizlenmiş plugin olarak projenize kopyalar', ['copy']);
    grunt.registerTask('build-css', 'Sassleri CSS olarak derler ve minify eder', ['sass', 'cssmin']);
    grunt.registerTask('build-js', 'Jsleri derler', ['uglify']);
    grunt.registerTask('build-all', 'Bütün sistemi derler js ve css ve min eder', ['jade', 'uglify', 'sass', 'cssmin', 'copy']);
    grunt.registerTask('build-bower', 'Bowerdan paketleri indirir düzenlememek için bower.jsonı kullan', ['bower']);

    grunt.registerTask('check-js', 'Jsler kontrol eder', ['jshint']);

};