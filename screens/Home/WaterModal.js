import React from 'react';
import { PropTypes } from 'prop-types';
import NumericInput from 'react-native-numeric-input';
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
    this.requestWaterAction.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.isVisible !== this.state.isVisible) {
      this.setState({ isVisible: props.isVisible });
    }
  }

  requestWaterAction() {
    this.setState({ isVisible: false });
    this.slack.requestWater(this.state.value).then(() => {
      this.setState({ isVisible: false, value: 1 });
      Toast.show('Your water is on it\'s way!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      this.setState({ isVisible: false, value: 1 });
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
      <BaseModal isVisible={this.state.isVisible} onClose={this.props.onClose}>
        <Text>How many bottles do you need?</Text>
        <NumericInput
          value={this.state.value}
          onChange={value => this.setState({ value })}
          totalWidth={240}
          totalHeight={50}
          iconSize={25}
          step={1}
          minValue={1}
          editable={false}
          maxValue={9}
          valueType="integer"
          textColor="black"
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor="#191938"
          leftButtonBackgroundColor="#191938"
        />
        <Button
          title="Request water"
          onPress={() => this.requestWaterAction()} block
        >
          <Text>Request water</Text>
        </Button>
      </BaseModal>
    );
  }
}

WaterModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
