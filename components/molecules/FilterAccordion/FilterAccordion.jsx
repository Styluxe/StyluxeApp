import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Text } from "react-native";

import { COLORS } from "../../../constants";

const FilterAccordion = ({
  selectedSize,
  setSelectedSize,
  selectedSort,
  setSelectedSort,
}) => {
  const accordionDataShirt = [
    {
      id: "a",
      label: "Sort By",
      child: [
        {
          id: 11,
          label: "Price: Low to High",
          value: {
            order: "asc",
            sortBy: "price",
          },
        },
        {
          id: 22,
          label: "Price: High to Low",
          value: {
            order: "desc",
            sortBy: "price",
          },
        },
        {
          id: 33,
          label: "Name: A to Z",
          value: {
            order: "asc",
            sortBy: "name",
          },
        },
        {
          id: 44,
          label: "Name: Z to A",
          value: {
            order: "desc",
            sortBy: "name",
          },
        },
      ],
    },
    {
      id: "b",
      label: "Size",
      child: [
        {
          id: 1,
          label: "S",
          value: "S",
        },
        {
          id: 2,
          label: "M",
          value: "M",
        },
        {
          id: 3,
          label: "L",
          value: "L",
        },
        {
          id: 4,
          label: "XL",
          value: "XL",
        },
        {
          id: 5,
          label: "30",
          value: "30",
        },
        {
          id: 6,
          label: "32",
          value: "32",
        },
        {
          id: 7,
          label: "34",
          value: "34",
        },
        {
          id: 8,
          label: "36",
          value: "36",
        },
      ],
    },
  ];

  return (
    <Accordion
      size="sm"
      variant="unfilled"
      type="single"
      isCollapsible
      isDisabled={false}
      gap={15}
    >
      {accordionDataShirt.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            value={item.id}
            borderColor={COLORS.gray2}
            borderWidth={1}
          >
            <AccordionHeader backgroundColor={COLORS.bgGray}>
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                      <Text
                        style={{
                          fontFamily: "semibold",
                          fontSize: 16,
                          color: COLORS.darkGray,
                        }}
                      >
                        {item.label}
                      </Text>
                      {isExpanded ? (
                        <Ionicons
                          name="chevron-up"
                          size={24}
                          color={COLORS.darkGray}
                        />
                      ) : (
                        <Ionicons
                          name="chevron-down"
                          size={24}
                          color={COLORS.darkGray}
                        />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <VStack>
                {item.child.map((child, index) => {
                  return (
                    <HStack key={index} gap={5}>
                      <MaterialIcons
                        name={
                          selectedSize?.label === child.label ||
                          selectedSort?.label === child.label
                            ? "radio-button-checked"
                            : "radio-button-unchecked"
                        }
                        color={COLORS.primary}
                        size={24}
                        onPress={() => {
                          if (item.label === "Size") {
                            setSelectedSize(child);
                          } else if (item.label === "Sort By") {
                            setSelectedSort(child);
                          }
                        }}
                      />
                      <Text style={{ fontFamily: "medium", fontSize: 18 }}>
                        {child.label}
                      </Text>
                    </HStack>
                  );
                })}
              </VStack>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FilterAccordion;
