export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'test', 'perf', 'build', 'ci'],
    ],
    'subject-case': [0],
  },
}
