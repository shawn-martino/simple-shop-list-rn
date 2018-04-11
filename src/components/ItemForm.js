import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  Button,
  Text,
  TextInput,
  DrawerLayoutAndroid,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { MaterialIcons as Icon } from '@expo/vector-icons'; // eslint-disable-line

import FormQuantityPicker from '../components/FormQuantityPicker';

const { /* height, */ width } = Dimensions.get('window');

class ItemForm extends Component {
  state = {
    name: '',
    shop: '',
    barcode: '',
    qty: '',
    measure: 'units',
    cost: '',
    notes: '',
    shouldRenderCamera: false,
    hasCameraPermission: null,
    hasFormSubmitted: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    if (this.props.item.name) {
      this.onItemPresentUpdateFields();
    }
  }

  onItemPresentUpdateFields = () => {
    const {
      name, shop, barcode, qty, measure, cost, notes,
    } = this.props.item;
    this.setState({
      name,
      shop,
      barcode,
      qty: qty ? qty.toString() : '',
      measure,
      cost: cost ? cost.toString() : '',
      notes,
    });
  };

  onBarcodeRead = (e) => {
    this.setState({ barcode: e.data });
    this.closeDrawer();
  };

  onShopChange = value => this.setState({ shop: value });
  onNameChange = value => this.setState({ name: value });
  onBarcodeChange = value => this.setState({ barcode: value });
  onQuantityChange = value => this.setState({ qty: value });
  onCostChange = value => this.setState({ cost: value });
  onPickerValueChange = value => this.setState({ measure: value });
  onNotesChange = value => this.setState({ notes: value });

  onSubmitForm = () => {
    const {
      name, shop, barcode, qty, measure, cost, notes,
    } = this.state;
    // this.setState({ hasFormSubmitted: !this.state.hasFormSubmitted });
    let values = {};
    if (this.props.item.name) {
      values = {
        name,
        shop,
        barcode,
        qty,
        measure,
        cost,
        id: this.props.item.id,
        notes,
      };
    } else {
      values = {
        name,
        shop,
        barcode,
        qty,
        measure,
        cost,
        notes,
      };
    }

    this.onClearForm();
    this.props.submitForm(values);
  };

  onClearForm = () =>
    this.setState({
      name: '',
      shop: '',
      barcode: '',
      qty: '',
      measure: 'units',
      cost: '',
      notes: '',
    });

  onClearBarcode = () => {
    this.setState({
      barcode: '',
    });
  };

  onDeleteItem = () => {
    Alert.alert(
      'Are you sure?',
      'Item will be deleted from database.',
      [
        {
          text: 'Confirm Delete',
          onPress: () => {
            this.onClearForm();
            this.props.delete(this.props.item.id);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  closeDrawer = () => {
    this.drawer.closeDrawer();
    this.setState({ shouldRenderCamera: false });
  };
  openDrawer = () => {
    Keyboard.dismiss();
    this.drawer.openDrawer();
    this.setState({ shouldRenderCamera: true });
  };

  _renderCamera = () => (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      {this.state.shouldRenderCamera && this.state.hasCameraPermission ? (
        <BarCodeScanner
          onBarCodeRead={this.onBarcodeRead}
          style={styles.cameraPreview}
        />
      ) : null}
    </View>
  );

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={width * 0.75}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        ref={(_drawer) => {
          this.drawer = _drawer;
        }}
        renderNavigationView={this._renderCamera}
        drawerLockMode="locked-closed"
      >
        <ScrollView style={{ backgroundColor: '#215921' }}>
          <View style={styles.container}>
            <View>
              <Text style={styles.textLabel}>Name of Product</Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.textInput}
                value={this.state.name}
                onChangeText={this.onNameChange}
                autoCapitalize="words"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <View style={{ flex: 1, marginRight: 1 }}>
                <Text style={styles.textLabel}>Shop</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  style={styles.textInput}
                  value={this.state.shop}
                  onChangeText={this.onShopChange}
                  autoCapitalize="words"
                />
              </View>
              {this.props.showBarcode ? (
                <View style={{ flex: 1, marginLeft: 1 }}>
                  <Text style={styles.textLabel}>Barcode</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    value={this.state.barcode}
                    onChangeText={this.onBarcodeChange}
                    onFocus={this.openDrawer}
                  />
                  <TouchableHighlight
                    onPress={this.onClearBarcode}
                    hitSlop={{ right: 10, top: 10, bottom: 10 }}
                    style={{
                      position: 'absolute',
                      top: 38,
                      right: 5,
                      borderRadius: 10,
                    }}
                  >
                    <Icon name="clear" size={20} color="grey" />
                  </TouchableHighlight>
                </View>
              ) : null}
            </View>

            <FormQuantityPicker
              measure={this.state.measure}
              onPickerValueChange={this.onPickerValueChange}
              qty={this.state.qty}
              onQuantityChange={this.onQuantityChange}
              renderCostForMeasure={this.renderCostForMeasure}
              cost={this.state.cost}
              onCostChange={this.onCostChange}
            />

            <View
              style={{
                marginTop: 15,
              }}
            >
              <Text style={styles.textLabel}>Notes</Text>
              <TextInput
                underlineColorAndroid="transparent"
                value={this.state.notes}
                onChangeText={this.onNotesChange}
                style={[styles.textInput]}
                editable
                multiline
                autoGrow
              />
            </View>

            {!this.state.hasFormSubmitted && (
              <View style={styles.formButtons}>
                <Button
                  onPress={this.onSubmitForm}
                  title={this.props.submitButton}
                  color="purple"
                />
                {this.props.delete && (
                  <Button
                    onPress={this.onDeleteItem}
                    title="Delete Item"
                    color="crimson"
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  textLabel: {
    fontSize: 14,
    height: 18,
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
  cameraPreview: {
    flex: 1,
    flexDirection: 'column',
  },
  formButtons: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

ItemForm.propTypes = {
  delete: PropTypes.func,
  submitButton: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  showBarcode: PropTypes.bool,
};

ItemForm.defaultProps = {
  item: {
    name: null,
    shop: null,
    barcode: null,
    qty: null,
    measure: null,
    cost: null,
    notes: null,
  },
  delete: null,
  showBarcode: true,
};

export default ItemForm;
