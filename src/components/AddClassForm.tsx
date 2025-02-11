import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ClassEvent, insertClassEvent } from '../db/database';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { daysOfWeek, translations } from '../utils/constants';
import ColorPicker from 'react-native-wheel-color-picker';

const DEFAULT_COLOR = '#dbeafe'; // Cor padrão azul claro
const COLOR_PRESETS = [
  '#dbeafe', // blue-50
  '#fce7f3', // pink-50
  '#ecfccb', // lime-100
  '#dcfce7', // green-50
  '#fef9c3', // yellow-50
  '#ffe4e6', // rose-50
];

export default function AddClassForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ClassEvent>({
    defaultValues: {
      startTime: '08:00',
      endTime: '09:00',
      color: DEFAULT_COLOR
    }
  });

  const db = useSQLiteContext();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedDays, setSelectedDays] = useState<string[]>(
    params.day ? [params.day as string] : []
  );
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [daysError, setDaysError] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);

  const handleTimeChange = (type: 'start' | 'end', selectedTime?: Date) => {
    const currentTime = selectedTime || new Date();
    const timeString = currentTime.toTimeString().substring(0, 5);

    if (type === 'start') {
      setValue('startTime', timeString, { shouldValidate: true });
      setShowStartPicker(false);
    } else {
      setValue('endTime', timeString, { shouldValidate: true });
      setShowEndPicker(false);
    }
  };

  const validateTimes = (start: string, end: string) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
      return "O horário de término deve ser após o horário de início";
    }
    return true;
  };

  const onSubmit = async (data: ClassEvent) => {
    // Validate selected days
    if (selectedDays.length === 0) {
      setDaysError(true);
      return;
    }
    setDaysError(false);

    // Validate time order
    const timeValidation = validateTimes(data.startTime, data.endTime);
    if (typeof timeValidation === 'string') {
      alert(timeValidation);
      return;
    }

    const event: ClassEvent = {
      ...data,
      color: selectedColor, // Adicione a cor
      recurrence: 'weekly',
      recurrenceDays: JSON.stringify(selectedDays),
      day: selectedDays[0]
    };

    await insertClassEvent(db, event);

    router.back();
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Discipline Field */}
      <View className="mb-4">
        <Controller
          control={control}
          name="discipline"
          rules={{ required: "Disciplina é obrigatória" }}
          render={({ field }) => (
            <>
              <TextInput
                className={`border p-3 rounded-lg ${errors.discipline ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder={translations.subject}
                placeholderTextColor="#9ca3af"
                value={field.value}
                onChangeText={field.onChange}
              />
              {errors.discipline && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.discipline.message}
                </Text>
              )}
            </>
          )}
        />
      </View>

      {/* Class Name Field */}
      <View className="mb-4">
        <Controller
          control={control}
          name="className"
          rules={{ required: "Nome da aula é obrigatório" }}
          render={({ field }) => (
            <>
              <TextInput
                className={`border p-3 rounded-lg ${errors.className ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder={translations.className}
                placeholderTextColor="#9ca3af"
                value={field.value}
                onChangeText={field.onChange}
              />
              {errors.className && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.className.message}
                </Text>
              )}
            </>
          )}
        />
      </View>

      {/* Days Selection */}
      <View className="mb-6">
        <Text className="text-gray-600 mb-3">{translations.selectDays}</Text>
        {daysError && (
          <Text className="text-red-500 text-sm mb-2">
            Selecione pelo menos um dia
          </Text>
        )}
        <View className="flex-row flex-wrap justify-between">
          {daysOfWeek.map(day => (
            <TouchableOpacity
              key={day}
              className={`w-[14%] aspect-square items-center justify-center rounded-full mb-2 ${selectedDays.includes(day) ? 'bg-blue-500' : 'bg-gray-100'
                }`}
              onPress={() => toggleDay(day)}
            >
              <Text className={`font-medium ${selectedDays.includes(day) ? 'text-white' : 'text-gray-600'
                }`}>
                {day[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Time Pickers */}
      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <Text className="text-gray-600 mb-2">{translations.startTime}</Text>
          <Controller
            control={control}
            name="startTime"
            rules={{ required: "Horário inicial é obrigatório" }}
            render={({ field }) => (
              <>
                <TouchableOpacity
                  className={`border p-3 rounded-lg ${errors.startTime ? 'border-red-500' : 'border-gray-200'
                    }`}
                  onPress={() => setShowStartPicker(true)}
                >
                  <Text className="text-gray-600">
                    {field.value}
                  </Text>
                </TouchableOpacity>
                {errors.startTime && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.startTime.message}
                  </Text>
                )}
              </>
            )}
          />

          {showStartPicker && (
            <DateTimePicker
              value={new Date(`1970-01-01T${control._formValues.startTime}:00`)}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
              onChange={(_, date) => handleTimeChange('start', date)}
            />
          )}
        </View>

        <View className="w-[48%]">
          <Text className="text-gray-600 mb-2">{translations.endTime}</Text>
          <Controller
            control={control}
            name="endTime"
            rules={{ required: "Horário final é obrigatório" }}
            render={({ field }) => (
              <>
                <TouchableOpacity
                  className={`border p-3 rounded-lg ${errors.endTime ? 'border-red-500' : 'border-gray-200'
                    }`}
                  onPress={() => setShowEndPicker(true)}
                >
                  <Text className="text-gray-600">
                    {field.value}
                  </Text>
                </TouchableOpacity>
                {errors.endTime && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.endTime.message}
                  </Text>
                )}
              </>
            )}
          />

          {showEndPicker && (
            <DateTimePicker
              value={new Date(`1970-01-01T${control._formValues.endTime}:00`)}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
              onChange={(_, date) => handleTimeChange('end', date)}
            />
          )}
        </View>
      </View>
      <View className="mb-6">
        <Text className="text-gray-600 mb-3">{translations.selectColor}</Text>
        <View className="flex-row flex-wrap gap-2">
          {COLOR_PRESETS.map((color) => (
            <TouchableOpacity
              key={color}
              className={`w-12 h-12 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-200'
                }`}
              style={{ backgroundColor: color }}
              onPress={() => setSelectedColor(color)}
            />
          ))}
          <TouchableOpacity
            className="w-12 h-12 rounded-full border-2 border-gray-200 items-center justify-center"
            onPress={() => setShowColorPicker(true)}>
            <Text className="text-gray-500">+</Text>
          </TouchableOpacity>
        </View>

        {showColorPicker && (
          <View className="mt-4">
            <ColorPicker
              color={selectedColor}
              onColorChangeComplete={(color) => setSelectedColor(color)}
              thumbSize={30}
              sliderSize={30}
              gapSize={10}
              swatches={false}
            />
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-lg mt-4"
              onPress={() => setShowColorPicker(false)}>
              <Text className="text-white text-center">Selecionar Cor</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-semibold">{translations.saveSchedule}</Text>
      </TouchableOpacity>
    </View>
  );
}