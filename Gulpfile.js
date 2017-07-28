const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const standard = require('gulp-standard')
const runSequence = require('run-sequence')
const del = require('del')
const watch = require('gulp-watch')
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync')
const reload = browserSync.reload;

const paths = {
    assets: 'src/assets/sass/',
    public: 'public/',
    govukModules: 'govuk_modules/'
}

gulp.task('clean', () => {
    return del([paths.public, paths.govukModules])
})


// Copy govuk files

gulp.task('copy-govuk-toolkit', () => {
    return gulp.src(['node_modules/govuk_frontend_toolkit/**/*.*'])
        .pipe(gulp.dest(paths.govukModules + 'govuk_frontend_toolkit/'))
})

gulp.task('copy-govuk-template', () => {
    return gulp.src(['node_modules/govuk_template_mustache/**/*.*'])
        .pipe(gulp.dest(paths.govukModules + 'govuk_template_mustache/'))
})

gulp.task('copy-govuk-elements-sass', () => {
    return gulp.src(['node_modules/govuk-elements-sass/public/sass/**'])
        .pipe(gulp.dest(paths.govukModules + '/govuk-elements-sass/'))
})

gulp.task('copy-govuk-files', [], (done) => {
    runSequence(
        'copy-govuk-toolkit',
        'copy-govuk-template',
        'copy-govuk-elements-sass',
        done)
})


// Install the govuk files into our application

gulp.task('copy-template-assets', () => {
    gulp
        .src(paths.govukModules + '/govuk_template_mustache/assets/{images/**/*.*,javascripts/**/*.*,stylesheets/**/*.*}')
        .pipe(gulp.dest(paths.public))
})

gulp.task('copy-template-view', () => {
    gulp
        .src('node_modules/govuk_template_mustache/views/**/*.*')
        .pipe(gulp.dest('views/govuk_template_mustache'))
})

gulp.task('install-govuk-files', [], (done) => {
    runSequence(
        'copy-template-assets',
        'copy-template-view',
        done)
})


// Build the sass
gulp.task('sass', () => {
    return gulp.src('src/assets/' + 'sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: [
                'govuk_modules/govuk_frontend_toolkit/stylesheets',
                'govuk_modules/govuk_template_mustache/assets/stylesheets',
                'govuk_modules/govuk-elements-sass/'
            ]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.public + 'stylesheets/'))
        .pipe(reload({
            stream: true
        }));
})


// Run StardardJS checks
gulp.task('standard', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(standard())
        .pipe(standard.reporter('default', {
            breakOnError: true,
            quiet: true
        }))
})

// Test task
gulp.task('test', [], () => {
    // TODO
    gulp.run('standard')
})


// Build task
gulp.task('build', ['clean'], (done) => {
    runSequence(
        'copy-govuk-files',
        'install-govuk-files',
        'sass',
        done)
})

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync.init({
        proxy: 'http://localhost:8000',
        // files: ['/src/**/*.*', '/views/**/*.*'],
        files: ['/src/**/*.*'],
        browser: 'google chrome',
        port: 3000,
    })
})

gulp.task('nodemon', (cb) => {

    let started = false

    return nodemon({
        script: 'index.js',
        ext: 'js html',
        watch: 'views'
    }).on('start', () => {

        // to avoid nodemon being started multiple times
        if (!started) {
            cb()
            started = true
        }

        console.log('Starting xxxxx')

        reload()

    }).on('restart', () => {

        console.log('Reloading xxxxx')

        reload()
	})
})

gulp.task('watch', () => {
    gulp.watch('src/assets/sass/**/*.scss', ['sass'])

    gulp.watch('public/**/*.*').on('change', reload)

    gulp.watch('views/**/*.*').on('change', reload)

    // gulp.watch('src/**/*.*').on('change', reload);
});

gulp.task('default', ['watch', 'sass', 'browser-sync'])
