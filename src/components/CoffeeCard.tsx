import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import BGIcon from "./BGIcon";

//! Get Width the screen
const CARD_WIDTH = Dimensions.get("window").width * 0.32;

interface CoffeeCardProps {
  id: string;
  index: number;
  name: string;
  type: string;
  roasted: string;
  imageLink_square: string;
  special_ingredient: String;
  average_rating: number;
  prices: any;
  buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  name,
  type,
  roasted,
  imageLink_square,
  special_ingredient,
  average_rating,
  prices,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
      style={styles.CardLinearGradientContainer}
    >
      <ImageBackground
        source={imageLink_square}
        style={styles.CardImageBC}
        resizeMode="cover"
      >
        <View style={styles.CardRatingContainer}>
          <Icon
            name="star"
            color={Colors.primaryOrangeHex}
            size={FontSize.size_16}
          />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $ <Text style={styles.CardPrice}>{prices.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id: id,
              index: index,
              nameCoffee: name,
              roasted: roasted,
              imageLink_square: imageLink_square,
              special_ingredient: special_ingredient,
              type: type,
              prices: [{ ...prices, quantity: 1 }],
            });
          }}
        >
          <BGIcon
            name="plus"
            color={Colors.primaryWhiteHex}
            size={FontSize.size_10}
            BGColor={Colors.primaryOrangeHex}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: Spacing.space_15,
    borderRadius: BorderRadius.radius_25,
    marginRight: 20,
  },
  CardImageBC: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BorderRadius.radius_20,
    marginBottom: Spacing.space_15,
    overflow: "hidden",
  },
  CardRatingContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.space_10,
    paddingHorizontal: Spacing.space_15,
    position: "absolute",
    borderBottomLeftRadius: BorderRadius.radius_20,
    borderTopRightRadius: BorderRadius.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FontFamily.poppins_medium,
    color: Colors.primaryWhiteHex,
    fontSize: FontSize.size_14,
    lineHeight: 22,
  },
  CardTitle: {
    //fontFamily: FontFamily.poppins_medium,
    color: Colors.primaryWhiteHex,
    fontSize: FontSize.size_18,
    marginBottom: 3,
  },
  CardSubTitle: {
    fontFamily: FontFamily.poppins_light,
    color: Colors.primaryWhiteHex,
    fontSize: FontSize.size_12,
  },
  CardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.space_15,
  },
  CardPriceCurrency: {
    //fontFamily: FontFamily.poppins_semibold,
    color: Colors.primaryOrangeHex,
    fontSize: FontSize.size_18,
  },
  CardPrice: {
    color: Colors.primaryWhiteHex,
  },
});

export default CoffeeCard;
