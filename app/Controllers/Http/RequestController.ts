import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Requisition from 'App/Models/Requisition'
import Client from 'App/Models/Client'
import ClientsModule from 'App/Modules/Clients/ClientsModule'

export default class RequestController {
  public async index({ view }: HttpContextContract) {
    const reqs = await Requisition
      .query()
      .preload('createdBy')
      .preload('client')

    return await view.render('requests/index', { reqs })
  }

  public async registerShow({ view }: HttpContextContract) {
    const clients = new ClientsModule();
    return view.render('requests/register', { clients: await clients.getClients() })
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const reqSchema = schema.create({
      cliente: schema.string({ trim: true }, [rules.required(), rules.exists({ table: 'clients', column: 'id' })]),
      tipoReq: schema.string({ trim: true }, [rules.minLength(3)]),
      resumo: schema.string({ trim: true }, [rules.minLength(3)]),
      detalhes: schema.string({ trim: true }, [rules.minLength(3)]),
    })
    const data = await request.validate({
      schema: reqSchema,
      messages: {
        required: 'Este campo é obrigatório'
      }
    })

    const clientObj = await Client.findOrFail(data.cliente)

    const newReq = await Requisition.create({
      reqType: data.tipoReq,
      abstract: data.resumo,
      description: data.detalhes,
    })
    auth?.user && await newReq.related('createdBy').associate(auth.user)
    clientObj && await newReq.related('client').associate(clientObj)

    return response.redirect('/dashboard/requisicoes/')
  }

  public async validateShow({ view, params }: HttpContextContract) {
    return view.render('requests/validate', {
      req: await Requisition
        .query()
        .where('id', params.id)
        .preload('createdBy')
        .preload('client')
        .first()
    })
  }

  public async editShow({ view, params }: HttpContextContract) {
    return view.render('requests/edit', {
      req: await Requisition
        .query()
        .where('id', params.id)
        .first()
    })
  }

  public async edit({ request, response }: HttpContextContract) {
    const validateSchema = schema.create({
      reqId: schema.string({ trim: true }, [rules.required(), rules.exists({ table: 'requisitions', column: 'id' })]),
      tipoReq: schema.string({ trim: true }, [rules.minLength(3)]),
      resumo: schema.string({ trim: true }, [rules.minLength(3)]),
      detalhes: schema.string({ trim: true }, [rules.minLength(3)]),
    })
    const data = await request.validate({
      schema: validateSchema,
      messages: {
        required: 'Este campo é obrigatório'
      }
    })

    const reqObj = await Requisition.findOrFail(data.reqId)

    reqObj.reqType = data.tipoReq
    reqObj.abstract = data.resumo
    reqObj.description = data.detalhes
    await reqObj.save()

    return response.redirect('/dashboard/requisicoes/')
  }

  public async validate({ request, response }: HttpContextContract) {
    const validateSchema = schema.create({
      reqId: schema.string({ trim: true }, [rules.required(), rules.exists({ table: 'requisitions', column: 'id' })]),
      status: schema.number()
    })
    const data = await request.validate({
      schema: validateSchema,
      messages: {
        required: 'Este campo é obrigatório'
      }
    })

    const reqObj = await Requisition.findOrFail(data.reqId)

    reqObj.isValid = data.status === 1
    await reqObj.save()

    return response.redirect('/dashboard/requisicoes/')
  }
}
