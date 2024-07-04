import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { PaymentMethodCard } from "../../molecules";
import { useGetStylistByAuthApi } from "../../../API/StylistApi";
import { useSelector } from "react-redux";
import { userDataState } from "../../../redux/slice/app.slice";

const StylistBalance = () => {
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { getStylistByAuth, stylistData } = useGetStylistByAuthApi();
  const [amount, setAmount] = useState(0);
  const userData = useSelector(userDataState);

  useFocusEffect(
    useCallback(() => {
      getStylistByAuth();
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          gap: 20,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
          backgroundColor: COLORS.white,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ fontFamily: "medium", fontSize: 18 }}>My Balance</Text>
      </View>
      <View style={{ gap: 5, flex: 1, backgroundColor: COLORS.bgGray }}>
        <View
          style={{
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={
              userData?.profile_picture
                ? { uri: userData?.profile_picture }
                : require("../../../assets/content/profpic.png")
            }
            style={{ width: 90, height: 90, borderRadius: 100 }}
          />
          <View style={{ gap: 1, alignItems: "flex-start" }}>
            <Text style={{ fontSize: 18, fontFamily: "bold" }}>
              {stylistData?.user?.first_name +
                " " +
                stylistData?.user?.last_name}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "medium" }}>
              My Balance
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "semibold" }}>
              Rp.{" "}
              {parseFloat(stylistData?.balance || 0).toLocaleString("id-UD")}
            </Text>
          </View>
        </View>
        <View style={{ padding: 15, gap: 1, backgroundColor: COLORS.white }}>
          <Text style={{ fontSize: 18, fontFamily: "medium" }}>
            Enter Amount
          </Text>
          <TextInput
            placeholder="0"
            style={{
              borderColor: COLORS.gray2,
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            keyboardType="numeric"
            onChangeText={(text) => {
              if (text > stylistData?.balance) {
                setAmount(stylistData?.balance);
              } else {
                const numericValue = text.replace(/[^0-9]/g, "");
                setAmount(numericValue);
              }
            }}
            value={amount}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 15,
            backgroundColor: COLORS.white,
            gap: 15,
            flex: 1,
          }}
        >
          <Text style={{ fontFamily: "medium", fontSize: 14 }}>
            Choose your Transfer Method
          </Text>

          <PaymentMethodCard
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
        </View>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 14,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderColor: COLORS.gray2,
          }}
        >
          <View style={{ gap: 5 }}>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.darkGray,
              }}
            >
              Total Transfer
            </Text>
            <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
              Rp {amount}
            </Text>
          </View>

          <Button
            disabled={!selectedPayment || !amount}
            bgColor={
              !selectedPayment || !amount ? COLORS.gray2 : COLORS.primary
            }
          >
            <ButtonText
              style={{
                color: COLORS.white,
                fontFamily: "semibold",
                fontSize: 14,
              }}
            >
              Transfer
            </ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StylistBalance;
