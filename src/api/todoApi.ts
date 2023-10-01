import * as fs from 'node:fs'
import * as path from 'node:path'
import {prompt} from 'enquirer'

const curDirArr = __dirname.split('/')
const rootDirArr = curDirArr.slice(0, -2)
const infoDir = rootDirArr.join('/')

const todoFile = path.join(infoDir, 'checkme', 'todos.json')
const loginInfo = path.join(infoDir, 'checkme', 'auth_info.json')

interface Todo {
  done: boolean,
  todo: string
}

type userData = {
  login: string,
  password: string,
  loggedIn: boolean
}

class TodoApi {
  private todos : Todo[] = []
  isLoggedIn: boolean

  constructor() {
    if (!fs.existsSync(todoFile)) {
      fs.writeFileSync(todoFile, '[]', {encoding: 'utf-8'})
    }

    const authFile = fs.readFileSync(loginInfo, {encoding: 'utf-8'})
    const authObj: userData = JSON.parse(authFile)
    this.isLoggedIn = authObj.loggedIn
    this.todos = JSON.parse(fs.readFileSync(todoFile, {encoding: 'utf-8'}))
  }

  private saveTodos() {
    if (!fs.existsSync(path.dirname(todoFile))) {
      fs.mkdirSync(path.dirname(todoFile))
    }

    const data = JSON.stringify(this.todos)
    fs.writeFileSync(todoFile, data, {encoding: 'utf-8'})
  }

  async checkIsLoggedIn() {
    const authData = fs.readFileSync(loginInfo, {encoding: 'utf-8'})
    const authObj = JSON.parse(authData)
    if (authObj.loggedIn === false) {
      const res: {login:string, password: string} = await prompt([{
        type: 'input',
        name: 'login',
        message: 'Please, enter your login',
      },
      {
        type: 'input',
        name: 'password',
        message: 'Please, enter your password',
      }])
      if (authObj.login === res.login && authObj.password === res.password) {
        authObj.loggedIn = true
        fs.writeFileSync(loginInfo, JSON.stringify(authObj), {encoding: 'utf-8'})
      } else {
        throw new Error('WRONG LOGIN OR PASSWORD')
      }
    }
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
