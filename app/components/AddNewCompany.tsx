import React from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAggiuntaAziendaForm } from '../hooks/useAggiuntaAziendaForm';
import formStyle from '../style/formStyle';
import modalStyles from '../style/ModalStyle';
import addNewCompanyStyles from '../style/NewCompanyStyle';
import { Azienda } from '../types/Azienda';
import FormInput from './FormInput';
import TickerSuggestions from './TickerSuggestion';

interface AggiuntaAziendaProps {
  visible: boolean;
  onClose: () => void;
  onAddAzienda: (azienda: Azienda) => void;
}

export default function AggiuntaAzienda({ visible, onClose, onAddAzienda }: AggiuntaAziendaProps) {
  const form = useAggiuntaAziendaForm(visible);

  const handleAddCompany = () => {
    if (form.validateFields()) {
      onAddAzienda(form.buildAzienda());
      form.resetForm();
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

            <FormInput
              label="Ticker Symbol"
              required
              error={form.errors.ticker}
              placeholder="es. AAPL"
              value={form.ticker}
              onChangeText={form.setTicker}
              autoCapitalize="characters"
            />
            <TickerSuggestions
              suggestions={form.suggestions}
              onSelect={s => {
                form.setTicker(s.symbol);
                form.setNome(s.description);
              }}
            />
            {form.errors.ticker && form.ticker && !form.loadingSymbols && (
              <Text style={{ color: "red", marginBottom: 4 }}>
                Ticker non valido. Inserisci un simbolo relativo al mercato americano.
              </Text>
            )}
            {form.loadingSymbols && (
              <Text style={{ color: "#2563eb", marginBottom: 4 }}>
                Caricamento simboli in corso...
              </Text>
            )}

            <View style={formStyle.container}>
              <FormInput
                label="Nome Azienda"
                required
                error={form.errors.nome}
                placeholder="es. Apple Inc."
                value={form.nome}
                onChangeText={form.setNome}
              />
              <FormInput
                label="Descrizione"
                required
                error={form.errors.settore}
                placeholder="Descrivi l'attività dell'azienda..."
                value={form.settore}
                onChangeText={form.setSettore}
                multiline
                numberOfLines={3}
              />
              <FormInput
                label="Azioni Possedute"
                required
                error={form.errors.azioniPossedute}
                placeholder="100"
                value={form.azioniPossedute}
                onChangeText={form.setAzioniPossedute}
                keyboardType="numeric"
              />
            </View>
            <View style={addNewCompanyStyles.buttonContainer}>
              <TouchableOpacity
                style={addNewCompanyStyles.primaryButton}
                onPress={handleAddCompany}
                activeOpacity={0.8}
                disabled={form.loadingSymbols}
              >
                <Text style={addNewCompanyStyles.primaryButtonText}>
                  {form.loadingSymbols ? "Caricamento simboli..." : "Aggiungi Azienda"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={addNewCompanyStyles.secondaryButton}
                onPress={() => { form.resetForm(); onClose(); }}
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