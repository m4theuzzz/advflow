import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ActionsSchema extends BaseSchema {
  protected tableName = 'actions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('description').notNullable()
      table.string('state', 180).notNullable()

      table.integer('user_id', 255).references('id').inTable('users').onDelete('CASCADE').defaultTo(null)
      table.integer('requisition_id', 255).references('id').inTable('requisitions').onDelete('CASCADE').defaultTo(null)

      table.timestamp('data_protocolo', { useTz: true })
      table.timestamp('data_encerramento', { useTz: true })

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
