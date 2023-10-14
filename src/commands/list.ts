import {Command} from '@oclif/core'
import todoAPI from '../api/todoApi'
const chalk = import('chalk').then(m => m.default)
import Table from 'cli-table3'

export default class List extends Command {
  static description = 'Print all items of todo list'

  public async run(): Promise<void> {
    const _chalk = await chalk
    const table = new Table({
      head: [
        _chalk.blueBright('index'),
        _chalk.blueBright('todo'),
        _chalk.blueBright('status'),
      ],
    })
    const todos = todoAPI.list()
    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i]
      const status = todo.done ? _chalk.green('done') : _chalk.red('not done')
      table.push([i, todo.todo, status])
    }

    if (todoAPI.isLoggedIn === true) {
      this.log(table.toString())
    } else {
      await todoAPI.checkIsLoggedIn()
      this.log(table.toString())
    }
  }
}
