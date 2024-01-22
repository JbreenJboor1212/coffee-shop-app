import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BorderRadius, Spacing } from "../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome";

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({ name, color, size, BGColor }) => {
  return (
    <View style={[styles.IconBG, { backgroundColor: BGColor }]}>
      <Icon name={name} color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  IconBG: {
    height: Spacing.space_30,
    width: Spacing.space_30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BorderRadius.radius_8,
  },
});

export default BGIcon;
