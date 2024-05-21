import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Moment from 'moment';

type OrderDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderDetail'>;

interface Props {
  navigation: OrderDetailScreenNavigationProp;
  route: { params: { data: Transaction } };
}

interface Transaction {
  id: string;
  amount: number;
  product: {
    item: string;
    sku: string;
    price: number;
  };
  qty: number;
  total: number;
  status: string;
  created_at: string;
}

type RootStackParamList = {
  OrderDetail: { data: Transaction };
};

export default function OrderDetail({ navigation, route }: Props) {
  const { data } = route.params;
  console.log("sure",data);

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Product</Text>
        <Text style={styles.headerText}>SKU</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Total</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.dataRow}>
        <View style={styles.productColumn}>
          <Text style={styles.dataText}>{data['product'].item}</Text>
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>{data.status} {Moment(data.created_at).format('MMM D, YYYY H:mma')}</Text>
          </View>
        </View>
        <Text style={styles.dataText}>{data.product.sku}</Text>
        <Text style={styles.dataText}>{data.product.price.toFixed(2)}</Text>
        <Text style={styles.dataText}>{data.qty}</Text>
        <Text style={styles.dataText}>{data.total.toFixed(2)}</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Shipping (Pickup)</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>TOTAL</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  productColumn: {
    flex: 2,
    alignItems: 'center',
  },
  statusBox: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 5,
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#555',
  },
  dataText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  summary: {
    marginLeft: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    flex: 3,
    fontSize: 14,
  },
  summaryValue: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
});

