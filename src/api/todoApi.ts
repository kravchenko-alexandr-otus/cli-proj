/* eslint-disable unicorn/filename-case */
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'

const todoFile = path.join(os.homedir(), 'checkme', 'todos.json')

interface Todo {
  done: boolean,
  todo: string
}

class TodoApi {
  private todos : Todo[] = []

  constructor() {
    if (!fs.existsSync(path.dirname(todoFile))) {
      fs.mkdirSync(path.dirname(todoFile))
    }

    this.todos = JSON.parse(fs.readFileSync(todoFile, {encoding: 'utf-8'}))
  }

  private saveTodos() {
    if (!fs.existsSync(path.dirname(todoFile))) {
      fs.mkdirSync(path.dirname(todoFile))
    }

    const data = JSON.stringify(this.todos)
    console.log(data)
    fs.writeFileSync(todoFile, data, {encoding: 'utf-8'})
  }

  add(todo: string, done = false) {
    const newTodo: Todo = {todo, done}
    this.todos.push(newTodo)
    this.saveTodos()
  }

  remove(index: number) {
    this.todos.splice(index, 1)
    this.saveTodos()
  }

  list() {
    return this.todos
  }

  get(index: number) : Todo {
    return this.todos[index]
  }

  done(index: number) {
    this.todos[index].done = true
    this.saveTodos()
  }

  undone(index: number) {
    this.todos[index].done = false
    this.saveTodos()
  }
}

const api = new TodoApi()
export default api
