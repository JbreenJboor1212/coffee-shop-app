import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";

interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
          {price.currency} <Text style={styles.Price}>{price?.price}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.PayButton} onPress={buttonPressHandler}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.space_20,
    padding: Spacing.space_20,
  },
  PriceContainer: {
    alignItems: "center",
    width: 100,
  },
  PriceTitle: {
    fontFamily: FontFamily.poppins_medium,
    fontSize: FontSize.size_14,
    color: Colors.secondaryLightGreyHex,
  },
  PriceText: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_24,
    color: Colors.primaryOrangeHex,
  },
  Price: {
    color: Colors.primaryWhiteHex,
  },
  PayButton: {
    backgroundColor: Colors.primaryOrangeHex,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Spacing.space_36 * 2,
    borderRadius: BorderRadius.radius_20,
  },
  ButtonText: {
    fontFamily: FontFamily.poppins_semibold,
    fontWeight:"bold",
    fontSize: FontSize.size_20,
    color: Colors.primaryWhiteHex,
  },
});
export default PaymentFooter;
