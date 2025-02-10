export type paymenttype = {
    customerFirstName: string,
    customerLastName: string    ,

    amount: number,
    userId: string,
    currency: string

}
export enum PaymentType {
    PAID = 'Paid',
    UNPAID = 'Unpaid',
}


export const paymentStatusTranslation: Record<string, string> = {
    [PaymentType.PAID]: 'გადახდილია',
    [PaymentType.UNPAID]: 'გადაუხდელია',
  };
  
 