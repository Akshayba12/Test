import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';

const dimension = Dimensions.get('window').width;

const DigitsButtons = ({styless, numbers, onPress}) => {
  return (
    <TouchableOpacity style={styless} onPress={onPress}>
      <Text style={styles.Txt}>{numbers}</Text>
    </TouchableOpacity>
  );
};

export default DigitsButtons;

const styles = StyleSheet.create({
  Txt: {
    color: 'white',
    fontSize: dimension / 11,
  },
});
