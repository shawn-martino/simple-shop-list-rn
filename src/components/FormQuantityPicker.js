import React from 'react';
import { View, StyleSheet, Picker, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

function renderCostForMeasure(measure, qty) {
  switch (measure) {
    case 'units':
      return 'units';
    case 'gram':
      return `${qty} gram`;
    case 'ml':
      return `${qty} ml`;
    default:
      return measure;
  }
}

const FormQuantityPicker = ({
  measure,
  qty,
  cost,
  onQuantityChange,
  onPickerValueChange,
  onCostChange,
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    }}
  >
    <View style={{ flex: 1, marginRight: 2, marginLeft: 2 }}>
      <Text style={[styles.textLabel]}>Quantity</Text>
      <TextInput
        underlineColorAndroid="transparent"
        style={[
          styles.textInput,
          {
            textAlign: 'right',
            backgroundColor: 'white',
          },
        ]}
        value={qty}
        onChangeText={onQuantityChange}
        keyboardType="numeric"
      />
    </View>

    <View style={{ flex: 2, marginRight: 2 }}>
      <Text style={[styles.textLabel]}>Measure</Text>
      <Picker
        mode="dropdown"
        selectedValue={measure}
        onValueChange={value => onPickerValueChange(value)}
        style={[
          {
            height: 50,
            marginTop: 5,
            paddingBottom: 5,
            paddingHorizontal: 2,
            backgroundColor: 'white',
          },
          styles.noMarginLeft,
        ]}
      >
        <Picker.Item label="unit" value="units" />
        <Picker.Item label="ml" value="ml" />
        <Picker.Item label="gram" value="gram" />
      </Picker>
    </View>

    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={[styles.textLabel]}>Cost </Text>
        <Text numberOfLines={1} style={{ fontSize: 10, color: '#ccc' }}>
          / {renderCostForMeasure(measure, qty)}
        </Text>
      </View>
      <TextInput
        underlineColorAndroid="transparent"
        style={styles.textInput}
        value={cost}
        onChangeText={onCostChange}
        keyboardType="numeric"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  noMarginLeft: {
    marginLeft: 0,
  },
  textLabel: {
    fontSize: 14,
    color: '#eee',
    fontWeight: '600',
  },
  textInput: {
    height: 50,
    backgroundColor: 'white',
    marginTop: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

FormQuantityPicker.propTypes = {
  measure: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onPickerValueChange: PropTypes.func.isRequired,
  onCostChange: PropTypes.func.isRequired,
};

export default FormQuantityPicker;
