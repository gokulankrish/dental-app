
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { colors } from '../../constants/Colors';

export default function BMICalculatorScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    if (!height || !weight) return;

    let bmiValue: number;
    if (unit === 'metric') {
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      bmiValue =
        (parseFloat(weight) * 703) /
        (parseFloat(height) * parseFloat(height));
    }

    const roundedBMI = parseFloat(bmiValue.toFixed(1));
    setBMI(roundedBMI);

    if (roundedBMI < 18.5) {
      setCategory('Underweight');
    } else if (roundedBMI < 25) {
      setCategory('Normal weight');
    } else if (roundedBMI < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setBMI(null);
    setCategory('');
  };

  const getBMICategoryColor = () => {
    switch (category) {
      case 'Underweight':
        return colors.warning;
      case 'Normal weight':
        return colors.success;
      case 'Overweight':
        return colors.warning;
      case 'Obese':
        return colors.error;
      default:
        return colors.textDark;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />



      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>BMI Calculator</Text>
          <Text style={styles.subtitle}>
            Calculate your Body Mass Index
          </Text>

          <View style={styles.unitSelector}>
            {['metric', 'imperial'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.unitButton,
                  unit === type && styles.selectedUnitButton,
                ]}
                onPress={() => setUnit(type as 'metric' | 'imperial')}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    unit === type && styles.selectedUnitButtonText,
                  ]}
                >
                  {type === 'metric' ? 'Metric' : 'Imperial'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputsContainer}>
            <Input
              label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
              placeholder={unit === 'metric' ? 'e.g. 170' : 'e.g. 65'}
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <Input
              label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
              placeholder={unit === 'metric' ? 'e.g. 65' : 'e.g. 140'}
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              title="Calculate BMI"
              onPress={calculateBMI}
              variant="primary"
              size="large"
              style={styles.button}
            />
            <Button
              title="Reset"
              onPress={resetCalculator}
              variant="outline"
              size="large"
              style={styles.button}
            />
          </View>

          {bmi !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Your BMI</Text>
              <Text style={styles.bmiValue}>{bmi}</Text>
              <Text
                style={[
                  styles.bmiCategory,
                  { color: getBMICategoryColor() },
                ]}
              >
                {category}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
    textAlign: 'center',
  },
  unitSelector: {
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    padding: 4,
  },
  unitButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedUnitButton: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  selectedUnitButtonText: {
    color: colors.primary,
  },
  inputsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  button: {
    width: '100%',
  },
  resultContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  bmiCategory: {
    fontSize: 18,
    fontWeight: '600',
  },
});
