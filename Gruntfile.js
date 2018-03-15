module.exports = function(grunt) {
    
    grunt.initConfig({
        concat: {
            // concat task configuration goes here.
            js: {
                src: ['js/*.js'],
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
        
        // Arbitrary non-task-specific properties.
        my_property: 'whatever',
        my_src_files: ['foo/*.js', 'bar/*.js'],
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

};