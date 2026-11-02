import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { TabKey } from "../types";

interface TabBarProps {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}

const TABS: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: "menu", label: "Menu", icon: "🍽️" },
  { key: "add", label: "Add Dish", icon: "➕" },
  { key: "stats", label: "Statistics", icon: "📊" },
];

// Bottom navigation bar used to move between the three screens
export default function TabBar({ activeTab, onChangeTab }: TabBarProps) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onChangeTab(tab.key)}
            accessibilityRole="button"
            accessibilityLabel={`Go to ${tab.label}`}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {/* Small underline marks the screen the chef is on */}
            <View style={[styles.indicator, isActive && styles.indicatorActive]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textLight,
    marginTop: 2,
  },
  labelActive: {
    color: COLORS.accent,
  },
  indicator: {
    height: 3,
    width: 28,
    borderRadius: 2,
    marginTop: 4,
    backgroundColor: "transparent",
  },
  indicatorActive: {
    backgroundColor: COLORS.accent,
  },
});
