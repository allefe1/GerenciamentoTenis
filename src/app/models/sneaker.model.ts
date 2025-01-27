export interface Sneaker {
  id?: number;
  customer: string;
  name: string;
  price: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}