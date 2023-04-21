module.exports = {
    apps: [
        {
            name: "store-backend",
            script: "./build/index.js",
            watch: false,
            instances: 1,
            exec_mode: "cluster",
            env: {
                NODE_ENV: "production",
            },
            env_production: {
                NODE_ENV: "production",
            }
        }
    ]
}