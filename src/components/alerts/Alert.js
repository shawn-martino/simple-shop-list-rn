import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';

const Alert = ({ onPress, alert }) => (
  // console.log(alert);
  <TouchableWithoutFeedback onPress={() => onPress(alert.id)}>
    <View style={styles.container}>
      <Text style={styles.text}>{alert.text}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => onPress(alert.id)}
          title="Okay"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  </TouchableWithoutFeedback>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#efefff',
    borderColor: '#5959ff',
    borderTopWidth: 2,
  },
  buttonContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  text: {
    color: '#580095',
    fontSize: 16,
    flex: 3,
  },
});

Alert.propTypes = {
  onPress: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
};

export default Alert;
