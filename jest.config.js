module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  modulePathIgnorePatterns: ['./tmp'],
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
