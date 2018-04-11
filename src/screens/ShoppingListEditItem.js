import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { listEditItem } from '../actions';

import ItemForm from '../components/ItemForm';

class ShoppingListEditItem extends Component {
  static navigationOptions = () => ({
    title: 'Edit List Item',
  });

  submitEditItemForm = async (values, clearForm) => {
    await this.props.listEditItem(values);
    clearForm();
    this.props.navigation.goBack();
  };

  render() {
    const { item } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ItemForm
          submitForm={this.submitEditItemForm}
          submitButton="Save Changes"
          item={item}
          showBarcode={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

ShoppingListEditItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  listEditItem: PropTypes.func.isRequired,
};

export default connect(null, {
  listEditItem,
})(ShoppingListEditItem);
