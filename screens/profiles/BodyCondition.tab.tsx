import { globalStyles } from "@/styles/global.styles";
import { BodyConditionLog } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


type Props = {
  bodyConditionLogs: BodyConditionLog[];
};

export const BodyConditionTab: React.FC<Props> = ({ bodyConditionLogs }) => {
  return (
    <ScrollView style={globalStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Text style={globalStyles.cardTitle}>Body Condition</Text>
          <Text style={globalStyles.cardDescription}>Track your pet's body condition assessments</Text>
        </View>
        <View style={globalStyles.cardContent}>
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
          <TouchableOpacity style={globalStyles.outlineButton}>
            <Ionicons name="add" size={16} color="#007AFF" />
            <Text style={globalStyles.outlineButtonText}>Add condition assessment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};