import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Requisition from 'App/Models/Requisition'

export default class Client extends BaseModel {
  @belongsTo(() => User)
  public createdBy: BelongsTo<typeof User>

  @hasMany(() => Requisition)
  requisitions: HasMany<typeof Requisition>

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public email: string

  @column()
  public telefone: string

  @column()
  public cpf: string

  @column()
  public nome: string

  @column()
  public address: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
