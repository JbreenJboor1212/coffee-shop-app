import React from "react";
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GradientIconNew from "./GradientIconNew";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imageLink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  nameCoffee: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  rating_count: string;
  roasted: string;
  backHandler?: any;
  ToggleFavourite: any;
}

const mobileWidth = Dimensions.get("window").width;

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imageLink_portrait,
  type,
  id,
  favourite,
  nameCoffee,
  special_ingredient,
  ingredients,
  average_rating,
  rating_count,
  roasted,
  backHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imageLink_portrait}
        style={styles.ImageStylesContainer}
      >
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBarContainerWithBack}>
            <TouchableOpacity onPress={() => backHandler()}>
              <GradientIconNew
                name="chevron-left"
                color={Colors.primaryLightGreyHex}
                size={FontSize.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}
            >
              <GradientIconNew
                name="heart"
                color={
                  favourite ? Colors.primaryRedHex : Colors.primaryLightGreyHex
                }
                size={FontSize.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ImageHeaderBarContainerWithOutBack}>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}
            >
              <GradientIconNew
                name="heart"
                color={
                  favourite ? Colors.primaryRedHex : Colors.primaryLightGreyHex
                }
                size={FontSize.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.ImageInFoOuterContainer}>
          <View style={styles.ImageInFoInnerContainer}>
            <View style={styles.InFoContainerRow}>
              <View>
                <Text style={styles.ItemTitleText}>{nameCoffee}</Text>
                <Text style={styles.ItemSubtitleText}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.ItemPropertiesContainer}>
                <View style={styles.PropsFirst}>
                  <Icon
                    name="coffee"
                    size={type === "Bean" ? FontSize.size_18 : FontSize.size_24}
                    color={Colors.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.PropertyTextFirst,
                      {
                        marginTop:
                          type === "Bean"
                            ? Spacing.space_4 + Spacing.space_2
                            : 0,
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </View>
                <View style={styles.PropsFirst}>
                  <Icon
                    name={type === "Bean" ? "location-arrow" : "eyedropper"}
                    size={FontSize.size_16}
                    color={Colors.primaryOrangeHex}
                  />
                  <Text style={styles.PropertyTextLast}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View style={styles.InFoContainerRow}>
              <View style={styles.RatingContainer}>
                <Icon
                  name="star"
                  color={Colors.primaryOrangeHex}
                  size={FontSize.size_20}
                />
                <Text style={styles.RatingText}>{average_rating}</Text>
                <Text style={styles.RatingCountText}>({rating_count})</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageStylesContainer: {
    width: mobileWidth,
    //specific width ratio to height
    aspectRatio: 20 / 25,
    justifyContent: "space-between",
  },
  ImageHeaderBarContainerWithBack: {
    padding: Spacing.space_30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ImageHeaderBarContainerWithOutBack: {
    padding: Spacing.space_30,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ImageInFoOuterContainer: {
    paddingVertical: Spacing.space_24,
    paddingHorizontal: Spacing.space_30,
    backgroundColor: Colors.primaryBlackRGBA,
    borderTopLeftRadius: BorderRadius.radius_20 * 2,
    borderTopRightRadius: BorderRadius.radius_20 * 2,
  },
  ImageInFoInnerContainer: {
    justifyContent: "space-between",
    gap: Spacing.space_15,
  },
  InFoContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ItemTitleText: {
    fontSize: FontSize.size_24,
    fontWeight: "bold",
    color: Colors.primaryWhiteHex,
    marginBottom: Spacing.space_10,
  },
  ItemSubtitleText: {
    fontSize: FontSize.size_12,
    color: Colors.primaryWhiteHex,
  },
  ItemPropertiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.space_15,
  },
  PropsFirst: {
    height: 55,
    width: 55,
    borderRadius: BorderRadius.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBlackHex,
  },
  PropertyTextFirst: {
    fontSize: FontSize.size_10,
    color: Colors.primaryWhiteHex,
    marginBottom: Spacing.space_10,
  },
  PropertyTextLast: {
    fontSize: FontSize.size_10,
    color: Colors.primaryWhiteHex,
    marginBottom: Spacing.space_10,
    marginTop: Spacing.space_2 + Spacing.space_4,
  },
  RatingContainer: {
    flexDirection: "row",
    gap: Spacing.space_10,
    alignItems: "center",
  },
  RatingText: {
    fontSize: FontSize.size_18,
    fontWeight: "bold",
    color: Colors.primaryWhiteHex,
  },
  RatingCountText: {
    fontSize: FontSize.size_12,
    color: Colors.primaryWhiteHex,
  },
  RoastedContainer: {
    height: 55,
    width: 55 * 2 + Spacing.space_16,
    borderRadius: BorderRadius.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBlackHex,
  },
  RoastedText: {
    fontSize: FontSize.size_12,
    color: Colors.primaryWhiteHex,
  },
});

export default ImageBackgroundInfo;
