import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const BasketProductItem = ({ basketProduct }) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketProduct.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>
        {basketProduct.Product?._z?.name}
      </Text>
      <Text style={{ marginLeft: "auto" }}>
        KES {basketProduct.Product?._z?.price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default BasketProductItem;
