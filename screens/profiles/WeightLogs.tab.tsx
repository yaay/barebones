import { AddWeightLogSheet } from "@/components/bottomsheet.component";
import { petService } from "@/services/petService";
import { globalStyles } from "@/styles/global.styles";
import { WeightLog } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";

type Props = {
  weightLogs: WeightLog[];
  petId: string;
  onAddedWeight: () => void;
};

export const WeightLogsTab: React.FC<Props> = ({ onAddedWeight, petId, weightLogs }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleAddWeight = async (weight: number, date: Date) => {
    try {
      await petService.addPetWeight(petId, weight, date);
      onAddedWeight();
    } catch (error) {
      console.error("Failed to add weight log:", error);
    }
  };

  return (
    <View style={globalStyles.tabContent}>

      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Text style={globalStyles.cardTitle}>Weight Logs</Text>
          <Text style={globalStyles.cardDescription}>
            Track your pet's weight over time
          </Text>
        </View>

        <View style={globalStyles.cardContent}>
          <ScrollView
            style={{ flex: 1, marginBottom: 10 }}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {weightLogs.map((log) => (
              <View key={log.id} style={globalStyles.logItem}>
                <View>
                  <Text style={globalStyles.logValue}>{log.weight} kg</Text>
                  <View style={globalStyles.dateContainer}>
                    <Ionicons
                      name="calendar-outline"
                      size={12}
                      color="#666"
                      style={globalStyles.icon}
                    />
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
            <Ionicons name="add-sharp" size={20} color="#FFF" />
            <Text style={globalStyles.primaryButtonText}>Add New Weight</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddWeightLogSheet ref={actionSheetRef} onSubmit={handleAddWeight} />
    </View>
  );
};