'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API_USER: '"http://101.201.152.181:9011"',
  BASE_API_WAIJIAO: '"http://101.201.152.181:9010"',
  BASE_API_APP: '"http://101.201.152.181:9189"'
})
