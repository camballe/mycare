import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketProduct } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [pharmacy, setPharmacy] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketProducts, setBasketProducts] = useState([]);

  const totalPrice = basketProducts.reduce(
    (sum, basketProduct) =>
      sum + basketProduct.quantity * basketProduct.Product.price,
    pharmacy?.deliveryFee
  );

  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.and((b) => [b.pharmacyID.eq(pharmacy.id), b.userID.eq(dbUser.id)])
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, pharmacy]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketProduct, (bd) => bd.basketID.eq(basket.id)).then(
        setBasketProducts
      );
    }
  }, [basket]);

  const addProductToBasket = async (product, quantity) => {
    // get the existing basket or create a new one
    let theBasket = basket || (await createNewBasket());

    // create a BasketProduct item and save to DataStore
    const newProduct = await DataStore.save(
      new BasketProduct({ quantity, Product: product, basketID: theBasket.id })
    );
    setBasketProducts([...basketProducts, newProduct]);
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, pharmacyID: pharmacy.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addProductToBasket,
        setPharmacy,
        pharmacy,
        basket,
        basketProducts,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
