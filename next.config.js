/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, context) => {
        if (config.plugins) {
            config.plugins.push(
                new context.webpack.IgnorePlugin({
                    resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
                }),
            )
        }
        return config
    },
    env: {
        CONTRACT: process.env.CONTRACT,
        IPFS_PROJECT_SECRET: process.env.IPFS_PROJECT_SECRET,
        IPFS_PROJECT_KEY: process.env.IPFS_PROJECT_KEY
    }
}

module.exports = nextConfig
