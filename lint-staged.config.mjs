export default {
  'src/**/*.ts': () => 'npx tsc',
  '**/*.(js|ts)': (filenames) => [
    `npm run lint:files -- ${filenames.join(' ')}`,
    `npm run prettier:files --write -- ${filenames.join(' ')}`,
  ],
  './*.(md|json)': (filenames) => [
    `npx prettier --write -- ${filenames.join(' ')}`,
  ],
};
