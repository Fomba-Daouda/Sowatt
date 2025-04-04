import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { ThemedView } from '../ThemedView';
import { SowattCard } from './SowattCard';
import { Sowatt } from './SowattCard';

interface SowattListProps {
  sowatts: Sowatt[];
  onAddToCart?: (sowatt: Sowatt, quantity: number) => void;
}

export const SowattList: React.FC<SowattListProps> = ({ sowatts, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSowatts = sowatts.filter(sowatt =>
    sowatt.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par localisation..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>
      <FlatList
        data={filteredSowatts}
        renderItem={({ item }) => (
          <SowattCard
            sowatt={item}
            onAddToCart={onAddToCart}
          />
        )}
        keyExtractor={(item) => item.type}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
  },
  listContent: {
    padding: 6,
  },
}); 