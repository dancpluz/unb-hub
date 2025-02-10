import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { initializeDB } from '../../database/setup';
import { Disciplina } from '../../types/event';
import { addWeeks, startOfWeek, format, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const GradeScreen = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  // Gera os dias da semana
  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek, { weekStartsOn: 1 }), // Segunda-feira
    end: addWeeks(startOfWeek(currentWeek, { weekStartsOn: 1 }), 4)
  }).slice(0, 5); // Apenas dias úteis

  // Carrega disciplinas
  const loadDisciplinas = async () => {
    try {
      const db = await initializeDB();
      const results = await db.getAllAsync<Disciplina>('SELECT * FROM disciplinas');
      setDisciplinas(results);
    } catch (error) {
      console.error('Erro ao carregar disciplinas:', error);
    }
  };

  useEffect(() => {
    loadDisciplinas();
  }, []);

  // Navegação entre semanas
  const handleWeekChange = (weeks: number) => {
    setCurrentWeek(prev => addWeeks(prev, weeks));
  };

  return (
    <View className="flex-1 bg-gray-50 p-2">
      {/* Controle de Navegação */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded"
          onPress={() => handleWeekChange(-1)}
        >
          <Text className="text-white">Semana Anterior</Text>
        </TouchableOpacity>

        <Text className="font-semibold">
          {format(currentWeek, "MMMM 'de' yyyy", { locale: ptBR })}
        </Text>

        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded"
          onPress={() => handleWeekChange(1)}
        >
          <Text className="text-white">Próxima Semana</Text>
        </TouchableOpacity>
      </View>

      {/* Grade de Horários */}
      <View className="flex-row border-b border-gray-200">
        <View className="w-20" /> {/* Espaço para horários */}
        {weekDays.map(day => (
          <View key={day.toISOString()} className="flex-1 p-2 items-center">
            <Text className="font-semibold text-sm">
              {format(day, 'EEE', { locale: ptBR }).toUpperCase()}
            </Text>
            <Text className="text-xs text-gray-500">
              {format(day, 'dd/MM')}
            </Text>
          </View>
        ))}
      </View>

      {/* Linhas de Horário */}
      {['08:00', '10:00', '14:00', '16:00', '19:00'].map(time => (
        <View key={time} className="flex-row border-b border-gray-100 h-20">
          <View className="w-20 justify-center items-center">
            <Text className="text-gray-500 text-sm">{time}</Text>
          </View>

          {weekDays.map(day => {
            const diaSemana = format(day, 'EEE', { locale: ptBR }).toLowerCase().slice(0, 3);
            const disciplina = disciplinas.find(d =>
              JSON.parse(d.horarios).some((h: any) =>
                h.dia === diaSemana && h.inicio === time
              )
            );

            return (
              <View
                key={`${day.toISOString()}-${time}`}
                className="flex-1 border-l border-gray-100 p-1"
              >
                {disciplina && (
                  <View className="bg-blue-100 rounded p-1 h-full justify-center">
                    <Text className="text-xs font-semibold">{disciplina.nome}</Text>
                    <Text className="text-xs text-gray-600">{disciplina.codigo}</Text>
                    <Text className="text-xs text-gray-500">{time} - {JSON.parse(disciplina.horarios)[0].fim}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default GradeScreen;