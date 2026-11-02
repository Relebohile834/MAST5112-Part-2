import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PRICE,
} from "../constants";
import { FormErrors, FormValues, MenuItem } from "../types";

// Letters, spaces, hyphens and apostrophes only (blocks numbers and symbols)
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

// Whole numbers or decimals with up to two places
const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

// Checks every field and returns one message per field ("" = valid).
// editingId lets a dish keep its own name while it is being edited.
export function validateMenuForm(
  values: FormValues,
  existingItems: MenuItem[],
  editingId?: string,
): FormErrors {
  const errors: FormErrors = { dishName: "", description: "", price: "" };

  // 1. Dish name
  const name = values.dishName.trim();
  if (!name) {
    errors.dishName = "Dish name is required.";
  } else if (!NAME_REGEX.test(name)) {
    errors.dishName =
      "Name can only contain letters, spaces, hyphens and apostrophes.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.dishName = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  } else if (
    existingItems.some(
      (item) =>
        item.id !== editingId &&
        item.dishName.toLowerCase() === name.toLowerCase(),
    )
  ) {
    errors.dishName = "A dish with this name is already on the menu.";
  }

  // 2. Description
  const description = values.description.trim();
  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;
  }

  // 3. Price
  const price = values.price.trim();
  if (!price) {
    errors.price = "Price is required.";
  } else if (!PRICE_REGEX.test(price)) {
    errors.price = "Price must be a valid number (e.g., 85 or 85.50).";
  } else if (parseFloat(price) <= 0) {
    errors.price = "Price must be greater than R0.";
  } else if (parseFloat(price) > MAX_PRICE) {
    errors.price = `Price must be R${MAX_PRICE} or less.`;
  }

  return errors;
}

// True if at least one field has an error message
export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((message) => message !== "");
}
