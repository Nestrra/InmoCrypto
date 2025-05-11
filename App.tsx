import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from '@react-native-vector-icons/ionicons';
import React from 'react';
import {useColorScheme} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import { Navigation } from './src/presentation/navigation/Navigation';
import { PaperProvider } from 'react-native-paper';
import theme from './src/config/theme/them';
import { SafeAreaProvider } from 'react-native-safe-area-context';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}
         settings={{
          icon: (props: any) => <IonIcon {...props} />
        }}
      >
        <NavigationContainer>

          <Navigation />

        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>


  );
}



export default App;
