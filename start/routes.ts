/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('auth/login')
})

Route.get('cadastro', 'AuthController.registerShow').as('auth.register.show')
Route.post('cadastro', 'AuthController.register').as('auth.register')
Route.get('login', 'AuthController.loginShow').as('auth.login.show')
Route.post('login', 'AuthController.login').as('auth.login')
Route.get('logout', 'AuthController.logout').as('auth.logout')


Route.group(() => {
    Route.get('/', 'DashboardController.index')

    Route.group(() => {
      Route.get('/', 'ClientsController.index')
      Route.get('/novo', 'ClientsController.registerShow')
      Route.post('/novo', 'ClientsController.register')
    })
    .prefix('/clientes')

    Route.group(() => {
      Route.get('/', 'EmployeeController.index')
      Route.get('/novo', 'EmployeeController.register')
    })
    .prefix('/employees')

    Route.group(() => {
      Route.get('/', 'RequestController.index')
      Route.get('/nova', 'RequestController.registerShow')
      Route.post('/nova', 'RequestController.register')
      Route.get('/revisar/:id', 'RequestController.validateShow')
      Route.post('/revisar/:id', 'RequestController.validate')
      Route.get('/editar/:id', 'RequestController.editShow')
      Route.post('/editar/', 'RequestController.edit')
    })
    .prefix('/requisicoes')

    Route.group(() => {
      Route.get('/', 'ProcessController.index')
      Route.get('/:id', 'ProcessController.details')
      Route.get('/estado/:id', 'ProcessController.stateShow')
      Route.post('/estado/:id', 'ProcessController.state')
      Route.get('/requisicao/:id', 'ProcessController.indexCat')
      Route.get('/novo/:id', 'ProcessController.registerShow')
      Route.post('/novo/:id', 'ProcessController.register')
    })
    .prefix('/processos')
})
.prefix('/dashboard')
.middleware('auth')
