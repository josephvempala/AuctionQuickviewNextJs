const withPWA = require('next-pwa')
 
module.exports = withPWA({
    pwa: {
        dest: 'public'
    },
    images: {
        domains: ["192.168.0.61"],
    },
})