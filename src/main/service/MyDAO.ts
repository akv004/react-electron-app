import {getConnection} from "./database";

export const getPages = async () => {
    try {
        const connection = await getConnection();
        let sql = "SELECT * from `HCEP_HCC_ APDEV_FLOW_CONFIG_DB`.OSGP_FLOW_CONTROL_CONFIG  "
        connection.query(sql, (error, results) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results);
        });
        connection.end();
    } catch (error) {
        console.log(error);
    }
};
