import React from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Coin } from '../../core/models/coin.model';
import { formatUSD } from '../../utils/formatCurrency';
import { getCoinInitial } from '../../utils/getInitailCoin';
import type { RootStackParams } from '../navigation/Navigation';
import theme from '../../config/theme/them';

type HomeNavProp = StackNavigationProp<RootStackParams, 'Home'>;

interface Props {
    item: Coin;
}

export const CardCoin: React.FC<Props> = ({ item }) => {
    const navigation = useNavigation<HomeNavProp>();

    const onPress = (e: GestureResponderEvent) => {
        navigation.navigate('Detail', { id: item.id });
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.containerNameCoin}>
                <View style={styles.icon}>
                    <Text style={styles.initial}>{getCoinInitial(item.name)}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.title}
                    >
                        {item.name}
                    </Text>
                    <Text variant="bodySmall" style={styles.subTitle}>
                        {item.symbol}
                    </Text>
                </View>
            </View>
            <View>
                <Text variant="bodyMedium" style={styles.price}>
                    {`${formatUSD(item.price_usd)} USD`}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical:12,
        justifyContent: 'space-between',
        backgroundColor: '#1e293b',
    },
    containerNameCoin: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    icon: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        padding: 5,
        backgroundColor: '#227dab',
        borderRadius: 50,
    },
    initial: {
        fontSize:22,
        color: '#fff',
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        flexWrap: 'wrap',
        flexShrink: 1,
        fontWeight: '600',
        color: '#fff',
    },
    subTitle: {
        color: '#F5C45E',
    },
    price: {
        fontWeight: '500',
        color: theme.colors.primary,
    },
});
