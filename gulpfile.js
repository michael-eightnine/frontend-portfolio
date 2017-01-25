var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

//scss
gulp.task('sass', function(){
	return gulp.src('site/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			 browsers: ['last 7 versions']
		}))
		.pipe(gulp.dest('site/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

//minify from index imports
gulp.task('useref', function(){
	return gulp.src('site/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify({mangle: false})))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

//clean
gulp.task('clean:dist', function() {
	return del.sync('dist');
})

//browserSync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'site'
		}
	})
})

//watch
gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch(['site/scss/*.scss', 'site/scss/partials/*.scss'], ['sass']);
	gulp.watch(['site/*.html', 'site/js/angular/views/*.html'], browserSync.reload);
	gulp.watch(['site/js/app.js'], browserSync.reload);
})

//build only tasks start

//optimize images for build
gulp.task('images', function(){
	return gulp.src('site/img/**/*.+(png|jpg|gif|svg)')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});

//copy views for build
gulp.task('views', function() {
	return gulp.src('site/js/angular/views/*.html')
	.pipe(gulp.dest('dist/js/angular/views'))
})

//copy project JSONs
gulp.task('projects', function() {
	return gulp.src('site/projects/*.json')
	.pipe(gulp.dest('dist/projects'))
})


//BUILD!
gulp.task('build', function(callback) {
	runSequence(
		'clean:dist',
		'sass',
		['useref', 'images', 'views', 'projects'],
		callback
	)
})

//default
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
