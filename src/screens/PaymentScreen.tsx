import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Spacing,
} from "../theme/theme";
import GradientIconNew from "../components/GradientIconNew";
import PaymentMethod from "../components/PaymentMethod";
import PaymentFooter from "../components/PaymentFooter";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store/store";
import PopUpAnimation from "../components/PopUpAnimation";

const PaymentList = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Google Play",
    icon: require("../assets/app_images/gpay.png"),
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: require("../assets/app_images/applepay.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("../assets/app_images/amazonpay.png"),
    isIcon: false,
  },
];

const PaymentScreen = ({ navigation, route }: any) => {
  //! Get Price
  const { amount } = route.params;
  //! From Store
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryList = useStore(
    (state: any) => state.addToOrderHistoryList
  );

  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);

  //! Press Handler
  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryList();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate("History");
    }, 2000);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={Colors.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/successful.json")}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <GradientIconNew
              name="chevron-left"
              color={Colors.primaryLightGreyHex}
              size={FontSize.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView}></View>
        </View>
        <View style={styles.PaymentOptionalContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode("Credit Card");
            }}
          >
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode === "Credit Card"
                      ? Colors.primaryOrangeHex
                      : Colors.primaryGreyHex,
                },
              ]}
            >
              <Text style={styles.CreditCartTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                  style={styles.LinearGradientCreditCard}
                >
                  <View style={styles.CreditCardRow}>
                    <Ionicons
                      name="card"
                      color={Colors.primaryOrangeHex}
                      size={FontSize.size_20 * 2}
                    />
                    <Text style={styles.VisaText}>Visa</Text>
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>8923</Text>
                    <Text style={styles.CreditCardNumber}>6745</Text>
                    <Text style={styles.CreditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubTitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubTitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList?.map((data: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setPaymentMode(data?.name);
              }}
            >
              <PaymentMethod
                paymentMode={paymentMode}
                name={data?.name}
                icon={data?.icon}
                isIcon={data?.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        price={{ price: amount, currency: "$" }}
        buttonPressHandler={buttonPressHandler}
        buttonTitle={`Pay With ${paymentMode}`}
      />
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
    flex: 1,
  },
  HeaderContainer: {
    padding: Spacing.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  HeaderText: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_20,
    color: Colors.primaryWhiteHex,
  },
  EmptyView: {
    height: Spacing.space_36,
    width: Spacing.space_36,
  },
  PaymentOptionalContainer: {
    padding: Spacing.space_15,
    gap: Spacing.space_15,
  },
  CreditCardContainer: {
    padding: Spacing.space_10,
    gap: Spacing.space_10,
    borderRadius: BorderRadius.radius_15,
    borderWidth: 3,
  },
  CreditCartTitle: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_14,
    color: Colors.primaryWhiteHex,
    marginLeft: Spacing.space_10,
  },
  CreditCardBG: {
    backgroundColor: Colors.primaryGreyHex,
    borderRadius: BorderRadius.radius_25,
  },
  LinearGradientCreditCard: {
    borderRadius: BorderRadius.radius_25,
    gap: Spacing.space_36,
    paddingHorizontal: Spacing.space_15,
    paddingVertical: Spacing.space_10,
  },
  CreditCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  VisaText: {
    fontFamily: "Script",
    transform: [{ skewX: "-10deg" }],
    fontSize: FontSize.size_28,
    color: Colors.primaryWhiteHex,
  },
  CreditCardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.space_10,
    alignItems: "center",
  },
  CreditCardNumber: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: FontSize.size_18,
    color: Colors.primaryWhiteHex,
    letterSpacing: Spacing.space_4 + Spacing.space_4,
  },
  CreditCardNameContainer: {
    alignItems: "flex-start",
  },
  CreditCardNameSubTitle: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: FontSize.size_12,
    color: Colors.secondaryLightGreyHex,
  },
  CreditCardDateContainer: {
    alignItems: "flex-end",
  },
  CreditCardNameTitle: {
    fontFamily: FontFamily.poppins_medium,
    fontSize: FontSize.size_18,
    color: Colors.primaryWhiteHex,
  },
});

export default PaymentScreen;
