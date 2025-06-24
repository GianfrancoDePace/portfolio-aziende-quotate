import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Quoted from "./api/GET/Quoted";
import AggiuntaAzienda from "./components/AddNewCompany";
import CompanyCard from "./components/CompanyCard";
import Filter from "./components/filter";
import { aziendeIniziali } from "./Data/AziendeMockData";
import mainStyles from "./style/MainStyle";
import modalStyles from "./style/ModalStyle";
import { Azienda } from "./types/Azienda";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [aziende, setAziende] = useState<Azienda[]>(aziendeIniziali);
  const [filter, setFilter] = useState("");
  const [quotes, setQuotes] = useState<Record<string, any>>({});
  const [selectedAzienda, setSelectedAzienda] = useState<Azienda | null>(null);
  const userId = "user-12345";

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  //Funzione per aggiungere una nuova azienda
  const handleAddAzienda = (nuovaAzienda: Azienda) => {
    setAziende([...aziende, nuovaAzienda]);
    handleCloseModal();
  };

  //Funzione per Eliminare un'azienda
  const handleDeleteAzienda = (id: string) => {
    setAziende(aziende.filter(a => a.id !== id));
  };
  //Marca un'azienda come profittevole o in perdita
  const handleToggleProfitability = (id: string) => {
    setAziende(aziende.map(a =>
      a.id === id ? { ...a, isProfitable: !a.isProfitable } : a
    ));
  };
  //Filtra le aziende in base al nome
  const aziendeFiltrate = aziende.filter(a =>
    a.nome.toLowerCase().includes(filter.toLowerCase())
  );

  // Callback per salvare i dati quotati
  const handleQuoteData = (ticker: string, data: any) => {
    setQuotes(prev => ({ ...prev, [ticker]: data }));
  };
  //useEffect per il salvataggio e caricamento delle aziende
  useEffect(() => {
    const loadAziende = async () => {
      const saved = await AsyncStorage.getItem('aziende');
      if (saved) setAziende(JSON.parse(saved));
    };
    loadAziende();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('aziende', JSON.stringify(aziende));
  }, [aziende]);


  const renderItem = ({ item }: { item: Azienda }) => (
    <CompanyCard
      azienda={item}
      prezzoApi={quotes[item.ticker]?.c}
      variazioneApi={quotes[item.ticker]?.dp}
      onPress={() => setSelectedAzienda(item)}
      onToggleProfitability={() => handleToggleProfitability(item.id)}
      onDelete={() => handleDeleteAzienda(item.id)}
    />
  );

  return (
    <View style={mainStyles.container}>
      <Stack.Screen options={{ title: "Portfolio" }} />
      <View style={mainStyles.userIdBox}>
        <Text style={mainStyles.userIdText}>ID Utente: {userId}</Text>
      </View>

      <TouchableOpacity style={mainStyles.addButton} onPress={handleOpenModal}>
        <Text style={mainStyles.addButtonText}>Aggiungi azienda</Text>
      </TouchableOpacity>
      <Filter value={filter} onChange={setFilter} />
      <FlatList
        data={aziendeFiltrate}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={aziendeFiltrate.length === 0 ? mainStyles.emptyList : undefined}
        ListEmptyComponent={<Text>Non sono state inserite aziende</Text>}
        style={mainStyles.flatList}
      />
      <AggiuntaAzienda
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddAzienda={handleAddAzienda}
      />
      {/* Quote per ogni azienda */}
      {aziende.map(a => (
        <Quoted
          key={a.ticker}
          ticker={a.ticker}
          onData={data => handleQuoteData(a.ticker, data)}
        />
      ))}

      {/* Modale dettagli */}
      <Modal
        visible={!!selectedAzienda}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedAzienda(null)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalView}>
            <ScrollView>
              <Text style={modalStyles.modalTitle}>
                {selectedAzienda?.nome} ({selectedAzienda?.ticker})
              </Text>
              {/* Dati correnti */}
              {selectedAzienda && quotes[selectedAzienda.ticker] ? (
                <View style={modalStyles.modalSection}>
                  <Text>Prezzo attuale: <Text style={mainStyles.bold}>{quotes[selectedAzienda.ticker].c}</Text></Text>
                  <Text>Massimo oggi: {quotes[selectedAzienda.ticker].h}</Text>
                  <Text>Minimo oggi: {quotes[selectedAzienda.ticker].l}</Text>
                  <Text>Apertura: {quotes[selectedAzienda.ticker].o}</Text>
                  <Text>Chiusura precedente: {quotes[selectedAzienda.ticker].pc}</Text>
                  <Text>Variazione: {quotes[selectedAzienda.ticker].dp}</Text>
                </View>
              ) : (
                <ActivityIndicator size="large" color="blue" />
              )}
              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={() => setSelectedAzienda(null)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Chiudi</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}