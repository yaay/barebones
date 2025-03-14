import { AddVetVisitLogSheet, AddWeightLogSheet } from "@/components/bottomsheet.component";
import { petService } from "@/services/petService";
import { globalStyles } from "@/styles/global.styles";
import { VetVisitLog } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useRef } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";

type Props = {
  vetVisitLogs: VetVisitLog[];
  onAddedVetVisit: () => void;
  petId: string;
};

export const VetVisitsTab: React.FC<Props> = ({ petId, onAddedVetVisit, vetVisitLogs }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleAddVetVisit = async (notes: string, date: Date) => {
    try {
      await petService.addPetVetVisit(petId, notes, date);
      onAddedVetVisit();
    } catch (error) {
      console.error("Failed to add vet visit:", error);
    }
  };

  return (
    <View style={globalStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Text style={globalStyles.cardTitle}>Vet Visits</Text>
          <Text style={globalStyles.cardDescription}>Track your pet's veterinary visits</Text>
        </View>
        <View style={globalStyles.cardContent}>
          <ScrollView
            style={{ flex: 1, marginBottom: 10 }}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {vetVisitLogs.map((log) => (
              <View key={log.id} style={globalStyles.logItem}>
                <View style={globalStyles.dateContainer}>
                  <Ionicons name="calendar-outline" size={12} color="#666" style={globalStyles.icon} />
                  <Text style={globalStyles.dateText}>{format(log.date, "PPP")}</Text>
                </View>
                <Text style={globalStyles.notesText}>{log.notes}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={globalStyles.primaryButton} onPress={() => actionSheetRef.current?.show()}>
            <Ionicons name="add" size={20} color="#FFF" />
            <Text style={globalStyles.primaryButtonText}>Add New Vet Visits</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddVetVisitLogSheet ref={actionSheetRef} onSubmit={handleAddVetVisit} />
    </View>
  )
}