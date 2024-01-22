import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome";

interface CartItemProps {
  id: string;
  nameCoffee: string;
  imageLink_square: ImageProps;
  special_ingredient: string;
  type: string;
  roasted: any;
  prices: any;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  nameCoffee,
  imageLink_square,
  special_ingredient,
  type,
  roasted,
  prices,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length !== 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
          style={styles.LinearGradientBG}
        >
          <View style={styles.CardItemRow}>
            <Image source={imageLink_square} style={styles.CardItemImage} />
            <View style={styles.CartItemInfo}>
              <View>
                <Text style={styles.CartItemTitles}>{nameCoffee}</Text>
                <Text style={styles.CartItemSubTitles}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.CartItemRoastedContainer}>
                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          <View style={styles.CartItemSizeRowContainerFather}>
            {prices?.map((data: any, index: any) => (
              <View
                key={index.toString()}
                style={styles.CartItemSizeRowContainer}
              >
                <View style={styles.CartItemSizeValueContainer}>
                  <View style={styles.SizeBox}>
                    <Text
                      style={[
                        styles.SizeText,
                        {
                          fontSize:
                            type === "Bean"
                              ? FontSize.size_12
                              : FontSize.size_16,
                        },
                      ]}
                    >
                      {data?.size}
                    </Text>
                  </View>
                  <Text style={styles.SizeCurrency}>
                    {data?.currency}{" "}
                    <Text style={styles.SizePrice}>{data?.price}</Text>
                  </Text>
                </View>
                <View style={styles.CartItemSizeValueContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      decrementCartItemQuantityHandler(id, data?.size)
                    }
                    style={styles.CartItemIcon}
                  >
                    <Icon
                      name="minus"
                      size={FontSize.size_10}
                      color={Colors.primaryWhiteHex}
                    />
                  </TouchableOpacity>
                  <View style={styles.CartItemQuantityContainer}>
                    <Text style={styles.CartItemQuantityText}>
                      {data?.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      incrementCartItemQuantityHandler(id, data?.size)
                    }
                    style={styles.CartItemIcon}
                  >
                    <Icon
                      name="plus"
                      size={FontSize.size_10}
                      color={Colors.primaryWhiteHex}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
          style={styles.CartItemSingleLinearGradient}
        >
          <View>
            <Image
              source={imageLink_square}
              style={styles.CardItemSingleImage}
            />
          </View>
          <View style={styles.CartItemSingleInfoContainer}>
            <View>
              <Text style={styles.CartItemTitles}>{nameCoffee}</Text>
              <Text style={styles.CartItemSubTitles}>{special_ingredient}</Text>
            </View>
            <View style={styles.CartItemSingleSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        type === "Bean" ? FontSize.size_12 : FontSize.size_16,
                    },
                  ]}
                >
                  {prices[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                {prices[0]?.currency}{" "}
                <Text style={styles.SizePrice}>{prices[0]?.price}</Text>
              </Text>
            </View>
            <View style={styles.CartItemSizeSingleValueContainer}>
              <TouchableOpacity
                onPress={() =>
                  decrementCartItemQuantityHandler(id, prices[0]?.size)
                }
                style={styles.CartItemIcon}
              >
                <Icon
                  name="minus"
                  size={FontSize.size_10}
                  color={Colors.primaryWhiteHex}
                />
              </TouchableOpacity>
              <View style={styles.CartItemQuantityContainer}>
                <Text style={styles.CartItemQuantityText}>
                  {prices[0]?.quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  incrementCartItemQuantityHandler(id, prices[0]?.size)
                }
                style={styles.CartItemIcon}
              >
                <Icon
                  name="plus"
                  size={FontSize.size_10}
                  color={Colors.primaryWhiteHex}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  LinearGradientBG: {
    flex: 1,
    gap: Spacing.space_12,
    padding: Spacing.space_12,
    borderRadius: BorderRadius.radius_25,
  },
  CardItemRow: {
    flexDirection: "row",
    gap: Spacing.space_12,
    flex: 1,
  },
  CardItemImage: {
    height: 130,
    width: 130,
    borderRadius: BorderRadius.radius_25,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: Spacing.space_4,
    justifyContent: "space-between",
  },
  CartItemTitles: {
    fontFamily: FontFamily.poppins_medium,
    fontSize: FontSize.size_18,
    color: Colors.primaryWhiteHex,
    marginBottom: Spacing.space_10,
  },
  CartItemSubTitles: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: FontSize.size_12,
    color: Colors.secondaryLightGreyHex,
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + Spacing.space_20,
    borderRadius: BorderRadius.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryDarkGreyHex,
  },
  CartItemRoastedText: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: FontSize.size_12,
    color: Colors.primaryWhiteHex,
  },
  CartItemSizeRowContainerFather: {
    gap: Spacing.space_12,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.space_20,
    flexDirection: "row",
    justifyContent: "center",
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizeBox: {
    backgroundColor: Colors.primaryBlackHex,
    height: 40,
    width: 100,
    borderRadius: BorderRadius.radius_10,
    justifyContent: "center",
    alignItems: "center",
  },
  SizeText: {
    fontFamily: FontFamily.poppins_medium,
    color: Colors.secondaryLightGreyHex,
  },
  SizeCurrency: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_18,
    color: Colors.primaryOrangeHex,
  },
  SizePrice: {
    color: Colors.primaryWhiteHex,
  },
  CartItemIcon: {
    backgroundColor: Colors.primaryOrangeHex,
    padding: Spacing.space_12,
    borderRadius: BorderRadius.radius_10,
  },
  CartItemQuantityContainer: {
    backgroundColor: Colors.primaryBlackHex,
    width: 70,
    borderRadius: BorderRadius.radius_10,
    borderWidth: 2,
    borderColor: Colors.primaryOrangeHex,
    alignItems: "center",
    paddingVertical: Spacing.space_8,
  },
  CartItemQuantityText: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_18,
    color: Colors.primaryWhiteHex,
  },
  CartItemSingleLinearGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.space_12,
    gap: Spacing.space_12,
    borderRadius: BorderRadius.radius_25,
  },
  CardItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BorderRadius.radius_25,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  CartItemSizeSingleValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
export default CartItem;
