import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import { setTradeModelVisibility } from "../stores/tab/tabActions";

import { Home, Portfolio, Market, Profile } from "../screens";
import { TabIcon } from "../components";
import { COLORS, icons } from "../constants";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {children}
    </TouchableOpacity>
  );
};

const Tabs = ({ setTradeModelVisibility, isTradeModelVisible }) => {
  function tradeTabButtonOnClickHandler() {
    setTradeModelVisibility(!isTradeModelVisible);
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModelVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModelVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModelVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="Portfolio"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModelVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModelVisible ? icons.close : icons.trade}
                iconStyle={
                  isTradeModelVisible
                    ? {
                        width: 15,
                        height: 15,
                      }
                    : null
                }
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
              onPress={() => tradeTabButtonOnClickHandler()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModelVisible) {
              return (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModelVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModelVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModelVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModelVisible: state.tabReducer.isTradeModelVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTradeModelVisibility: (isVisible) => {
      return dispatch(setTradeModelVisibility(isVisible));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
