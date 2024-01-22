import React from "react";
import { ImageProps, ScrollView, StyleSheet, Text, View } from "react-native";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { LinearGradient } from "expo-linear-gradient";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";

interface FavoriteItemCardProps {
  id: string;
  nameCoffee: string;
  type: string;
  description: string;
  ingredients: string;
  ratings_count: string;
  roasted: string;
  special_ingredient: string;
  imagelink_portrait: ImageProps;
  average_rating: number;
  favourite: boolean;
  ToggleFavourite: any;
}

const FavoriteItemCard: React.FC<FavoriteItemCardProps> = ({
  id,
  average_rating,
  nameCoffee,
  type,
  description,
  favourite,
  imagelink_portrait,
  ingredients,
  ratings_count,
  roasted,
  special_ingredient,
  ToggleFavourite,
}) => {

  return (
    <View style={styles.CartContainer}>
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imageLink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favourite={favourite}
        nameCoffee={nameCoffee}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        rating_count={ratings_count}
        roasted={roasted}
        ToggleFavourite={ToggleFavourite}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
        style={styles.ContainerGradient}
      >
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  CartContainer: {
    borderBottomLeftRadius: BorderRadius.radius_25,
    borderBottomRightRadius: BorderRadius.radius_25,
    overflow: "hidden",
  },

  ContainerGradient: {
    gap: Spacing.space_10,
    padding: Spacing.space_20,
  },
  DescriptionTitle: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_16,
    color: Colors.secondaryLightGreyHex,
  },
  DescriptionText: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_14,
    color: Colors.primaryWhiteHex,
  },
});
export default FavoriteItemCard;
