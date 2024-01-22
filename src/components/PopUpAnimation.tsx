import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../theme/theme";
import { LottieView } from "@bounceapp/lottie";

interface PopUpAnimationProps {
  style: any;
  source: any;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({ style, source }) => {
  return (
    <View style={styles.LottieAnimationContainer}>
      <LottieView style={style} source={source} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  LottieAnimationContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: Colors.secondaryBlackRGBA,
    justifyContent: "center",
  },
});
export default PopUpAnimation;
