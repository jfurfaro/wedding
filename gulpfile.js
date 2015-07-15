var gulp = require('gulp'),
	browserify = require('browserify'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	autoprefix = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	transform = require('vinyl-transform');
	rename = require('gulp-notify');

gulp.task('compileLess', function(){
	return gulp.src('src/style.less')
		.pipe(less())
		.pipe(autoprefix())
		.pipe(gulp.dest('public/'))
		.pipe(notify(function(file){return 'CSS Compiled'}))
		.on('error', function(err){console.log(err.message)})
		.pipe(livereload({ auto: false }));
});

gulp.task('browserify', function(){
	var browserified = transform(function(filename) {
		var b = browserify(filename);
		return b.bundle();
	});

	return gulp.src('src/script.js')
		.pipe(browserified)
		.pipe(gulp.dest('public/'))
		.pipe(notify(function(file){return 'JS Compiled'}))
		.on('error', function(err){console.log(err.message)})
		.pipe(livereload({ auto: false }));
});

gulp.task('default', function(){
	livereload.listen();
	gulp.watch('src/**.less', ['compileLess']);
	gulp.watch('src/**.js', ['browserify']);
	console.log('\033[36m Watching Assets\033[39m');
});

