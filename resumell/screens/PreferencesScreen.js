import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { Button } from '../components/Button';
import { ChipSelector } from '../components/ChipSelector';

export default function PreferencesScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [goals, setGoals] = useState([]);
  const [desiredRole, setDesiredRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const goalOptions = [
    { id: 'build_resume', label: '📄 Build new resume' },
    { id: 'improve_resume', label: '✨ Improve existing resume' },
    { id: 'career_guidance', label: '🧭 Career guidance' },
    { id: 'interview_prep', label: '💬 Interview prep' },
  ];

  const experienceOptions = [
    { id: 'student', label: 'Student / No experience' },
    { id: '0-1', label: '0-1 years' },
    { id: '1-3', label: '1-3 years' },
    { id: '3-7', label: '3-7 years' },
    { id: '7+', label: '7+ years' },
  ];

  const handleNext = () => {
    if (currentStep === 1 && goals.length === 0) {
      return; // Validation
    }
    
    if (currentStep === 3) {
      navigation.navigate('Profile');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Text style={styles.heading}>What brings you here?</Text>
            <Text style={styles.hint}>
              Pick what you want right now — you can change later.
            </Text>
            <ChipSelector
              options={goalOptions}
              selected={goals}
              multi={true}
              onChange={setGoals}
            />
          </View>
        );
      
      case 2:
        return (
          <View>
            <Text style={styles.heading}>Tell us about your goals</Text>
            <Text style={styles.label}>Desired Role</Text>
            <Text style={styles.inputPlaceholder}>
              e.g., Frontend Engineer, Product Designer
            </Text>
            {/* TODO: Implement TypeaheadInput */}
            
            <View style={styles.spacing} />
            
            <Text style={styles.label}>Experience Level</Text>
            <ChipSelector
              options={experienceOptions}
              selected={experienceLevel ? [experienceLevel] : []}
              multi={false}
              onChange={(selected) => setExperienceLevel(selected[0])}
            />
          </View>
        );
      
      case 3:
        return (
          <View>
            <Text style={styles.heading}>How would you like to start?</Text>
            <Text style={styles.hint}>
              Upload resume (PDF/DOCX), Import from LinkedIn, or Start from scratch
            </Text>
            {/* TODO: Implement CardSelector and FileUploader */}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button label="← Back" onClick={handleBack} variant="ghost" />
        <Text style={styles.stepIndicator}>
          Step {currentStep} of 3
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${(currentStep / 3) * 100}%` },
          ]}
        />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={currentStep === 3 ? 'Complete' : 'Continue'}
          onClick={handleNext}
          variant="primary"
          fullWidth
          disabled={currentStep === 1 && goals.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  stepIndicator: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.small,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  heading: {
    fontSize: Typography.sizes.h2,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  hint: {
    fontSize: Typography.sizes.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.sizes.body,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  inputPlaceholder: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    color: Colors.textSecondary,
    fontSize: Typography.sizes.body,
  },
  spacing: {
    height: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
});
