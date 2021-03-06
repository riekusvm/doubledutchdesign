import Gulp from 'gulp';
import webserver from 'gulp-webserver';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import assign from 'lodash.assign';
import gutil from 'gulp-util';
import del from 'del';
import sequence from 'gulp-sequence';
import CSSModulesify from 'css-modulesify';

const config = {
  mainJsFile: 'index.js',
  mainHTMLFile: 'index.html',
  srcDir: './src',
  devDir: './dev',
  distDir: './dist',
  distFile: 'js/bundle.js'
};

// add custom browserify options here
const customOpts = {
  entries: [config.srcDir + '/' + config.mainJsFile],
  debug: true
};

const babelifyConfig = {
  optional: ['es7.classProperties']
};

function browserifyIt(folder) {
  const cssStyle = (folder === config.distDir) ? CSSModulesify.generateShortName : '';
  return browserify(config.srcDir + '/' + config.mainJsFile)
    .transform(babelify.configure(babelifyConfig))
    .plugin(CSSModulesify, {output: folder + '/app.css', generateScopedName: cssStyle})
    .bundle()
    .pipe(source(config.mainJsFile))
    .pipe(buffer())
    .pipe(rename(config.distFile))
    .pipe(uglify())
    .pipe(Gulp.dest(folder));
}


Gulp.task('browserifyDev', () => {
  browserifyIt(config.devDir);
});

Gulp.task('browserify', () => {
  browserifyIt(config.distDir);
});

function clean(folder) {
  del(folder + '/*').then((paths) => {
    gutil.log('Deleted files/folders:\n', paths.join('\n'));
  });
}

Gulp.task('devclean', () => {
  clean(config.devDir);
});

Gulp.task('buildclean', () => {
  clean(config.distDir);
});

function html(htmlFile, dest) {
  return Gulp.src(config.srcDir + '/' + htmlFile)
  .pipe(Gulp.dest(dest));
}

Gulp.task('buildhtml', () => {
  return html(config.mainHTMLFile, config.distDir);
});

Gulp.task('devhtml', () => {
  return html(config.mainHTMLFile, config.devDir);
});

function images(src, dest) {
  return Gulp.src([config.srcDir + '/' + src + '/*.png',
                   config.srcDir + '/' + src + '/**/*.png'])
  .pipe(Gulp.dest(dest));
}

Gulp.task('devimages', () => {
  return images('images', config.devDir + '/images');
});

Gulp.task('buildimages', () => {
  return images('images', config.distDir + '/images');
});

function serve(dest) {
  Gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
}

Gulp.task('devserve', () => {
  serve(config.devDir);
});

Gulp.task('run', () => {
  serve(config.distDir);
});

const opts = assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts))
.on('update', bundle)
.on('log', gutil.log);

// add transformations here
b.transform(babelify.configure(babelifyConfig));
b.plugin(CSSModulesify, {output: config.devDir + '/app.css'});

function bundle() {
  return b.bundle()
  .pipe(source(config.distFile))
  .pipe(buffer())
  .pipe(Gulp.dest(config.devDir));
}

Gulp.task('build', sequence('buildclean', ['browserify', 'buildhtml', 'buildimages']));
Gulp.task('js', bundle);
Gulp.task('dev', sequence('devclean', ['browserifyDev'], ['js', 'devhtml', 'devimages'],
'devserve'));
