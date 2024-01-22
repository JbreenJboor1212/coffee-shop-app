import React from "react";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";

interface OrderItemCardProps {
  itemPrice: number;
  imageLink_square: ImageProps;
  nameCoffee: string;
  special_ingredient: string;
  type: string;
  prices: any;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  itemPrice,
  imageLink_square,
  nameCoffee,
  special_ingredient,
  type,
  prices,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
      style={styles.CardLinearGradient}
    >
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <Image source={imageLink_square} style={styles.ImageView} />
          <View>
            <Text style={styles.CardTitle}>{nameCoffee}</Text>
            <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.CardCurrency}>
            $ <Text style={styles.CardPrice}>{itemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((data: any, index: any) => (
        <View key={index.toString()} style={styles.CardTableRow}>
          <View style={styles.CardTableRow}>
            <View style={styles.SizeBoxLeft}>
              <Text
                style={[
                  styles.SizeText,
                  {
                    fontSize:
                      type === "Bean" ? FontSize.size_12 : FontSize.size_16,
                  },
                ]}
              >
                {data.size}
              </Text>
            </View>
            <View style={styles.PriceBoxRight}>
              <Text style={styles.PriceCurrency}>
                {data.currency}
                <Text style={styles.Price}> {data.price}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              X <Text style={styles.Price}>{data.quantity}</Text>
            </Text>
            <Text style={styles.CardQuantityPriceText}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradient: {
    gap: Spacing.space_20,
    padding: Spacing.space_20,
    borderRadius: BorderRadius.radius_25,
  },
  CardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CardImageInfoContainer: {
    flexDirection: "row",
    gap: Spacing.space_20,
    alignItems: "center",
  },
  ImageView: {
    width: 90,
    height: 90,
    borderRadius: BorderRadius.radius_15,
  },
  CardTitle: {
    fontFamily: FontFamily.poppins_medium,
    fontSize: FontSize.size_18,
    color: Colors.primaryWhiteHex,
  },
  CardSubTitle: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: FontSize.size_12,
    color: Colors.secondaryLightGreyHex,
  },
  CardCurrency: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_20,
    color: Colors.primaryOrangeHex,
  },
  CardPrice: {
    color: Colors.primaryWhiteHex,
  },
  CardTableRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizeBoxLeft: {
    backgroundColor: Colors.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopLeftRadius: BorderRadius.radius_10,
    borderBottomLeftRadius: BorderRadius.radius_10,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: Colors.primaryGreyHex,
  },
  SizeText: {
    fontFamily: FontFamily.poppins_semibold,
    color: Colors.secondaryLightGreyHex,
  },
  PriceBoxRight: {
    backgroundColor: Colors.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopRightRadius: BorderRadius.radius_10,
    borderBottomRightRadius: BorderRadius.radius_10,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.primaryGreyHex,
  },
  PriceCurrency: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_18,
    color: Colors.primaryOrangeHex,
  },
  Price: {
    color: Colors.primaryWhiteHex,
  },
  CardTabRow: {},
  CardQuantityPriceText: {
    flex: 1,
    textAlign: "center",
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_18,
    color: Colors.primaryOrangeHex,
  },
});

export default OrderItemCard;
