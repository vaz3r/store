module.exports = {
    apps: [
        {
            name: "frontend",
            script: "yarn",
            args: "start -p 3002",
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