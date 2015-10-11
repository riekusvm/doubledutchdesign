import gulp from 'gulp';
import gplugins from 'gulp-load-plugins';
import del from 'del';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './build/webpack';
import WebpackDevServer from 'webpack-dev-server';
import gutil from 'gulp-util';

const DIRS = {
  DIST: {
    ROOT: 'dist',
    SERVER: 'dist/server',
    APP: 'dist/app',
    CSS: 'dist/css',
    CLIENT: 'dist/js'
  },
  SRC: {
    ROOT: 'src',
    CSS: 'src/stylus',
    APP: 'src/app',
    SERVER: 'src/server'
  }
};

// Lazy load the gulp plugins.
const gp = gplugins({lazy: true});

/**
 * Bundle all the css files and copy them to the distribution directory.
 */
gulp.task('stylus', () => {
  return gulp.src(path.join(DIRS.SRC.CSS, '*.styl'))
    .pipe(gp.stylus({compressed: true}))
    .pipe(gp.concat('app.css'))
    .pipe(gulp.dest(path.join(DIRS.DIST.CSS)));
});

/**
 * Transform the client code to es5, bundle, minimize and copy to the
 * distribution directory.
 */
gulp.task('client', () => {
  webpack(webpackConfig, (error, stats) => {
    if (error) {
      throw new Error(error);
    }

    let jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
      gp.util.error(jsonStats.errors);
    }
    if (jsonStats.warnings.length > 0) {
      gp.util.warn(jsonStats.warnings);
    }
  });
});

/**
 * Move the server to the distribution directory.
 */
gulp.task('server', () => {
  return gulp.src(path.join(DIRS.SRC.SERVER, '*.js'))
    .pipe(gulp.dest(path.join(DIRS.DIST.SERVER)));
});

/**
 * Move the application code to the distribution directory.
 */
gulp.task('app', () => {
  return gulp.src([path.join(DIRS.SRC.APP, '*'), path.join(DIRS.SRC.APP, '**/*')])
    .pipe(gulp.dest(path.join(DIRS.DIST.APP)));
});

/**
 * Clean the distribution directory.
 */
gulp.task('clean', (callback) => {
  return del(DIRS.DIST.ROOT, callback);
});

gulp.task('serve', function () {
  // Start a webpack-dev-server
  let compiler = webpack({});
  new WebpackDevServer(compiler, {}).listen(8080, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

/**
 * Clean and build the project.
 */
gulp.task('default', gp.sequence('clean', ['server', 'app', 'stylus'], 'client'));
