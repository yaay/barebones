import { AddBodyConditionLogSheet } from "@/components/bottomsheet.component";
import { petService } from "@/services/petService";
import { globalStyles } from "@/styles/global.styles";
import { BodyConditionLog } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";


type Props = {
  bodyConditionLogs: BodyConditionLog[];
  petId: string;
  onAddedCondition: () => void;
};

export const BodyConditionTab: React.FC<Props> = ({ petId, onAddedCondition, bodyConditionLogs }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleAddBodyCondition = async (condition: string, date: Date) => {
    try {
      await petService.addPetBodyCondition(petId, condition, date);
      onAddedCondition();
    } catch (error) {
      console.error("Failed to add condition:", error);
    }
  };


  return (
    <View style={globalStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Text style={globalStyles.cardTitle}>Body Condition</Text>
          <Text style={globalStyles.cardDescription}>Track your pet's body condition assessments</Text>
        </View>
        <View style={globalStyles.cardContent}>
          <ScrollView
            style={{ flex: 1, marginBottom: 10 }}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {bodyConditionLogs.map((log) => (
              <View key={log.id} style={globalStyles.logItem}>
                <View>
                  <Text style={globalStyles.logValue}>{log.body_condition}</Text>
                  <View style={globalStyles.dateContainer}>
                    <Ionicons name="calendar-outline" size={12} color="#666" style={globalStyles.icon} />
                    <Text style={globalStyles.dateText}>{format(log.date, "PPP")}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={globalStyles.primaryButton}
            onPress={() => actionSheetRef.current?.show()}
          >
            <Ionicons name="add" size={20} color="#FFF" />
            <Text style={globalStyles.primaryButtonText}>Add New Condition</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddBodyConditionLogSheet ref={actionSheetRef} onSubmit={handleAddBodyCondition} />
    </View>
  );
};