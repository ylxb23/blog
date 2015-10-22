var gulp = require('gulp'),
	gutil = require('gulp-util'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),	// js压缩
	jade = require('gulp-jade'),		// jade
	sass = require('gulp-sass'),		// scss编译成css
	plumber = require('gulp-plumber'),	// 
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint');	// 
//	markdown = require('gulp-markdown'),// markdown
//	concat = require('gulp-concat'),	// 
	
	
/** 编译scss */
gulp.task('sass', function(done) {
	gulp.src('./app/scss/*.scss')
		.pipe(plumber({errorHandler: errrHandler}))
		.pipe(sass({errLogToConsoel: true}))
		.pipe(gulp.dest('./css'))
		.pipe(minifyCss({keepSpecialComments: 0}))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./css/'))
		.on('end', done);
});
/** MD编译 */
/*
gulp.task('markdown', function() {
	return gulp.src(src_md).pipe(markdown()).pipe(gulp.dest(base));
});
*/
/** jade编译 */
gulp.task('jade', function() {
	gulp.src('./app/jade/*.jade')
		.pipe(jade({
			locals: 0
		}))
		.pipe(gulp.dest('./'));
});

/** js压缩 */
gulp.task('scripts', function() {
	gulp.src('./app/js/*.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./js/'));
});

/** 监听 */
gulp.task('watch', function() {
	gulp.watch('./app/jade/*.jade', function() {
		console.log('jade file changed...');
		gulp.run('jade');
	});

	gulp.watch('./app/scss/*.scss', function() {
		console.log('scss file changed...');
		gulp.run('sass');
	});

	gulp.watch('./app/js/*.js', function() {
		console.log('js file changed...');
		gulp.run('scripts');
	});
});

/** 默认任务 */
gulp.task('default', function() {
	gulp.run('watch');
});


function errrHandler(e) {
	gutil.beep();
	gutil.log('=================================');
	gutil.log(e);
	gutil.log('=================================');
}