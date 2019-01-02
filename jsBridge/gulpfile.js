var gulp = require('gulp');
var gulpUglify = require('gulp-uglify');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

//目标目录
var dist = '../../../dist/libs/jsBridge/';

gulp.task('default', function(){
	gulp.src('./*.js')
		.pipe(gulpUglify())
		.pipe(gulp.dest(dist));

	gulp.src('./font/*.ttf')
		.pipe(gulp.dest(dist+'font/'));

	gulp.src('./*.html')
		.pipe(gulp.dest(dist));

	gulp.src('./css/*.css')
		.pipe(gulp.dest(dist+'css/'));
});

gulp.task('css', function(){
	gulp.src('./css/*.css')
		.pipe(gulp.dest(dist+'css/')).pipe(livereload());
});	

gulp.task('js', function(){
	gulp.src('./*.js')
		.pipe(gulpUglify())
		.pipe(gulp.dest(dist)).pipe(livereload());
});

gulp.task('html', function(){
	gulp.src('./*.html')
		.pipe(gulp.dest(dist)).pipe(livereload());
});	

//监控
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./css/*.css', ['css']);
	gulp.watch('./*.js', ['js']);
	gulp.watch('./*.html', ['html']);
});

gulp.task('server', function () {
	connect.server({
		root: dist,
		port: 8960
	});
});