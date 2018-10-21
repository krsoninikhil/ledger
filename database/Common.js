import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('ledgerV1.db');

const CommonDbOps = {
    init: () => {
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

    run: (q) => {
        db.transaction(tx => {
            tx.executeSql(
                q, 
                [],
                (_, res) => console.log("success run"),
                (_, err) => console.log(err)
            );
        });
    },

    select: (table, cols='*', cond='1', condVars=[]) => {
        cols = cols == '*' ? cols : cols.join(', ');
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `select ${cols} from ${table} where ${cond};`,
                    condVars,
                    (_, {rows}) => resolve(rows), 
                    (_, err) => console.log(err)
                );
            });
        });
    },

    insert: (table, cols='*', vals) => {
        cols = cols.join(', ');
        vals = vals.join('", "');console.log(`insert into ${table} (${cols}) values ("${vals}");`);
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `insert into ${table} (${cols}) values ("${vals}");`,
                    [],
                    (_, res) => resolve(res),
                    (_, err) => reject(err)
                );
            });
        });
    },

    update: (table, values, cond, condVars=[]) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `update ${table} set ${values} where ${cond};`,
                    condVars,
                    (_, res) => resolve(res),
                    (_, err) => console.log(err)
                );
            });
        });
    }
}

export default CommonDbOps;