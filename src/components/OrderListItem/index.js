import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();
  if (order.Pharmacy?._z != null) console.log(order.Pharmacy?._z);
  return (
    <Pressable
      onPress={() => navigation.navigate("Order", { id: order.id })}
      style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
    >
      <Image
        source={{ uri: order.Pharmacy?._z?.image }}
        style={{ width: 75, height: 75, marginRight: 10 }}
      />
      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {order.Pharmacy?._z?.name}
        </Text>
        <Text style={{ marginVertical: 5 }}>3 items &#8226; KES 200</Text>
        <Text>2 days ago &#8226; {order.status}</Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;
