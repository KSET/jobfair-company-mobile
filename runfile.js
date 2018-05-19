const { run, help } = require('runjs');

function dev() {
  run('exp start --lan --dev --no-minify');
}

function publish(env) {
  let channel = env;
  if (!channel) {
    channel = 'staging';
  }
  run(`exp publish --release-channel ${channel}`);
}

function android(env) {
  let channel = env;
  if (!channel) {
    channel = 'staging';
  }
  run(`exp build:android --release-channel ${channel} --no-publish`);
}

function ios(env) {
  let channel = env;
  if (!channel) {
    channel = 'default';
  }
  run(`exp build:ios --release-channel ${channel} --no-publish`);
}

help(dev, 'Starts expo server for hosting application code');
help(publish, 'Publishes application code on expo servers. (Something like code push)');
help(android, 'Builds standalone apk for given env');
help(ios, 'Builds standalone apk for given env');

module.exports = {
  dev,
  publish,
  android,
  ios,
};
