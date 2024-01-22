/* import { create } from "zustand"; //!Create Store for render only on this component not all component
import { produce } from "immer"; //!Updated Store in Obj
import { createJsonStorage, persist } from "zustand/middleware"; //! Find wrong
import AsyncStorage from "@react-native-async-storage/async-storage"; //!Storage When be use
import CoffeeData from "../data/CoffeeData"; //!Data
import BeansData from "../data/BeansData"; //!Data */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";
import { produce } from "immer";

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartListNewNewNew: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce((state) => {
            let found = false;
            for (let i = 0; i < state.CartListNewNewNew.length; i++) {
              if (state.CartListNewNewNew[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (
                  let j = 0;
                  j < state.CartListNewNewNew[i].prices.length;
                  j++
                ) {
                  if (
                    state.CartListNewNewNew[i].prices[j].size ==
                    cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartListNewNewNew[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartListNewNewNew[i].prices.push(cartItem.prices[0]);
                }
                state.CartListNewNewNew[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartListNewNewNew.push(cartItem);
            }
          })
        ),
      calculateCartPrice: () =>
        set(
          produce((state) => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartListNewNewNew.length; i++) {
              let temPrice = 0;
              for (
                let j = 0;
                j < state.CartListNewNewNew[i].prices.length;
                j++
              ) {
                temPrice +=
                  parseFloat(state.CartListNewNewNew[i].prices[j].price) *
                  state.CartListNewNewNew[i].prices[j].quantity;
              }
              state.CartListNewNewNew[i].itemPrice = temPrice
                .toFixed(2)
                .toString();
              totalPrice = totalPrice + temPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          })
        ),
      addToFavoriteList: (type: string, id: string) => {
        set(
          produce((state) => {
            if (type === "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite === false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if (type === "Bean") {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  if (state.BeanList[i].favourite === false) {
                    state.BeanList[i].favourite = true;
                    state.FavoritesList.unshift(state.BeanList[i]);
                  }
                  break;
                }
              }
            }
          })
        );
      },
      deleteFromFavoriteList: (type: string, id: string) => {
        set(
          produce((state) => {
            if (type === "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite === true) {
                    state.CoffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type === "Bean") {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  if (state.BeanList[i].favourite === true) {
                    state.BeanList[i].favourite = false;
                  }
                  break;
                }
              }
            }
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id === id) {
                state.FavoritesList.splice(i, 1);
                i--;
              }
            }
          })
        );
      },
      incrementCartItemQuantity: (id: string, size: string) => {
        set(
          produce((state) => {
            for (let i = 0; i < state.CartListNewNewNew.length; i++) {
              if (state.CartListNewNewNew[i].id === id) {
                for (
                  let j = 0;
                  j < state.CartListNewNewNew[i].prices.length;
                  j++
                ) {
                  if (state.CartListNewNewNew[i].prices[j].size === size) {
                    state.CartListNewNewNew[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          })
        );
      },
      decrementCartItemQuantity: (id: string, size: string) => {
        set(
          produce((state) => {
            for (let i = 0; i < state.CartListNewNewNew.length; i++) {
              if (state.CartListNewNewNew[i].id === id) {
                for (
                  let j = 0;
                  j < state.CartListNewNewNew[i].prices.length;
                  j++
                ) {
                  if (state.CartListNewNewNew[i].prices[j].size === size) {
                    if (state.CartListNewNewNew[i].prices.length > 1) {
                      if (state.CartListNewNewNew[i].prices[j].quantity > 1) {
                        state.CartListNewNewNew[i].prices[j].quantity--;
                      } else {
                        state.CartListNewNewNew[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartListNewNewNew[i].prices[j].quantity > 1) {
                        state.CartListNewNewNew[i].prices[j].quantity--;
                      } else {
                        state.CartListNewNewNew.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          })
        );
      },
      addToOrderHistoryList: () => {
        set(
          produce((state) => {
            let temp = state.CartListNewNewNew.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.itemPrice),
              0
            );
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
                CartList: state.CartListNewNewNew,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
                CartList: state.CartListNewNewNew,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartListNewNewNew = [];
          })
        );
      },
    }),
    {
      name: "coffee-app",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
