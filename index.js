import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import {
  ARGUMENT_TYPE,
  SlashCommandArgument,
} from '../../../slash-commands/SlashCommandArgument.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';

SlashCommandParser.addCommandObject(
  SlashCommand.fromProps({
    name: 'curl',
    helpString: 'Call a URL once and do nothing with the response.',
    returns: 'void',
    callback: async (_args, url) => {
      if (!url || typeof url !== 'string' || !url.trim()) {
        return '';
      }

      try {
        await fetch(String(url).trim(), {
          method: 'GET',
          credentials: 'include',
        });
      } catch (error) {
        console.debug('ST curl command failed', error);
      }

      return '';
    },
    unnamedArgumentList: [
      SlashCommandArgument.fromProps({
        description: 'URL to call, for example http://localhost:5566/toggle',
        typeList: [ARGUMENT_TYPE.STRING],
        isRequired: true,
        acceptsMultiple: false,
      }),
    ],
  }),
);
