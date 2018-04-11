import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  CheckBox,
} from 'react-native';

const ShopListItem = ({
  item, onLongPress, onPress, styleRow,
}) => {
  const handleLongPress = () => onLongPress(item);
  const handlePress = () => onPress(item.id);

  return (
    <TouchableOpacity
      delayLongPress={500}
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[styles.listItemContainer, styleRow]}
    >
      <View style={{ maxWidth: 50 }}>
        <CheckBox
          value={!!item.checked}
          onValueChange={handlePress}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
        />
      </View>
      <View>
        <Text style={styles.listText}>{item.name}</Text>
        <View style={styles.listMeta}>
          <Text style={styles.listQty}>
            {item.cost && <Text>${item.cost} for </Text>}
            {item.qty} {item.measure}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    height: 50 + StyleSheet.hairlineWidth,
    marginLeft: 0,
    backgroundColor: 'white',
    borderColor: '#f4f4f4',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    fontSize: 16,
    color: 'blue',
  },
  listQty: {
    color: '#999',
    fontSize: 12,
  },
  // listShop: {
  //   backgroundColor: '#F1FAF1',
  //   color: '#5CB85C',
  //   marginRight: 10,
  //   padding: 2,
  //   borderRadius: 4,
  // },
});

ShopListItem.propTypes = {
  onLongPress: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  styleRow: PropTypes.object.isRequired,
};

export default ShopListItem;
