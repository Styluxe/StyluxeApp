import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Divider,
} from "@gluestack-ui/themed";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./ProductAccordion.style";
import { COLORS } from "../../../../constants";

const ProductAccordion = ({ accordionData }) => {
  const careRepeater = [
    {
      id: 1,
      title: "Washing",
      content: accordionData.care.washing,
    },
    {
      id: 2,
      title: "Bleaching",
      content: accordionData.care.bleaching,
    },
    {
      id: 3,
      title: "Drying",
      content: accordionData.care.drying,
    },
    {
      id: 4,
      title: "Iron",
      content: accordionData.care.iron,
    },
    {
      id: 5,
      title: "Dry Clean",
      content: accordionData.care.dry_clean,
    },
  ];

  const accordionRepeater = [
    {
      id: 1,
      title: "Details ",
      content: (
        <View style={{ gap: 5 }}>
          <View>
            {accordionData.details.map((item) => (
              <Text
                style={{ fontFamily: "regular" }}
                key={item}
              >{`\u2022 ${item}`}</Text>
            ))}
          </View>

          <Text style={{ fontFamily: "regular" }}>
            {accordionData.description}
          </Text>

          <TouchableOpacity>
            <View style={styles.reference_button}>
              <Text style={styles.reference_button_text}>
                View Outfit Reference
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      id: 2,
      title: "Materials",
      content: (
        <View style={{ gap: 5 }}>
          <View style={styles.detail_container}>
            <Text style={styles.detail_label}>Fabric</Text>
            <Text style={styles.detail_content}>
              {accordionData.materials.fabric}
            </Text>
          </View>
          <View style={styles.detail_container}>
            <Text style={styles.detail_label}>Transparency</Text>
            <Text style={styles.detail_content}>
              <View style={{ gap: 5, flexDirection: "row" }}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <FontAwesome
                    name={
                      item <= accordionData.materials.Transparency
                        ? "circle"
                        : "circle-o"
                    }
                    size={16}
                    key={item}
                    color={COLORS.primary}
                  />
                ))}
              </View>
            </Text>
          </View>
          <View style={styles.detail_container}>
            <Text style={styles.detail_label}>Thickness</Text>
            <Text style={styles.detail_content}>
              <View style={{ gap: 5, flexDirection: "row" }}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <FontAwesome
                    name={
                      item <= accordionData.materials.Thickness
                        ? "circle"
                        : "circle-o"
                    }
                    size={16}
                    key={item}
                    color={COLORS.primary}
                  />
                ))}
              </View>
            </Text>
          </View>
          <View style={styles.detail_container}>
            <Text style={styles.detail_label}>Stretchiness</Text>
            <Text style={styles.detail_content}>
              <View style={{ gap: 5, flexDirection: "row" }}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <FontAwesome
                    name={
                      item <= accordionData.materials.stretchiness
                        ? "circle"
                        : "circle-o"
                    }
                    size={16}
                    key={item}
                    color={COLORS.primary}
                  />
                ))}
              </View>
            </Text>
          </View>
        </View>
      ),
    },
    {
      id: 3,
      title: "Care Instructions",
      content: (
        <View style={{ gap: 5 }}>
          {careRepeater.map((item) => (
            <View key={item.id} style={styles.detail_container}>
              <Text style={styles.detail_label}>{item.title}</Text>
              <Text style={styles.detail_content}>{item.content}</Text>
            </View>
          ))}
        </View>
      ),
    },
  ];

  return (
    <Accordion
      m="$0"
      variant="unfilled"
      type="multiple"
      width="100%"
      defaultValue="Details"
    >
      {accordionRepeater.map((item) => (
        <View key={item.id}>
          <AccordionItem value={item.title} borderRadius="$lg">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText>{item.title}</AccordionTitleText>
                      {isExpanded ? (
                        <Ionicons name="chevron-up" size={24} />
                      ) : (
                        <Ionicons name="chevron-down" size={24} />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
          <Divider bg="$backgroundLight400" />
        </View>
      ))}
    </Accordion>
  );
};

export default ProductAccordion;
