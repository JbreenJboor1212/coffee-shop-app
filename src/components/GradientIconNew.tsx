import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing } from "../theme/theme";
import CustomIcon from "./CustomIcon";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

interface GradientIconProps {
  name?: string;
  size?: number;
  color?: string;
}

const GradientIconNew: React.FC<GradientIconProps> = ({
  name,
  size,
  color,
}) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
        style={styles.LinearGradientBG}
      >
        <Icon name={name} size={size} color={color} />
      </LinearGradient>
    </View>
  );
};

export default GradientIconNew;

const styles = StyleSheet.create({
  Container: {
    borderWidth: 2,
    borderColor: Colors.secondaryDarkGreyHex,
    borderRadius: Spacing.space_12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryDarkGreyHex,
    overflow: "hidden",
  },
  LinearGradientBG: {
    height: Spacing.space_36,
    width: Spacing.space_36,
    alignItems: "center",
    justifyContent: "center",
  },
});
