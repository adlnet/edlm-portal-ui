// const { createSecureHeaders } = require("next-secure-headers");

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: false,
    },
    swcMinify: true,
    basePath: '/edlm-portal',
    assetPrefix: '/edlm-portal',
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
