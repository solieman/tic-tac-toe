module.exports = function(grunt) {
    
    grunt.initConfig({
        concat: {
            // concat task configuration goes here.
            js: {
                src: ['js/states/*.js','js/*.js','js/libs/*.js'],
                dest: 'build/scripts.js'
            },
            css : {
                src: ['css/*.css'],
                dest: 'build/styles.css'
            }
        },
        uglify: {
            // uglify task configuration goes here.
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'build/scripts.js': ['build/scripts.js']
                }
            }
        },
        
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

};