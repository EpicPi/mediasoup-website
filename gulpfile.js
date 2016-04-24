var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var request = require('request');
var shell = require('gulp-shell');
var sitemap = require('gulp-sitemap');
var fs = require('fs');

const PKG = require('./package.json');

gulp.task('bower', function()
{
	return gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(gulp.dest('./js/libs'));
});

gulp.task('npm-shield', function () {
  return request('https://img.shields.io/npm/v/mediasoup.svg')
  	.pipe(fs.createWriteStream('images/npm-shield-mediasoup.svg'));
});

gulp.task('sitemap', function()
{
	return gulp.src('_site/**/*.html')
		.pipe(sitemap(
			{
				siteUrl : PKG.homepage
			}))
		.pipe(gulp.dest('./_site'));
});

gulp.task('jekyll:build', shell.task(
	[ 'jekyll build' ]
));

gulp.task('jekyll:watch', shell.task(
	[ 'jekyll serve' ]
));

gulp.task('clean', shell.task(
	[ 'rm -rf _site/ .sass-cache/' ]
));

gulp.task('build', gulp.series('clean', 'bower', 'npm-shield', 'jekyll:build', 'sitemap'));

gulp.task('live', gulp.series('clean', 'bower', 'jekyll:watch'));

gulp.task('default', gulp.series('build'));
