import CommonDbOps from './Common';

const table = 'customers';

const Customer = {
    init: function () {
        CommonDbOps.run(
            `create table if not exists ${table} (
                id integer primary key not null, 
                name text not null unique, 
                contact varchar(13),
                balance int(3) default 0
            );`
        );
    },

    insert: function (data) {
        CommonDbOps.insert(table, ['name', 'contact'], ['Nikhil', '9758334169']);
    },

    findAll: function (state) {
        CommonDbOps.select(state, table);
    }

}

export default Customer;
