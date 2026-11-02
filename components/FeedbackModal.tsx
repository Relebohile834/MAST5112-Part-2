import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";

// success = green tick, error = red cross, confirm = asks before deleting
export type FeedbackVariant = "success" | "error" | "confirm";

// Everything the modal needs to know, stored in one piece of state in App
export interface FeedbackState {
  variant: FeedbackVariant;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

interface FeedbackModalProps {
  visible: boolean;
  variant: FeedbackVariant;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const VARIANT_STYLES: Record<
  FeedbackVariant,
  { icon: string; color: string; background: string }
> = {
  success: { icon: "✓", color: COLORS.success, background: COLORS.successSoft },
  error: { icon: "✕", color: COLORS.error, background: COLORS.errorSoft },
  confirm: { icon: "!", color: COLORS.error, background: COLORS.errorSoft },
};

// One reusable pop-up for success messages, error messages and delete confirmations
export default function FeedbackModal({
  visible,
  variant,
  title,
  message,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: FeedbackModalProps) {
  const look = VARIANT_STYLES[variant];
  const isConfirm = variant === "confirm";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: look.background }]}>
            <Text style={[styles.icon, { color: look.color }]}>{look.icon}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            {/* Cancel only appears when the chef has to make a choice */}
            {isConfirm && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>{cancelLabel}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                isConfirm && { backgroundColor: COLORS.error },
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 26,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: COLORS.accentSoft,
  },
  confirmText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "bold",
  },
});
