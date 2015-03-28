module.exports = function(grunt) {
    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            release: ['dist']
        },
        // compress js.
        uglify: {
            options: {
                sourceMap: true,
				sourceMapIncludeSources: true,
				compress: {
					sequences: false
				},
                mangle: {
                    except: ['window.Optional']
                }
            },
            my_target: {
                files: {
                    'dist/optional.min.js': ['src/js/optional.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

   grunt.registerTask('default', ['uglify']);
};


