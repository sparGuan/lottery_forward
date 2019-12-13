const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");
const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ["*"]
                    })
                ]
            }
        }
    },
    // productionSourceMap: false,
    lintOnSave: false,
    chainWebpack: (config) =>{
        config.resolve.alias
        .set('@',resolve('./src'))
        // .set('components',resolve('./src/components'))
    }
}