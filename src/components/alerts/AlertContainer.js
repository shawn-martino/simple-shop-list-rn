import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { removeAlert } from '../../actions';

import Alert from './Alert';

class AlertContainer extends Component {
  onRemoveAlert = (id) => {
    // console.log('Remove Alert Action Creator');
    this.props.removeAlert(id);
  };

  renderAlerts() {
    // console.log('renderAlerts', this.props.alerts);
    return this.props.alerts.map(alert => (
      // console.log('map alerts', alert);
      <Alert onPress={this.onRemoveAlert} alert={alert} key={alert.id} />
    ));
  }

  render() {
    return <View style={styles.container}>{this.renderAlerts()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 46,
    left: 0,
    right: 0,
  },
});

AlertContainer.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapState = state => ({
  alerts: state.alerts,
});

export default connect(mapState, { removeAlert })(AlertContainer);
