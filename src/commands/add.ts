import {Args, Flags, Command} from '@oclif/core'
import todoAPI from '../api/todoApi'
const chalk =  import('chalk').then(m => m.default)

export default class Add extends Command {
  static description = 'Add new item into todo list'

  static examples = [
    '<%= add %> <%= command.id %>',
  ]

  static flags = {
    done: Flags.boolean({char: 'd'}),
  }

  static args = {
    todo: Args.string({description: 'item to insert into list'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Add)
    const todo = args.todo
    const _chalk = await chalk
    if (todo) {
      if (flags.done) {
        todoAPI.add(todo, true)
      } else {
        todoAPI.add(todo)
      }
      // eslint-disable-next-line padding-line-between-statements
      this.log(`${_chalk.green('[Success]')} Added new todo: ${todo}`)
    } else {
      this.error(_chalk.red('please specify the new todo'))
    }
  }
}
