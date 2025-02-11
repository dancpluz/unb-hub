import React from "react";
import { View, ActivityIndicator } from "react-native";
import WeekView from "../components/WeekView";
import { useSQLiteContext } from 'expo-sqlite';

export default function Page() {
  const db = useSQLiteContext();
  const [loading, setLoading] = React.useState(true);
  const [schedule, setSchedule] = React.useState([]);

  React.useEffect(() => {
    const loadSchedule = async () => {
      const results = await db.getAllAsync(
        'SELECT * FROM classes ORDER BY startTime'
      );
      setSchedule(results);
      setLoading(false);
    };

    loadSchedule();
  }, []);

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <WeekView schedule={schedule} />
      )}
    </View>
  );
}