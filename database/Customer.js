import CommonDbOps from './Common';

const table = 'customers';

const Customer = {
    init: () => {
        CommonDbOps.run(
            `create table if not exists ${table} (
                id integer primary key not null, 
                name text not null unique, 
                contact varchar(13),
                balance int default 0
            );`
        );
    },

    insert: (data) => {
        return CommonDbOps.insert(
            table, 
            ['name', 'contact', 'balance'], 
            [data.custName, data.contact, data.amount] 
        );
    },

    findAll: () => {
        return CommonDbOps.select(table);
    },
    
    updateBalance: (custId, change) => {
        return CommonDbOps.update(`balance = balance + ${change}`, 'custId = ?', [custId]);
    }

}

export default Customer;
