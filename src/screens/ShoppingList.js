import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  Dimensions,
  TouchableHighlight,
  SectionList,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { BarCodeScanner, Permissions, Font } from 'expo';

import { MaterialIcons as Icon } from '@expo/vector-icons'; // eslint-disable-line

import { createOrganizedListArray } from '../config/utils';

import {
  listAddItem,
  listGetItems,
  listItemChecked,
  deleteListItems,
} from '../actions';

import ShopListItem from '../components/ShopListItem';
import Button from '../components/common/Button';

const {
  /* height, */
  width,
} = Dimensions.get('window');

class ShoppingList extends Component {
  static navigationOptions() {
    return {
      title: 'Shopping List',
      header: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      sortedList: createOrganizedListArray(nextProps.list),
    };
  }

  state = {
    sortedList: [],
    refreshing: false,
    modalVisible: false,
    hasCameraPermission: null,
    fontLoaded: false,
  };

  /*= =============================================
  | Component Life Cycles
  ============================================= */
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await Font.loadAsync({
      Sketch: require('../../assets/fonts/Sketch.otf'),
    });
    this.setState({
      hasCameraPermission: status === 'granted',
      fontLoaded: true,
    });
  }

  /*= =============================================
  | Events and Actions
  ============================================= */
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.listGetItems(this.props.list);
    this.setState({
      refreshing: false,
    });
  };

  onBarCodeRead = (e) => {
    const findItemByBarcode = this.props.items.find(item => item.barcode === e.data);
    this.props.listAddItem(findItemByBarcode);
    this.modalVisible();
  };

  onClearCheckedItems = () => {
    const checkedItems = this.props.list.reduce((array, item) => {
      if (item.checked === true) return array.concat(item.id);
      return array;
    }, []);
    if (checkedItems.length === 0) return;
    this.props.deleteListItems(checkedItems);
  };

  onClearAllItems = () => {
    const allIds = this.props.list.map(item => item.id);
    Alert.alert(
      'DELETE ALL',
      'All items in list will be deleted.',
      [
        {
          text: 'CLEAR LIST',
          onPress: () => this.props.deleteListItems(allIds),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  /*= =============================================
  | <ShopListItem /> Functions
  ============================================= */
  onListItemPress = (id) => {
    this.props.listItemChecked(id);
  };

  onListItemLongPress = (item) => {
    this.props.navigation.navigate('ShoppingListEditItem', {
      item,
    });
  };

  calculateTotalsForChecked = (sectionDataArray) => {
    const checkedItems = sectionDataArray.filter(item => item.checked === true);
    if (checkedItems.length < 1) return;
    return checkedItems.reduce((prev, current) => {
      const prevVal = Number.parseFloat(prev);
      const currentVal = current.cost ? Number.parseFloat(current.cost) : 0;
      const total = prevVal + currentVal;
      return total;
    }, 0);
  };

  /*= =============================================
  | Modal Functions
  ============================================= */
  modalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      barcodeVisible: !this.state.modalVisible,
    });
  };

  /*= =============================================
  | AutoComplete Functions
  ============================================= */
  addItemToList = (item) => {
    this.props.listAddItem(item);
    this.modalVisible();
  };

  /*= =============================================
  | Render Functions
  ============================================= */
  _keyExtractor = item => item.id;

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
              this.state.fontLoaded
                ? {
                    fontFamily: 'Sketch',
                  }
                : null,
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
        <Button
          buttonStyle={{
            backgroundColor: 'red',
            borderColor: 'crimson',
            flex: 0,
            marginTop: 15,
            paddingVertical: 15,
          }}
          textStyle={{
            color: 'white',
            fontWeight: 'bold',
          }}
          onPress={this.modalVisible}
        >
          Cancel
        </Button>
      </View>
    </Modal>
  );

  _renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableHighlight
        onPress={this.modalVisible}
        hitSlop={{
          right: 10,
          top: 10,
        }}
        style={[styles.actionButton]}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Icon name="camera-alt" size={20} color="blue" />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 8,
              color: 'blue',
            }}
          >
            BARCODE
          </Text>
        </View>
      </TouchableHighlight>
      {this.state.sortedList.length > 0 && (
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={this.onClearCheckedItems}
          hitSlop={{
            right: 10,
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Icon name="delete" size={20} color="crimson" />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 8,
                color: 'crimson',
              }}
            >
              CLEAR
            </Text>
          </View>
        </TouchableHighlight>
      )}
      {this.state.sortedList.length > 0 && (
        <TouchableHighlight
          style={[styles.actionButton]}
          onPress={this.onClearAllItems}
          hitSlop={{
            bottom: 10,
            right: 10,
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Icon
              name="delete-sweep"
              size={20}
              color="crimson"
              style={{
                marginLeft: 6,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 8,
                color: 'crimson',
              }}
            >
              CLEAR ALL
            </Text>
          </View>
        </TouchableHighlight>
      )}
    </View>
  );

  _renderSectionHeader = ({ section }) => {
    const totalCheckedForSection = this.calculateTotalsForChecked(section.data);
    return (
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'flex-end',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: '#ffffff',
        }}
      >
        <Text
          style={[
            styles.sectionHeader,
            this.state.fontLoaded
              ? {
                  fontFamily: 'Sketch',
                }
              : null,
          ]}
        >
          {section.key === '' ? 'OTHER' : section.key.toUpperCase()}
        </Text>
        <View
          style={{
            height: 24,
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 15,
            backgroundColor: '#f2f2f2',
            borderBottomLeftRadius: 12,
            borderTopLeftRadius: 12,
          }}
        >
          {totalCheckedForSection > 0 && (
            <Text
              style={{
                color: '#009688',
              }}
            >
              Total $ {totalCheckedForSection}
            </Text>
          )}
        </View>
      </View>
    );
  };

  _renderListItem = ({ item }) => (
    <ShopListItem
      item={item}
      onLongPress={this.onListItemLongPress}
      onPress={this.onListItemPress}
      styleRow={{
        paddingLeft: 10,
      }}
    />
  );

  _renderEmpty = () => (
    <React.Fragment>
      <Text
        style={[
          {
            fontSize: 30,
            color: '#5CB85C',
            padding: 50,
            textAlign: 'center',
          },
          this.state.fontLoaded
            ? {
                fontFamily: 'Sketch',
              }
            : null,
        ]}
      >
        List is Empty
      </Text>
      <View
        style={{
          padding: 15,
          marginHorizontal: 15,
          marginBottom: 15,
          borderRadius: 4,
          backgroundColor: '#f2f2f2',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            marginBottom: 15,
          }}
        >
          How to Use Tips
        </Text>
        <Text style={styles.emptyListItem}> Long-press on Item to Edit </Text>
        <Text style={styles.emptyListItem}>
          On <Text style={styles.textBold}>Shop List</Text>, short-press Item to
          Check
        </Text>
        <Text style={styles.emptyListItem}>
          On <Text style={styles.textBold}>Items</Text>, short-press Item to Add
          to List
        </Text>
        <Button
          buttonStyle={{
            backgroundColor: 'blue',
            flex: 0,
            marginTop: 15,
          }}
          textStyle={{
            color: 'white',
            fontWeight: 'bold',
          }}
          onPress={() => this.props.navigation.navigate('Items')}
        >
          Add Items
        </Button>
      </View>
    </React.Fragment>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.sortedList.length > 0 ? (
          <SectionList
            sections={this.state.sortedList}
            ref={(ref) => {
              this.itemsSectionListRef = ref;
            }}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            keyExtractor={item => item.id} // eslint-disable-line react/jsx-no-bind
            renderItem={this._renderListItem}
            renderSectionHeader={this._renderSectionHeader}
          />
        ) : (
          this._renderEmpty()
        )}
        {this._renderActionButtons()}
        {this._renderModal()}
      </View>
    );
  }
}

/*= =============================================
| CSS Styles
============================================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: 60,
  },
  cameraPreview: {
    flex: 1,
    flexDirection: 'column',
  },
  actionButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    color: '#5CB85C',
    fontSize: 24,
    textAlign: 'left',
    paddingLeft: 10,
  },
  emptyListItem: {
    borderLeftWidth: 4,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    marginBottom: 10,
    paddingLeft: 12,
  },
  textBold: {
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {
    items: state.items,
    list: state.list,
  };
}

ShoppingList.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  listAddItem: PropTypes.func.isRequired,
  listGetItems: PropTypes.func.isRequired,
  listItemChecked: PropTypes.func.isRequired,
  deleteListItems: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  listAddItem,
  listGetItems,
  listItemChecked,
  deleteListItems,
})(ShoppingList);
