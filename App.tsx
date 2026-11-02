import React, { useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppHeader from "./components/AppHeader";
import FeedbackModal, { FeedbackState } from "./components/FeedbackModal";
import MenuForm from "./components/MenuForm";
import MenuItemCard from "./components/MenuItemCard";
import SearchFilterBar from "./components/SearchFilterBar";
import StatsPanel from "./components/StatsPanel";
import TabBar from "./components/TabBar";
import { COLORS } from "./constants";
import { CourseFilter, MenuItem, TabKey } from "./types";
import { calculateStats, filterMenuItems } from "./utils/menuHelpers";

export default function App() {
  // ---------------- STATE ---------------- //
  // The full menu (the single source of truth for every screen)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Which screen is showing
  const [activeTab, setActiveTab] = useState<TabKey>("menu");

  // Search and filter choices on the Menu screen
  const [searchText, setSearchText] = useState<string>("");
  const [courseFilter, setCourseFilter] = useState<CourseFilter>("All");

  // The dish currently being edited (null = edit screen closed)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // The pop-up message currently showing (null = no pop-up)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  // ---------------- DERIVED DATA ---------------- //
  // Recalculated only when the menu, search or filter changes
  const visibleItems = useMemo(
    () => filterMenuItems(menuItems, searchText, courseFilter),
    [menuItems, searchText, courseFilter],
  );
  const stats = useMemo(() => calculateStats(menuItems), [menuItems]);
  const isFiltering = searchText.trim() !== "" || courseFilter !== "All";

  // ---------------- HELPERS ---------------- //
  const showSuccess = (title: string, message: string) =>
    setFeedback({ variant: "success", title, message });

  const closeFeedback = () => setFeedback(null);

  const clearSearchAndFilter = () => {
    setSearchText("");
    setCourseFilter("All");
  };

  // ---------------- ACTIONS ---------------- //
  // ADD: put the new dish at the top of the list
  const handleAddDish = (newDish: Omit<MenuItem, "id">) => {
    const item: MenuItem = { id: Date.now().toString(), ...newDish };
    setMenuItems((prev) => [item, ...prev]);
    showSuccess(
      "Dish added",
      `"${item.dishName}" has been added to your menu.`,
    );
  };

  // EDIT: replace the old values of the chosen dish with the new ones
  const handleSaveEdit = (updatedDish: Omit<MenuItem, "id">) => {
    if (!editingItem) return;

    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...item, ...updatedDish } : item,
      ),
    );
    setEditingItem(null);
    showSuccess(
      "Dish updated",
      `"${updatedDish.dishName}" has been updated on your menu.`,
    );
  };

  // DELETE: ask first, then remove the dish
  const handleDeletePress = (item: MenuItem) => {
    setFeedback({
      variant: "confirm",
      title: "Delete dish?",
      message: `"${item.dishName}" will be removed from your menu. This cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: () => {
        setMenuItems((prev) => prev.filter((dish) => dish.id !== item.id));
        showSuccess("Dish deleted", `"${item.dishName}" has been removed.`);
      },
    });
  };

  // Runs when the pop-up's main button is pressed
  const handleFeedbackConfirm = () => {
    const action = feedback?.onConfirm;
    closeFeedback();
    if (action) action();
  };

  // ---------------- SCREENS ---------------- //
  const renderEmptyList = () =>
    menuItems.length === 0 ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No menu items added yet.</Text>
        <Text style={styles.emptySubtext}>
          Tap "Add Dish" below to create your first dish.
        </Text>
      </View>
    ) : (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No dishes match your search.</Text>
        <Text style={styles.emptySubtext}>
          Try a different name, or clear the search and filter.
        </Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={clearSearchAndFilter}
        >
          <Text style={styles.emptyButtonText}>Show all dishes</Text>
        </TouchableOpacity>
      </View>
    );

  const renderMenuScreen = () => (
    <View style={styles.screen}>
      <SearchFilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedCourse={courseFilter}
        onCourseChange={setCourseFilter}
        onClear={clearSearchAndFilter}
      />

      <Text style={styles.resultsText}>
        {isFiltering
          ? `Showing ${visibleItems.length} of ${menuItems.length} dishes`
          : `Current menu (${menuItems.length})`}
      </Text>

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            onEdit={setEditingItem}
            onDelete={handleDeletePress}
          />
        )}
      />
    </View>
  );

  const renderAddScreen = () => (
    <ScrollView
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <MenuForm
        title="Add new dish"
        submitLabel="Add dish to menu"
        existingItems={menuItems}
        onSubmit={handleAddDish}
      />
    </ScrollView>
  );

  const renderStatsScreen = () => (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <StatsPanel stats={stats} />
    </ScrollView>
  );

  // ---------------- RENDER ---------------- //
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <AppHeader itemCount={menuItems.length} />

        <View style={styles.flex}>
          {activeTab === "menu" && renderMenuScreen()}
          {activeTab === "add" && renderAddScreen()}
          {activeTab === "stats" && renderStatsScreen()}
        </View>

        <TabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </KeyboardAvoidingView>

      {/* Edit screen: the same form as "Add", pre-filled with the chosen dish */}
      <Modal
        visible={editingItem !== null}
        animationType="slide"
        onRequestClose={() => setEditingItem(null)}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.editContent}
            keyboardShouldPersistTaps="handled"
          >
            {editingItem && (
              <MenuForm
                key={editingItem.id}
                title="Edit dish"
                submitLabel="Save changes"
                initialValues={{
                  dishName: editingItem.dishName,
                  description: editingItem.description,
                  course: editingItem.course,
                  price: editingItem.price.toString(),
                }}
                existingItems={menuItems}
                editingId={editingItem.id}
                onSubmit={handleSaveEdit}
                onCancel={() => setEditingItem(null)}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Success messages and the delete confirmation */}
      <FeedbackModal
        visible={feedback !== null}
        variant={feedback?.variant ?? "success"}
        title={feedback?.title ?? ""}
        message={feedback?.message ?? ""}
        confirmLabel={feedback?.confirmLabel}
        cancelLabel={feedback?.cancelLabel}
        onConfirm={handleFeedbackConfirm}
        onCancel={closeFeedback}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 14,
  },
  resultsText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  editContent: {
    padding: 14,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 32,
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
  emptyButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.accentSoft,
  },
  emptyButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.accent,
  },
});
