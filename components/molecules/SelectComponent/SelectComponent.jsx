import { Ionicons } from "@expo/vector-icons";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import React from "react";

const SelectComponent = ({
  placeholder,
  items = [],
  onValueChange,
  defaultValue,
}) => {
  return (
    <Select onValueChange={onValueChange} selectedValue={defaultValue}>
      <SelectTrigger variant="outline" size="sm">
        <SelectInput
          style={{ fontFamily: "medium", fontSize: 12 }}
          placeholder={placeholder}
        />
        <Ionicons name="chevron-down" size={24} color="black" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem key={index} label={item?.label} value={item?.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectComponent;
