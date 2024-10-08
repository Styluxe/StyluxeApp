import { Feather, Ionicons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {
  useDeleteScheduleApi,
  useUpdateTimeApi,
} from "../../../API/StylistApi";
import { COLORS } from "../../../constants";
import { formatTimeWithAMPM } from "../../../hook/hook";

const EditableTimeSelect = ({ id, time, isAvailable, isDeleting }) => {
  const editTime = new Date(`2024-05-14T${time}:00+07:00`);

  const { updateStatus, updateTime } = useUpdateTimeApi();
  const { deleteSchedule } = useDeleteScheduleApi();

  const onChange = (event, selectedTime) => {
    if (event.type === "set") {
      const formatTime = moment(selectedTime).format("HH:mm");

      updateTime(id, formatTime);
    }
  };

  const onCardPress = () => {
    if (isAvailable) {
      updateStatus(id, "Unavailable");
    } else {
      updateStatus(id, "Available");
    }
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: editTime,
      mode: "time",
      is24Hour: true,
      display: "spinner",
      onChange,
    });
  };

  const onDelete = () => {
    deleteSchedule(id);
  };
  return (
    <TouchableOpacity
      style={{
        width: "30%",
      }}
      onPress={onCardPress}
    >
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.secondary,
          alignItems: "center",
          backgroundColor: COLORS.white,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={isDeleting ? onDelete : showTimePicker}
          style={{
            padding: 5,
            borderRadius: 100,
            backgroundColor: isDeleting ? "red" : COLORS.primary,
            position: "absolute",
            right: 0,
            bottom: 28,
          }}
        >
          <Feather
            name={isDeleting ? "trash-2" : "edit"}
            size={14}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Ionicons
          name={isAvailable ? "radio-button-on" : "radio-button-off"}
          size={14}
          color={isAvailable ? "green" : "gray"}
        />

        <Text
          style={{
            fontFamily: "semibold",
            color: COLORS.primary,
            fontSize: 12,
          }}
        >
          {formatTimeWithAMPM(time) + " WIB"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EditableTimeSelect;
