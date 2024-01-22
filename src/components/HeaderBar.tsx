import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "../theme/theme";
import GradientBGIcon from "./GradientBGIcon";
import ProfilePic from "./ProfilePic";

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
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
});
