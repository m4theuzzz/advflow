import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client'
import ClientsModule from 'App/Modules/Clients/ClientsModule'

const clients = new ClientsModule();

export default class ClientsController {
  public async index({ view }: HttpContextContract) {
    return await view.render('clients/index', { clients: await clients.getClients() })
  }

  public async registerShow({ view }: HttpContextContract) {
    return view.render('clients/register')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const clientSchema = schema.create({
      nome: schema.string({ trim: true }, [rules.unique({ table: 'clients', column: 'nome', caseInsensitive: true })]),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'clients', column: 'email', caseInsensitive: true })]),
      telefone: schema.string({ trim: true }, [rules.minLength(9), rules.maxLength(14), rules.unique({ table: 'clients', column: 'telefone', caseInsensitive: true })]),
      address: schema.string({ trim: true }, [rules.unique({ table: 'clients', column: 'address', caseInsensitive: true })]),
      cpf: schema.string({ trim: true }, [rules.minLength(11), rules.maxLength(14), rules.unique({ table: 'clients', column: 'cpf', caseInsensitive: true })]),
    })
    const data = await request.validate({
      schema: clientSchema,
      messages: {
        required: 'Este campo é obrigatório'
      }
    })

    const newClient = await Client.create({ ...data })
    auth?.user && await newClient.related('createdBy').associate(auth.user)

    return response.redirect('/dashboard/clientes/')
  }
}
