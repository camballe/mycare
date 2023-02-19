import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import orders from "../../../assets/data/orders.json";
import pharmacies from "../../../assets/data/restaurants.json";
import BasketProductItem from "../../components/BasketProductItem";
import { useOrderContext } from "../../contexts/OrderContext";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

const OrderDetailsHeader = ({ order }) => {
  console.log(order);
  return (
    <View>
      <View style={styles.page}>
        <Image
          source={{ uri: order.Pharmacy?._z?.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.container}>
          <Text style={styles.title}>{order.Pharmacy?._z?.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>

          <Text style={styles.productsTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = () => {
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  if (!order) {
    return (
      <ActivityIndicator
        size={"large"}
        style={{ marginTop: "auto", marginBottom: "auto" }}
        color="#0474ed"
      />
    );
  }

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.products}
      renderItem={({ item }) => <BasketProductItem basketProduct={item} />}
    />
  );
};

export default OrderDetails;
