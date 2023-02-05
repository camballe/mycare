import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Product } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const { addProductToBasket } = useBasketContext();

  useEffect(() => {
    if (id) {
      DataStore.query(Product, id).then(setProduct);
    }
  }, [id]);

  const onAddToBasket = async () => {
    await addProductToBasket(product, quantity);
    navigation.goBack();
  };

  const onMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotal = () => {
    return (product.price * quantity).toFixed(0);
  };

  if (!product) {
    return (
      <ActivityIndicator
        size={"large"}
        style={{ marginTop: "auto", marginBottom: "auto" }}
        color="#0474ed"
      />
    );
  }

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.separator}></View>

      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          color={"#0474ed"}
          onPress={onMinus}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={60}
          color={"#0474ed"}
          onPress={onPlus}
        />
      </View>
      <Pressable onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket &#8226; KES {getTotal()}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40, // temp fix
    padding: 10,
  },
  name: {
    fontSize: 30,
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
    justifyContent: "center",
    marginTop: 50,
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
});

export default ProductDetailsScreen;
