const serverPath = {
    development: "https://api.github.com",
    staging: "https://api.github.com",
    production: "https://api.github.com"
}

const env = {
    development: {
        debug: true,
        title: "Best of GitHub",
    },
    staging: {
        debug: false,
        title: "Best of GitHub",
    },
    production: {
        debug: false,
        title: "Best of GitHub",
    }
};

let appEnvironment = process.env.REACT_APP_ENV || "development";

let server = serverPath[appEnvironment];
console.log("server", server, appEnvironment)

// const version = '/api/'

const common = {
    server,
    api: `${server}`,
}

export function getEnvironmentData() {
    return {
        ...env[appEnvironment],
        ...common
    };
}

