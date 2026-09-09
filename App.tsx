import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
} from "react-native";

// Define the TypeScript interface structure for a menu item object
interface MenuItem {
  id: string; // Unique identifier (timestamp)
  dishName: string; // Title of the dish
  description: string; // Brief detail/ingredients
  course: "Starter" | "Main" | "Dessert"; // Strictly typed course categories
  price: number; // Numeric cost of the item
}

// Fixed array of course categories used to generate selection chips dynamically
const COURSES: Array<"Starter" | "Main" | "Dessert"> = [
  "Starter",
  "Main",
  "Dessert",
];

export default function App() {
  // State for storing the list of created menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // States for capturing user input from form fields
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<
    "Starter" | "Main" | "Dessert"
  >("Starter");
  const [price, setPrice] = useState<string>("");

  // States for holding visual inline error messages underneath each field
  const [dishNameError, setDishNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");

  // States for controlling the success modal overlay and displaying the last added item name
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [lastAddedDish, setLastAddedDish] = useState<string>("");

  // Function to process form submission and enforce strict validation
  const handleAddDish = () => {
    // Dismiss the soft keyboard so the user can see validation feedback clearly
    Keyboard.dismiss();

    // Reset previous inline error messages before validating
    setDishNameError("");
    setDescriptionError("");
    setPriceError("");

    let hasError = false;

    // 1. DISH NAME VALIDATION
    const trimmedName = dishName.trim();
    if (!trimmedName) {
      setDishNameError("Dish name is required.");
      hasError = true;
    } else {
      // Regex: Allows only letters, spaces, hyphens, and apostrophes (blocks numbers and symbols)
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      if (!nameRegex.test(trimmedName)) {
        setDishNameError(
          "Name must contain letters only (no numbers allowed).",
        );
        hasError = true;
      }
    }

    // 2. DESCRIPTION VALIDATION
    const trimmedDesc = description.trim();
    if (!trimmedDesc) {
      setDescriptionError("Description is required.");
      hasError = true;
    }

    // 3. PRICE VALIDATION
    const trimmedPrice = price.trim();
    if (!trimmedPrice) {
      setPriceError("Price is required.");
      hasError = true;
    } else {
      // Regex: Enforces numeric digits with optional decimal values up to 2 places (blocks text/letters)
      const numericRegex = /^\d+(\.\d{1,2})?$/;
      if (!numericRegex.test(trimmedPrice)) {
        setPriceError("Price must be a valid number (e.g., 85 or 85.50).");
        hasError = true;
      } else if (parseFloat(trimmedPrice) <= 0) {
        setPriceError("Price must be greater than R0.");
        hasError = true;
      }
    }

    // Stop function execution if any field failed validation checks
    if (hasError) return;

    // Construct a new menu item object upon passing all validation checks
    const newItem: MenuItem = {
      id: Date.now().toString(), // Generates a unique timestamp string for React key rendering
      dishName: trimmedName,
      description: trimmedDesc,
      course: selectedCourse,
      price: parseFloat(trimmedPrice), // Converts string price input to a numeric float
    };

    // Update the menu array state by prepending the new item to the front of the array
    setMenuItems((prev) => [newItem, ...prev]);

    // Save the dish name so it can be highlighted inside the confirmation modal
    setLastAddedDish(trimmedName);

    // Clear all input fields after successfully saving the item
    setDishName("");
    setDescription("");
    setSelectedCourse("Starter");
    setPrice("");

    // Open the success confirmation modal
    setShowSuccessModal(true);
  };

  return (
    // SafeAreaView prevents UI elements from overlapping with device notches and status bars
    <SafeAreaView style={styles.container}>
      {/* Configure native status bar appearance */}
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAF7" />

      {/* KeyboardAvoidingView pushes UI up when typing to keep inputs visible */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* App Title Header Bar */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chef's Menu Manager</Text>
          <Text style={styles.headerSubtitle}>
            Total Items Added: {menuItems.length}
          </Text>
        </View>

        {/* Form Container for Menu Input Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add New Dish</Text>

          {/* Dish Name Input Field */}
          <TextInput
            style={[styles.input, !!dishNameError && styles.inputError]}
            placeholder="Dish Name (e.g., Garlic Bread)"
            placeholderTextColor="#A08E88"
            value={dishName}
            onChangeText={(text) => {
              setDishName(text);
              if (dishNameError) setDishNameError(""); // Clear error state on change
            }}
          />
          {/* Render error text if validation fails */}
          {!!dishNameError && (
            <Text style={styles.errorText}>{dishNameError}</Text>
          )}

          {/* Description Multiline Input Field */}
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              !!descriptionError && styles.inputError,
            ]}
            placeholder="Description (e.g., Toasted baguette with herb butter)"
            placeholderTextColor="#A08E88"
            multiline
            numberOfLines={2}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (descriptionError) setDescriptionError(""); // Clear error state on change
            }}
          />
          {/* Render error text if validation fails */}
          {!!descriptionError && (
            <Text style={styles.errorText}>{descriptionError}</Text>
          )}

          {/* Course Category Chooser Buttons */}
          <Text style={styles.label}>Course Category:</Text>
          <View style={styles.courseRow}>
            {COURSES.map((course) => (
              <TouchableOpacity
                key={course}
                style={[
                  styles.courseChip,
                  selectedCourse === course && styles.courseChipActive, // Active state highlight
                ]}
                onPress={() => setSelectedCourse(course)}
              >
                <Text
                  style={[
                    styles.courseChipText,
                    selectedCourse === course && styles.courseChipTextActive,
                  ]}
                >
                  {course}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Numeric Price Input Field */}
          <TextInput
            style={[styles.input, !!priceError && styles.inputError]}
            placeholder="Price in R (e.g., 85)"
            placeholderTextColor="#A08E88"
            keyboardType="numeric" // Forces numeric keyboard on mobile devices
            value={price}
            onChangeText={(text) => {
              setPrice(text);
              if (priceError) setPriceError(""); // Clear error state on change
            }}
          />
          {/* Render error text if validation fails */}
          {!!priceError && <Text style={styles.errorText}>{priceError}</Text>}

          {/* Submit Action Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
            <Text style={styles.addButtonText}>+ Add Dish to Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Display List Container for Added Menu Items */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Current Menu</Text>

          {/* FlatList for efficient rendering of the menu items list */}
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            /* Rendered when the menu array has no items */
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No menu items added yet.</Text>
                <Text style={styles.emptySubtext}>
                  Fill in the form above to add your first dish.
                </Text>
              </View>
            }
            /* Individual Menu Item Card Renderer */
            renderItem={({ item }) => (
              <View style={styles.dishCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.dishTitle}>{item.dishName}</Text>
                  <Text style={styles.courseBadge}>{item.course}</Text>
                </View>
                <Text style={styles.dishDescription}>{item.description}</Text>
                <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
              </View>
            )}
          />
        </View>

        {/* Interactive Confirmation Overlay Modal */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          {/* Backdrop screen filter */}
          <View style={styles.modalOverlay}>
            {/* Modal Dialog Card */}
            <View style={styles.modalCard}>
              <View style={styles.successIconCircle}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <Text style={styles.modalTitle}>Success!</Text>
              <Text style={styles.modalMessage}>
                "<Text style={{ fontWeight: "bold" }}>{lastAddedDish}</Text>"
                has been successfully added to your menu.
              </Text>

              {/* Dismiss Modal Button */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowSuccessModal(false)}
              >
                <Text style={styles.modalButtonText}>OK / Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ---------------- STYLESHEET DECLARATIONS ---------------- //
const styles = StyleSheet.create({
  // Root Screen Layout Style
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7", // Cream background tint
  },
  // Top Header Bar Style
  header: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#EAE0D8",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C1A14",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#C85A32",
    fontWeight: "600",
    marginTop: 2,
  },
  // Form Container Box
  formContainer: {
    backgroundColor: "#FFF",
    margin: 14,
    padding: 14,
    borderRadius: 14,
    elevation: 2, // Android shadow
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C1A14",
    marginBottom: 10,
  },
  // Default Text Input Style
  input: {
    backgroundColor: "#FAFAF7",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAE0D8",
    marginTop: 6,
    fontSize: 14,
    color: "#2C1A14",
  },
  // Red Highlight Style for Validation Errors
  inputError: {
    borderColor: "#D32F2F",
    backgroundColor: "#FFEBEE",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  textArea: {
    height: 52,
    textAlignVertical: "top", // Aligns placeholder to the top of multiline inputs
  },
  label: {
    fontSize: 12,
    color: "#604E47",
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "600",
  },
  // Course Selection Row Styling
  courseRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  courseChip: {
    flex: 1,
    paddingVertical: 7,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FDF0E6",
  },
  courseChipActive: {
    backgroundColor: "#C85A32", // Highlight color when active
  },
  courseChipText: {
    fontSize: 12,
    color: "#C85A32",
    fontWeight: "bold",
  },
  courseChipTextActive: {
    color: "#FFF",
  },
  // Button Styling
  addButton: {
    backgroundColor: "#C85A32",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  // List Container Layout
  listContainer: {
    flex: 1,
    paddingHorizontal: 14,
  },
  // Menu Card Box Styling
  dishCard: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#EAE0D8",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C1A14",
  },
  courseBadge: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#C85A32",
    backgroundColor: "#FDF0E6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dishDescription: {
    fontSize: 12,
    color: "#604E47",
    marginVertical: 4,
  },
  dishPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#C85A32",
  },
  // Empty State Container Styling
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#604E47",
  },
  emptySubtext: {
    fontSize: 12,
    color: "#A08E88",
    marginTop: 2,
  },
  // Confirmation Modal Styling
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent black background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  successIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  checkIcon: {
    fontSize: 26,
    color: "#2E7D32",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C1A14",
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: "#604E47",
    textAlign: "center",
    marginBottom: 18,
  },
  modalButton: {
    backgroundColor: "#C85A32",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
