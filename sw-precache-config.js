module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js',
    'build/images/**.jpg',
    'build/index.html',
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  handleFetch: false,
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]
}