import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputField,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useCityApi,
  useDistrictApi,
  useEditAddressApi,
  usePostAddressApi,
  useProvinceApi,
} from "../../../API/AddressApi";
import { COLORS } from "../../../constants";
import { SelectComponent } from "../../molecules";

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
    province: "",
    city: "",
    district: "",
    postal_code: "",
    address: "",
    mobile: "",
    telephone: "",
  };
  const [formData, setFormData] = useState(baseData);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { postAddress, code, setCode } = usePostAddressApi();
  const {
    editAddress,
    code: editCode,
    setCode: setEditCode,
  } = useEditAddressApi();
  const { getProvince, province } = useProvinceApi();
  const { city, getCity } = useCityApi();
  const { district, getDistrict } = useDistrictApi();

  const { telephone, ...requiredFields } = formData;

  const formValid = Object.values(requiredFields).every(
    (value) => value?.length > 0,
  );

  const toast = useToast();

  const route = useRoute();
  const { edit_data } = route.params;

  useEffect(() => {
    getProvince();

    if (selectedProvince?.id) {
      getCity(selectedProvince?.id);
    }

    if (selectedCity?.id) {
      getDistrict(selectedCity?.id);
    }
  }, [selectedProvince?.id, selectedCity?.id]);

  useEffect(() => {
    const isAddressDirty =
      formData.name !== (edit_data?.name || "") ||
      formData.receiver_name !== (edit_data?.receiver_name || "") ||
      formData.province !== (edit_data?.province || "") ||
      formData.city !== (edit_data?.city || "") ||
      formData.district !== (edit_data?.district || "") ||
      formData.postal_code !== (edit_data?.postal_code || "") ||
      formData.address !== (edit_data?.address || "") ||
      formData.mobile !== (edit_data?.mobile || "") ||
      formData.telephone !== (edit_data?.telephone || "");

    setIsDirty(isAddressDirty);
  }, [formData, edit_data]);

  useFocusEffect(
    useCallback(() => {
      if (edit_data) {
        setFormData({
          name: edit_data?.name,
          receiver_name: edit_data?.receiver_name,
          province: edit_data?.province,
          city: edit_data?.city,
          district: edit_data?.district,
          postal_code: edit_data?.postal_code,
          address: edit_data?.address,
          mobile: edit_data?.mobile,
          telephone: edit_data?.telephone,
        });
      }
    }, []),
  );

  const handleGoBack = () => {
    navigation.goBack();
    setFormData(baseData);
  };
  const handleChange = (key, value) => {
    if (key === "telephone" || key === "mobile") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prevState) => ({ ...prevState, [key]: numericValue }));
    } else {
      setFormData((prevState) => ({ ...prevState, [key]: value }));
    }
  };

  const handleSubmit = () => {
    if (edit_data) {
      editAddress(edit_data?.address_id, formData);
    } else {
      postAddress(formData);
    }
  };

  useEffect(() => {
    if (code === 201) {
      setFormData(baseData);
      toast.show({
        description: "Success!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Address added successfully!</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setCode(null);
      navigation.goBack();
    }
  }, [code]);

  useEffect(() => {
    if (editCode === 200) {
      toast.show({
        description: "Success!",
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack>
                <ToastTitle>Edit Address Succeed</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
      setEditCode(null);
      navigation.goBack();
    }
  }, [editCode]);

  const provinceDropdown = () => {
    return province?.map((item) => {
      return {
        id: item.id,
        label: item.name,
        value: item,
      };
    });
  };

  const cityDropdown = () => {
    return city?.map((item) => {
      return {
        id: item.id,
        label: item.name,
        value: item,
      };
    });
  };

  const districtDropdown = () => {
    return district?.map((item) => {
      return {
        id: item.id,
        label: item.name,
        value: item,
      };
    });
  };

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
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  Province
                </Text>
              </FormControlLabel>
              <SelectComponent
                placeholder="Province"
                items={provinceDropdown()}
                onValueChange={(value) => {
                  setSelectedProvince(value);
                  setFormData((prevState) => ({
                    ...prevState,
                    province: value?.name,
                  }));
                }}
                defaultValue={edit_data?.province}
              />
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  City
                </Text>
              </FormControlLabel>
              <SelectComponent
                placeholder="City"
                items={cityDropdown()}
                onValueChange={(value) => {
                  setSelectedCity(value);
                  setFormData((prevState) => ({
                    ...prevState,
                    city: value?.name,
                  }));
                }}
                defaultValue={edit_data?.city}
                disabled={!selectedProvince?.id && !edit_data?.province}
              />
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                  District
                </Text>
              </FormControlLabel>
              <SelectComponent
                placeholder="District"
                items={districtDropdown()}
                onValueChange={(value) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    district: value?.name,
                  }));
                }}
                defaultValue={edit_data?.district}
                disabled={!selectedCity?.id && !edit_data?.city}
              />
            </FormControl>

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
                    multiline={key === "address"}
                  />
                </Input>
              </FormControl>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ padding: 15 }}>
        {edit_data ? (
          <Button
            isDisabled={!isDirty}
            variant="solid"
            bgColor={!isDirty ? COLORS.secondary : COLORS.primary}
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
              Edit Address
            </Text>
          </Button>
        ) : (
          <Button
            isDisabled={!formValid}
            variant="solid"
            bgColor={!formValid ? COLORS.secondary : COLORS.primary}
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManageAddress;
