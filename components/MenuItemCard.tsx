import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { MenuItem } from "../types";
import { formatPrice } from "../utils/menuHelpers";

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

// One dish on the menu list, with Edit and Delete buttons
export default function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.dishName}</Text>
        <Text style={styles.badge}>{item.course}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(item)}
            accessibilityLabel={`Edit ${item.dishName}`}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item)}
            accessibilityLabel={`Delete ${item.dishName}`}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  badge: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.accent,
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  description: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: COLORS.accentSoft,
  },
  editText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: COLORS.errorSoft,
  },
  deleteText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.error,
  },
});
