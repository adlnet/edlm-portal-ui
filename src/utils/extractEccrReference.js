'use strict';

// Get the eccr reference we need (typeframework/uuid) from a full Competency/KSA ID
export function extractEccrReference(fullId) {
    if (!fullId) return null;

    // return last two parts after splitting by '/'
    if (fullId.split('/').length < 2) {
        return fullId;
    }

    return fullId.split('/').slice(-2).join('/');
}
