import {Args, Command} from '@oclif/core'
import todoAPI from '../api/todoApi'
const chalk = import('chalk').then(m => m.default)
import Table from 'cli-table3'

export default class Get extends Command {
  static description = 'Get specific item of todo list'

  static examples = [
    './bin/run get',
    './bin/run get 2',
  ]

  static args = {
    itemNumber: Args.string({
      description: 'Item number to get from list',
      required: true,
    }),
  }

  public async run(): Promise<void> {
    const _chalk = await chalk
    const table = new Table({
      head: [
        _chalk.blueBright('index'),
        _chalk.blueBright('todo'),
        _chalk.blueBright('status'),
      ],
    })
    const {args} = await this.parse(Get)
    const itemNumber = Number.parseInt(args.itemNumber, 10)
    const item = todoAPI.get(itemNumber)
    table.push([itemNumber, item.todo, item.done])
    if (todoAPI.isLoggedIn === true) {
      this.log(table.toString())
    } else {
      await todoAPI.checkIsLoggedIn()
      this.log(table.toString())
    }
  }
}
