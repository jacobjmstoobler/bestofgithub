import { getEnvironmentData } from "./environment"
import { routes } from "./apiroutes.js";

let all = {
    routes,
};

let env = getEnvironmentData()

let config = {
    ...all,
    ...env
};
export default config