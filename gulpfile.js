var
	gulp			= require('gulp'),
	gutil			= require('gulp-util'),
	uglify		= require('gulp-uglify'),	// js压缩
	jade			= require('gulp-jade'),		// jade
	sass			= require('gulp-sass'),		// scss编译成css
	minifyCss	= require('gulp-minify-css'),	// 压缩css
	plumber		= require('gulp-plumber'),	//
	rename		= require('gulp-rename'),
	jshint		= require('gulp-jshint'),	// js压缩
	markdown	= require('gulp-markdown'),// markdown
	gulpCopy	= require('gulp-file-copy'),	// 文件复制
	concat		= require('gulp-concat');	// 合并文件


/** 编译scss */
gulp.task('sass', function(done) {
	gulp.src('./app/scss/*.scss')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(sass({errLogToConsoel: true}))
		.pipe(gulp.dest('./css'))
		.pipe(minifyCss({keepSpecialComments: 0}))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./css/'))
		.on('end', done);
});

/** 代码部署路径 */
var dest = './';

/** MD编译 */
gulp.task('markdown', function() {
	gulp.src('./app/md/**/*.md')
			.pipe(markdown())
			.pipe(gulp.dest(dest+'articles/'));
});

/** 文件复制 */
gulp.task('copy', function() {
	var sources = './app/html/**/*.html';
	var dest = '.';
	gulp.src(sources)
			.pipe(gulpCopy(dest, {
				start: './app/html'
			}));
});

/** jade编译 */
//gulp.task('jade', function() {
//	gulp.src('./app/jade/*.jade')
//		.pipe(jade({
//			locals: 0
//		}))
//		.pipe(gulp.dest(dest));
//});

/** js压缩 */
gulp.task('scripts', function() {
	gulp.src('./app/js/**/*.js')
		// .pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(dest+'js/'));
});

/** 监听 */
gulp.task('watch', function() {

//	gulp.watch('./app/jade/*.jade', function() {
//		console.log('jade file changed...');
//		gulp.run('jade');
//	});

	gulp.watch('./app/scss/*.scss', function() {
		console.log('scss file changed...');
		gulp.run('sass');
	});

	gulp.watch('./app/js/*.js', function() {
		console.log('js file changed...');
		gulp.run('scripts');
	});

	gulp.watch('./app/md/**/*.md', function() {
		console.log('js file changed...');
		gulp.run('markdown');
	});

	gulp.watch('./app/html/**/*.html', function() {
		console.log('Html file changed...');
		gulp.run('copy');
	});
});

/** 默认任务 */
gulp.task('default', function() {
	gulp.run('watch');
});

/** sass 编译出错报警 */
function errorHandler(e) {
	gutil.beep();
	gutil.log('=================================');
	gutil.log(e);
	gutil.log('=================================');
}
