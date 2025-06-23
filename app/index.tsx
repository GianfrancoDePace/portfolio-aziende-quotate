import { useState } from "react";
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { aziendeIniziali } from "./Data/AziendeMockData";
import Quoted from "./api/GET/Quoted";
import AggiuntaAzienda from "./components/AddNewCompany";
import Filter from "./components/filter";
import { Azienda } from "./types/Azienda";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [aziende, setAziende] = useState<Azienda[]>(aziendeIniziali);
  const [filter, setFilter] = useState("");
  const [quotes, setQuotes] = useState<Record<string, any>>({});
  const [selectedAzienda, setSelectedAzienda] = useState<Azienda | null>(null);

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

  const renderItem = ({ item }: { item: Azienda }) => (
    <TouchableOpacity onPress={() => setSelectedAzienda(item)}>
      <View style={[styles.itemContainer]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>{item.nome} <Text style={styles.ticker}>({item.ticker})</Text></Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.detail}>
            Azioni possedute: <Text style={styles.bold}>{item.azioniPossedute ?? '-'}</Text>
          </Text>
          <Text style={styles.detail}>
            Prezzo: <Text style={styles.bold}>{item.prezzo ?? '-'}</Text>
          </Text>
          {item.utili !== undefined && (
            <Text style={[styles.utili, { color: item.utili >= 0 ? 'green' : 'red' }]}>
              {item.utili >= 0 ? '+' : ''}{item.utili.toLocaleString()} €
            </Text>
          )}
          <Text style={styles.detail}>
            {item.isProfitable ? "Profittevole" : "In perdita"}
          </Text>
          <TouchableOpacity
            style={[styles.profitButton, { backgroundColor: item.isProfitable ? '#4CAF50' : '#f44336' }]}
            onPress={() => handleToggleProfitability(item.id)}
            accessibilityLabel={item.isProfitable ? "Segna come in perdita" : "Segna come profittevole"}
          >
            <Text style={styles.profitButtonText}>
              {item.isProfitable ? "✓ Profittevole" : "✗ In perdita"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteAzienda(item.id)}
          accessibilityLabel="Elimina azienda"
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleOpenModal}
      >
        <Text style={styles.addButtonText}>Aggiungi una nuova azienda</Text>
      </TouchableOpacity>
      <Filter value={filter} onChange={setFilter} />
      <FlatList
        data={aziendeFiltrate}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={aziendeFiltrate.length === 0 ? styles.emptyList : undefined}
        ListEmptyComponent={<Text>Non ci sono aziende disponibili</Text>}
        style={styles.flatList}
      />
      <AggiuntaAzienda
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddAzienda={handleAddAzienda}
      />

      {/* Quoted per ogni azienda */}
      {aziende.map(a => (
        <Quoted
          key={a.ticker}
          ticker={a.ticker}
          onData={data => handleQuoteData(a.ticker, data)}
        />
      ))}

      {/* Modale per mostrare i dati quotati */}
      <Modal
        visible={!!selectedAzienda}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedAzienda(null)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 12,
            minWidth: 280,
            alignItems: 'center'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
              {selectedAzienda?.nome} ({selectedAzienda?.ticker})
            </Text>
            {selectedAzienda && quotes[selectedAzienda.ticker] ? (
              <>
                <Text>Prezzo attuale: <Text style={{ fontWeight: 'bold' }}>{quotes[selectedAzienda.ticker].c}</Text></Text>
                <Text>Massimo oggi: {quotes[selectedAzienda.ticker].h}</Text>
                <Text>Minimo oggi: {quotes[selectedAzienda.ticker].l}</Text>
                <Text>Apertura: {quotes[selectedAzienda.ticker].o}</Text>
                <Text>Chiusura precedente: {quotes[selectedAzienda.ticker].pc}</Text>
              </>
            ) : (
              <ActivityIndicator size="large" color="blue" />
            )}
            <TouchableOpacity
              style={{ marginTop: 16, backgroundColor: 'red', padding: 10, borderRadius: 6 }}
              onPress={() => setSelectedAzienda(null)}
            >
              <Text style={{ color: 'white' }}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#f9f9f9",
  },
  flatList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 0,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: "#fff",
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
  utili: {
    marginTop: 4,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 14,
    borderRadius: 0,
    marginBottom: 0,
    alignItems: "center",
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 12,
    padding: 8,
  },
  deleteIcon: {
    fontSize: 22,
  },
  ticker: {
    fontSize: 14,
    color: '#999',
  },
  detail: {
    color: '#333',
    marginTop: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  profitButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  profitButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});