import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  View,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Modal,
  Image,
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
    hasCameraPermission: null,
    hasFormSubmitted: false,
    modalVisible: false,
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
    this.modalVisible();
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

  modalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      barcodeVisible: !this.state.modalVisible,
    });
  };

  _renderModal = () => (
    <Modal
      animationType="fade"
      transparent
      visible={this.state.modalVisible}
      onRequestClose={this.modalVisible}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 30,
          backgroundColor: 'rgba(0,0,0,0.8)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              {
                color: 'white',
                fontSize: 28,
                paddingVertical: 15,
              },
              this.state.fontLoaded ? { fontFamily: 'Sketch' } : null,
            ]}
          >
            Scan a Barcode
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            maxHeight: 250,
            width: '100%',
          }}
        >
          {this.state.hasCameraPermission &&
            this.state.barcodeVisible && (
              <View
                style={{
                  flex: 1,
                }}
              >
                <Image
                  style={{
                    position: 'absolute',
                    width: 200,
                    height: 150,
                    top: 50,
                    left: width / 2 - 130,
                    zIndex: 500,
                  }}
                  source={require('../../assets/images/barcodeBg.png')}
                  resizeMode="cover"
                />
                <BarCodeScanner
                  onBarCodeRead={this.onBarCodeRead}
                  style={styles.cameraPreview}
                />
              </View>
            )}
        </View>
        <View style={{ marginTop: 10 }}>
          <Button onPress={this.modalVisible} title="CANCEL" color="crimson" />
        </View>
      </View>
    </Modal>
  );

  render() {
    return (
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
                />
                <TouchableHighlight
                  onPress={this.modalVisible}
                  hitSlop={{ right: 10, top: 10, bottom: 10 }}
                  style={{
                    position: 'absolute',
                    top: 38,
                    right: 5,
                    borderRadius: 10,
                  }}
                >
                  <Icon name="camera-alt" size={20} color="grey" />
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
              <View
                style={{
                  padding: 2,
                  backgroundColor: 'white',
                  borderRadius: 2,
                }}
              >
                <Button
                  onPress={this.onSubmitForm}
                  title={this.props.submitButton}
                  color="blue"
                />
              </View>
              {this.props.delete && (
                <Button
                  onPress={this.onDeleteItem}
                  title="Delete Item"
                  color="crimson"
                />
              )}
            </View>
          )}

          {this._renderModal()}
        </View>
      </ScrollView>
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
