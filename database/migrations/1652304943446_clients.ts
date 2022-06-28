import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClientsSchema extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('telefone', 180).notNullable()
      table.string('address', 180).notNullable()
      table.string('cpf', 180).notNullable().unique()

      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').defaultTo(null)

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}
