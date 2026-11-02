import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants";

interface AppHeaderProps {
  itemCount: number;
}

// Title bar shown at the top of every screen
export default function AppHeader({ itemCount }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Chef's Menu Manager</Text>
      <Text style={styles.subtitle}>
        {itemCount === 1 ? "1 dish on the menu" : `${itemCount} dishes on the menu`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: "600",
    marginTop: 2,
  },
});
