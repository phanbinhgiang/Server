module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'standard'
  ],
  env: {
    jest: true
  },
  plugins: [
    'flowtype-errors'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-async-promise-executor':'off',
    'require-atomic-updates':'off',
    'new-cap': 'off',
    'no-undef': 'error',
    indent: [
      2,
      2
    ]
  },
  globals: {
    _:true,
    size: true,
    CryptoJS: true,
    elasticClient: true,
    model: true,
    convertSUM: true,
    chainType: true,
    Schema: true,
    has: true,
    systemID: true,
    moment: true,
    promise: true,
    axios: true,
    get: true,
    REQUEST_TYPE: true,
    clog: true,
    fetch: true,
    server: true,
    enquire: true,
    FontFaceObserver: true,
    imagesloaded: true,
    Modernizr: true,
    //normal function global
    getLength: true,
    upperCase: true,
    lowerCase: true,
    //mongodb functions global
    genSkipNum: true,
    genSearchRegexp: true
  }
}
