export enum ShippingStatus {
  BROUGHT = 'Brought',
  SHIPPED = 'Shipped',
  ARRIVED = 'Arrived',
  TAKEN = 'Taken',
  }
  

  export const shippingStatusTranslation: Record<string, string> = {
    [ShippingStatus.BROUGHT]: 'საწყობშია',
    [ShippingStatus.SHIPPED]: 'გაგზავნილია',
    [ShippingStatus.ARRIVED]: 'ჩამოსულია',
    [ShippingStatus.TAKEN]: 'გატანილია',
  };

  export const translateShippingStatus = (status: string) => {
    return shippingStatusTranslation[status] || status;  
  };