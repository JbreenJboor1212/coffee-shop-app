import { LottieView } from "@bounceapp/lottie";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, FontFamily, FontSize } from "../theme/theme";

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require("../lottie/coffeecup.json")}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: "center",
  },
  LottieStyle: {
    height: 300,
  },
  LottieText: {
    fontFamily: FontFamily.poppins_medium,
    fontSize: FontSize.size_24,
    color: Colors.primaryOrangeHex,
    textAlign: "center",
  },
});

export default EmptyListAnimation;
