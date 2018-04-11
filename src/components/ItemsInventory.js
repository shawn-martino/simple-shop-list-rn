import React, { Component } from 'react';
import { SectionList, Slider, StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';
import PropTypes from 'prop-types';

import { createOrganizedItemsArray } from '../config/utils';

import Item from './Item';

class ItemsInventory extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      sortedItems: createOrganizedItemsArray(nextProps.items),
    };
  }

  state = {
    fontLoaded: false,
    sortedItems: [],
    indexHeight: null,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Sketch: require('../../assets/fonts/Sketch.otf'),
    });
    this.setState({ fontLoaded: true });
  }

  onIndexChange = (i) => {
    this.itemsSectionListRef.scrollToLocation({
      animated: true,
      sectionIndex: i.toFixed(),
      itemIndex: 0,
      viewPosition: 0,
      viewOffset: 50,
    });
  };

  getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  });

  measureView = (event) => {
    this.setState({
      indexHeight: event.nativeEvent.layout.height,
    });
  };

  renderItem = ({ item }) => (
    <Item
      item={item}
      navigation={this.props.navigation}
      listAddItem={this.props.listAddItem}
      showMetaInfo={this.props.showMetaInfo}
    />
  );

  renderSectionHeader = ({ section }) => (
    <Text
      style={[
        styles.sectionHeader,
        this.state.fontLoaded ? { fontFamily: 'Sketch' } : null,
      ]}
    >
      {section.key.toUpperCase()}
    </Text>
  );

  renderSectionFooter = () => (
    <View style={{ height: 50, justifyContent: 'center' }}>
      <View
        style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#5CB85C' }}
      />
    </View>
  );

  renderIndex = () =>
    this.state.sortedItems.map(section => (
      <Text style={styles.itemsIndexText} key={section.key}>
        {section.key.toUpperCase()}
      </Text>
    ));

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.sortedItems}
          ref={(ref) => {
            this.itemsSectionListRef = ref;
          }}
          initialNumToRender={30}
          keyExtractor={item => item.id} // eslint-disable-line react/jsx-no-bind
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          renderSectionFooter={this.renderSectionFooter}
          getItemLayout={(data, index) => this.getItemLayout(data, index, 2)}
        />
        <View style={styles.itemsIndex} onLayout={this.measureView}>
          {this.renderIndex()}
          <Slider
            maximumValue={this.state.sortedItems.length - 1}
            onValueChange={this.onIndexChange}
            onSlidingComplete={this.onIndexReady}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            style={[
              styles.itemsIndexSlider,
              {
                top: (this.state.indexHeight / 2) - 20, // prettier-ignore
                width: this.state.indexHeight - 10,
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  sectionHeader: {
    color: '#5CB85C',
    fontSize: 42,
    lineHeight: 50,
    paddingRight: 10,
    height: 50,
    textAlign: 'right',
  },
  itemsIndex: {
    backgroundColor: '#f2f2f2',
    width: 60,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsIndexSlider: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    height: 40,
  },
  itemsIndexText: {
    color: 'blue',
    fontSize: 12,
  },
});

ItemsInventory.propTypes = {
  items: PropTypes.array.isRequired,
  listAddItem: PropTypes.func.isRequired,
  showMetaInfo: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
};

ItemsInventory.defaultProps = {
  showMetaInfo: true,
};

export default ItemsInventory;
