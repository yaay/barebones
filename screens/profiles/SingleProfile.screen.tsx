import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Button,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pet, BodyConditionLog, WeightLog } from "../../types";
import { TabBar, TabView } from "react-native-tab-view";
import { BodyConditionTab } from "./BodyCondition.tab";
import { VetVisitsTab } from "./VetVisits.tab";
import { WeightLogsTab } from "./WeightLogs.tab";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePet } from "@/hooks/usePets";
import { globalStyles } from "@/styles/global.styles";

type RootStackParamList = {
  SingleProfile: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "SingleProfile">;


function getThisMonthLogs(
  logs_bodycondition: BodyConditionLog[],
  logs_weight: WeightLog[]
) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const latestBodyConditionLog = logs_bodycondition
    .filter(
      (log) =>
        new Date(log.date).getMonth() === currentMonth &&
        new Date(log.date).getFullYear() === currentYear
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const latestWeightLog = logs_weight
    .filter(
      (log) =>
        new Date(log.date).getMonth() === currentMonth &&
        new Date(log.date).getFullYear() === currentYear
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return { latestBodyConditionLog, latestWeightLog };
}

const PetCard = ({ pet }: { pet: Pet }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{pet.name}</Text>
    <Text>Species: {pet.species}</Text>
    <Text>Age: {pet.age} years</Text>
  </View>
);

const LogsTable = ({
  weightLogs,
  bodyConditionLogs,
}: {
  weightLogs: WeightLog[];
  bodyConditionLogs: BodyConditionLog[];
}) => (
  <View style={styles.table}>
    <Text style={styles.tableHeader}>Recent Logs</Text>
    {weightLogs.map((log, index) => (
      <View key={index} style={styles.tableRow}>
        <Text>Weight: {log.weight}kg</Text>
        <Text>Date: {new Date(log.date).toLocaleDateString()}</Text>
      </View>
    ))}
  </View>
);

const HealthStatus = ({ pet }: { pet: Pet }) => (
  <View style={styles.healthStatus}>
    <Text style={styles.tableHeader}>Health Status</Text>
    <Text>
      Overall Health: {pet?.logs_weight.length > 3 ? "Good" : "Needs More Data"}
    </Text>
    <Text>Last Vet Visit: 2 months ago</Text>
  </View>
);

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={globalStyles.tabIndicator}
    style={globalStyles.tabBar}
    activeColor="#007AFF"
    inactiveColor="#666"
  />
)

export const SingleProfileScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;

  const [thisMonthLogs, setThisMonthLogs] = useState<{
    latestBodyConditionLog: BodyConditionLog | null;
    latestWeightLog: WeightLog | null;
  }>({
    latestBodyConditionLog: null,
    latestWeightLog: null,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    { key: "weight", title: "Weight" },
    { key: "condition", title: "Body Condition" },
    { key: "visits", title: "Vet Visits" },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "weight":
        return <WeightLogsTab weightLogs={pet?.logs_weight || []} />;
      case "condition":
        return (
          <BodyConditionTab bodyConditionLogs={pet?.logs_bodycondition || []} />
        );
      case "visits":
        return <VetVisitsTab vetVisitLogs={pet?.logs_vet_visits || []} />;
      default:
        return <WeightLogsTab weightLogs={pet?.logs_weight || []} />;
    }
  };


  const { pet, loading, error, refetch } = usePet(id);


  useEffect(() => {
    if (pet) {
      setThisMonthLogs(
        getThisMonthLogs(pet.logs_bodycondition, pet.logs_weight)
      );
    }
  }, [pet]);

  if (error) {
    return (
      <View>
        <Text style={{ color: "red", textAlign: "center" }}>{error.message}</Text>
        <Button title="Retry" onPress={refetch} />
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Pet not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PetCard pet={pet} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />

      {/* <View style={styles.monthSummary}>
        <Text style={styles.tableHeader}>This Month's Summary</Text>
        <Text>
          Latest Weight: {thisMonthLogs.latestWeightLog?.weight || 'No data'} kg
        </Text>
        <Text>
          Body Condition: {thisMonthLogs.latestBodyConditionLog?.body_condition || 'No data'}
        </Text>
      </View>

      <HealthStatus pet={pet} />
      
      <LogsTable 
        weightLogs={pet.logs_weight} 
        bodyConditionLogs={pet.logs_bodycondition} 
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  table: {
    marginTop: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  monthSummary: {
    padding: 16,
    backgroundColor: "#e6f3ff",
    borderRadius: 8,
    marginBottom: 16,
  },
  healthStatus: {
    padding: 16,
    backgroundColor: "#f0fff0",
    borderRadius: 8,
    marginBottom: 16,
  },
});
