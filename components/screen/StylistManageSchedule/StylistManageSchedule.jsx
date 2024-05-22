import { Ionicons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAddTimeApi, useGetScheduleApi } from "../../../API/StylistApi";
import { COLORS } from "../../../constants";
import { EditableTimeSelect } from "../../molecules";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const StylistManageSchedule = () => {
  const { getSchedule, scheduleData } = useGetScheduleApi();
  const { addTime } = useAddTimeApi();
  const [sortedScheduleData, setSortedScheduleData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getSchedule();
    }, []),
  );

  useEffect(() => {
    if (scheduleData) {
      const sortedData = [...scheduleData].sort((a, b) => {
        return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
      });
      setSortedScheduleData(sortedData);
    }
  }, [scheduleData]);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color={COLORS.primary}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontFamily: "bold" }}>
            Manage Your Schedule
          </Text>
        </View>

        <Ionicons
          name={isDeleting ? "checkmark-circle-outline" : "trash-outline"}
          size={24}
          color={isDeleting ? COLORS.green : COLORS.red}
          onPress={() => setIsDeleting(!isDeleting)}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sortedScheduleData}
        contentContainerStyle={{
          paddingHorizontal: 5,
          paddingVertical: 10,
          gap: 30,
        }}
        renderItem={({ item }) => {
          const onAddTime = (time) => {
            const formattedTime = moment(time).format("HH:mm");
            console.log("formattedTime", formattedTime);
            const addData = {
              stylist_schedule_id: item.stylist_schedule_id,
              times: [
                {
                  time: formattedTime,
                  status: "Available",
                },
              ],
            };
            addTime(addData);
          };

          const showTimePicker = () => {
            DateTimePickerAndroid.open({
              value: new Date(),
              mode: "time",
              is24Hour: true,
              display: "spinner",
              onChange: (event, selectedTime) => {
                if (event.type === "set") {
                  onAddTime(selectedTime);
                }
              },
            });
          };

          return (
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 5,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: COLORS.gray2,
                backgroundColor: COLORS.white,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: "bold" }}>
                  {item.day}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "medium",
                    color: COLORS.darkGray,
                    textDecorationLine: "underline",
                  }}
                  onPress={showTimePicker}
                >
                  Add Time
                </Text>
              </View>
              <FlatList
                numColumns={3}
                data={item.times}
                columnWrapperStyle={{
                  marginTop: 10,
                  flex: 1,
                  justifyContent: "flex-start",
                  gap: 10,
                }}
                style={{ gap: 10 }}
                ListEmptyComponent={() => (
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 14, fontFamily: "medium" }}>
                      No time added yet
                    </Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <EditableTimeSelect
                    time={item.time}
                    id={item.stylist_schedule_time_id}
                    isAvailable={item.status === "Available"}
                    isDeleting={isDeleting}
                  />
                )}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default StylistManageSchedule;
