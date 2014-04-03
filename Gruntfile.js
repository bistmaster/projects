module.exports = function (grunt){
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			target : {
				src: "app/*/*.js"
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask("default", ['jshint']);
}