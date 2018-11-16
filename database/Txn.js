import CommonDbOps from './Common';
import Customer from './Customer';

const table = 'txns';

const Txn = {
    init: () => {
        CommonDbOps.run(
            `create table if not exists ${table} (
                id integer primary key not null, 
                custId int not null, 
                amount int not null,
                date datetime not null, 
                note text
            );`
        );
    },

    insert: (data) => {
        return CommonDbOps.insert(
            table, 
            ['custId', 'amount', 'date', 'note'], 
            [data.custId, data.amount, data.date, data.note]
        );
    },

    insertAndUpdateBalance: (data) => {
        this.insert(data).then((res) => {
            Customer.updateBalace(data.custId, change);
        });
    },

    findAll: () => {
        return CommonDbOps.select(table);
    }, 

    find: (custId) => {
        return CommonDbOps.select(table, 'date desc, id', ['id', 'date', 'amount', 'note'], 'custId = ?', [custId]);
    },

    count: () => {
        return CommonDbOps.count(table);
    },

    delete: (txId) => {
        return CommonDbOps.delete(table, 'id = ?', [txId]);
    },

    export: (start=1, limit=null) => {
        limit = limit ? `limit ${limit}` : '';
        return CommonDbOps.run(
            `select t.id, c.id as custId, t.date, c.name, c.contact, t.amount, t.note 
            from txns as t inner join customers as c on t.custId = c.id 
            where t.id >= ${start} order by t.date ${limit}`,
        );
    }

}

export default Txn;
