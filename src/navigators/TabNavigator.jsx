import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import CartScreen from "../screens/CartScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import { Colors } from "../theme/theme";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/FontAwesome";

const tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView
                        tint="dark"
                        intensity={100}
                        style={styles.blurViewStyles}
                    />
                ),
            }}
        >
            {/* --------- Home screen -------- */}
            <tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="home"
                            size={25}
                            color={
                                focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex
                            }
                        />

                    ),
                }}
            ></tab.Screen>

            {/* --------- Cart screen -------- */}
            <tab.Screen name="Cart" component={CartScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                        name={"shopping-cart"}
                        size={25}
                        color={
                            focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex
                        }
                    />
                ),
            }}></tab.Screen>

            {/* --------- Favorite screen -------- */}
            <tab.Screen name="Favorite" component={FavoritesScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                        name="heart"
                        size={25}
                        color={
                            focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex
                        }
                    />
                ),
            }}></tab.Screen>

            {/* --------- History screen -------- */}
            <tab.Screen name="History" component={OrderHistoryScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                        name="bell"
                        size={25}
                        color={
                            focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex
                        }
                    />
                ),
            }}></tab.Screen>
        </tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: "absolute",
        backgroundColor: Colors.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: "transparent",
    },
    blurViewStyles: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },


});
