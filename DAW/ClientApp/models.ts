export class Order{
    id: number;
    orderDate: string;
    orderNumber: string;
    items: number;
}

export class Product{
    id: number;
    gender: string;
    price: string;
    title: string;
    albumTitle: string;
    albumDescription: string;
}

export class OrderItem{
    id: number;
    product: number;
    order: number;
    quantity: number;
    unitPrice: string;
}