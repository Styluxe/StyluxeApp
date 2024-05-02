import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants";
import { discussionExplore } from "../../../mocks/Dummydiscussion";
import { DiscussionHeader, DiscussionListCard } from "../../organism";
import { LoginModal } from "../../molecules";

const Discussion = () => {
  const navigation = useNavigation();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollOffset, setLastScrollOffset] = useState(0);
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const [refreshing, setRefreshing] = useState(false);
  const scrollTimeout = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    Animated.timing(iconOpacity, {
      toValue: scrollDirection === "down" ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [iconOpacity, scrollDirection]);

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 50) {
      navigation.openDrawer();
    }
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const scrollUp = currentOffset < lastScrollOffset;
    setScrollDirection(scrollUp ? "up" : "down");
    setLastScrollOffset(currentOffset);

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setScrollDirection("up");
    }, 10000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const scrollToTop = () => {
    scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View>
          <DiscussionHeader title="Explore" />
        </View>
      </PanGestureHandler>

      <FlatList
        ref={scrollViewRef}
        data={discussionExplore}
        renderItem={({ item, index }) => (
          <DiscussionListCard key={index} postData={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingHorizontal: 10 }}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={10}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {scrollDirection === "up" ? (
        <TouchableOpacity>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              padding: 15,
              backgroundColor: COLORS.primary,
              borderRadius: 50,
            }}
          >
            <Feather name="edit" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={scrollToTop}>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              padding: 15,
              backgroundColor: COLORS.primary,
              borderRadius: 50,
            }}
          >
            <Ionicons name="chevron-up" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Discussion;
