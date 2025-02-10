import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventModalProps } from '../types/event';
import { initializeDB } from '../database/setup';

const EventModal = ({ visible, onClose, event, onSave }: EventModalProps) => {
  const [titulo, setTitulo] = useState(event?.titulo || '');
  const [subtitulo, setSubtitulo] = useState(event?.subtitulo || '');
  const [inicio, setInicio] = useState(new Date(event?.inicio || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    try {
      const db = await initializeDB();
      const result = await db.runAsync(
        'INSERT INTO eventos (titulo, subtitulo, inicio) VALUES (?, ?, ?)',
        titulo,
        subtitulo,
        inicio.toISOString()
      );

      if (result.lastInsertRowId) {
        onSave();
        onClose();
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="p-5 bg-gray-100 flex-1">
        <Text className="text-xl font-bold mb-4">Novo Evento</Text>

        <TextInput
          className="bg-white p-3 rounded-lg mb-3"
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          className="bg-white p-3 rounded-lg mb-3"
          placeholder="Subtítulo"
          value={subtitulo}
          onChangeText={setSubtitulo}
        />

        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg mb-4"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-white text-center">Selecionar Horário</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={inicio}
            mode="time"
            onChange={(_, date) => {
              setShowDatePicker(false);
              date && setInicio(date);
            }}
          />
        )}

        <View className="flex-row justify-between mt-auto">
          <TouchableOpacity
            className="bg-gray-300 p-3 rounded-lg flex-1 mr-2"
            onPress={onClose}
          >
            <Text className="text-center">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-lg flex-1 ml-2"
            onPress={handleSave}
          >
            <Text className="text-white text-center">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EventModal;