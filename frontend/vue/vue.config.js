const CompressionPlugin = require('compression-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  chainWebpack(config) {
    config.plugins.delete('prefetch');
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
  outputDir: 'dist/mw', // yarn build --dest dist/mw 등으로 지정 가능

  assetsDir: '../../static', // build 타겟이 dist에서 depth 가 들어갈수록 상대주소를 앞에 더 붙여줄 것(/static 을 맞추기 위함)
  publicPath: '../../static/js/',
  // baseUrl: IS_PRODUCTION
  // ? 'http://cdn123.com'
  // : '/',
  // For Production, replace set baseUrl to CDN
  // And set the CDN origin to `yourdomain.com/static`
  // Whitenoise will serve once to CDN which will then cache
  // and distribute
  devServer: {
    proxy: {
      '/api*': {
        // Forward frontend dev server request for /api to django dev server
        target: 'http://localhost:8000/',
      }
    }
  },
  crossorigin: 'anonymous'
}