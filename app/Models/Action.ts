import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, BelongsTo, } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Requisition from './Requisition'

export default class Action extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => User)
  public createdBy: BelongsTo<typeof User>

  @belongsTo(() => Requisition)
  public requisition: BelongsTo<typeof Requisition>

  @column()
  public userId: number

  @column()
  public requisitionId: number

  @column()
  public description: string

  @column()
  public state: string

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public dataProtocolo: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public dataEncerramento: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
