import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Quoted from "./api/GET/Quoted";
import AggiuntaAzienda from "./components/AddNewCompany";
import CompanyCard from "./components/CompanyCard";
import Filter from "./components/filter";
import ProfileComponent from "./components/Profilo";

import aziendeIniziali from "./Data/AziendeMockData";
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

  const router = useRouter();

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  // Function to add a new company
  const handleAddAzienda = (nuovaAzienda: Azienda) => {
    const aziendaToAdd = { ...nuovaAzienda, category: nuovaAzienda.sector || 'Generale' };
    setAziende([...aziende, aziendaToAdd]);
    handleCloseModal();
  };

  // Function to delete a company
  const handleDeleteAzienda = (id: string) => {
    setAziende(aziende.filter(a => a.id !== id));
  };

  // Marks a company as profitable or not
  const handleToggleProfitability = (id: string) => {
    setAziende(aziende.map(a =>
      a.id === id ? { ...a, isProfitable: !a.isProfitable } : a
    ));
  };

  // Filters companies by name
  const aziendeFiltrate = aziende.filter(a =>
    a.nome.toLowerCase().includes(filter.toLowerCase())
  );

  // Callback to save quoted data
  const handleQuoteData = (ticker: string, data: any) => {
    setQuotes(prev => ({ ...prev, [ticker]: data }));
  };

  // useEffect for saving and loading companies
  useEffect(() => {
    const loadAziende = async () => {
      try {
        const saved = await AsyncStorage.getItem('aziende');
        if (saved) {
          setAziende(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
      }
    };
    loadAziende();
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.setItem('aziende', JSON.stringify(aziende));
    } catch (error) {
      console.error("Failed to save data to AsyncStorage", error);
    }
  }, [aziende]);

  const handleBuyShares = (ticker: string, quantity: number) => {
    setAziende(prevAziende =>
      prevAziende.map(company => {
        if (company.ticker === ticker) {
          const currentPrice = quotes[ticker]?.c || company.prezzo;
          if (currentPrice === undefined) {
            Alert.alert("Errore", "Prezzo dell'azione non disponibile per l'acquisto.");
            return company;
          }
          const updatedShares = (company.azioniPossedute || 0) + quantity;
          console.log(`Bought ${quantity} shares of ${ticker}. Total shares: ${updatedShares}`);
          return { ...company, azioniPossedute: updatedShares };
        }
        return company;
      })
    );
    Alert.alert("Successo", `Hai acquistato ${quantity} azione/i di ${ticker}!`);
  };

  const handleSellShares = (ticker: string, quantity: number) => {
    setAziende(prevAziende =>
      prevAziende.map(company => {
        if (company.ticker === ticker) {
          const currentShares = company.azioniPossedute || 0;
          if (currentShares === 0) {
            Alert.alert("Errore", `Non hai azioni di ${ticker} da vendere.`);
            return company;
          }
          if (currentShares < quantity) {
            Alert.alert("Errore", `Non puoi vendere più azioni di ${ticker} di quante ne possiedi (${currentShares}).`);
            return company;
          }
          const updatedShares = currentShares - quantity;
          console.log(`Sold ${quantity} shares of ${ticker}. Remaining shares: ${updatedShares}`);
          return { ...company, azioniPossedute: updatedShares };
        }
        return company;
      })
    );
    Alert.alert("Successo", `Hai venduto ${quantity} azione/i di ${ticker}!`);
  };

  const renderItem = ({ item }: { item: Azienda }) => (
    <CompanyCard
      azienda={item}
      prezzoApi={quotes[item.ticker]?.c}
      variazioneApi={quotes[item.ticker]?.dp}
      onPress={() => setSelectedAzienda(item)}
      onToggleProfitability={() => handleToggleProfitability(item.id)}
      onDelete={() => handleDeleteAzienda(item.id)}
      onBuyShares={handleBuyShares}
      onSellShares={handleSellShares}
    />
  );

  return (
    <View style={mainStyles.container}>
      <Stack.Screen options={{ title: "Portfolio" }} />

      <ProfileComponent
        userId={userId}
        aziende={aziende}
        currentQuotes={quotes}
      />

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
      {/* Quote for each company */}
      {aziende.map(a => (
        <Quoted
          key={a.ticker}
          ticker={a.ticker}
          onData={data => handleQuoteData(a.ticker, data)}
        />
      ))}

      {/* Detail Modal */}
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
              {/* Current Data */}
              {selectedAzienda && quotes[selectedAzienda.ticker] ? (
                <View style={modalStyles.modalSection}>
                  <Text>Prezzo attuale: <Text style={mainStyles.bold}>{quotes[selectedAzienda.ticker].c?.toFixed(2) || 'N/A'}</Text></Text>
                  <Text>Massimo oggi: {quotes[selectedAzienda.ticker].h || 'N/A'}</Text>
                  <Text>Minimo oggi: {quotes[selectedAzienda.ticker].l || 'N/A'}</Text>
                  <Text>Apertura: {quotes[selectedAzienda.ticker].o || 'N/A'}</Text>
                  <Text>Chiusura precedente: {quotes[selectedAzienda.ticker].pc || 'N/A'}</Text>
                  <Text>Variazione: {quotes[selectedAzienda.ticker].dp?.toFixed(2) || 'N/A'}</Text>
                </View>
              ) : (
                <ActivityIndicator size="large" color="blue" />
              )}
              <TouchableOpacity
                style={[modalStyles.closeButton, { backgroundColor: "#2563eb", marginBottom: 10 }]}
                onPress={() => {
                  if (selectedAzienda) {
                    router.push({
                      pathname: "/screens/CompanyDetails",
                      params: { azienda: JSON.stringify(selectedAzienda) }
                    });
                    setSelectedAzienda(null);
                  }
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Vai allo storico</Text>
              </TouchableOpacity>
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