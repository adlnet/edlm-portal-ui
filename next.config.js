// const { createSecureHeaders } = require("next-secure-headers");

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: false,
    },
    swcMinify: true,
    assetPrefix: process.env.ENABLE_ASSET_PREFIX === 'true' ? '/edlm-portal' : '',
    trailingSlash: true,

    images: {
        unoptimized: true,
    },

    env: {
        ENABLE_MOODLE_SESSION_CALL: process.env.ENABLE_ASSET_PREFIX,
    },

    async rewrites() {
        return [
            {
                source: '/edlm-portal/api/data/:type/:uuid',
                destination: `${process.env.NEXT_PUBLIC_ECCR_API}/api/data/:type/:uuid`,
            },
            {
                source: '/edlm-portal/api/data/:path',
                destination: `${process.env.NEXT_PUBLIC_ECCR_API}/api/data/:path`,
            }
        ]
    },

    async headers() {
        // Cache-Control headers for specific routes (containing sensitive user information)
        const cacheControlHeaders = [
            {
                key: 'Cache-Control',
                value: 'no-store, no-cache, must-revalidate',
            },
            {
                key: 'Pragma',
                value: 'no-cache',
            }
        ];
        return [
            {
                source: '/edlm-portal/login',
                headers: cacheControlHeaders,
            },
            {
                source: '/edlm-portal/register',
                headers: cacheControlHeaders,
            },
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
