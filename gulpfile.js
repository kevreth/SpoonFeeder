const rename = require("gulp-rename");
const inlineSource = require('gulp-inline-source-html')
const { series, src, dest } = require('gulp');
const gulp = require('gulp');
const flatten = require('gulp-flatten');
const clean = require('gulp-clean');
const nightwatch = require('gulp-nightwatch');
const jest = require('gulp-jest').default;
const eslint = require('gulp-eslint');
const browserify = require("browserify");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const tsify = require('tsify');
const preprocess = require("gulp-preprocess");
const paths = {
  TEST_ROOT_DIR: 'src/ts/test/unit',
  TYPESCRIPT: 'src/ts/main/**/*.ts',
  NON_TS: ["src/**/*.css", "src/**/*.svg", "lib/**", "src/courses/*.json"],
  ENTRY_POINT: "src/ts/main/main.ts",
  CLEAN: ['debug','dist','tests_output','geckodriver.log','package-lock.json', 'tests_output'],
  CLEAN2: ['geckodriver.log','package-lock.json', 'tests_output']
};
const JEST_OPTIONS = {
  testPathDirs: [paths.TEST_ROOT_DIR],
  bail: false
};
function lint() {
  return src(paths.TYPESCRIPT)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
}
function jesta(cb) {
  process.env.NODE_ENV = 'test';
  return gulp.src('.').pipe(jest(JEST_OPTIONS));
  cb();
};
function copySrcNonJs(cb) {
  gulp
  .src(paths.NON_TS)
  .pipe(flatten())
  .pipe(gulp.dest("debug"));
  gulp
  .src("src/html/index.html")
  .pipe(preprocess({context: {DEBUG:true}}))
  .pipe(gulp.dest("debug"));
  gulp
  .src("src/html/index.html")
  .pipe(rename('index.dist.html'))
  .pipe(preprocess({context: {PRODUCTION:true}}))
  .pipe(gulp.dest("debug"));
  gulp
  .src("lib/*.js")
  .pipe(gulp.dest("debug"));    
  gulp
  .src("lib/*.js")
  .pipe(gulp.dest("dist"));  
  gulp
  .src("src/svg/*.svg")
  .pipe(gulp.dest("dist"));
  gulp
  .src("src/html/*.html")
  .pipe(gulp.dest("debug"));  
  gulp
  .src("src/html/*.html")
  .pipe(gulp.dest("dist"));  
  return gulp
  .src("src/courses/*.json")
  .pipe(gulp.dest("dist"));
  cb();
}
function browserify1(cb) {
  return browserify({
    basedir: ".",
    debug: true,
    entries: [paths.ENTRY_POINT],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify, { target: 'es5' })
  .bundle()
  .pipe(source("index.js"))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("debug"))
  cb();
}
function nightwatchr(cb) {
  return gulp.src('gulpfile.js')
  .pipe(nightwatch({
    configFile: './nightwatch.conf.js',
    cliArgs: [
      '-o debug'
    ]
  }));
  cb()
}
function inlineSource1(cb) {
  return src('debug/index.dist.html')
  .pipe(inlineSource({ compress: false }))
  .pipe(rename('index.html'))
  .pipe(dest('dist'))
}
function clean1(cb) {
  return gulp.src(paths.CLEAN, {read: false, allowEmpty: true}).pipe(clean());
  cb();
}
function clean2(cb) {
  return gulp.src(paths.CLEAN2, {read: false, allowEmpty: true}).pipe(clean());
  cb();
}
exports.clean = clean1;
exports.default = series(lint, jesta, copySrcNonJs, browserify1, /*nightwatchr,*/ inlineSource1, clean2);
