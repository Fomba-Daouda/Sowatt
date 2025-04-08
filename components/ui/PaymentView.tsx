import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';

interface PaymentViewProps {
  totalAmount: number;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

export function PaymentView({ totalAmount, onPaymentSuccess, onPaymentCancel }: PaymentViewProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'applePay'>('card');

  const handlePayment = () => {
    // Simuler un processus de paiement
    Alert.alert(
      'Paiement',
      `Paiement de ${totalAmount}€ effectué avec succès!`,
      [
        {
          text: 'OK',
          onPress: onPaymentSuccess
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Paiement</Text>
      <Text style={styles.amount}>Total: {totalAmount}€</Text>

      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[
            styles.paymentMethodButton,
            selectedPaymentMethod === 'card' && styles.selectedPaymentMethod
          ]}
          onPress={() => setSelectedPaymentMethod('card')}
        >
          <Text style={styles.paymentMethodText}>Carte bancaire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentMethodButton,
            selectedPaymentMethod === 'applePay' && styles.selectedPaymentMethod
          ]}
          onPress={() => setSelectedPaymentMethod('applePay')}
        >
          <Text style={styles.paymentMethodText}>Apple Pay</Text>
        </TouchableOpacity>
      </View>

      {selectedPaymentMethod === 'card' ? (
        <View style={styles.cardForm}>
          <TextInput
            style={styles.input}
            placeholder="Numéro de carte"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/AA"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </View>
      ) : (
        <View style={styles.applePayContainer}>
          <Text style={styles.applePayText}>
            Appuyez sur le bouton ci-dessous pour payer avec Apple Pay
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onPaymentCancel}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>
            {selectedPaymentMethod === 'applePay' ? 'Payer avec Apple Pay' : 'Payer'}
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    marginBottom: 30,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentMethodButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedPaymentMethod: {
    backgroundColor: '#E6F7FF',
    borderColor: '#0066CC',
  },
  paymentMethodText: {
    fontSize: 16,
  },
  cardForm: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  applePayContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  applePayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#0066CC',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  payButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 