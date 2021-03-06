// Ours
const {cmd, hvy, opt, sec} = require('../../../string-styles');
const {BOXES} = require('../constants');

const OPTIONS = {
  boolean: [
    'force',
    'help'
  ],
  alias: {
    force: 'f',
    help: 'h'
  }
};

const USAGE = `
Usage: ${cmd('aunty release')} ${opt('[options]')} ${opt('[deploy_options]')}

${sec('Options')}

  ${opt('-f')}, ${opt('--force')}  Ignore warnings & skip tagging ${opt('[default: false]')}
  ${opt('-h')}, ${opt('--help')}   Display this help message and exit

${sec('Examples')}

  ${cmd('aunty release')}
    Run ${cmd('aunty build')}, tag a release with ${hvy('git')} (using ${hvy('package.json:version')}),
    then run ${cmd('aunty deploy')}, passing the tag as the ${opt('--id')} option.

  ${cmd(`aunty release ${opt('--force')}`)}
    Ignore warnings about the project's state, run ${cmd('aunty build')}, skip tagging,
    then run ${cmd('aunty deploy')}, passing ${hvy('package.json:version')} as the ${opt('--id')} option.
`;

const FORCE_REMINDER = `Use the ${opt('--force')} option to ignore warnings or release without tagging.`;

const MESSAGES = {
  FORCE_REMINDER: `Use the ${opt('--force')} option to ignore warnings or release without tagging.`,
  NOT_REPO: `You can't tag a release or deploy using a tag name becase this project isn't a git repo.`,
  HAS_CHANGES: `You shouldn't release builds which may contain un-committed changes! ${FORCE_REMINDER}`,
  hasTag: (tag, isTagOnHead) => `The tag ${hvy(tag)} already exists${
      isTagOnHead ? '' : ` and your current HEAD doesn't point to it`
    }! ${FORCE_REMINDER}`,
  createdTag: tag => `\n  ${BOXES.OK} Created tag ${hvy(tag)}`,
  pushedTag: (tag, remote) => `\n  ${BOXES.OK} Pushed tag ${hvy(tag)} to remote ${hvy(remote)}`
};

module.exports = {
  OPTIONS,
  USAGE,
  MESSAGES
};
