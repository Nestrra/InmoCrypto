

import React from 'react'
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../config/theme/them';

interface ScreenLayoutProps {
  children: React.ReactNode;
}

export const ScreenLayout = ({ children }:ScreenLayoutProps) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inner: {
    flex: 1,
    paddingTop: 8,
  },
});