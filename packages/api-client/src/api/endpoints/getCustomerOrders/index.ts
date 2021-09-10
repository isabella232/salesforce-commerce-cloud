import { OrderSearchParams, OrderSearchResult, SfccIntegrationContext } from '../../../types';

export default async function getCustomerOrders(context: SfccIntegrationContext, params: OrderSearchParams): Promise<OrderSearchResult> {
  if (context.config.overrides && context.config.overrides.getCustomerOrders) {
    return context.config.overrides.getCustomerOrders(context, params);
  }

  return await context.client.CustomersApi.getOrders(context, params);
}
