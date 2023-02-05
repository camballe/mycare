import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const DEFAULT_IMAGE = "https://via.placeholder.com/640x360.png?text=Pharmacy";

const PharmacyItem = ({ pharmacy }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Pharmacy", { id: pharmacy.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.pharmacyContainer}>
      <Image
        source={{
          uri: pharmacy.image.startsWith("http")
            ? pharmacy.image
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{pharmacy.name}</Text>
          <Text style={styles.subtitle}>
            KES {pharmacy.deliveryFee.toFixed(0)} &#8226;
            {pharmacy.minDeliveryTime}-{pharmacy.maxDeliveryTime} minutes
          </Text>
        </View>
        <View style={styles.rating}>
          <Text>{pharmacy.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PharmacyItem;

const styles = StyleSheet.create({
  pharmacyContainer: {
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgrey",
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
