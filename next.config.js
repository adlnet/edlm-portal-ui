 const { createSecureHeaders } = require("next-secure-headers");

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

    // distDir: 'edlm-portal',
    // Adding policies:
    async headers() {
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
            {
                source: '/(.*)',
                headers: createSecureHeaders({
                     forceHTTPSRedirect: [
                         true,
                         { maxAge: 1024000, includeSubDomains: true, preload: true },
                     ],
                    contentSecurityPolicy: {
                        directives: {
                            defaultSrc: [
                                "'self'",
                                "https://dote.staging.dso.mil/",
                                "https://dote.staging.dso.mil/xds/admin/",
                                "https://dote.staging.dso.mil/edlm-portal/",
                                "https://fonts.googleapis.com",
                                "http://localhost:3000/",
                                "http://localhost:8100/",
                                // "'unsafe-eval'",
                            ],
                            styleSrc: [
                                "'self'",
                                "https://dote.staging.dso.mil",
                                "https://dote.staging.dso.mil/ecc-openlxp-xms",
                                "https://dote.staging.dso.mil/ecc-openlxp-xms-ui/", 
                                "https://dote.apps.dso.mil/",
                                "https://dote.apps.dso.mil/ecc-openlxp-xms-ui/",
                                "http://localhost:3000/",
                                "http://localhost:8100/",
                                "https://fonts.googleapis.com",
                                process.env.CSP_HASH_1,
                                process.env.CSP_HASH_2,
                                // "'unsafe-inline'"
                            ],
                            imgSrc: ["'self'",
                                    "data:",
                                    "data:*",
                            ],
                            fontSrc: [
                                "'self'", 
                                "https://fonts.gstatic.com"
                            ],
                            frameAncestors: [
                                "'self'",
                                "https://dote.staging.dso.mil/",
                                "https://dote.staging.dso.mil/xds/admin/"
                            ]
                        },
                        frameGuard: "deny",
                        noopen: "noopen",
                        nosniff: "nosniff",
                        xssProtection: "sanitize",
                        referrerPolicy: "origin-when-cross-origin",
                        gpc: true,
                    }
                })
            },
        ];
    },
}

module.exports = nextConfig
