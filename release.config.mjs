import github from './.semantic-release/github.json';

const args = process.argv
  .slice(2)
  .map(arg => arg.split('='))
  .reduce((args, [value, key]) => {
    args[String(value).replace(/-/g, '')] = key;
    return args;
  }, {});

export default {
  github
}[String(args.provider || 'github')];
