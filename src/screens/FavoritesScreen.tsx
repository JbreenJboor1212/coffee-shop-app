import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Colors, Spacing } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import FavoriteItemCard from "../components/FavoriteItemCard";

const FavoritesScreen = ({ navigation }: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={Colors.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favorites" />
            {FavoritesList.length === 0 ? (
              <EmptyListAnimation title={"No Favorite"} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("Details", {
                        id: data?.id,
                        type: data?.type,
                        index: data?.index,
                      });
                    }}
                    key={data?.id}
                  >
                    <FavoriteItemCard
                      id={data?.id}
                      imagelink_portrait={data?.imagelink_portrait}
                      average_rating={data?.average_rating}
                      type={data?.type}
                      nameCoffee={data?.name}
                      description={data?.description}
                      favourite={data?.favourite}
                      ratings_count={data?.ratings_count}
                      ingredients={data?.ingredients}
                      roasted={data?.roasted}
                      special_ingredient={data?.special_ingredient}
                      ToggleFavourite={ToggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.space_20,
    gap: Spacing.space_20,
  },
});

export default FavoritesScreen;
