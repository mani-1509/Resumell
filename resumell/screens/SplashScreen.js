import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing } from '../constants/theme';
import { Button } from '../components/Button';

export default function SplashScreen({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('Auth');
  };

  const handlePreview = () => {
    // TODO: Implement preview modal
    console.log('Preview clicked');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Logo placeholder */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>R</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Build. Upgrade. Get hired.</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Turn messy resumes into job-ready profiles. Get your AI-powered career plan in minutes.
        </Text>

        {/* CTAs */}
        <View style={styles.ctaContainer}>
          <Button
            label="Get Started"
            onClick={handleGetStarted}
            variant="primary"
            fullWidth
          />
          <View style={styles.ctaSpacing} />
          <Button
            label="Preview"
            onClick={handlePreview}
            variant="ghost"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxxl,
  },
  logo: {
    fontSize: 64,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  tagline: {
    fontSize: Typography.sizes.h1,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontSize: Typography.sizes.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 440,
    marginBottom: Spacing.xxxxl,
    lineHeight: 24,
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 400,
  },
  ctaSpacing: {
    height: Spacing.md,
  },
});
