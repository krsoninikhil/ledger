import CommonDbOps from './Common';

const table = 'txns';

const Txn = {
    init: function () {
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

    insert: function (data) {
        CommonDbOps.insert(
            table, 
            ['custId', 'amount', 'date'], 
            [data.custId, data.amount, data.date]
        );
    },

    findAll: function () {
        return CommonDbOps.select(table);
    }

}

export default Txn;
