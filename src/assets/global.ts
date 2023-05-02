export type LicencePermision = {
    name: string,
    range: number,
    solveReports?: boolean,
    createNewMod?: boolean,
    logOverview?: boolean,
    geoAnalytics?: boolean,
    sendGlobalMessage?: boolean,
}

export const lincencePermisions: LicencePermision[] = [
    {
        name: "Moderator",
        range: 10,
        solveReports: true
    },
    {
        name: "Admin",
        range: 20,
        solveReports: true,
        createNewMod: true,
        geoAnalytics: true,
    },
    {
        name: "Super Admin",
        range: 100,
        solveReports: true,
        createNewMod: true,
        geoAnalytics: true,
        logOverview: true,
        sendGlobalMessage: true
    },
]