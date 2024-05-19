import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { usePostAddressApi } from "../../../API/AddressApi";

const fields = [
  {
    label: "Address Label",
    placeholder: "Enter Address Label",
    key: "name",
  },
  {
    label: "Receiver Name",
    placeholder: "Enter Receiver Name",
    key: "receiver_name",
  },
  { label: "Country", placeholder: "Enter Country", key: "country" },
  { label: "Province", placeholder: "Enter Province", key: "province" },
  { label: "City", placeholder: "Enter City", key: "city" },
  { label: "District", placeholder: "Enter District", key: "district" },
  {
    label: "Postal Code",
    placeholder: "Enter Postal Code",
    key: "postal_code",
    keyboardType: "numeric",
  },
  {
    label: "Full Address",
    placeholder: "Enter Full Address",
    key: "address",
  },
  {
    label: "Mobile Phone",
    placeholder: "Enter Mobile Phone",
    key: "mobile",
    keyboardType: "numeric",
  },
  {
    label: "Telephone (Optional)",
    placeholder: "Enter Telephone",
    key: "telephone",
  },
];

const ManageAddress = () => {
  const navigation = useNavigation();
  const baseData = {
    name: "",
    receiver_name: "",
    country: "",
    province: "",
    city: "",
    district: "",
    postal_code: "",
    address: "",
    mobile: "",
    telephone: "",
  };
  const [formData, setFormData] = useState(baseData);

  const { postAddress, code, setCode } = usePostAddressApi();

  const { telephone, ...requiredFields } = formData;

  const formValid = Object.values(requiredFields).every(
    (value) => value.length > 0,
  );

  const handleGoBack = () => {
    navigation.goBack();
    setFormData(baseData);
  };
  const handleChange = (key, value) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = () => {
    postAddress(formData);
  };

  useEffect(() => {
    if (code === 201) {
      setFormData(baseData);
      alert("Address added successfully");
      setCode(null);
      navigation.goBack();
    }
  }, [code]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          gap: 20,
          borderBottomWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.primary}
          onPress={handleGoBack}
        />
        <Text style={{ fontFamily: "medium", fontSize: 16 }}>
          Manage Address
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ paddingHorizontal: 15, backgroundColor: COLORS.white }}
        >
          <View style={{ gap: 24, paddingVertical: 15 }}>
            {fields.map(({ label, placeholder, key, keyboardType }) => (
              <FormControl key={key}>
                <FormControlLabel>
                  <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                    {label}
                  </Text>
                </FormControlLabel>
                <Input variant="underlined" borderColor={COLORS.darkGray}>
                  <InputField
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={formData[key]}
                    onChangeText={(value) => handleChange(key, value)}
                  />
                </Input>
              </FormControl>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ padding: 15 }}>
        <Button
          isDisabled={!formValid}
          variant="solid"
          bgColor={!formValid ? COLORS.gray2 : COLORS.primary}
          onPress={handleSubmit}
          size="sm"
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "semibold",
              fontSize: 18,
            }}
          >
            Add Address
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ManageAddress;
