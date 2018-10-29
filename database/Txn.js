import CommonDbOps from './Common';
import Customer from './Customer';

const table = 'txns';

const Txn = {
    init: () => {
        CommonDbOps.run(
            `create table if not exists txns (
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

}

export default Txn;
