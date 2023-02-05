import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  PROCESSING = "PROCESSING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED"
}



type EagerBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly BasketProducts?: (BasketProduct | null)[] | null;
  readonly userID: string;
  readonly pharmacyID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly BasketProducts: AsyncCollection<BasketProduct>;
  readonly userID: string;
  readonly pharmacyID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Basket = LazyLoading extends LazyLoadingDisabled ? EagerBasket : LazyBasket

export declare const Basket: (new (init: ModelInit<Basket>) => Basket) & {
  copyOf(source: Basket, mutator: (draft: MutableModel<Basket>) => MutableModel<Basket> | void): Basket;
}

type EagerBasketProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Product?: Product | null;
  readonly basketID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketProductProductId?: string | null;
}

type LazyBasketProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Product: AsyncItem<Product | undefined>;
  readonly basketID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketProductProductId?: string | null;
}

export declare type BasketProduct = LazyLoading extends LazyLoadingDisabled ? EagerBasketProduct : LazyBasketProduct

export declare const BasketProduct: (new (init: ModelInit<BasketProduct>) => BasketProduct) & {
  copyOf(source: BasketProduct, mutator: (draft: MutableModel<BasketProduct>) => MutableModel<BasketProduct> | void): BasketProduct;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly description?: string | null;
  readonly price: number;
  readonly pharmacyID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly description?: string | null;
  readonly price: number;
  readonly pharmacyID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerOrderProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Product?: Product | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderProductProductId?: string | null;
}

type LazyOrderProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Product: AsyncItem<Product | undefined>;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderProductProductId?: string | null;
}

export declare type OrderProduct = LazyLoading extends LazyLoadingDisabled ? EagerOrderProduct : LazyOrderProduct

export declare const OrderProduct: (new (init: ModelInit<OrderProduct>) => OrderProduct) & {
  copyOf(source: OrderProduct, mutator: (draft: MutableModel<OrderProduct>) => MutableModel<OrderProduct> | void): OrderProduct;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly Pharmacy?: Pharmacy | null;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly OrderProducts?: (OrderProduct | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderPharmacyId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly Pharmacy: AsyncItem<Pharmacy | undefined>;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly OrderProducts: AsyncCollection<OrderProduct>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderPharmacyId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerPharmacy = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pharmacy, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly deliveryFee: number;
  readonly minDeliveryTime: number;
  readonly maxDeliveryTime: number;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Products?: (Product | null)[] | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPharmacy = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pharmacy, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly deliveryFee: number;
  readonly minDeliveryTime: number;
  readonly maxDeliveryTime: number;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Products: AsyncCollection<Product>;
  readonly Baskets: AsyncCollection<Basket>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Pharmacy = LazyLoading extends LazyLoadingDisabled ? EagerPharmacy : LazyPharmacy

export declare const Pharmacy: (new (init: ModelInit<Pharmacy>) => Pharmacy) & {
  copyOf(source: Pharmacy, mutator: (draft: MutableModel<Pharmacy>) => MutableModel<Pharmacy> | void): Pharmacy;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders?: (Order | null)[] | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders: AsyncCollection<Order>;
  readonly Baskets: AsyncCollection<Basket>;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}