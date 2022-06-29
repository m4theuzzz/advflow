import Storage from 'App/Modules/Storage';

const storage = new Storage();

export default class RequisitionsMetrics {
    public static async newRequisitions() {
        const requisitionsThisWeek = await storage.getContentinInterval('requisitions', 7, 0);
        const requisitionsLastWeek = await storage.getContentinInterval('requisitions', 14, 7);
        const allRequisitions = await storage.getAll('requisitions');

        const requisitionsGrowthThisWeek = ((requisitionsThisWeek.length * 100) / allRequisitions.length).toFixed(2);
        const requisitionsGrowthLastWeek = ((requisitionsLastWeek.length * 100) / (allRequisitions.length - requisitionsThisWeek.length)).toFixed(2)

        const hadGrowth = Number(requisitionsGrowthThisWeek) >= Number(requisitionsGrowthLastWeek);
        const signal = hadGrowth ? '+' : '';

        return {
            thisWeek: `${requisitionsGrowthThisWeek}%`,
            diff: `${signal}${(Number(requisitionsGrowthThisWeek) - Number(requisitionsGrowthLastWeek)).toFixed(2)}%`,
            hadGrowth: hadGrowth
        };
    }

    public static async processedRequisitions() {
        const allRequisitions = await storage.getAll('requisitions');

        const requisitionsThisWeek = await storage.getContentinInterval('requisitions', 7, 0);
        const processedThisWeek = requisitionsThisWeek.filter(requisition => requisition.is_valid != null);

        const requisitionsLastWeek = await storage.getContentinInterval('requisitions', 14, 7);
        const processedLastWeek = requisitionsLastWeek.filter(requisition => requisition.is_valid != null);

        const processedRateThisWeek = ((processedThisWeek.length * 100) / allRequisitions.length).toFixed(2);

        const processedRateLastWeek = ((processedLastWeek.length * 100) / (allRequisitions.length - requisitionsThisWeek.length)).toFixed(2);

        const hadGrowth = processedRateThisWeek >= processedRateLastWeek;
        const signal = hadGrowth ? '+' : '';

        return {
            thisWeek: `${processedRateThisWeek}%`,
            diff: `${signal}${(Number(processedRateThisWeek) - Number(processedRateLastWeek)).toFixed(2)}%`,
            hadGrowth: hadGrowth
        };
    }

    public static async requisitionValidRate() {
        const allProcessedRequisitions = (await storage.getAll('requisitions')).filter(requisition => requisition.is_valid != false);
        const allValidRequisitions = allProcessedRequisitions.filter(requisition => requisition.is_valid === 1);

        const validRate = ((allValidRequisitions.length * 100) / allProcessedRequisitions.length).toFixed(2);

        return `${validRate}%`;
    }

    public static async getProcessedRequisitions() {
        const allRequisitions = await storage.getAll('requisitions');
        return allRequisitions.filter(requisition => requisition.is_valid != null).length;
    }

    public static async getAllRequisitions() {
        const allRequisitions = await storage.getAll('requisitions');
        return allRequisitions.length;
    }

    public static async getRequisitionsByWeekDay() {
        let arraysByWeek = {
            thisWeek: new Array(),
            lastWeek: new Array()
        }

        const weekDays = storage.getWeekDays();
        const thisWeekRequisitions = await storage.getDataByDay('requisitions', weekDays);

        const lastWeekDays = storage.getLastWeekDays();
        const lastWeekRequisitions = await storage.getDataByDay('requisitions', lastWeekDays);

        for (const day in thisWeekRequisitions) {
            arraysByWeek.thisWeek.push(thisWeekRequisitions[day].length);
        }

        for (const day in lastWeekRequisitions) {
            arraysByWeek.lastWeek.push(lastWeekRequisitions[day].length);
        }

        arraysByWeek.thisWeek = arraysByWeek.thisWeek.reverse();
        arraysByWeek.lastWeek = arraysByWeek.lastWeek.reverse();

        return arraysByWeek;
    }
}