import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PopulateDatabases extends BaseSchema {
  protected tableNames = ['users', 'clients', 'requisitions', 'actions'];

  protected mockData = {
    'users': [
      {
        id: 1,
        nome: 'admin',
        email: 'admin@admin.com',
        oab: '10000000000',
        cpf: '000.000.000-00',
        enabled: true,
        password: '$argon2id$v=19$t=3,m=4096,p=1$3HZQ82s5w+mxSpIG0yBnIg$shs0OFgjflZ77jhzkAllkVXee0losDVjhEWdUntXWD4',
        remember_me_token: null,
        created_at: '2022-05-05 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      }
    ],
    'clients': [
      {
        id: 1,
        nome: 'Mocktheus',
        email: 'mock1@mock.com',
        telefone: '00000000000',
        address: "Rua 1",
        cpf: '100.000.000-00',
        user_id: 1,
        created_at: '2022-05-05 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 2,
        nome: 'Mocktheus2',
        email: 'mock2@mock.com',
        telefone: '00000000000',
        address: "Rua 1",
        cpf: '200.000.000-00',
        user_id: 1,
        created_at: '2022-05-13 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 3,
        nome: 'Mocktheus3',
        email: 'mock3@mock.com',
        telefone: '00000000000',
        address: "Rua 1",
        cpf: '300.000.000-00',
        user_id: 1,
        created_at: '2022-05-20 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 4,
        nome: 'Mocktheus4',
        email: 'mock4@mock.com',
        telefone: '00000000000',
        address: "Rua 1",
        cpf: '400.000.000-00',
        user_id: 1,
        created_at: '2022-05-22 11:48:42',
        updated_at: '2022-05-22 11:48:42'
      },
      {
        id: 5,
        nome: 'Mocktheus5',
        email: 'mock5@mock.com',
        telefone: '00000000000',
        address: "Rua 1",
        cpf: '500.000.000-00',
        user_id: 1,
        created_at: '2022-06-19 11:48:42',
        updated_at: '2022-06-19 11:48:42'
      },
    ],
    'requisitions': [
      {
        id: 1,
        client_id: 1,
        user_id: 1,
        req_type: "Penal",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: 1,
        created_at: '2022-05-05 11:48:42',
        updated_at: '2022-05-10 11:48:42'
      },
      {
        id: 2,
        client_id: 1,
        user_id: 1,
        req_type: "Penal",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-05-11 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 3,
        client_id: 2,
        user_id: 1,
        req_type: "Penal",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: 1,
        created_at: '2022-05-12 11:48:42',
        updated_at: '2022-05-12 11:48:42'
      },
      {
        id: 4,
        client_id: 3,
        user_id: 1,
        req_type: "Família",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: 1,
        created_at: '2022-05-14 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 5,
        client_id: 3,
        user_id: 1,
        req_type: "Trabalhista",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: 1,
        created_at: '2022-05-20 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 6,
        client_id: 3,
        user_id: 1,
        req_type: "Trabalhista",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: 0,
        created_at: '2022-05-21 11:48:42',
        updated_at: '2022-05-21 11:48:42'
      },
      {
        id: 7,
        client_id: 3,
        user_id: 1,
        req_type: "Trabalhista",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: 0,
        created_at: '2022-05-22 11:48:42',
        updated_at: '2022-05-22 11:48:42'
      },
      {
        id: 8,
        client_id: 3,
        user_id: 1,
        req_type: "Penal",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-19 11:48:42',
        updated_at: '2022-06-19 11:48:42'
      },
      {
        id: 9,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-19 11:48:42',
        updated_at: '2022-06-19 11:48:42'
      },
      {
        id: 10,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-20 11:48:42',
        updated_at: '2022-06-20 11:48:42'
      },
      {
        id: 11,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-21 11:48:42',
        updated_at: '2022-06-21 11:48:42'
      },
      {
        id: 12,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-22 11:48:42',
        updated_at: '2022-06-22 11:48:42'
      },
      {
        id: 13,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-23 11:48:42',
        updated_at: '2022-06-23 11:48:42'
      },
      {
        id: 14,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-25 11:48:42',
        updated_at: '2022-06-25 11:48:42'
      },
      {
        id: 15,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-26 11:48:42',
        updated_at: '2022-06-26 11:48:42'
      },
      {
        id: 16,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-26 11:48:42',
        updated_at: '2022-06-26 11:48:42'
      },
      {
        id: 17,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-27 11:48:42',
        updated_at: '2022-06-27 11:48:42'
      },
      {
        id: 18,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-27 11:48:42',
        updated_at: '2022-06-27 11:48:42'
      },
      {
        id: 19,
        client_id: 3,
        user_id: 1,
        req_type: "tipo 1",
        abstract: "resumo 1",
        description: "dec 1",
        is_valid: null,
        created_at: '2022-06-27 11:48:42',
        updated_at: '2022-06-27 11:48:42'
      },
    ],
    'actions': [
      {
        id: 1,
        requisition_id: 1,
        user_id: 1,
        description: "desc 1",
        state: "aprovado",
        created_at: '2022-05-12 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 2,
        requisition_id: 3,
        user_id: 1,
        description: "desc 2",
        state: "pendente",
        created_at: '2022-05-12 11:48:42',
        updated_at: '2022-05-15 11:48:42'
      },
      {
        id: 3,
        requisition_id: 4,
        user_id: 1,
        description: "desc 3",
        state: "recusado",
        created_at: '2022-05-17 11:48:42',
        updated_at: '2022-05-20 11:48:42'
      },
      {
        id: 4,
        requisition_id: 5,
        user_id: 1,
        description: "desc 4",
        state: "aprovado",
        created_at: '2022-05-20 11:48:42',
        updated_at: '2022-06-19 11:48:42'
      },
    ]
  }

  public async up () {
    this.tableNames.forEach(tableName => {
      this.defer(async (db) => {
        await Promise.all(this.mockData[tableName].map(data => {
          return db.table(tableName).insert(data);
        }));
      });
    });
  }

  public async down () {
    this.tableNames.forEach(tableName => {
      this.schema.dropTableIfExists(tableName);
    });
  }
}
