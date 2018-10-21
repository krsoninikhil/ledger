import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('ledgerV1.db');

const CommonDbOps = {
    init: function () {
        db.transaction(tx => {
            tx.executeSql(
                `create table if not exists txns (
                    id integer primary key not null auto_increment, 
                    custId int not null, amount int(3), 
                    date datetime not null, note text
                );`
            );
        });
    },

    run: function (q) {
        db.transaction(tx => {
            tx.executeSql(
                q, 
                [],
                (_, res) => console.log("success run"),
                (_, err) => console.log(err)
            );
        });
    },

    select: function (state, table, cols='*', cond='1', condVars=[]) {
        cols = cols == '*' ? cols : cols.join(', ');
        db.transaction(tx => {
            tx.executeSql(
                `select ${cols} from ${table} where ${cond};`,
                condVars,
                (_, {rows}) => { 
                    state.setState({data: rows._array});
                    console.log(rows._array);
                    console.log(state.state.data)
                }, 
                (_, err) => console.log(err)
            );
        });
    },

    insert: function (table, cols='*', vals) {
        cols = cols.join(', ');
        vals = vals.join('", "');
        console.log(`insert into ${table} (${cols}) values (${vals});`);
        db.transaction(tx => {
            tx.executeSql(
                //`insert into ${table} (${cols}) values ("${vals}");`
                `insert into customers (name, contact) values ('nikhil', '9758334169');`,
                [],
                (_, res) => console.log("success") && console.log(res),
                (_, err) => console.log(err)
            );
        });
    },
}

export default CommonDbOps;