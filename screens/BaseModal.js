import React from 'react';
import { StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import Modal from 'react-native-modal';
import { Container } from 'native-base';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 100,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 10,
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
    return (
      <Modal
        isVisible={this.state.modalVisible}
        onSwipe={() => this.closeModal()}
        onBackdropPress={() => this.closeModal()}
        onBackButtonPress={() => this.closeModal()}
        onModalHide={this.props.onClose}
        swipeDirection="up"
      >
        <Container style={styles.modal}>
          {this.props.children}
        </Container>
      </Modal>
    );
  }
}

BaseModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

BaseModal.defaultProps = {
  children: [],
};
