import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import modalStyles from '../style/ModalStyle';
import addNewCompanyStyles from '../style/NewCompanyStyle';
import { Azienda } from '../types/Azienda';


interface AggiuntaAziendaProps {
  visible: boolean;
  onClose: () => void;
  onAddAzienda: (azienda: Azienda) => void;
}

const { height } = Dimensions.get('window');

export default function AggiuntaAzienda({ visible, onClose, onAddAzienda }: AggiuntaAziendaProps) {
  const [nome, setNome] = useState('');
  const [ticker, setTicker] = useState('');
  const [sector, setSector] = useState('');
  const [azioniPossedute, setAzioniPossedute] = useState('');
  const [isProfitable, setIsProfitable] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const resetForm = () => {
    setNome('');
    setTicker('');
  setSector('');
    setAzioniPossedute('');
    setIsProfitable(true);
    setErrors({});
  };

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!nome) newErrors.nome = true;
    if (!ticker) newErrors.ticker = true;
    if (!sector) newErrors.sector = true;
    if (!azioniPossedute) newErrors.azioniPossedute = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCompany = () => {
    if (validateFields()) {
      const nuovaAzienda: Azienda = {
        id: uuidv4(),
        nome,
        ticker,
        sector,
        azioniPossedute: parseInt(azioniPossedute),
        isProfitable,
      };
      onAddAzienda(nuovaAzienda);
      resetForm();
      onClose();
    } else {
      Alert.alert(
        'Campi Obbligatori',
        'Per favore, compila tutti i campi obbligatori (contrassegnati con *).'
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={addNewCompanyStyles.scrollContent}
          >
            <View style={addNewCompanyStyles.header}>
              <View style={addNewCompanyStyles.headerIcon}>
                <Text style={addNewCompanyStyles.iconText}>📊</Text>
              </View>
              <Text style={addNewCompanyStyles.title}>Nuova Azienda</Text>
              <Text style={addNewCompanyStyles.subtitle}>Aggiungi una nuova società al tuo portfolio</Text>
            </View>

            <View style={addNewCompanyStyles.formContainer}>
              <View style={addNewCompanyStyles.inputGroup}>
                <Text style={addNewCompanyStyles.label}>Nome Azienda <Text style={addNewCompanyStyles.requiredIndicator}>*</Text></Text>
                <TextInput
                  style={[addNewCompanyStyles.input, errors.nome && addNewCompanyStyles.inputError]}
                  placeholder="es. Apple Inc."
                  placeholderTextColor="#94A3B8"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>
              <View style={addNewCompanyStyles.inputGroup}>
                <Text style={addNewCompanyStyles.label}>Ticker Symbol <Text style={addNewCompanyStyles.requiredIndicator}>*</Text></Text>
                <TextInput
                  style={[addNewCompanyStyles.input, errors.ticker && addNewCompanyStyles.inputError]}
                  placeholder="es. AAPL"
                  placeholderTextColor="#94A3B8"
                  value={ticker}
                  onChangeText={setTicker}
                  autoCapitalize="characters"
                />
              </View>
              <View style={addNewCompanyStyles.inputGroup}>
                <Text style={addNewCompanyStyles.label}>Descrizione <Text style={addNewCompanyStyles.requiredIndicator}>*</Text></Text>
                <TextInput
                  style={[addNewCompanyStyles.input, addNewCompanyStyles.textArea, errors.sector && addNewCompanyStyles.inputError]}
                  placeholder="Descrivi l'attività dell'azienda..."
                  placeholderTextColor="#94A3B8"
                  value={sector}
                  onChangeText={setSector}
                  multiline
                  numberOfLines={3}
                />
              </View>
              <View style={addNewCompanyStyles.inputGroup}>
                <Text style={addNewCompanyStyles.label}>Azioni Possedute <Text style={addNewCompanyStyles.requiredIndicator}>*</Text></Text>
                <TextInput
                  style={[addNewCompanyStyles.input, errors.azioniPossedute && addNewCompanyStyles.inputError]}
                  placeholder="100"
                  placeholderTextColor="#94A3B8"
                  value={azioniPossedute}
                  onChangeText={setAzioniPossedute}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={addNewCompanyStyles.buttonContainer}>
              <TouchableOpacity
                style={addNewCompanyStyles.primaryButton}
                onPress={handleAddCompany}
                activeOpacity={0.8}
              >
                <Text style={addNewCompanyStyles.primaryButtonText}>Aggiungi Azienda</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={addNewCompanyStyles.secondaryButton}
                onPress={() => { resetForm(); onClose(); }}
                activeOpacity={0.8}
              >
                <Text style={addNewCompanyStyles.secondaryButtonText}>Annulla</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
