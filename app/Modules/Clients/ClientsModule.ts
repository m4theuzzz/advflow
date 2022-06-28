import Storage from 'App/Modules/Storage';
import Client from 'App/Models/Client'

const DB = new Storage();
const TABLE_NAME = 'clients';

export default class ClientsModule {
  constructor() { }

  public async getClients(): Promise<any[]> {
    const queryObject = await Client
      .query()
      .preload('createdBy')
      .withAggregate('requisitions', (query) => {
        query.count('*').as('requisitions_count');
      })
    console.log(queryObject)
    return queryObject
  }

  public async updateClient(clientId: number, newObj: object) {
    await DB.updateInTable(TABLE_NAME, clientId, newObj);
  }

  public async deleteClient(clientId) {
    await DB.deleteFromTable(TABLE_NAME, clientId);
  }
}
