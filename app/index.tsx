import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AggiuntaAzienda from "./AggiuntaAzienda";
import { Azienda, aziendeIniziali } from "./aziende";
import Filter from "./components/filter";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [aziende, setAziende] = useState<Azienda[]>(aziendeIniziali);
  const [filter, setFilter] = useState("");

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  // Funzione per aggiungere una nuova azienda
  const handleAddAzienda = (nuovaAzienda: Azienda) => {
    setAziende([...aziende, nuovaAzienda]);
    handleCloseModal();
  };
  // Funzione per eliminare un'azienda
  const handleDeleteAzienda = (id: string) => {
    setAziende(aziende.filter(a => a.id !== id));
  };

  // Funzione per filtrare le aziende in base al nome
  const aziendeFiltrate = aziende.filter(a =>
    a.nome.toLowerCase().includes(filter.toLowerCase())
  );

  const renderItem = ({ item }: { item: Azienda }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nome} <Text style={styles.ticker}>({(item as any).ticker})</Text></Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.detail}>
          Azioni possedute: <Text style={styles.bold}>{(item as any).azioniPossedute ?? '-'}</Text>
        </Text>
        <Text style={styles.detail}>
          Prezzo: <Text style={styles.bold}>{(item as any).prezzo ?? '-'}</Text>
        </Text>
        {item.utili !== undefined && (
          <Text style={[styles.utili, { color: item.utili >= 0 ? 'green' : 'red' }]}>
            {item.utili >= 0 ? '+' : ''}{item.utili.toLocaleString()} €
          </Text>
        )}
        <Text style={styles.detail}>
          {item.isProfitable ? "Profittevole" : "In perdita"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteAzienda(item.id)}
        accessibilityLabel="Elimina azienda"
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
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
});