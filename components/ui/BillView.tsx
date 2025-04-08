import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface Bill {
  id: string;
  date: string;
  amount: number;
  period: string;
  status: 'paid' | 'pending';
  details: {
    consumption: number;
    unitPrice: number;
    taxes: number;
    total: number;
  };
}

export function BillView() {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [bills] = useState<Bill[]>([
    {
      id: '1',
      date: '2024-03-01',
      amount: 150.50,
      period: 'Février 2024',
      status: 'paid',
      details: {
        consumption: 500,
        unitPrice: 0.25,
        taxes: 25.50,
        total: 150.50
      }
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 180.75,
      period: 'Janvier 2024',
      status: 'paid',
      details: {
        consumption: 600,
        unitPrice: 0.25,
        taxes: 30.75,
        total: 180.75
      }
    }
  ]);

  const handleDownloadBill = async (bill: Bill) => {
    try {
      // Créer un fichier PDF temporaire
      const fileUri = `${FileSystem.documentDirectory}facture_${bill.period}.pdf`;
      
      // Simuler la création d'un PDF (à remplacer par la vraie génération de PDF)
      await FileSystem.writeAsStringAsync(fileUri, `Facture ${bill.period}\nMontant: ${bill.amount}€`, {
        encoding: FileSystem.EncodingType.UTF8
      });

      // Partager le fichier
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/pdf',
        dialogTitle: `Facture ${bill.period}`
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de télécharger la facture');
    }
  };

  const renderBillDetails = (bill: Bill) => (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Détails de la facture</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Consommation:</Text>
        <Text style={styles.detailValue}>{bill.details.consumption} kWh</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Prix unitaire:</Text>
        <Text style={styles.detailValue}>{bill.details.unitPrice}€/kWh</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Taxes:</Text>
        <Text style={styles.detailValue}>{bill.details.taxes}€</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Total:</Text>
        <Text style={styles.detailValue}>{bill.details.total}€</Text>
      </View>
      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={() => handleDownloadBill(bill)}
      >
        <Text style={styles.downloadButtonText}>Télécharger la facture</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {bills.map((bill) => (
        <TouchableOpacity
          key={bill.id}
          style={styles.billCard}
          onPress={() => setSelectedBill(selectedBill?.id === bill.id ? null : bill)}
        >
          <View style={styles.billHeader}>
            <Text style={styles.period}>{bill.period}</Text>
            <Text style={styles.amount}>{bill.amount}€</Text>
          </View>
          <View style={styles.billFooter}>
            <Text style={styles.date}>{bill.date}</Text>
            <Text style={[
              styles.status,
              bill.status === 'paid' ? styles.statusPaid : styles.statusPending
            ]}>
              {bill.status === 'paid' ? 'Payée' : 'En attente'}
            </Text>
          </View>
          {selectedBill?.id === bill.id && renderBillDetails(bill)}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  billCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  period: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  billFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: '#666',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  statusPaid: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
  },
  detailsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#666',
  },
  detailValue: {
    fontWeight: '500',
  },
  downloadButton: {
    backgroundColor: '#0066CC',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 