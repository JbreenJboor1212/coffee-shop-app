import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "../store/store";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import { TouchableWithoutFeedback } from "react-native";
import PaymentFooter from "../components/PaymentFooter";

const DetailsScreen = ({ navigation, route }: any) => {
  /* 
  !Get Data
  */
  const itemOfIndex = useStore((state: any) =>
    route.params.type === "Coffee" ? state.CoffeeList : state.BeanList
  )[route.params.index];

  /* 
  !ADD To Favorites
  */
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  /* 
  !Delete From Favorites
  */
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );
  /* 
  !Toggle Likes
  */
  const ToggleFavourite = (favourite: boolean, type: string, id: number) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  /* 
  !Back Click
  */
  const BackHandler = () => {
    navigation.pop();
  };

  /* 
  !Add To Cart
  */
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  /* 
  !Use State
  */
  const [price, setPrice] = useState(itemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const addToCartHandler = ({
    id,
    index,
    nameCoffee,
    roasted,
    imageLink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      nameCoffee,
      roasted,
      imageLink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={Colors.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imageLink_portrait={itemOfIndex?.imagelink_portrait}
          type={itemOfIndex?.type}
          id={itemOfIndex?.id}
          favourite={itemOfIndex?.favourite}
          nameCoffee={itemOfIndex?.name}
          special_ingredient={itemOfIndex?.special_ingredient}
          ingredients={itemOfIndex?.ingredients}
          average_rating={itemOfIndex?.average_rating}
          rating_count={itemOfIndex?.ratings_count}
          roasted={itemOfIndex?.roasted}
          backHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            // Show all description or part from the description
            <Pressable
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text style={styles.DescriptionText}>
                {itemOfIndex.description}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {itemOfIndex.description}
              </Text>
            </Pressable>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {itemOfIndex.prices.map((data: any, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  setPrice(data);
                }}
                key={index}
                style={[
                  styles.SizerBox,
                  {
                    borderColor:
                      data.size === price.size
                        ? Colors.primaryOrangeHex
                        : Colors.primaryDarkGreyHex,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        itemOfIndex.type === "Bean"
                          ? FontSize.size_14
                          : FontSize.size_16,
                      color:
                        data.size === price.size
                          ? Colors.primaryOrangeHex
                          : Colors.secondaryLightGreyHex,
                    },
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle={"Add To Cart"}
          buttonPressHandler={() =>
            addToCartHandler({
              id: itemOfIndex.id,
              index: itemOfIndex.index,
              nameCoffee: itemOfIndex.name,
              roasted: itemOfIndex.roasted,
              imageLink_square: itemOfIndex.imagelink_square,
              special_ingredient: itemOfIndex.special_ingredient,
              type: itemOfIndex.type,
              price: price,
            })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBlackHex,
    flexDirection: "row",
  },
  ScrollViewFlex: {
    //How many item you want to add inside this container
    flexGrow: 1,
    justifyContent: "space-between",
  },
  FooterInfoArea: {
    padding: Spacing.space_20,
  },
  InfoTitle: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_16,
    color: Colors.primaryWhiteHex,
    marginBottom: Spacing.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FontFamily.poppins_regular,
    fontSize: FontSize.size_14,
    color: Colors.primaryWhiteHex,
    marginBottom: Spacing.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.space_20,
  },
  SizerBox: {
    flex: 1,
    backgroundColor: Colors.primaryGreyHex,
    alignItems: "center",
    justifyContent: "center",
    height: Spacing.space_24 * 2,
    borderRadius: BorderRadius.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FontFamily.poppins_medium,
  },
});

export default DetailsScreen;
