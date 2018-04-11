import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Button = props => (
  <TouchableOpacity
    disabled={props.disabled}
    onPress={props.onPress}
    style={[styles.buttonStyle, props.buttonStyle]}
  >
    <Text style={[styles.textStyle, props.textStyle]}>{props.children}</Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  disabled: false,
  buttonStyle: null,
  textStyle: null,
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'blue',
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'blue',
  },
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default Button;
