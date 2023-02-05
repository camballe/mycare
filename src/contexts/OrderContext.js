import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderProduct, Basket } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { pharmacy, totalPrice, basketProducts, basket } = useBasketContext();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID.eq(dbUser.id)).then(setOrders);
  });

  // const createOrder = async () => {
  //   // create the order
  //   const newOrder = await DataStore.save(
  //     new Order({
  //       userID: dbUser.id,
  //       Pharmacy: pharmacy,
  //       status: "NEW",
  //       total: totalPrice,
  //     })
  //   );
  //   // add all basketProducts to the order
  //   await Promise.all(
  //     basketProducts.map((basketProduct) =>
  //       DataStore.save(
  //         new OrderProduct({
  //           quantity: basketProduct.quantity,
  //           orderID: newOrder.id,
  //           Product: basketProduct.Product,
  //         })
  //       )
  //     )
  //   );
  //   // delete basket
  //   await DataStore.delete(basket);
  // };

  return (
    <OrderContext.Provider value={{ orders }}>{children}</OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
