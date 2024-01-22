/* Import Method */
import React from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Import Components */
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
/* Get Data */
import { useStore } from "../store/store"; //!get data
/* Import Method */
import { filterSameData } from "../skills/FliterSameData";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import CoffeeCard from "../components/CoffeeCard";

const fetchDataAccordingTypeCategory = (coffeeList, name) => {
  if (name === "All") {
    return coffeeList;
  } else {
    let newCoffeeList = coffeeList?.filter((item) => item?.name === name);
    return newCoffeeList;
  }
};

const HomeScreen = ({ navigation }: any) => {
  /* ----------- Get Data ----------- */
  const coffeeList = useStore((state) => state.CoffeeList);
  const beanList = useStore((state) => state.BeanList);

  /* ------------- Filter Data From CoffeeList ----------- */
  let newData = filterSameData(coffeeList);

  /* ------------- useState ----------- */
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: newData[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(
    fetchDataAccordingTypeCategory(coffeeList, categoryIndex.category)
  );

  /* 
  !Add To Cart
  */
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const coffeeCardAddToCart = ({
    id,
    index,
    nameCoffee,
    roasted,
    imageLink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      nameCoffee,
      roasted,
      imageLink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    toast.success(`${nameCoffee} is added to cart`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // Duration in milliseconds
    });
  };

  const [searchText, setSearchText] = useState("");
  const [text, setText] = useState("all");

  /* ----------- Get Height To Tap Bar ----------- */
  const tabBarHeight = useBottomTabBarHeight();

  /* ----------- Get Ref is flatList ----------- */
  /* --- When change the data it is move form end to start by animated not static change */
  const ListRef: any = useRef<FlatList>();

  /* ------ SearchText To Change Data In All ,For show data in text input ------ */
  const searchCoffee = (search: string) => {
    if (search !== "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
    setCategoryIndex({ index: 0, category: newData[0] });
    setSortedCoffee(
      coffeeList?.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  /* ------- Reset Search and convert data to normal situation ------ */
  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: newData[0] });
    setSortedCoffee(coffeeList);
    setSearchText("");
  };

  return (
    <>
      <ToastContainer
        theme={{
          backgroundColor: "green",
          textColor: "white",
          border: {
            color: "black",
            width: 2,
          },
        }}
      />
      <View style={styles.ScreenContainer}>
        <StatusBar backgroundColor={Colors.primaryBlackHex} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}
        >
          {/* App Header */}
          <HeaderBar />
          {/* Text Inside */}
          <Text style={styles.ScreenTitle}>
            Find The Best {"\n"}Coffee For You
          </Text>
          {/* View Container */}
          <View style={styles.InputContainerComponent}>
            <TouchableOpacity
              onPress={() => {
                searchCoffee(searchText);
              }}
            >
              <Icon
                name="search"
                size={FontSize.size_28}
                color={
                  searchText.length > 0
                    ? Colors.primaryOrangeHex
                    : Colors.primaryGreyHex
                }
                style={styles.InputIcon}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Find Your Coffee..."
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                searchCoffee(text);
              }}
              placeholderTextColor={Colors.primaryLightGreyHex}
              style={styles.TextInputContainer}
            />
            {searchText.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  resetSearchCoffee();
                }}
              >
                <Icon
                  style={styles.InputIcon}
                  name="close"
                  color={Colors.primaryLightGreyHex}
                  size={FontSize.size_28}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          {/* Category Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.CategoryScrollViewStyle}
          >
            {newData?.map((category, index) => (
              <View
                key={index.toString()}
                style={styles.CategoryScrollViewContainer}
              >
                <TouchableOpacity
                  onPress={() => {
                    ListRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                    setCategoryIndex({
                      index: index,
                      category: category,
                    });
                    setSortedCoffee(
                      fetchDataAccordingTypeCategory(coffeeList, category)
                    );
                  }}
                  style={styles.CategoryScrollViewItem}
                >
                  <Text
                    style={[
                      styles.CategoryText,
                      categoryIndex.index === index
                        ? { color: Colors.primaryOrangeHex }
                        : {},
                    ]}
                  >
                    {category}
                  </Text>
                  {categoryIndex.index === index ? (
                    <View style={styles.ActiveCategory} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {/* Coffee FlatList */}
          <FlatList
            ref={ListRef}
            horizontal
            ListEmptyComponent={
              <View style={styles.EmptyListContainer}>
                <Text
                  style={[styles.CategoryText, { fontSize: FontSize.size_18 }]}
                >
                  No Coffee Available
                </Text>
              </View>
            }
            showsHorizontalScrollIndicator={false}
            style={styles.FlatListContainer}
            data={sortedCoffee}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Details", {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    });
                  }}
                >
                  <CoffeeCard
                    id={item?.id}
                    index={item?.index}
                    name={item?.name}
                    type={item?.type}
                    roasted={item?.rosted}
                    imageLink_square={item?.imagelink_square}
                    special_ingredient={item?.special_ingredient}
                    average_rating={item?.average_rating}
                    prices={item?.prices[2]}
                    buttonPressHandler={coffeeCardAddToCart}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />

          {/* Title Beans */}
          <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

          {/* Beans FlatList */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
            //style={styles.FlatListContainer}
            data={beanList}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Details", {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    });
                  }}
                >
                  <CoffeeCard
                    id={item?.id}
                    index={item?.index}
                    name={item?.name}
                    type={item?.type}
                    roasted={item?.rosted}
                    imageLink_square={item?.imagelink_square}
                    special_ingredient={item?.special_ingredient}
                    average_rating={item?.average_rating}
                    prices={item?.prices[0]}
                    buttonPressHandler={coffeeCardAddToCart}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FontSize.size_28,
    fontWeight: "bold",
    color: Colors.primaryWhiteHex,
    paddingLeft: Spacing.space_30,
  },
  InputContainerComponent: {
    flexDirection: "row",
    margin: Spacing.space_30,
    borderRadius: BorderRadius.radius_20,
    backgroundColor: Colors.primaryDarkGreyHex,
    alignItems: "center",
  },
  InputIcon: {
    marginHorizontal: Spacing.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: Spacing.space_20 * 3,
    fontFamily: FontFamily.poppins_medium,
    fontSize: FontSize.size_18,
    color: Colors.primaryWhiteHex,
    /* width: "80%", */
  },

  CategoryScrollViewStyle: {
    paddingHorizontal: Spacing.space_20,
    marginBottom: Spacing.space_20,
  },

  CategoryScrollViewContainer: {
    paddingHorizontal: Spacing.space_15,
  },

  CategoryScrollViewItem: {
    alignItems: "center",
  },

  CategoryText: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_16,
    color: Colors.primaryLightGreyHex,
    marginBottom: Spacing.space_4,
  },

  ActiveCategory: {
    height: Spacing.space_10,
    width: Spacing.space_10,
    borderRadius: BorderRadius.radius_10,
    backgroundColor: Colors.primaryOrangeHex,
  },

  FlatListContainer: {
    //gap: Spacing.space_20,
    paddingVertical: Spacing.space_20,
    paddingHorizontal: Spacing.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get("window").width - Spacing.space_30 * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.space_32 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FontSize.size_18,
    marginLeft: Spacing.space_30,
    marginTop: Spacing.space_20,
    fontFamily: FontFamily.poppins_medium,
    color: Colors.secondaryLightGreyHex,
  },
});
