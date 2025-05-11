
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Text,
  DataTable,
  IconButton,
  Icon,
} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/Navigation';
import { useDetailCoin } from '../../hooks/useDetailCoin';
import { ScreenLayout } from '../../components/ScreenLayout';
import { formatUSD } from '../../../utils/formatCurrency';
import { Loading } from '../../components/Loading';
import theme from '../../../config/theme/them';
import { useNavigation } from '@react-navigation/native';




interface Props extends StackScreenProps<RootStackParams, 'Detail'> { }

export const DetailScreen = ({ route }: Props) => {

  const { id } = route.params
  const { loading, coin } = useDetailCoin(id)
  const navigation = useNavigation()

  return (
    <ScreenLayout>

      {
        loading ? <Loading /> :
          <ScrollView contentContainerStyle={styles.container}>
            <View

            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.nav}
              >
                <Icon
                  source="chevron-back-outline"
                  color={theme.colors.primary}
                  size={30}
                />
                <Text
                  variant='titleLarge'
                  style={styles.textNav}
                >
                  {`${coin!.name} (${coin!.symbol})`}
                </Text>
              </TouchableOpacity>

            </View>
            <Card style={styles.card}>
              <Card.Title
                titleStyle={[styles.textWhite, { color: '#227dab', }]}
                title={`Rank #${coin!.rank}`}

              />
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <Text style={[styles.sectionTitle, styles.textWhite]}>
                  Precio
                </Text>
                <Text style={styles.textWhite}>
                  {formatUSD(coin!.price_usd)} USD
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <Text style={[styles.sectionTitle, styles.textWhite]}>
                  Cambios porcentuales
                </Text>
                <DataTable>
                  {[
                    { label: '1h', value: coin!.percent_change_1h },
                    { label: '24h', value: coin!.percent_change_24h },
                    { label: '7d', value: coin!.percent_change_7d },
                  ].map(({ label, value }) => {
                    const num = parseFloat(value);
                    const isNegative = num < 0;
                    return (
                      <DataTable.Row key={label}>
                        <DataTable.Cell>
                          <Text style={styles.textWhite}>{label}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          <Text style={isNegative ? styles.negative : styles.positive}>
                            {`${value}%`}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <Text style={[styles.sectionTitle, styles.textWhite]}>
                  Mercado
                </Text>
                <View style={styles.row}>
                  <Text style={styles.textWhite}>Market Cap:</Text>
                  <Text style={styles.textWhite}>
                    {formatUSD(coin!.market_cap_usd)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.textWhite}>Volumen 24h:</Text>
                  <Text style={styles.textWhite}>
                    {parseFloat(String(coin!.volume24)).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.textWhite}>Circulating Supply:</Text>
                  <Text style={styles.textWhite}>
                    {parseFloat(coin!.csupply).toLocaleString()}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
      }

    </ScreenLayout>

  )
}



const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 12

  },
  textNav: {

    color: theme.colors.primary
  },
  container: {
    padding: 16,
  },

  card: {
    backgroundColor: '#1e293b',
    marginBottom: 12,
  },
  sectionTitle: {

    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  textWhite: {
    color: '#FFFFFF',
  },
  positive: {
    color: '#4caf50',
    fontWeight: '600',
  },
  negative: {
    color: '#f44336',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: theme.colors.onBackground,
  },
});
