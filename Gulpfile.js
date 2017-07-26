const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('copy-govuk-template', () => {
  gulp
    .src('node_modules/govuk_frontend_toolkit/{images/**/*.*,javascripts/**/*.*,stylesheets/**/*.*}')
    .pipe(gulp.dest('public/govuk_template'));

})

gulp.task('copy-govuk-template-mustache', () => {
  gulp
    .src('node_modules/govuk_template_mustache/assets/{images/**/*.*,javascripts/**/*.*,stylesheets/**/*.*}')
    .pipe(gulp.dest('public/govuk_template'));
})

gulp.task('copy-govuk-template-mustache-views', () => {
  gulp
    .src('node_modules/govuk_template_mustache/views/**/*.*')
    .pipe(gulp.dest('views/govuk_template_mustache'));
})


// Compile scss files to css
gulp.task('styles', () => {
  return gulp.src('/sass/**/*.scss')
    .pipe(sass({
      includePaths: [
        'node_modules/govuk_frontend_toolkit/stylesheets', // 1
        'node_modules/govuk-elements-sass/public/sass'     // 2
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('/public/govuk_template/stylesheets'))
})

gulp.task('default', [], () => {
  gulp.run(['copy-govuk-template', 'copy-govuk-template-mustache', 'copy-govuk-template-mustache-views']);
});
