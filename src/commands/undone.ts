import {Args, Command} from '@oclif/core'
import todoAPI from '../api/todoApi'

export default class Undone extends Command {
  static description = 'Mark item as undone'

  static examples = [
    './bin/run undone 1',
  ]

  static args = {
    itemNumber: Args.string({
      description: 'Number of item to mark as undone',
      required: true,
    }),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(Undone)
    const itemNumber = Number.parseInt(args.itemNumber, 10)
    if (todoAPI.isLoggedIn === true) {
      todoAPI.undone(itemNumber)
      this.log('Marked as undone')
    } else {
      await todoAPI.checkIsLoggedIn()
      todoAPI.undone(itemNumber)
      this.log('Marked as undone')
    }
  }
}
