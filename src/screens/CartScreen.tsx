import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Colors, Spacing } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";
import CartItem from "../components/CartItem";

const CartScreen = ({ navigation, route }: any) => {
  const CartListNewNewNew = useStore((state: any) => state.CartListNewNewNew);
  const cartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push("Payment", { amount: cartPrice });
  };

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
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
            <HeaderBar title="Cart" />
            {CartListNewNewNew.length === 0 ? (
              <EmptyListAnimation title={"Cart Is Empty"} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartListNewNewNew.map((data: any) => (
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
                    <CartItem
                      id={data?.id}
                      nameCoffee={data?.nameCoffee}
                      imageLink_square={data?.imageLink_square}
                      special_ingredient={data?.special_ingredient}
                      type={data?.type}
                      roasted={data?.roasted}
                      prices={data?.prices}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {CartListNewNewNew.length !== 0 ? (
            <PaymentFooter
              price={{ price: cartPrice, currency: "$" }}
              buttonPressHandler={buttonPressHandler}
              buttonTitle={"Pay"}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

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
    paddingHorizontal: Spacing.space_20,
    gap: Spacing.space_20,
  },
});
