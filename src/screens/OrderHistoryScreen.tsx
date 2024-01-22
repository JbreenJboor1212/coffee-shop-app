import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PopUpAnimation from "../components/PopUpAnimation";
import OrderHistoryCard from "../components/OrderHistoryCard";

const OrderHistoryScreen = ({ navigation }: any) => {
  const orderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  //! Navigator Function
  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push("Details", { index, id, type });
  };

  //! Button Press Handler
  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={Colors.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/download.json")}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />
            {orderHistoryList.length === 0 ? (
              <EmptyListAnimation title={"No Order History"} />
            ) : (
              <View style={styles.ListItemContainer}>
                {orderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data?.CartList}
                    CartListPrice={data?.CartListPrice}
                    OrderDate={data?.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {orderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={() => {
                buttonPressHandler();
              }}
            >
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
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
  LottieAnimation: {
    height: 250,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: Spacing.space_20,
    gap: Spacing.space_30,
  },
  DownloadButton: {
    margin: Spacing.space_20,
    backgroundColor: Colors.primaryOrangeHex,
    alignItems: "center",
    justifyContent: "center",
    height: Spacing.space_36 * 2,
    borderRadius: BorderRadius.radius_20,
  },
  ButtonText: {
    color: Colors.primaryWhiteHex,
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_18,
  },
});

export default OrderHistoryScreen;
