import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Text as RNText,
} from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { useCurrencyApi } from '../../hooks/useCurrencyApi';
import theme from '../../../config/theme/them';
import { CardCoin } from '../../components/CardCoin';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Loading } from '../../components/Loading';
const SEARCH_LIMIT = 300;
const DEFAULT_LIMIT = 80;
/**
 * Pantalla principal donde se listan y filtran las criptomonedas.
 *
 * Usa:
 * - `useCurrencyApi` para obtener el array de `Coin` y controlar carga/paginación.
 * - `FlatList` con pull-to-refresh y scroll infinito.
 * - `CardCoin` para renderizar cada elemento.
 *
 * @component
 * @example
 * <Stack.Screen name="Home" component={HomeScreen} />
 */

export const HomeScreen: React.FC = () => {
    const { loading, currencyList, nextPage, fetchList } = useCurrencyApi();
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        if (searchQuery.trim().length > 0) {
           
            fetchList(SEARCH_LIMIT);
        } else {

            fetchList(DEFAULT_LIMIT);
        }
    }, [searchQuery]);


    const filteredList = currencyList.filter(c => {
        const q = searchQuery.trim().toLowerCase();
        if (q === '') return true;
        return (
            c.name.toLowerCase().includes(q) ||
            c.symbol.toLowerCase().includes(q)
        );
    });


    const handleLoadMore = async () => {
        if (isFetchingMore || searchQuery.trim().length > 0) return;
        setIsFetchingMore(true);
        await nextPage();
        setIsFetchingMore(false);
    };


    const handleRefresh = async () => {
        setSearchQuery('');
        await fetchList(DEFAULT_LIMIT);
    };



    return (
        <ScreenLayout>
            {
                loading ? <Loading /> :
                 <FlatList
                data={filteredList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <CardCoin item={item} />}
                ListHeaderComponent={
                    <>
                        <Text style={styles.title} variant="titleLarge">
                            ¡InmoCrypto!
                        </Text>
                        <View style={styles.containerInput}>

                            <TextInput
                                placeholderTextColor={'#7e7f80'}
                                textColor='#ffffff'
                                placeholder="Buscar criptomoneda"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                style={styles.input}
                            />
                        </View>
                    </>


                }
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        tintColor={'#227dab'}
                        colors={['#227dab']}
                        refreshing={loading}
                        onRefresh={handleRefresh}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingMore ? <ActivityIndicator color={'#227dab'} style={{ margin: 16 }} /> : null
                }
                ListEmptyComponent={
                    !loading && filteredList.length === 0 ? (
                        <RNText style={styles.empty}>
                            {searchQuery
                                ? 'No se encontró ninguna moneda'
                                : 'No hay criptomonedas disponibles'}
                        </RNText>
                    ) : null
                }
            />
            }

           
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    containerInput: {
        alignItems: 'center',
        marginBottom:18
    },
    input: {
        width: '96%',
        maxWidth: 400,
        backgroundColor: '#1e293b',
        borderRadius: 5,
        height: 40,
    },
    title: {
        marginVertical: 16,
        fontWeight: '700',
        color: theme.colors.onBackground,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 16,
    },
    empty: {
        textAlign: 'center',
        marginTop: 32,
        color: '#999',
    },
});
