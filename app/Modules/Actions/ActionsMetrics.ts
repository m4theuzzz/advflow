import Storage from 'App/Modules/Storage';

const storage = new Storage();

export default class ActionsMetrics {
    public static async actionDuration() {
        const allActions = await storage.getAll('actions');
        const allRequisitions = await storage.getAll('requisitions');

        const finishedActions = allActions.filter(action => action.state == "aprovado");

        const actionDurations = finishedActions.reduce((acc, cur) => {
            const actionRequisition = allRequisitions.filter(requisition => requisition.id == cur.requisition_id)[0];
            
            let endDate: string = cur.updated_at;
            
            const diffTime = Math.abs(new Date(endDate).getTime() - new Date(actionRequisition.created_at).getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            acc.push(diffDays);

            return acc;
        }, []);

        let sum = 0;
        for (let i = 0; i < actionDurations.length; i++) {
            sum += actionDurations[i];
        }

        const mean = Math.ceil(sum / actionDurations.length);

        return `${mean}d`;
    }

    public static async finishedActions() {
        const allActions = await storage.getAll('actions');
        return allActions.filter(action => action.state == "aprovado").length;
    }
}