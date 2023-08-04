/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useReducer} from 'react';
import DigitsButtons from '../components/DigitsButtons';
import Operands from '../components/Operands';
// import Operations from '../components/Operations';

const dimension = Dimensions.get('window').width;

const calCulate = ({currentOperand, prevOperand, operation}: any) => {
  const p = parseFloat(prevOperand);
  const c = parseFloat(currentOperand);
  let result = '';
  if (isNaN(p) && isNaN(c)) {
    return '';
  }
  switch (operation) {
    case '+':
      result = p + c;
      break;
    case '-':
      result = p - c;
      break;
    case '×':
      result = p * c;
      break;
    case '÷':
      result = p / c;
      break;

    default:
      break;
  }
  return result.toString();
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'add-digit':
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === 0 && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand?.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case 'clear':
      return {};
    case 'choose-opernd':
      if (state.currentOperand == null && state.prevOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.digit,
        };
      }
      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.digit,
          prevOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        prevOperand: calCulate(state),
        operation: payload.digit,
        currentOperand: null,
      };
    case 'equal-operand':
      if (
        state.currentOperand === null ||
        state.prevOperand === null ||
        state.operation === null
      ) {
        return state;
      }
      return {
        ...state,
        prevOperand: null,
        operation: null,
        currentOperand: calCulate(state),
        overwrite: true,
      };
    case 'percentage':
      if (state.currentOperand == null) {
        return state;
      }
      return {
        ...state,
        currentOperand: (state.currentOperand / 100).toString(),
      };
    case 'signConvert': {
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand > 0) {
        return {
          ...state,
          currentOperand: '-' + state.currentOperand,
        };
      }
      if (state.currentOperand[0] == '-') {
        return {
          ...state,
          currentOperand: state.currentOperand.slice(1),
        };
      }
    }
  }
};

// const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
//   maximumFractionDigits: 0,
// });

// function formatOperand(operand) {
//   if (operand == null) {
//     return;
//   }
//   const [integer, decimal] = operand?.split('.');
//   if (decimal == null) {
//     return INTEGER_FORMATTER.format(integer);
//   }
//   return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
// }

const Calculator = () => {
  const buttons = [
    'AC',
    '+/-',
    '%',
    '÷',
    7,
    8,
    9,
    '×',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    0,
    '.',
    '=',
  ];

  const operator = ['÷', '×', '-', '+', '='];

  //   const operator1 = ['AC', '+/-', '%'];

  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];

  const [{currentOperand, prevOperand, operation}, dispatch] = useReducer(
    reducer,
    {},
  );

  return (
    <View style={{backgroundColor: 'black', flex: 1, paddingHorizontal: 16}}>
      <View
        style={{
          flex: 1,
          borderColor: 'white',
          alignItems: 'flex-end',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingRight: 16,
        }}>
        <Text style={{color: 'white', fontSize: dimension / 4.5}}>
          {currentOperand}
        </Text>
      </View>
      <View
        style={{
          borderColor: 'white',
        }}>
        <FlatList
          data={buttons}
          numColumns={4}
          key={5}
          renderItem={({item}) =>
            num.includes(item) ? (
              <DigitsButtons
                styless={item === 0 ? styles.operand : styles.btns}
                numbers={item}
                onPress={() =>
                  dispatch({type: 'add-digit', payload: {digit: item}})
                }
              />
            ) : operator.includes(item) ? (
              <Operands
                styless={[styles.btns, {backgroundColor: 'orange'}]}
                operands={item}
                onPress={
                  item === '='
                    ? () =>
                        dispatch({
                          type: 'equal-operand',
                        })
                    : () =>
                        dispatch({
                          type: 'choose-opernd',
                          payload: {digit: item},
                        })
                }
              />
            ) : (
              <TouchableOpacity
                onPress={
                  item === '%'
                    ? () => dispatch({type: 'percentage'})
                    : item === 'AC'
                    ? () => dispatch({type: 'clear'})
                    : () => dispatch({type: 'signConvert'})
                }
                style={[styles.btns, {backgroundColor: 'white'}]}>
                <Text style={styles.btnTxt}>{item}</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  btns: {
    margin: 5,
    backgroundColor: '#1D2B3A',
    height: dimension / 5,
    width: dimension / 5,
    borderRadius: dimension / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'black',
    fontSize: dimension / 11,
  },
  operand: {
    margin: 5,
    backgroundColor: '#1D2B3A',
    height: dimension / 5,
    width: dimension / 5,
    borderRadius: dimension / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});
