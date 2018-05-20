import React from 'react';
import { StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import Modal from 'react-native-modal';
import { Container, View } from 'native-base';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class BaseModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.isVisible,
    };
    this.closeModal.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.isVisible !== this.state.isVisible) {
      this.setState({ modalVisible: props.isVisible });
    }
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (<Modal
      isVisible={this.state.modalVisible}
      onSwipe={() => this.closeModal()}
      onBackdropPress={() => this.closeModal()}
      onBackButtonPress={() => this.closeModal()}
      onModalHide={this.props.onClose}
      avoidKeyboard
      swipeDirection="up"
    >
      <View style={styles.modal}>
        <View
          style={{
            padding: 25,
            backgroundColor: 'white',
            borderRadius: 10,
            height: this.props.height,
            width: '80%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {this.props.children}
        </View>
      </View>
    </Modal>);
  }
}

BaseModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  height: PropTypes.string,
};

BaseModal.defaultProps = {
  children: [],
  height: '70%',
};
