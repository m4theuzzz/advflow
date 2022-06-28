import Storage from 'App/Modules/Storage';

export default class ClientsMetrics {
    public static async newClients() {
        const storage = new Storage();

        const clientsThisWeek = await storage.getContentinInterval('clients', 7, 0);
        const clientsLastWeek = await storage.getContentinInterval('clients', 14, 7);
        const allClients = await storage.getAll('clients')

        const clientsGrowthThisWeek = ((clientsThisWeek.length * 100) / (allClients.length - clientsThisWeek.length)).toFixed(2);
        const clientsGrowthLastWeek = ((clientsLastWeek.length * 100) / (allClients.length - clientsThisWeek.length - clientsLastWeek.length)).toFixed(2)

        const hadGrowth = Number(clientsGrowthThisWeek) >= Number(clientsGrowthLastWeek);
        const signal = hadGrowth ? '+' : '';

        return {
            thisWeek: `${clientsGrowthThisWeek}%`,
            diff: `${signal}${Number(clientsGrowthThisWeek) - Number(clientsGrowthLastWeek)}%`,
            hadGrowth: hadGrowth
        };
    }
}