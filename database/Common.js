import Expo, { SQLite } from 'expo';

const dbName = 'ledgerV1.db';
const db = SQLite.openDatabase(dbName);

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

    run: (q, condVars=[]) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    q, condVars, (_, {rows}) => resolve(rows) , (_, err) => reject(err)
                );
            });
        });
    },

    select: (table, orderby=null, cols='*', cond='1', condVars=[]) => {
        cols = cols == '*' ? cols : cols.join(', ');
        orderby = orderby ? `order by ${orderby}` : '';
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `select ${cols} from ${table} where ${cond} ${orderby};`,
                    condVars,
                    (_, {rows}) => resolve(rows), 
                    (_, err) => console.log(err)
                );
            });
        });
    },

    insert: (table, cols='*', vals) => {
        cols = cols.join(', ');
        vals = vals.join('", "');
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
    }, 

    count: (table, cond='1', condVars=[]) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `select count(*) as count from ${table} where ${cond};`,
                    condVars,
                    (_, {rows}) => resolve(rows),
                    (_, err) => console.log(err)
                );
            });
        });
    },

    delete: (table, cond, condVars) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `delete from ${table} where ${cond};`,
                    condVars,
                    (_, {rows}) => resolve(rows),
                    (_, err) => console.log(err)
                );
            });
        });
    },

    getFile: () => {
        const dbPath = Expo.FileSystem.documentDirectory + 'SQLite/' + dbName;
        return dbPath;
    }
}

export default CommonDbOps;