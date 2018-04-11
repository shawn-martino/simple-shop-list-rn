import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons as Icon } from '@expo/vector-icons'; // eslint-disable-line
import { Font } from 'expo';

import {
  listAddItem,
  addAlert,
  getMockItems,
  rejectMockItems,
} from '../actions';
import ItemsInventory from '../components/ItemsInventory';

class Items extends Component {
  static navigationOptions = () => ({
    title: 'Items Inventory',
    header: null,
  });

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Sketch: require('../../assets/fonts/Sketch.otf'),
    });
    this.setState({
      fontLoaded: true,
    });
    if (!this.props.dev.api_called) {
      Alert.alert(
        'LOAD SAMPLE DATA',
        'Would you like to load sample items?',
        [
          {
            text: 'LOAD ITEMS',
            onPress: this.props.getMockItems,
          },
          {
            text: 'Cancel',
            onPress: this.props.rejectMockItems,
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  }

  addItemToList = (item) => {
    if (this.props.list.find(listItem => item.id === listItem.id)) {
      this.props.addAlert('Already in List');
      return;
    }
    this.props.listAddItem(item);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={() =>
            this.props.navigation.navigate('ItemAddEdit', { action: 'Add' })
          }
          hitSlop={{ top: 10, bottom: 10, right: 10 }}
        >
          <Icon name="add-circle" size={20} color="white" />
        </TouchableHighlight>
        {this.props.items.length > 0 ? (
          <ItemsInventory
            items={this.props.items}
            listAddItem={this.addItemToList}
            navigation={this.props.navigation}
          />
        ) : (
          <View style={styles.container}>
            <Text
              style={[
                {
                  fontSize: 30,
                  color: '#5CB85C',
                  textAlign: 'center',
                  padding: 50,
                },
                this.state.fontLoaded ? { fontFamily: 'Sketch' } : null,
              ]}
            >
              Inventory Empty
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  actionButton: {
    position: 'absolute',
    top: 0,
    left: 5,
    zIndex: 10,
    elevation: 4,
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  listAddItem: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  addAlert: PropTypes.func.isRequired,
  dev: PropTypes.object.isRequired,
  getMockItems: PropTypes.func.isRequired,
  rejectMockItems: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    items: state.items,
    list: state.list,
    dev: state.dev,
  };
}
export default connect(mapStateToProps, {
  listAddItem,
  addAlert,
  getMockItems,
  rejectMockItems,
})(Items);
