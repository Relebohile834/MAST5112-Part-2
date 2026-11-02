import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FILTER_OPTIONS } from "../constants";
import { CourseFilter } from "../types";

interface SearchFilterBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedCourse: CourseFilter;
  onCourseChange: (course: CourseFilter) => void;
  onClear: () => void;
}

// Search box + course chips + a clear button for the Menu screen
export default function SearchFilterBar({
  searchText,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  onClear,
}: SearchFilterBarProps) {
  // The clear button only shows when something is being searched or filtered
  const hasActiveFilters = searchText.trim() !== "" || selectedCourse !== "All";

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search dishes by name"
        placeholderTextColor={COLORS.textLight}
        value={searchText}
        onChangeText={onSearchChange}
        returnKeyType="search"
      />

      <View style={styles.chipRow}>
        {FILTER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, selectedCourse === option && styles.chipActive]}
            onPress={() => onCourseChange(option)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCourse === option && styles.chipTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {hasActiveFilters && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearText}>Clear search and filter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 14,
    color: COLORS.textDark,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  chip: {
    flex: 1,
    paddingVertical: 7,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLORS.accentSoft,
  },
  chipActive: {
    backgroundColor: COLORS.accent,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  chipTextActive: {
    color: "#FFF",
  },
  clearButton: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  clearText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.accent,
  },
});
