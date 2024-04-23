import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, SHADOWS } from "../../../constants";
import { dummyDateList } from "../../../mocks/DummyStylist";
import { TimeSelect } from "../../molecules";

const StylistDate = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());

  const day = moment(date).format("dddd");

  const schedule = dummyDateList;
  const times = schedule.filter((s) => s.day === day)[0].times;

  const fullDate = moment(date).format("dddd, DD MMMM YYYY");
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedTime(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          gap: 15,
          paddingTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                ...SHADOWS.small,
                backgroundColor: COLORS.offwhite,
                padding: 15,
                borderRadius: 100,
              }}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "semibold",
              fontSize: 20,
              color: COLORS.darkGray,
            }}
          >
            Select a Date
          </Text>
        </View>

        <FlatList
          data={[1]}
          renderItem={() => (
            <>
              <View style={{ marginBottom: 24 }}>
                <CalendarPicker
                  onDateChange={handleDateChange}
                  previousComponent={
                    <Ionicons
                      name="chevron-back"
                      size={24}
                      color={COLORS.primary}
                    />
                  }
                  nextComponent={
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={COLORS.primary}
                    />
                  }
                  textStyle={{ fontFamily: "semibold", color: COLORS.darkGray }}
                  selectedDayStyle={{
                    backgroundColor: COLORS.secondary,
                  }}
                  minDate={new Date()}
                />
              </View>

              <View
                style={{ gap: 24, paddingHorizontal: 24, paddingBottom: 15 }}
              >
                <Text
                  style={{
                    fontFamily: "semibold",
                    color: COLORS.darkGray,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Select Time
                </Text>

                <FlatList
                  data={times}
                  numColumns={3}
                  columnWrapperStyle={{ gap: 10, marginTop: 10 }}
                  renderItem={({ item }) => (
                    <TimeSelect
                      setSelectedTime={setSelectedTime}
                      data={item}
                      selectedTime={selectedTime}
                    />
                  )}
                />
              </View>
            </>
          )}
        />
      </View>
      <View
        style={{
          paddingBottom: 21,
          paddingTop: 10,
          paddingHorizontal: 24,
          gap: 10,
          borderTopWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "semibold" }}> Date: </Text>
            <Text style={{ fontFamily: "medium" }}>{fullDate}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "semibold" }}> Time: </Text>
            <Text style={{ fontFamily: "medium" }}>
              {selectedTime ? selectedTime : "-"}
            </Text>
          </View>
        </View>

        <TouchableOpacity>
          <View
            style={{
              backgroundColor: COLORS.primary,
              alignItems: "center",
              paddingVertical: 14,
              borderRadius: 40,
            }}
          >
            <Text style={{ fontFamily: "semibold", color: COLORS.white }}>
              Proceed to Payment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StylistDate;
