import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { DataStore } from "aws-amplify";
import { Order, OrderProduct } from "../../models";
import BasketProductItem from "../../components/BasketProductItem";
import { useAuthContext } from "../../contexts/AuthContext";
import { useBasketContext } from "../../contexts/BasketContext";
import { useNavigation } from "@react-navigation/native";

const Basket = () => {
  const { pharmacy, basketProducts, basket } = useBasketContext();
  let totalPrice = pharmacy?.deliveryFee;

  for (let i = 0; i < basketProducts.length; i++) {
    totalPrice =
      totalPrice +
      (basketProducts[i].quantity + basketProducts[i].Product?._z?.price);
  }

  const { dbUser } = useAuthContext();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID.eq(dbUser.id)).then(setOrders);
  }, [dbUser]);

  const createOrder = async () => {
    // create the order
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Pharmacy: pharmacy,
        status: "NEW",
        total: totalPrice,
      })
    );
    // add all basketProducts to the order
    await Promise.all(
      basketProducts.map((basketProduct) =>
        DataStore.save(
          new OrderProduct({
            quantity: basketProduct.quantity,
            orderID: newOrder.id,
            Product: basketProduct.Product,
          })
        )
      )
    );
    // delete basket
    // await DataStore.delete(basket);

    setOrders([...orders, newOrder]);
  };

  const navigation = useNavigation();

  const onCreateOrder = async () => {
    await createOrder();
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{pharmacy?.name}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your Items
      </Text>

      <FlatList
        data={basketProducts}
        renderItem={({ item }) => <BasketProductItem basketProduct={item} />}
      />

      <View style={styles.separator}></View>

      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Create Order &#8226; KES {totalPrice.toFixed(0)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#0474ed",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default Basket;
