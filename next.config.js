// const { createSecureHeaders } = require("next-secure-headers");

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: false,
    },
    swcMinify: true,
    assetPrefix: process.env.NODE_ENV === 'production' ? '/edlm-portal' : '',
    trailingSlash: true,

    images: {
        unoptimized: true,
    },

    async rewrites() {
        return [
            {
                source: '/edlm-portal/api/data/:type/:uuid',
                destination: 'http://cass.cass:80/api/data/:type/:uuid',
            },
            {
                source: '/edlm-portal/api/data/:path',
                destination: 'http://cass.cass:80/api/data/:path',
            }
        ]
    }

    // distDir: 'edlm-portal',
    // Adding policies:
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: createSecureHeaders({
    //                 contentSecurityPolicy: {
    //                     directives: {
    //                         defaultSrc: [
    //                             "'self'",
    //                             "https://ecc.staging.dso.mil",
    //                             "https://ecc.staging.dso.mil/ecc-openlxp-xms",
    //                             "https://ecc.staging.dso.mil/ecc-openlxp-xms-ui/", 
    //                             "https://ecc.apps.dso.mil/",
    //                             "https://ecc.apps.dso.mil/ecc-openlxp-xms-ui/",
    //                             "https://fonts.googleapis.com"
    //                         ],
    //                         styleSrc: [
    //                             "'self'",
    //                             "https://ecc.staging.dso.mil",
    //                             "https://ecc.staging.dso.mil/ecc-openlxp-xms",
    //                             "https://ecc.staging.dso.mil/ecc-openlxp-xms-ui/", 
    //                             "https://ecc.apps.dso.mil/",
    //                             "https://ecc.apps.dso.mil/ecc-openlxp-xms-ui/",
    //                             "https://fonts.googleapis.com"
    //                         ],
    //                         imgSrc: ["'self'",
    //                                 "data:",
    //                                 "data:*",
    //                         ],
    //                         fontSrc: [
    //                             "'self'", 
    //                             "https://fonts.gstatic.com"
    //                         ],
    //                         frameAncestors: [
    //                             "'self'",
    //                             "https://ecc.apps.dso.mil/",
    //                             "https://ecc.apps.dso.mil/ecc-openlxp-xms-ui/",
    //                             "https://ecc.staging.dso.mil/ecc-openlxp-xms-ui/"
    //                         ]
    //                     },
    //                     frameGuard: "deny",
    //                     noopen: "noopen",
    //                     nosniff: "nosniff",
    //                     xssProtection: "sanitize",
    //                     referrerPolicy: "origin-when-cross-origin",
    //                 }
    //             })
    //         },
    //     ];
    // },
}

module.exports = nextConfig
