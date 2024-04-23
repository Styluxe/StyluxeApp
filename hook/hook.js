/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Keyboard } from "react-native";

export const useKeyboardVisibility = (setIsContentVisible) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsContentVisible(false)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsContentVisible(true)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [setIsContentVisible]);
};
