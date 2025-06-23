import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Azienda } from '../types/Azienda';

interface AggiuntaAziendaProps {
  visible: boolean;
  onClose: () => void;
  onAddAzienda: (azienda: Azienda) => void;
}

export default function AggiuntaAzienda({ visible, onClose, onAddAzienda }: AggiuntaAziendaProps) {
  const [nome, setNome] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [azioniPossedute, setAzioniPossedute] = useState('');
  const [prezzo, setPrezzo] = useState('');
  const [utili, setUtili] = useState('');
  const [isProfitable, setIsProfitable] = useState(true);

  const handleAddCompany = () => {
    if (nome && ticker && description && azioniPossedute && prezzo) {
      const nuovaAzienda: Azienda = {
        id: uuidv4(),
        nome,
        ticker,
        description,
        azioniPossedute: parseInt(azioniPossedute),
        prezzo: prezzo ? parseFloat(prezzo) : undefined,
        utili: utili ? parseFloat(utili) : undefined,
        isProfitable,
      };
      onAddAzienda(nuovaAzienda);
      setNome('');
      setTicker('');
      setDescription('');
      setAzioniPossedute('');
      setPrezzo('');
      setUtili('');
      setIsProfitable(true);
      onClose();
    } else {
      alert('Tutti i campi tranne prezzo e utili sono obbligatori.');
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
            placeholder="Ticker"
            value={ticker}
            onChangeText={setTicker}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrizione"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Azioni Possedute"
            value={azioniPossedute}
            onChangeText={setAzioniPossedute}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Prezzo"
            value={prezzo}
            onChangeText={setPrezzo}
          />
          <TextInput
            style={styles.input}
            placeholder="Utili (opzionale)"
            value={utili}
            onChangeText={setUtili}
            keyboardType="numeric"
          />
          <View style={styles.switchContainer}>
            <Text>Profittevole</Text>
            <Switch
              value={isProfitable}
              onValueChange={setIsProfitable}
            />
          </View>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
});