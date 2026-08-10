

export interface Flags {
    maintenance:boolean
}

const getMaintenance = (): boolean => {
    return process.env.MAINTENANCE?.toLowerCase() === "true";
}

export const flags: Flags = {
    maintenance: getMaintenance(),
}