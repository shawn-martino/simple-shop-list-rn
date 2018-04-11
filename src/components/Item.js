import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Item = ({
  item, listAddItem, navigation, showMetaInfo,
}) => {
  const handleLongPress = () => {
    if (showMetaInfo) {
      navigation.navigate('ItemAddEdit', {
        action: 'Edit',
        item,
      });
    }
  };
  const handlePress = () => {
    listAddItem(item);
  };

  return (
    <View key={item.id} style={styles.item}>
      <TouchableOpacity
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          flex: 1,
          paddingHorizontal: 10,
        }}
        onPress={handlePress}
        onLongPress={handleLongPress}
      >
        <Text style={styles.listText} numberOfLines={1}>
          {item.name}
        </Text>
        {showMetaInfo && (
          <View style={styles.listMeta}>
            {item.shop ? (
              <Text style={[styles.listQty, styles.listShop]}>{item.shop}</Text>
            ) : null}
            <Text style={styles.listQty}>
              {item.cost && <Text>${item.cost} for </Text>}
              {item.qty} {item.measure}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    paddingRight: 30,
    paddingLeft: 60,
  },
  listMeta: {
    flexDirection: 'row',
  },
  listText: {
    fontSize: 18,
    color: 'blue',
  },
  listQty: {
    color: '#aaa',
    fontSize: 12,
  },
  listShop: {
    color: '#BCDEBC',
    marginRight: 3,
    borderRadius: 4,
  },
});

Item.propTypes = {
  listAddItem: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  showMetaInfo: PropTypes.bool.isRequired,
};

export default Item;
