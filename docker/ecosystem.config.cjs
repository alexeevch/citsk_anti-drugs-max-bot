module.exports = {
    apps: [
        {
            name: "anti-drugs-bot",
            script: "dist/app.js",
            exec_mode: "fork",
            instances: 1,
            watch: false,
            autorestart: true,
            max_memory_restart: "512M",
            env: {
                NODE_ENV: "production",
            },
            error_file: "/app/logs/err.log",
            out_file: "/app/logs/out.log",
            time: true,
        },
    ],
};
