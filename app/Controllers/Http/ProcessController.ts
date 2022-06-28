import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Action from '../../Models/Action'
import Requisition from 'App/Models/Requisition'

export default class ProcessController {
    public async index({ view }: HttpContextContract) {
        const reqs = await Action
            .query()
            .preload('createdBy')
            .preload('requisition')
        return await view.render('process/index', { reqs: reqs })
    }

    public async indexCat({ view, params }: HttpContextContract) {
        const reqs = await Action
            .query()
            .where('requisition_id', params.id)
            .preload('createdBy')
            .preload('requisition')
        return await view.render('process/index', { reqs: reqs, reqId: params.id, isSpecific: true })
    }

    public async details({ view, params }: HttpContextContract) {
        const act = await Action
            .query()
            .where('id', params.id)
            .preload('createdBy')
            .preload('requisition')
            .first()
        return await view.render('process/details', { act: act })
    }

    public async registerShow({ view, params }: HttpContextContract) {
        const requisition = await Requisition.query().preload('client');
        return view.render('process/register', { requisition: requisition.filter((req) => req.id == params.id)[0] })
    }

    public async stateShow({ view, params }: HttpContextContract) {
        const act = await Action
        .query()
        .where('id', params.id)
        .preload('createdBy')
        .preload('requisition')
        .first()
        return view.render('process/state', { act: act })
    }

    public async state({ request, response }: HttpContextContract) {
      const validateSchema = schema.create({
        actId: schema.string({ trim: true }, [rules.required(), rules.exists({ table: 'actions', column: 'id' })]),
        reqId: schema.string({ trim: true }, [rules.required(), rules.exists({ table: 'requisitions', column: 'id' })]),
        status: schema.string({ trim: true }, [rules.required()]),
      })
      const data = await request.validate({
        schema: validateSchema,
        messages: {
          required: 'Este campo é obrigatório'
        }
      })

      const reqObj = await Action.findOrFail(data.actId)

      reqObj.state = data.status
      await reqObj.save()

      return response.redirect(`/dashboard/processos/requisicao/${data.reqId}`)
    }

    public async register({ request, response, auth, params }: HttpContextContract) {
        const reqSchema = schema.create({
            detalhes: schema.string({ trim: true }, [rules.minLength(3)]),
        })

        const data = await request.validate({
            schema: reqSchema,
            messages: {
            required: 'Este campo é obrigatório'
            }
        })

        const requisitionObj = await Requisition.find(params.id)

        const newReq = await Action.create({
            description: data.detalhes,
            state: "pendente"
        })

        auth?.user && await newReq.related('createdBy').associate(auth.user)
        requisitionObj && await newReq.related('requisition').associate(requisitionObj)

        return response.redirect('/dashboard/processos/')
    }
}
