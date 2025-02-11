import { useSQLiteContext } from 'expo-sqlite';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ClassEvent, deleteClassEvent } from '../db/database';
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { daysOfWeek, translations } from '@/utils/constants';
import { Alert } from 'react-native';

export default function WeekView({ schedule, setSchedule }: { schedule: ClassEvent[], setSchedule: React.Dispatch<React.SetStateAction<ClassEvent[]>> }) {
  const db = useSQLiteContext();

  const loadSchedule = async () => {
    const results = await db.getAllAsync<ClassEvent>(
      'SELECT * FROM classes ORDER BY startTime'
    );
    setSchedule(results);
  };

  // Replace useEffect with:
  useFocusEffect(
    React.useCallback(() => {
      loadSchedule();
    }, [])
  );

  // Group classes by day with empty arrays for days without classes
  // components/WeekView.tsx
  const groupByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = schedule.filter(event => {
      try {
        const recurrenceDays = event.recurrenceDays
          ? JSON.parse(event.recurrenceDays)
          : [];
        return recurrenceDays.includes(day);
      } catch (error) {
        console.error('Error parsing recurrenceDays:', error);
        return false;
      }
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {} as Record<string, ClassEvent[]>);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta aula?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteClassEvent(db, id);
            loadSchedule();
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={daysOfWeek}
        keyExtractor={(item) => item}
        renderItem={({ item: day }) => (
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">{day}</Text>
              <Link href={{ pathname: "/add", params: { day } }} asChild>
                <TouchableOpacity className="bg-blue-500 px-3 py-1 rounded-full">
                  <Text className="text-white">{translations.addClass}</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {groupByDay[day].map(event => (
              <View key={event.id} className="bg-blue-50 p-4 rounded-lg mb-2 flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="font-semibold text-base text-gray-800">
                    {event.discipline.toUpperCase()}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-1">
                    {event.className.toUpperCase()}
                  </Text>
                  <Text className="text-blue-600 text-sm">
                    {event.startTime} - {event.endTime}
                  </Text>
                </View>

                <TouchableOpacity
                  className="p-2 ml-2 bg-red-100 rounded-lg"
                  onPress={() => handleDelete(event.id!)}
                >
                  <Text className="text-red-600">Excluir</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}