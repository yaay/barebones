import { globalStyles } from "@/styles/global.styles";
import { VetVisitLog } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

type Props = {
  vetVisitLogs: VetVisitLog[];
};

export const VetVisitsTab: React.FC<Props> = ({ vetVisitLogs }) => (
    <ScrollView style={globalStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Text style={globalStyles.cardTitle}>Vet Visits</Text>
          <Text style={globalStyles.cardDescription}>Track your pet's veterinary visits</Text>
        </View>
        <View style={globalStyles.cardContent}>
          {vetVisitLogs.map((log) => (
            <View key={log.id} style={globalStyles.logItem}>
              <View style={globalStyles.dateContainer}>
                <Ionicons name="calendar-outline" size={12} color="#666" style={globalStyles.icon} />
                <Text style={globalStyles.dateText}>{format(log.date, "PPP")}</Text>
              </View>
              <Text style={globalStyles.notesText}>{log.notes}</Text>
            </View>
          ))}
          <TouchableOpacity style={globalStyles.outlineButton}>
            <Ionicons name="add" size={16} color="#007AFF" />
            <Text style={globalStyles.outlineButtonText}>Add new vet visits</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )