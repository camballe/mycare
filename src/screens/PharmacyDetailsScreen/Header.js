import React from "react";
import { View, Text, Image } from "react-native";
import restaurants from "../../../assets/data/restaurants.json";
import styles from "./styles";

const DEFAULT_IMAGE = "https://via.placeholder.com/640x360.png?text=Pharmacy";

const PharmacyHeader = ({ pharmacy }) => {
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: pharmacy.image.startsWith("http")
            ? pharmacy.image
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.container}>
        <Text style={styles.title}>{pharmacy.name}</Text>
        <Text style={styles.subtitle}>
          KES {pharmacy.deliveryFee.toFixed(0)} &#8226;
          {pharmacy.minDeliveryTime}-{pharmacy.maxDeliveryTime} minutes
        </Text>

        <Text style={styles.productsTitle}>Products</Text>
      </View>
    </View>
  );
};

export default PharmacyHeader;
