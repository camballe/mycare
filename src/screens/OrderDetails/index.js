import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import orders from "../../../assets/data/orders.json";
import pharmacies from "../../../assets/data/restaurants.json";
import BasketProductItem from "../../components/BasketProductItem";
import styles from "./styles";

const order = orders[0];

const OrderDetailsHeader = () => {
  return (
    <View>
      <View style={styles.page}>
        <Image
          source={{ uri: order.Pharmacy.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.container}>
          <Text style={styles.title}>{order.Pharmacy.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>

          <Text style={styles.productsTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = () => {
  return (
    <FlatList
      ListHeaderComponent={OrderDetailsHeader}
      data={pharmacies[0].products}
      renderItem={({ item }) => <BasketProductItem basketProduct={item} />}
    />
  );
};

export default OrderDetails;
