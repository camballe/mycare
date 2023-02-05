import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductListItem from "../../components/ProductListItem";
import PharmacyHeader from "./Header";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Pharmacy, Product } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

const PharmacyDetailsScreen = () => {
  const [pharmacy, setPharmacy] = useState(null);
  const [products, setProducts] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  const {
    setPharmacy: setBasketPharmacy,
    basket,
    basketProducts,
  } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketPharmacy(null);
    // fetch the pharmacy with the id
    DataStore.query(Pharmacy, id).then(setPharmacy);

    DataStore.query(Product, (product) => product.pharmacyID.eq(id)).then(
      setProducts
    );
  }, [id]);

  useEffect(() => {
    setBasketPharmacy(pharmacy);
  }, [pharmacy]);

  if (!pharmacy) {
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
      <FlatList
        ListHeaderComponent={() => <PharmacyHeader pharmacy={pharmacy} />}
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.name}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={28}
          color="white"
        />
      </View>
      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Open Basket ({basketProducts.length})
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default PharmacyDetailsScreen;
