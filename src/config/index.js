const defaultConfig = require('./default')
const developmentConfig = require('./development')
const productionConfig = require('./production')

const config = { ...defaultConfig, ...(process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig) }
module.exports = config