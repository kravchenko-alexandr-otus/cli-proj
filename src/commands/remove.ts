import {Args, Command} from '@oclif/core'
import todoAPI from '../api/todoApi'
const chalk = import('chalk').then(m => m.default)

export default class Remove extends Command {
  static description = 'Remove item from todo list'

  static args = {
    index: Args.string(
      {
        required: true,
        description: 'Item index to remove',
      }),
  }

  static examples = [
    './bin/run remove 1',
  ]

  public async run(): Promise<void> {
    const {args} = await this.parse(Remove)
    const input = args.index
    const index = Number.parseInt(input, 10)
    const _chalk = await chalk
    if (todoAPI.isLoggedIn === true) {
      if (index || typeof index !== 'undefined') {
        const todo = todoAPI.get(index).todo
        todoAPI.remove(index)
        this.log(`${_chalk.green('[Success]')} Removed todo: ${todo}`)
      } else {
        this.error(_chalk.red('please specify the todo\'s index'))
      }
    } else {
      await todoAPI.checkIsLoggedIn()
      if (index || typeof index !== 'undefined') {
        const todo = todoAPI.get(index).todo
        todoAPI.remove(index)
        this.log(`${_chalk.green('[Success]')} Removed todo: ${todo}`)
      } else {
        this.error(_chalk.red('please specify the todo\'s index'))
      }
    }
  }
}
