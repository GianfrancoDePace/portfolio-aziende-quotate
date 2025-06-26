import React from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import modalStyles from "../style/ModalStyle";
import { Azienda } from "../types/Azienda";

interface CompanyDetailsModalProps {
    visible: boolean;
    azienda: Azienda | null;
    quotes: Record<string, any>;
    onClose: () => void;
    onGoToHistory?: () => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
    visible,
    azienda,
    quotes,
    onClose,
    onGoToHistory
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
                            <Text>Prezzo attuale: {quotes[azienda.ticker].c}$</Text>
                            <Text>Massimo oggi: {quotes[azienda.ticker].h}$</Text>
                            <Text>Minimo oggi: {quotes[azienda.ticker].l}$</Text>
                            <Text>Apertura: {quotes[azienda.ticker].o}$</Text>
                            <Text>Chiusura precedente: {quotes[azienda.ticker].pc}$</Text>
                            <Text>Variazione: {quotes[azienda.ticker].dp}%</Text>
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color="blue" />
                    )}

                    <View style={modalStyles.buttonRow}>
                        {onGoToHistory && (
                            <TouchableOpacity
                                style={[modalStyles.modalButton]}
                                onPress={onGoToHistory}
                            >
                                <Text style={modalStyles.modalButtonText}>Vai allo storico</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={[modalStyles.modalButton, modalStyles.modalButtonRed]}
                            onPress={onClose}
                        >
                            <Text style={modalStyles.modalButtonText}>Chiudi</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    </Modal>
);

export default CompanyDetailsModal;