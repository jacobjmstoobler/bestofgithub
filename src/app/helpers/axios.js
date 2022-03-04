import axios from "axios";
import config from "../../config";
const customHeader = () => ({});

export function api(server) {
    let opts = {
        baseURL: server? config.server:config.api.trim(),
        headers:customHeader(),
    };
    return axios.create(opts);
}
export function catchHandler(e) {
    let res = e.response && e.response.data ? e.response.data : { message: "Oops! Something went wrong, please try again later" };
    if (e.response && e.response.status === 401) {
    }
    throw res
}