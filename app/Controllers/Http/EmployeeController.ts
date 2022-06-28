import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class EmployeeController {
    public async index({ view }: HttpContextContract) {
        return await view.render('employees/index')
    }

    public async register({ view }: HttpContextContract) {
        return await view.render('employees/register')
    }
}
