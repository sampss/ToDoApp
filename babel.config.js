module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './modules/screens',
          '@shared': './shared',
          '@utils': './shared/utils',
          '@typesafe': './shared/types',
          '@components': './shared/components',
          '@modules': './modules',
          '@tasks': './modules/tasks',
          '@services': './shared/services',
        },
      },
    ],
  ],
};
