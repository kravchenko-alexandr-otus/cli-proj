import {Args, Command} from '@oclif/core'
import todoAPI from '../api/todoApi'

export default class Done extends Command {
  static description = 'Mark item as done'

  static examples = [
    './bin/run done 1',
  ]

  static args = {
    itemNumber: Args.string({
      description: 'Number of item to mark as done',
      required: true,
    }),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(Done)
    const itemNumber = Number.parseInt(args.itemNumber, 10)
    if (todoAPI.isLoggedIn === true) {
      todoAPI.done(itemNumber)
      this.log('Marked as done!!!')
    } else {
      await todoAPI.checkIsLoggedIn()
      todoAPI.done(itemNumber)
      this.log('Marked as done!!!')
    }
  }
}
