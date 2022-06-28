import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActionsMetrics from 'App/Modules/Actions/ActionsMetrics';
import ClientsMetrics from 'App/Modules/Clients/ClientsMetrics';
import RequisitionsMetrics from 'App/Modules/Requisitions/RequisitionMetrics';

export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    return await view.render('dashboard/index', { metrics: await this.getMetrics() })
  }

  private async getMetrics() {

    const metrics = {
      newClients: await ClientsMetrics.newClients(),
      newRequisitions: await RequisitionsMetrics.newRequisitions(),
      processedRequisitions: await RequisitionsMetrics.processedRequisitions(),
      requisitionConversionRate: await RequisitionsMetrics.requisitionValidRate(),
      processDuration: await ActionsMetrics.actionDuration(),
      allProcessedRequisitions: await RequisitionsMetrics.getProcessedRequisitions(),
      allRequisitions: await RequisitionsMetrics.getAllRequisitions(),
      allFinishedActions: await ActionsMetrics.finishedActions(),
      requisitionsByWeekDay: JSON.stringify(await RequisitionsMetrics.getRequisitionsByWeekDay())
    };

    return metrics;
  }
}
