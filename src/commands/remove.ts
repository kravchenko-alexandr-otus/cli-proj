import {Args, Command} from '@oclif/core'
import todoAPI from '../api/todoApi'
const chalk = import('chalk').then(m => m.default)

export default class Remove extends Command {
  static description = 'Remove item from todo list'

  static args = {
    index: Args.string(
      {
        required: true,
        description: 'item index to remove',
      }),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(Remove)
    const input = args.index
    const index = Number.parseInt(input, 10)
    const _chalk = await chalk
    console.log(typeof index)
    if (index || typeof index !== 'undefined') {
      const todo = todoAPI.get(index).todo
      todoAPI.remove(index)
      this.log(`${_chalk.green('[Success]')} Removed todo: ${todo}`)
    } else {
      this.error(_chalk.red('please specify the todo\'s index'))
    }
  }
}
