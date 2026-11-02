import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, COURSES } from "../constants";
import { FormErrors, FormValues, MenuItem } from "../types";
import { hasErrors, validateMenuForm } from "../utils/validation";

interface MenuFormProps {
  title: string; // "Add New Dish" or "Edit Dish"
  submitLabel: string; // Text on the main button
  initialValues?: FormValues; // Pre-filled values when editing
  existingItems: MenuItem[]; // Used to stop duplicate dish names
  editingId?: string; // The dish being edited (so it can keep its own name)
  onSubmit: (item: Omit<MenuItem, "id">) => void; // Called only when everything is valid
  onCancel?: () => void; // Shows a Cancel button when provided
}

const EMPTY_VALUES: FormValues = {
  dishName: "",
  description: "",
  course: "Starter",
  price: "",
};

const NO_ERRORS: FormErrors = { dishName: "", description: "", price: "" };

// One form used for BOTH adding a new dish and editing an existing one
export default function MenuForm({
  title,
  submitLabel,
  initialValues = EMPTY_VALUES,
  existingItems,
  editingId,
  onSubmit,
  onCancel,
}: MenuFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(NO_ERRORS);

  // Updates a text field and clears that field's error as the chef types
  const handleTextChange = (
    field: "dishName" | "description" | "price",
    text: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    // Hide the keyboard so the chef can see any error messages
    Keyboard.dismiss();

    const foundErrors = validateMenuForm(values, existingItems, editingId);
    setErrors(foundErrors);
    if (hasErrors(foundErrors)) return;

    onSubmit({
      dishName: values.dishName.trim(),
      description: values.description.trim(),
      course: values.course,
      price: parseFloat(values.price.trim()),
    });

    // When adding, clear the form ready for the next dish
    if (!editingId) {
      setValues(EMPTY_VALUES);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <Text style={styles.label}>Dish name</Text>
      <TextInput
        style={[styles.input, !!errors.dishName && styles.inputError]}
        placeholder="e.g., Garlic Bread"
        placeholderTextColor={COLORS.textLight}
        value={values.dishName}
        onChangeText={(text) => handleTextChange("dishName", text)}
      />
      {!!errors.dishName && <Text style={styles.errorText}>{errors.dishName}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          !!errors.description && styles.inputError,
        ]}
        placeholder="e.g., Toasted baguette with herb butter"
        placeholderTextColor={COLORS.textLight}
        multiline
        numberOfLines={2}
        value={values.description}
        onChangeText={(text) => handleTextChange("description", text)}
      />
      {!!errors.description && (
        <Text style={styles.errorText}>{errors.description}</Text>
      )}

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseRow}>
        {COURSES.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.courseChip,
              values.course === course && styles.courseChipActive,
            ]}
            onPress={() => setValues((prev) => ({ ...prev, course }))}
          >
            <Text
              style={[
                styles.courseChipText,
                values.course === course && styles.courseChipTextActive,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={[styles.input, !!errors.price && styles.inputError]}
        placeholder="e.g., 85"
        placeholderTextColor={COLORS.textLight}
        keyboardType="numeric"
        value={values.price}
        onChangeText={(text) => handleTextChange("price", text)}
      />
      {!!errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <View style={styles.buttonRow}>
        {onCancel && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 14,
    color: COLORS.textDark,
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorSoft,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },
  textArea: {
    height: 60,
    textAlignVertical: "top",
  },
  courseRow: {
    flexDirection: "row",
    gap: 8,
  },
  courseChip: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLORS.accentSoft,
  },
  courseChipActive: {
    backgroundColor: COLORS.accent,
  },
  courseChipText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "bold",
  },
  courseChipTextActive: {
    color: "#FFF",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: COLORS.accentSoft,
  },
  cancelButtonText: {
    color: COLORS.accent,
    fontWeight: "bold",
    fontSize: 14,
  },
});
