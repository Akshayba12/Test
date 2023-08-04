import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';

const dimension = Dimensions.get('window').width;

const Operands = ({styless, operands, onPress}) => {
  return (
    <TouchableOpacity style={styless} onPress={onPress}>
      <Text style={styles.btnTxt}>{operands}</Text>
    </TouchableOpacity>
  );
};

export default Operands;

const styles = StyleSheet.create({
  btnTxt: {
    color: 'white',
    fontSize: dimension / 11,
  },
});
