import React from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../style/MainStyle";
import modalStyles from "../style/ModalStyle";
import Azienda from "../types/Azienda";

interface CompanyDetailsModalProps {
    visible: boolean;
    azienda: Azienda | null;
    quotes: Record<string, any>;
    onClose: () => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
    visible,
    azienda,
    quotes,
    onClose,
}) => (
    <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
    >
        <View style={modalStyles.modalOverlay}>
            <View style={modalStyles.modalView}>
                <ScrollView>
                    <Text style={modalStyles.modalTitle}>
                        {azienda?.nome} ({azienda?.ticker})
                    </Text>
                    {azienda && quotes[azienda.ticker] ? (
                        <View style={modalStyles.modalSection}>
                            <Text>Prezzo attuale: <Text style={mainStyles.bold}>{quotes[azienda.ticker].c}</Text></Text>
                            <Text>Massimo oggi: {quotes[azienda.ticker].h}</Text>
                            <Text>Minimo oggi: {quotes[azienda.ticker].l}</Text>
                            <Text>Apertura: {quotes[azienda.ticker].o}</Text>
                            <Text>Chiusura precedente: {quotes[azienda.ticker].pc}</Text>
                            <Text>Variazione: {quotes[azienda.ticker].dp}</Text>
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color="blue" />
                    )}
                    <TouchableOpacity
                        style={modalStyles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Chiudi</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    </Modal>
);

export default CompanyDetailsModal;