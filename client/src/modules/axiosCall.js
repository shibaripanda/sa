import axios from "axios";
import { sessionData } from "./sessionData";

export const axiosCall = async (typeRequest, link, objectUpdate) => {
    return await axios({
        method: typeRequest,
        url: link,
        data: objectUpdate,
        headers: {'Authorization': 'Bearer ' + sessionData('read', 'token')},
        timeout: 50000
    })
}