const { createSecureHeaders } = require("next-secure-headers");

const isDev = process.env.NODE_ENV !== 'production';
const unsafeDirectives = isDev ? ["'unsafe-eval'", "'unsafe-inline'"] : [];
const shaHashes = !isDev ? [
    "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
    "'sha256-Z5XTK23DFuEMs0PwnyZDO9SWxemQ5HxcpVaBNuUJyWY='",
] : [];

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
        return [

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
                                "https://www.ssa.gov",
                                "https://ajax.googleapis.com",
                                process.env.NEXT_PUBLIC_XDS_BACKEND,
                                process.env.NEXT_PUBLIC_PORTAL_BACKEND_HOST,
                                ...unsafeDirectives
                            ],
                            scriptSrc: [
                                "'self'",
                                "https://www.ssa.gov",
                                "https://ajax.googleapis.com",
                                ...unsafeDirectives
                            ],
                            styleSrc: [
                                "'self'",
                                "https://dote.staging.dso.mil",
                                "https://dote.staging.dso.mil/ecc-openlxp-xms",
                                "https://dote.staging.dso.mil/ecc-openlxp-xms-ui/", 
                                "https://dote.apps.dso.mil/",
                                "https://dote.apps.dso.mil/ecc-openlxp-xms-ui/",
                                "https://fonts.googleapis.com",
                                "https://www.ssa.gov",
                                process.env.NEXT_PUBLIC_XDS_BACKEND,
                                process.env.NEXT_PUBLIC_PORTAL_BACKEND_HOST,
                                ...shaHashes,
                                ...unsafeDirectives
                            ],
                            imgSrc: ["'self'",
                                    "data:",
                                    "data:*",
                                    "https://www.ssa.gov",
                                    "localhost:*"
                            ],
                            fontSrc: [
                                "'self'", 
                                "https://fonts.gstatic.com",
                                "https://www.ssa.gov",
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
