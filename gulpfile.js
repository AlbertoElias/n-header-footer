/* globals console */

const gulp = require('gulp');
const data = require('gulp-data');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const navigation = require('ft-next-navigation');

const topLevelSections = ['world', 'companies', 'markets', 'opinion', 'work & career', 'life & arts'];

gulp.task('build', function () {
	return gulp.src('./templates/partials/navigation/**/*-template.html')
	.pipe(data(function () {
		const data = {
			all: navigation.items().map(function (navItem) {
				navItem.isTopLevel = topLevelSections.indexOf(navItem.name.toLowerCase()) > -1;
				return navItem;
			}),
			nav: navigation.items().filter(function (navItem) {
				return topLevelSections.indexOf(navItem.name.toLowerCase()) > -1;
			})
		};

		return data;
	}))
	.pipe(handlebars({}, { batch: ['./templates/partials'] }))
	.on('error', function(e) { console.log("Error compiling handlebars", e.message) })
	.pipe(rename(function (path) {
		path.basename = path.basename.replace('-template', '');
	}))
	.pipe(gulp.dest('./templates/partials/navigation'));
});
