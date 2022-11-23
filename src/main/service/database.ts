import  mysql from "mysql"

const connection = mysql.createConnection({
    host: 'rn000076830',
    user: 'admin1',
    password: 'Optum@123',
    database: 'HCEP_HCC_ APDEV_FLOW_CONFIG_DB'
});

export const getConnection= ()=> {
    return connection;
}


