import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "../theme/theme";
import OrderItemCard from "./OrderItemCard";

interface OrderHistoryCardProps {
  navigationHandler: any;
  CartList: any;
  CartListPrice: string;
  OrderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  CartList,
  CartListPrice,
  OrderDate,
}) => {
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View>
          <Text style={styles.HeaderTitle}>Order Time</Text>
          <Text style={styles.HeaderSubTitle}>{OrderDate}</Text>
        </View>

        <View style={styles.PriceContainer}>
          <Text style={styles.HeaderTitle}>Total Amount</Text>
          <Text style={styles.HeaderPrice}>$ {CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {CartList.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}
          >
            <OrderItemCard
              itemPrice={data.itemPrice}
              imageLink_square={data.imageLink_square}
              nameCoffee={data.nameCoffee}
              special_ingredient={data.special_ingredient}
              type={data.type}
              prices={data.prices}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    gap: Spacing.space_10,
  },
  CardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.space_20,
    alignItems: "center",
  },
  PriceContainer: {
    alignItems: "flex-end",
  },
  HeaderTitle: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_16,
    color: Colors.primaryWhiteHex,
  },
  HeaderSubTitle: {
    fontSize: FontSize.size_16,
    color: Colors.primaryWhiteHex,
  },
  HeaderPrice: {
    fontSize: FontSize.size_18,
    color: Colors.primaryOrangeHex,
    fontWeight: "bold",
  },
  ListContainer: {
    gap: Spacing.space_20,
  },
});
export default OrderHistoryCard;
