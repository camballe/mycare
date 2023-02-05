import { StyleSheet, FlatList, View } from "react-native";
import PharmacyItem from "../../components/PharmacyItem";
import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Pharmacy } from "../../models";

export default function HomeScreen() {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    DataStore.query(Pharmacy).then(setPharmacies);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={pharmacies}
        renderItem={({ item }) => <PharmacyItem pharmacy={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
