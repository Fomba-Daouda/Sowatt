import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Meter {
  id: string;
  number: string;
  type: 'Électrique' | 'Gaz' | 'Électricité et Gaz';
  installationDate: string;
  address: string;
  status: 'Actif' | 'Inactif';
  lastReading?: {
    date: string;
    value: number;
    unit: string;
  };
}

interface MeterViewProps {
  onClose: () => void;
  onBack: () => void;
}

export function MeterView({ onClose, onBack }: MeterViewProps) {
  const [meters] = useState<Meter[]>([
    {
      id: '1',
      number: '123456789',
      type: 'Électrique',
      installationDate: '2023-01-15',
      address: '123 Rue de la Paix, 75001 Paris',
      status: 'Actif',
      lastReading: {
        date: '2024-03-01',
        value: 1500,
        unit: 'kWh'
      }
    },
    {
      id: '2',
      number: '987654321',
      type: 'Gaz',
      installationDate: '2023-02-20',
      address: '123 Rue de la Paix, 75001 Paris',
      status: 'Actif',
      lastReading: {
        date: '2024-03-01',
        value: 500,
        unit: 'm³'
      }
    }
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Mes Compteurs</Text>
        </View>

        <ScrollView style={styles.container}>
          {meters.map((meter) => (
            <View key={meter.id} style={styles.meterCard}>
              <View style={styles.meterHeader}>
                <Text style={styles.meterNumber}>Compteur {meter.number}</Text>
                <View style={[
                  styles.statusBadge,
                  meter.status === 'Actif' ? styles.statusActive : styles.statusInactive
                ]}>
                  <Text style={styles.statusText}>{meter.status}</Text>
                </View>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>{meter.type}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Date d'installation</Text>
                <Text style={styles.infoValue}>
                  {new Date(meter.installationDate).toLocaleDateString('fr-FR')}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Adresse</Text>
                <Text style={styles.infoValue}>{meter.address}</Text>
              </View>

              {meter.lastReading && (
                <View style={styles.readingSection}>
                  <Text style={styles.readingTitle}>Dernière lecture</Text>
                  <View style={styles.readingInfo}>
                    <Text style={styles.readingValue}>
                      {meter.lastReading.value} {meter.lastReading.unit}
                    </Text>
                    <Text style={styles.readingDate}>
                      {new Date(meter.lastReading.date).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#00A19B',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  meterCard: {
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
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  meterNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  readingSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  readingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  readingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  readingDate: {
    fontSize: 14,
    color: '#666',
  },
}); 