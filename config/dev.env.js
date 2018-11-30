'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API_USER: '"http://123.56.225.41:9011"',
  BASE_API_USER_TEST: '"http://101.201.152.181:9011"',
  BASE_API_WAIJIAO: '"http://123.56.225.41:9010"',
  BASE_API_WAIJIAO_TEST: '"http://101.201.152.181:9010"',
  BASE_API_APP: '"http://english.talk.quxueabc.com"',
  BASE_API_APP_TEST: '"http://101.201.152.181:9189"'
})
