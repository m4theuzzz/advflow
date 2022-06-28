import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'

export default class User extends BaseModel {
  @hasMany(() => Client)
  clients: HasMany<typeof Client>

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public cpf: string

  @column()
  public nome: string

  @column()
  public oab: string

  @column()
  public enabled: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
