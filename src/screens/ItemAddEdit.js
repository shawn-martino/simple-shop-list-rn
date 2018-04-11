import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createItem, editItem, deleteItem } from '../actions';

import ItemForm from '../components/ItemForm';

class ItemAddEdit extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.action} Item`,
  });

  // ADD
  submitAddItemForm = (values) => {
    this.props.navigation.goBack();
    this.props.createItem(values);
  };

  // EDIT
  submitEditItemForm = (values) => {
    this.props.editItem(values);
    this.props.navigation.goBack();
  };

  submitDeleteItem = (id) => {
    this.props.deleteItem(id);
    this.props.navigation.goBack();
  };

  // Render
  propsForForm = () => {
    const { action, item } = this.props.navigation.state.params;
    if (action === 'Add') {
      return (
        <ItemForm
          submitForm={this.submitAddItemForm}
          submitButton="Add Item to Inventory"
        />
      );
    }
    if (action === 'Edit') {
      return (
        <ItemForm
          submitForm={this.submitEditItemForm}
          submitButton="Save Changes"
          item={item}
          delete={this.submitDeleteItem}
        />
      );
    }
    return null;
  };

  render() {
    return <View style={styles.container}>{this.propsForForm()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

ItemAddEdit.propTypes = {
  createItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(null, {
  createItem,
  editItem,
  deleteItem,
})(ItemAddEdit);
