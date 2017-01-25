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
var ngAnnotate = require('ng-annotate');

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
		// .pipe(gulpIf('*.js', ngAnnotate({add: true})))
		.pipe(gulpIf('*.js', uglify()))
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
	gulp.watch(['site/js/app.js', 'site/js/modules/*.js'], browserSync.reload);
})

//BUILD!
gulp.task('build', function(callback) {
	runSequence(
		'clean:dist',
		'sass',
		['useref'],
		callback
	)
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
