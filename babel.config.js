module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@shared': './shared',
          '@utils': './shared/utils',
          '@typesafe': './shared/types',
          '@components': './shared/components',
          '@modules': './apps/ToDoApp/modules',
        },
      },
    ],
  ],
};
