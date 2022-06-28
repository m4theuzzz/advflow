import Database from '@ioc:Adonis/Lucid/Database';

export default class Storage {
    constructor() { }

    public async getAll(table: string) {
        return await Database.table(table);
    }

    public async getContentinInterval(table: string, startDateFromNow: number, endDateFromNow: number) {
        let rows = await Database.table(table);

        return rows.filter(data => {
            let startDate = new Date();
            startDate.setDate(startDate.getDate() - startDateFromNow);

            let endDate = new Date();
            endDate.setDate(endDate.getDate() - endDateFromNow);

            const rowDate = new Date(data["created_at"]);
            if (rowDate >= startDate && rowDate < endDate) {
                return data;
            }
        });
    }

    public async getDataByDay(table: string, targetDates) {
        let rows = await Database.table(table);
        let days = {};

        for (let day in targetDates) {
            days[day] = rows.filter(item => {
                if (this.isSameDate(item.created_at, targetDates[day])) {
                    return item;
                }
            });
        }
        
        return days;
    }

    public isSameDate(first: string, second: string) {
        let firstDate = new Date(first);
        let secondDate = new Date(second);

        if (firstDate.getFullYear() != secondDate.getFullYear()) {
            return false;
        }

        if (firstDate.getMonth() != secondDate.getMonth()) {
            return false;
        }

        if (firstDate.getDate() != secondDate.getDate()) {
            return false;
        }

        if (firstDate.getDay() != secondDate.getDay()) {
            return false;
        }

        return true;
    }

    public getWeekDays() {
        let days = {};

        let aux = new Date();
        const todayDay = aux.getDay();

        for (let i = todayDay; i >= 0; i--) {
            let auxDay = aux.getDay();
            switch (auxDay) {
                case 0:
                    let dom = new Date(aux);
                    days['dom'] = dom;
                    break;
                case 1:
                    let seg = new Date(aux);
                    days['seg'] = seg;
                    break;
                case 2:
                    let ter = new Date(aux);
                    days['ter'] = ter;
                    break;
                case 3:
                    let qua = new Date(aux);
                    days['qua'] = qua;
                    break;
                case 4:
                    let qui = new Date(aux);
                    days['qui'] = qui;
                    break;
                case 5:
                    let sex = new Date(aux);
                    days['sex'] = sex;
                    break;
                case 6:
                    let sab = new Date(aux);
                    days['sab'] = sab;
                    break;
            
                default:
                    break;
            }
            aux.setDate(aux.getDate() - 1);
        }

        return days;
    }

    public getLastWeekDays() {
        let days = {};

        let aux = new Date();
        const todayDay = aux.getDay();

        for (let i = todayDay; i >= 0; i--) {
            aux.setDate(aux.getDate() - 1);
        }

        for (let i = 0; i < 7; i++) {
            let auxDay = aux.getDay();
            switch (auxDay) {
                case 0:
                    let dom = new Date(aux);
                    days['dom'] = dom;
                    break;
                case 1:
                    let seg = new Date(aux);
                    days['seg'] = seg;
                    break;
                case 2:
                    let ter = new Date(aux);
                    days['ter'] = ter;
                    break;
                case 3:
                    let qua = new Date(aux);
                    days['qua'] = qua;
                    break;
                case 4:
                    let qui = new Date(aux);
                    days['qui'] = qui;
                    break;
                case 5:
                    let sex = new Date(aux);
                    days['sex'] = sex;
                    break;
                case 6:
                    let sab = new Date(aux);
                    days['sab'] = sab;
                    break;
            
                default:
                    break;
            }
            aux.setDate(aux.getDate() - 1);
        }

        return days;
    }

    public async getById(table: string, id: number) {
        const rows = await Database.table(table);
        return rows.filter(row => row.id == id)[0];
    }

    //TODO: implementar estas funções
    public async updateInTable(table: string, id: number, newObj: object) {
        console.log("update", { table, id, newObj });
    }

    public async deleteFromTable(table: string, id: number) {
        console.log("delete", { table, id });
    }
}