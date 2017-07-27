const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  assetPath: 'public/govuk_template/'
}

// Copy files
gulp.task('copy-govuk-template', () => {
  gulp
    .src('node_modules/govuk_frontend_toolkit/{images/**/*.*,javascripts/**/*.*,stylesheets/**/*.*}')
    .pipe(gulp.dest(paths.assetPath))
})

gulp.task('copy-govuk-template-mustache', () => {
  gulp
    .src('node_modules/govuk_template_mustache/assets/{images/**/*.*,javascripts/**/*.*,stylesheets/**/*.*}')
    .pipe(gulp.dest(paths.assetPath))
})

gulp.task('copy-govuk-template-mustache-views', () => {
  gulp
    .src('node_modules/govuk_template_mustache/views/**/*.*')
    .pipe(gulp.dest('views/govuk_template_mustache'))
})

// Compile our scss files
gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.assetPath + 'stylesheets'));
});

gulp.task('copy-files', [], () => {
  gulp.run(['copy-govuk-template', 'copy-govuk-template-mustache', 'copy-govuk-template-mustache-views'])
})

// Default task
gulp.task('default', [], () => {
  gulp.run(['sass', 'copy-files'])
})
