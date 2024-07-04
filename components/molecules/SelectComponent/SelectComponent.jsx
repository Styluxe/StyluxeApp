import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../../constants";

const SelectComponent = ({
  placeholder,
  items = [],
  onValueChange,
  defaultValue,
  disabled = false,
  minWidth,
}) => {
  return (
    <Select onValueChange={onValueChange} selectedValue={defaultValue}>
      <SelectTrigger
        variant="outline"
        size="sm"
        disabled={disabled}
        bg={disabled ? COLORS.lightGray : COLORS.white}
        minWidth={minWidth}
      >
        <SelectInput
          style={{ fontFamily: "medium", fontSize: 12 }}
          placeholder={placeholder}
        />
        <Ionicons name="chevron-down" size={24} color="black" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <ScrollView w="100%">
            {items.map((item, index) => (
              <SelectItem key={index} label={item?.label} value={item?.value} />
            ))}
          </ScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectComponent;
