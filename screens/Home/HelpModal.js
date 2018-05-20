import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Text } from 'native-base';
import Toast from 'react-native-root-toast';
import BaseModal from '../BaseModal';
import SlackService from '../../services/SlackService';

export default class WaterModal extends BaseModal {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      isVisible: this.props.isVisible,
    };
    this.slack = new SlackService();
    this.requestHelpAction.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.isVisible !== this.state.isVisible) {
      this.setState({ isVisible: props.isVisible });
    }
  }

  requestHelpAction() {
    this.slack.requestAssistance().then(() => {
      this.setState({ isVisible: false });
      Toast.show('Your help is on it\'s way!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }).catch((err) => {
      this.setState({ isVisible: false });
      Toast.show(err, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    });
  }

  render() {
    return (
      <BaseModal isVisible={this.state.isVisible} onClose={this.props.onClose} height={'30%'}>
        <Text>Do you really need assistance at your booth location?</Text>
        <Button
          title="Request water"
          onPress={() => this.requestHelpAction()} block
        >
          <Text>Yes</Text>
        </Button>
      </BaseModal>
    );
  }
}

WaterModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
