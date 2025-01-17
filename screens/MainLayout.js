import { Text, View, Animated } from "react-native";
import React from "react";

import { connect } from "react-redux";

import { IconTextButton } from "../components";
import { COLORS, SIZES, icons } from "../constants";

const MainLayout = ({ children, isTradeModelVisible }) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isTradeModelVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModelVisible]);

  const modelY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });

  return (
    <View style={{ flex: 1 }}>
      {children}

      {/* Dim Background */}
      {isTradeModelVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimatedValue}
        />
      )}
      {/* model */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modelY,
          width: "100%",
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log("Transfer")}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{ marginTop: SIZES.base }}
          onPress={() => console.log("Withdraw")}
        />
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModelVisible: state.tabReducer.isTradeModelVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
