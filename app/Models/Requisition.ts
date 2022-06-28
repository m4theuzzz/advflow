import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'
import User from 'App/Models/User'

export default class Requisition extends BaseModel {
  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>
  
  @belongsTo(() => User)
  public createdBy: BelongsTo<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public userId: number

  @column()
  public modelId: string

  @column()
  public reqType: string

  @column()
  public abstract: string

  @column()
  public description: string

  @column()
  public isValid: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
