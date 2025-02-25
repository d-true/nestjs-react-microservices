const fs = require('fs');

const extractEnvs = (envPath) => {
    const envFile = fs.readFileSync(envPath).toString();
    const envs = {};

    envFile.split(/\r?\n/).map(line => {
        const l = line.split('=');
        envs[l[0]] = l[1];
    })
    return envs;
}

module.exports = {
    apps : [
        {
            name: "api-gateway",
            script: "./api-gateway/main.js",
            watch: false,
            env: extractEnvs('./.env.docker.api-gateway'),
        },
        {
            name: "user-mcs",
            script: "./user-mcs/main.js",
            watch: false,
            env: extractEnvs('./.env.docker.user-mcs'),
        },
        {
            name: "comment-mcs",
            script: "./comment-mcs/main.js",
            watch: false,
            env: extractEnvs('./.env.docker.comment-mcs'),
        }
    ]
}