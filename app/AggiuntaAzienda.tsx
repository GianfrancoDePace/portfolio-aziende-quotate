import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Azienda } from './aziende';

interface AggiuntaAziendaProps {
  visible: boolean;
  onClose: () => void;
  onAddAzienda: (azienda: Azienda) => void;
}

export default function AggiuntaAzienda({ visible, onClose, onAddAzienda }: AggiuntaAziendaProps) {
  const [nome, setNome] = useState('');
  const [description, setDescription] = useState('');
  const [utili, setUtili] = useState('');
  const [isProfitable, setIsProfitable] = useState(true);

  const handleAddCompany = () => {
    if (nome && description) {
      const nuovaAzienda: Azienda = {
        id: uuidv4(),
        nome: nome,
        description: description,
        utili: utili ? parseFloat(utili) : undefined,
        isProfitable: false
      };
      onAddAzienda(nuovaAzienda);
      setNome('');
      setDescription('');
      setUtili('');
      setIsProfitable(false);
      onClose();
    } else {
      alert('Nome and description are required.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Aggiungi Azienda</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrizione"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Utili (opzionale)"
            value={utili}
            onChangeText={setUtili}
            keyboardType="numeric"
          />
          <Button title="Aggiungi" onPress={handleAddCompany} />
          <Button title="Chiudi" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: 200,
  },
});