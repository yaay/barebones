import { globalStyles } from "@/styles/global.styles";
import { WeightLog } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  weightLogs: WeightLog[];
};

export const WeightLogsTab: React.FC<Props> = ({ weightLogs }) => {
  return (
    <ScrollView style={globalStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Text style={globalStyles.cardTitle}>Weight Logs</Text>
          <Text style={globalStyles.cardDescription}>
            Track your pet's weight over time
          </Text>
        </View>
        <View style={globalStyles.cardContent}>
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
        </View>
      </View>
    </ScrollView>
  );
};

