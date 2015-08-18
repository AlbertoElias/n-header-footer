'use strict';

var gulp = require('gulp');
var data = require('gulp-data');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

var navigation = require('ft-next-navigation');

var topLevelSections = ['world', 'companies', 'markets', 'opinion', 'work & career', 'life & arts'];

gulp.task('build', function () {
	return gulp.src('./templates/partials/navigation/**/*-template.html')
		.pipe(data(function () {
			return {
				all: navigation.items().map(function (navItem) {
					navItem.isTopLevel = topLevelSections.indexOf(navItem.name.toLowerCase()) > -1;
					return navItem;
				}),
				nav: navigation.items().filter(function (navItem) {
					return topLevelSections.indexOf(navItem.name.toLowerCase()) > -1;
				})
			};
		}))
		.pipe(handlebars())
		.pipe(rename(function (path) {
			path.basename = path.basename.replace('-template', '');
		}))
		.pipe(gulp.dest('./templates/partials/navigation'));
});
