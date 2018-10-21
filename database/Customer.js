import CommonDbOps from './Common';

const table = 'customers';

const Customer = {
    init: function () {
        CommonDbOps.run(
            `create table if not exists ${table} (
                id integer primary key not null, 
                name text not null unique, 
                contact varchar(13),
                balance int default 0
            );`
        );
    },

    insert: function (data) {
        return CommonDbOps.insert(
            table, 
            ['name', 'contact', 'balance'], 
            [data.name, data.contact, data.amount] 
        );
    },

    findAll: function () {
        return CommonDbOps.select(table);
    }

}

export default Customer;
