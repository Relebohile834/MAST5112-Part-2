import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, COURSES } from "../constants";
import { MenuStats } from "../types";
import { formatPrice } from "../utils/menuHelpers";

interface StatsPanelProps {
  stats: MenuStats;
}

// Overview of the whole menu: totals, average price and dishes per course
export default function StatsPanel({ stats }: StatsPanelProps) {
  if (stats.total === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No statistics yet.</Text>
        <Text style={styles.emptySubtext}>
          Add a dish to see the totals and averages for your menu.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* Two big numbers at the top */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{stats.total}</Text>
          <Text style={styles.summaryLabel}>Total dishes</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{formatPrice(stats.averagePrice)}</Text>
          <Text style={styles.summaryLabel}>Average price</Text>
        </View>
      </View>

      {/* One row per course with a bar showing its share of the menu */}
      <View style={styles.courseCard}>
        <Text style={styles.sectionTitle}>Dishes by course</Text>
        {COURSES.map((course) => {
          const count = stats.countByCourse[course];
          const share = (count / stats.total) * 100;

          return (
            <View key={course} style={styles.courseRow}>
              <View style={styles.courseRowHeader}>
                <Text style={styles.courseName}>{course}</Text>
                <Text style={styles.courseCount}>
                  {count} {count === 1 ? "dish" : "dishes"}
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, { width: `${share}%` as `${number}%` }]}
                />
              </View>
              <Text style={styles.courseAverage}>
                {count > 0
                  ? `Average price: ${formatPrice(stats.averageByCourse[course])}`
                  : "No dishes in this course yet"}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
    marginTop: 4,
  },
  courseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  courseRow: {
    marginTop: 10,
  },
  courseRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courseName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  courseCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentSoft,
    marginVertical: 6,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  courseAverage: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textMuted,
  },
  emptySubtext: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
    textAlign: "center",
  },
});
