import React, { useEffect, useState } from 'react';
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

import { fetchUsSymbols, UsSymbol } from '../api/GET/Symbols';
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
  const [validSymbols, setValidSymbols] = useState<UsSymbol[]>([]);
  const [loadingSymbols, setLoadingSymbols] = useState(false);
  const [suggestions, setSuggestions] = useState<UsSymbol[]>([]);

  useEffect(() => {
    if (visible) {
      setLoadingSymbols(true);
      fetchUsSymbols()
        .then((symbols: UsSymbol[]) => setValidSymbols(symbols))
        .finally(() => setLoadingSymbols(false));
    }
  }, [visible]);

  useEffect(() => {
    if (ticker.length > 0 && validSymbols.length > 0) {
      const filtered = validSymbols
        .filter(sym => sym.symbol.startsWith(ticker.toUpperCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [ticker, validSymbols]);

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
    if (
      ticker &&
      !loadingSymbols &&
      !validSymbols.some(s => s.symbol === ticker.toUpperCase())
    )
      newErrors.ticker = true;
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
                {/* SUGGERIMENTI */}
                {suggestions.length > 0 && (
                  <View style={{ backgroundColor: "#f1f5f9", borderRadius: 6, marginTop: 2, padding: 4 }}>
                    {suggestions.map(s => (
                      <TouchableOpacity
                        key={s.symbol}
                        onPress={() => {
                          setTicker(s.symbol);
                          setNome(s.description); // autocompleta anche il nome!
                        }}
                        style={{ paddingVertical: 4, paddingHorizontal: 8 }}
                      >
                        <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
                          {s.symbol} <Text style={{ color: "#64748b", fontWeight: "normal" }}>{s.description}</Text>
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {errors.ticker && ticker && !loadingSymbols && (
                  <Text style={{ color: "red", marginBottom: 4 }}>
                    Ticker non valido. Inserisci un simbolo del mercato americano.
                  </Text>
                )}
                {loadingSymbols && (
                  <Text style={{ color: "#2563eb", marginBottom: 4 }}>
                    Caricamento simboli in corso...
                  </Text>
                )}
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
                disabled={loadingSymbols}
              >
                <Text style={addNewCompanyStyles.primaryButtonText}>
                  {loadingSymbols ? "Caricamento simboli..." : "Aggiungi Azienda"}
                </Text>
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