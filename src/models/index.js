// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "PROCESSING": "PROCESSING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED"
};

const { Basket, BasketProduct, Product, OrderProduct, Order, Pharmacy, User } = initSchema(schema);

export {
  Basket,
  BasketProduct,
  Product,
  OrderProduct,
  Order,
  Pharmacy,
  User,
  OrderStatus
};