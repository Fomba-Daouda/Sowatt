import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Sowatt } from './SowattCard';

interface SowattDetailProps {
  sowatt: Sowatt;
  onClose: () => void;
  onOrder: () => void;
  onAddToCart: () => void;
  onBackToList: () => void;
}

export const SowattDetail: React.FC<SowattDetailProps> = ({
  sowatt,
  onClose,
  onOrder,
  onAddToCart,
  onBackToList,
}) => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image 
          source={{ uri: sowatt.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText style={styles.type}>{sowatt.type}</ThemedText>
            <ThemedText style={styles.price}>{sowatt.price}€/kWh</ThemedText>
          </View>

          <View style={styles.availabilityContainer}>
            <View style={[
              styles.availability,
              { backgroundColor: sowatt.isAvailable ? '#4CAF50' : '#F44336' }
            ]}>
              <Text style={styles.availabilityText}>
                {sowatt.isAvailable ? 'Disponible' : 'Non disponible'}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Description</ThemedText>
            <ThemedText style={styles.description}>{sowatt.description}</ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Informations du vendeur</ThemedText>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Vendeur:</ThemedText>
              <ThemedText style={styles.infoValue}>{sowatt.sellerName}</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Localisation:</ThemedText>
              <ThemedText style={styles.infoValue}>{sowatt.location}</ThemedText>
            </View>
          </View>

          {sowatt.isAvailable && (
            <View style={styles.actions}>
              <TouchableOpacity 
                style={[styles.button, styles.orderButton]}
                onPress={onOrder}
              >
                <Text style={styles.buttonText}>Passer la commande</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.cartButton]}
                onPress={onAddToCart}
              >
                <Text style={styles.buttonText}>Ajouter au panier</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToList}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  type: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  availabilityContainer: {
    marginBottom: 16,
  },
  availability: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  availabilityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
  },
  actions: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButton: {
    backgroundColor: '#2196F3',
  },
  cartButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topButtons: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 