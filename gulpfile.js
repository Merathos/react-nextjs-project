const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const run = require('run-sequence');
const del = require('del');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('html', () => gulp.src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build'))
);

gulp.task('style', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe(minify())
  .pipe(rename('style.min.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream())
);

gulp.task('bootstrap', () => gulp.src('source/sass/bootstrap.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe(minify())
  .pipe(rename('bootstrap.min.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream())
);

gulp.task('styleV2', () => gulp.src('source/sass/style-v2.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe(minify())
  .pipe(rename('style-v2.min.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream())
);

gulp.task('js', () => gulp.src(['source/js/**/*.js', '!source/js/plugins/*.js'])
  .pipe(plumber())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('build/js/'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js/'))
);

gulp.task('jsPlugins', () => gulp.src(['source/js/plugins/*.js'])
  .pipe(plumber())
  .pipe(concat('libs.js'))
  .pipe(gulp.dest('build/js/'))
);

gulp.task('images', () => gulp.src('source/img/**/*.{gif,png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('build/img/'))
);

gulp.task('webp', () => gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp({quality: 70}))
  .pipe(gulp.dest('build/img/webp'))
);

gulp.task('sprite', () => gulp.src('source/img/sprite/*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'))
);

gulp.task('copy', () => gulp.src([
    'source/fonts/**/*.{ttf,woff,woff2}',
    'source/img/**',
    'source/json/**',
    'source/favicon/*'
  ],
  {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
);

gulp.task('copyJson', () => gulp.src([
    'source/json/**',
  ],
  {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
);

gulp.task('clean', () =>
  del('build')
);

gulp.task('serve', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/img/**/*.{gif,png,jpg,svg,webp}', gulp.series('images', 'webp'));
  gulp.watch('source/img/sprite/*.svg', gulp.series('sprite'));
  gulp.watch('source/sass/**/*.scss', gulp.series('styleV2'));
  gulp.watch('source/**/*.html', gulp.series('html')).on('change', server.reload);
  gulp.watch('source/js/**/*.js', gulp.series('jsPlugins', 'js')).on('change', server.reload);
  gulp.watch('source/json/**', gulp.series('copyJson')).on('change', server.reload);
});

gulp.task('build', gulp.series('clean', 'images', 'webp', 'sprite', 'copy', 'bootstrap', 'style', 'styleV2', 'html', 'js', 'jsPlugins'));
