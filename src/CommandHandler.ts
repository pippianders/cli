import { CommandError } from './errors/CommandError';

interface Executable {
  command: string;
  query?: string;
  describe?: boolean;
}

export class CommandHandler {
  static checkCommand(args: string[]): Executable {
    const executable: Executable = {
      command: args[0],
    };
    const HELP_COMMAND_TYPES = ['help', '--help', '-h'];
    switch (executable.command) {
      case undefined:
      case 'usage':
      case '-u':
      case 'help':
      case '-h':
        if (args.length > 1) {
          throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'help', args[1]);
        }
        executable.command = 'help';
        break;
      case 'about':
      case '-ab':
        if (args.length > 2) {
          throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[1]);
        }
        if (HELP_COMMAND_TYPES.includes(args[1])) {
          executable.describe = true;
        } else {
          throw new CommandError('UNKNOWN_COMMAND', 'about', args[1]);
        }
        executable.command = 'about';
        break;
      case 'version':
      case '-v':
        if (args.length > 1) {
          throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'version', args[1]);
        }
        if (HELP_COMMAND_TYPES.includes(args[1])) {
          executable.describe = true;
        } else {
          throw new CommandError('UNKNOWN_COMMAND', 'version', args[1]);
        }
        executable.command = 'version';
      case 'answer':
      case '-a':
        if (args.length > 2) {
          throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[2]);
        }
        if (args[1].trim() === '') {
          throw new CommandError('QUERY_NOT_PASSED', 'answer');
        }
        if (HELP_COMMAND_TYPES.includes(args[1])) {
          executable.describe = true;
        } else {
          executable.query = args[1];
        }
        executable.command = 'answer';
        break;
      default:
        throw new CommandError('UNKNOWN_COMMAND', undefined, args[1]);
    }

    return executable;
  }
}
