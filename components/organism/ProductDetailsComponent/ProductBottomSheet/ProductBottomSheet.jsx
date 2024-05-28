import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { View, Text, Image } from "react-native";

import { COLORS } from "../../../../constants";

const ProductBottomSheet = ({ isOpen, onClose, data = [], product_name }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent minHeight="80%" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack w="$full" padding={7}>
          <ScrollView>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: 20,
                  color: COLORS.primary,
                }}
              >
                {product_name}
              </Text>

              <Text style={{ fontFamily: "semibold", fontSize: 18 }}>
                Styling References :
              </Text>

              <View style={{ gap: 15 }}>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row", gap: 15 }}>
                      <View style={{ width: 180, height: 200 }}>
                        <Image
                          source={
                            item.image_url
                              ? { uri: item.image_url }
                              : require("../../../../assets/content/empty_product.png")
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={{
                            fontFamily: "medium",
                            color: COLORS.darkGray,
                          }}
                        >
                          Height: {item?.model_height} cm
                        </Text>
                        <Text
                          style={{
                            fontFamily: "medium",
                            color: COLORS.darkGray,
                          }}
                        >
                          Weight : {item?.model_weight} kg
                        </Text>
                        <Text
                          style={{
                            fontFamily: "medium",
                            color: COLORS.darkGray,
                          }}
                        >
                          Size: {item?.product_size}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View>
                    <Text
                      style={{ fontFamily: "medium", color: COLORS.darkGray }}
                    >
                      No Reference for this product
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default ProductBottomSheet;
