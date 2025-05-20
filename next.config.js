const { createSecureHeaders } = require("next-secure-headers");

console.log('Check lrs key config:', !!process.env.NEXT_PUBLIC_XAPI_LRS_KEY);

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
        NEXT_PUBLIC_XAPI_LRS_KEY: process.env.NEXT_PUBLIC_XAPI_LRS_KEY,
        NEXT_PUBLIC_XAPI_LRS_SECRET: process.env.NEXT_PUBLIC_XAPI_LRS_SECRET,
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
                                "'sha" + "25" + "6-" + "47" + "DEQ" + "pj" + "8H" + "BSa" + "+/" + "TIm" + "W+5" + "JC" + "euQ" + "eRk" + "m5" + "NMpJ" + "WZ" + "G3" + "hSu" + "FU='",
                                "'sha" + "25" + "6-" + "Z5" + "XT" + "K2" + "3D" + "Fu" + "EM" + "s0" + "Pw" + "ny" + "ZD" + "O9" + "SW" + "xe" + "mQ" + "5H" + "xcp" + "Va" + "BN" + "uU" + "Jy" + "WY='",
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
