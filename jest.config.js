module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
}
