import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RequisitionsSchema extends BaseSchema {
  protected tableName = 'requisitions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('req_type', 255).notNullable()
      table.text('abstract').notNullable()
      table.text('description').notNullable()
      table.boolean('is_valid')

      table.integer('client_id').references('id').inTable('clients').onDelete('CASCADE').defaultTo(null)
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
