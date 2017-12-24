var gulp       			= require('gulp'),
    sass       			= require('gulp-sass'),
    sourcemaps 			= require('gulp-sourcemaps'),
    uglify     			= require('gulp-uglify'),
    concat     			= require('gulp-concat'),
    rename     			= require('gulp-rename'),
    autoprefixer		= require('gulp-autoprefixer'),
	cssnano 			= require('gulp-cssnano'),
    notify				= require("gulp-notify"),
    browserSync     	= require('browser-sync');

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('css', function(){
	return gulp.src('./css/**/*.css')
        .pipe(sourcemaps.init())
		.pipe(concat('styles.min.css'))
        .pipe(autoprefixer(['last 15 versions']))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass', function() {
    return gulp.src('./css/**/*.scss')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('./css'))
});

gulp.task('js', function () {
    return gulp.src('./js/src/*.js')
		.pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
    return gulp.src('./js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', ['css', 'sass', 'js', 'browserSync'], function() {
	gulp.watch('./css/**/*.scss', ['scss']);
	gulp.watch('./css/**/*.css', ['css']);
	gulp.watch(['js/**/*.js', './js/common.js'], ['js']);
	gulp.watch('./*.html', browserSync.reload);
});

gulp.task('default', ['watch']);