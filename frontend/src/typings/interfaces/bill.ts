export interface AddBillInterface {
  formData: FormData;
}

export interface BillInterface {
  id: string;
}

export interface FilteredBills {
  startDate: Date;
  endDate: Date;
}
