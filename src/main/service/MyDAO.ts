//import {getConnection} from "./database";
import {Users} from "../entities/Users";

export const getUsers = async () => {
    try {
        // const connection = await getConnection();
        // let sql = "SELECT * from `HCEP_HCC_ APDEV_FLOW_CONFIG_DB`.OSGP_FLOW_CONTROL_CONFIG  "
        // connection.query(sql, (error, results) => {
        //     if (error) {
        //         return console.error(error.message);
        //     }
        //     console.log(results);
        // });
        // connection.end();
        const user = await Users.find();
        console.log(user)
        return user;
    } catch (error) {
        console.log(error);
        return  undefined;
    }
};
