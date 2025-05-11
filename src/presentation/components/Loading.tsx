

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import theme from '../../config/theme/them'

export const Loading = () => {
  return (
   <View
    style={
        styles.container
    }
   >
        <ActivityIndicator color={theme.colors.primary} size={50} />       
   </View>
  )
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

})