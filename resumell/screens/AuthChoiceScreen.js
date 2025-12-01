import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { Button } from '../components/Button';

export default function AuthChoiceScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleOAuth = async (provider) => {
    setLoading(true);
    // TODO: Implement actual OAuth flow
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Preferences');
    }, 1500);
  };

  const handleEmailSignup = () => {
    // TODO: Navigate to email signup
    console.log('Email signup');
  };

  const handleSignIn = () => {
    // TODO: Navigate to sign in
    console.log('Sign in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Heading */}
          <Text style={styles.heading}>Let's get you started</Text>
          <Text style={styles.subheading}>Choose how you'd like to continue</Text>

          {/* OAuth Buttons */}
          <TouchableOpacity
            style={[styles.oauthButton, styles.googleButton]}
            onPress={() => handleOAuth('google')}
            disabled={loading}
          >
            <Text style={styles.oauthText}>🔍 Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.oauthButton, styles.linkedinButton]}
            onPress={() => handleOAuth('linkedin')}
            disabled={loading}
          >
            <Text style={styles.oauthText}>in Continue with LinkedIn</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Signup */}
          <Button
            label="Sign up with Email"
            onClick={handleEmailSignup}
            variant="secondary"
            fullWidth
          />

          {/* Sign In Link */}
          <TouchableOpacity onPress={handleSignIn} style={styles.signInContainer}>
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>

          {/* Privacy Note */}
          <View style={styles.privacyNote}>
            <Text style={styles.privacyText}>🛡️ We never store passwords — OAuth only</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    padding: Spacing.lg,
  },
  backButtonText: {
    color: Colors.text,
    fontSize: Typography.sizes.body,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },
  heading: {
    fontSize: Typography.sizes.h2,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  subheading: {
    fontSize: Typography.sizes.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxxl,
  },
  oauthButton: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  linkedinButton: {
    backgroundColor: '#0A66C2',
  },
  oauthText: {
    fontSize: Typography.sizes.body,
    fontWeight: Typography.weights.semibold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    marginHorizontal: Spacing.lg,
    color: Colors.textSecondary,
    fontSize: Typography.sizes.small,
  },
  signInContainer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  signInText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.body,
  },
  signInLink: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  privacyNote: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  privacyText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.small,
    textAlign: 'center',
  },
});
