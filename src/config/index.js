const defaultConfig = require('./default')
const developmentConfig = require('./development')
const productionConfig = require('./production')
const stageConfig = require('./stage')

const configs = {
  development: developmentConfig,
  production: productionConfig,
  stageConfig: stageConfig,
}

const config = { ...defaultConfig, ...(configs[process.env.NODE_ENV]) }
module.exports = config