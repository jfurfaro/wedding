var gulp = require('gulp'),
	browserify = require('browserify'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	autoprefix = require('gulp-autoprefixer'),
	nodeNotifier = require('node-notifier'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer');

// Error handler
function handleError(err) {
	console.log('\033[1;37;41m[ERROR!] ' + err.message + '\033[49m');
	nodeNotifier.notify({
		title: 'COMPILE ERROR',
		message: 'Your file did not compile:\n' + err.message,
		sound: true
	});

	this.emit('end');
}

gulp.task('compileLess', function(){
	return gulp.src('src/style.less')
		.pipe(less().on('error', handleError))
		// .pipe(autoprefix())
		.pipe(gulp.dest('public/'))
		.pipe(notify(function(file){return 'CSS Compiled'}))
		.on('error', function(err){console.log(err.message)})
		.pipe(livereload({ auto: false }));
});

gulp.task('browserify', function(){
	return browserify('src/script.js', {paths: ['./node_modules']})
		.bundle().on('error', handleError)
		.pipe(source('script.js'))
		.pipe(buffer())
		.pipe(uglify().on('error', handleError))
		.pipe(gulp.dest('public/'))
		.pipe(notify(function(file){return 'JS Compiled'}))
		.on('error', function(err){console.log(err.message)})
		.pipe(livereload({ auto: false }));
});

gulp.task('compileLessAdmin', function(){
	return gulp.src('src/admin.less')
		.pipe(less().on('error', handleError))
		// .pipe(autoprefix())
		.pipe(gulp.dest('public/'))
		.pipe(notify(function(file){return 'CSS Compiled'}))
		.on('error', function(err){console.log(err.message)})
		.pipe(livereload({ auto: false }));
});

gulp.task('browserifyAdmin', function(){
	return browserify('src/admin.js', {paths: ['./node_modules']})
		.bundle().on('error', handleError)
		.pipe(source('admin.js'))
		.pipe(buffer())
		.pipe(uglify().on('error', handleError))
		.pipe(gulp.dest('public/'))
		.pipe(notify(function(file){return 'Admin JS Compiled'}))
		.on('error', function(err){console.log(err.message)})
		.pipe(livereload({ auto: false }));
});

gulp.task('default', function(){
	livereload.listen();
	gulp.watch('src/**.less', ['compileLess']);
	gulp.watch('src/**.js', ['browserify']);
	gulp.watch('src/**.hbs', livereload.changed);
	console.log('\033[36m Watching Assets\033[39m');
});

gulp.task('admin', function(){
	livereload.listen();
	gulp.watch('src/**.less', ['compileLessAdmin']);
	gulp.watch('src/**.js', ['browserifyAdmin']);
	gulp.watch('src/**.hbs', livereload.changed);
	console.log('\033[36m Watching Assets\033[39m');
});

