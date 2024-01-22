import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, Spacing } from "../theme/theme";

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require("../../src/assets/app_images/avatar.png")}
        style={styles.Image}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  ImageContainer: {
    height: Spacing.space_36,
    width: Spacing.space_36,
    borderRadius: Spacing.space_12,
    borderWidth: 2,
    borderColor: Colors.primaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  Image: {
    height: Spacing.space_36,
    width: Spacing.space_36,
  },
});
