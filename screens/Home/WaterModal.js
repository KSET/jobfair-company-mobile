import React from 'react'
import { PropTypes } from 'prop-types'
import NumericInput from 'react-native-numeric-input'
import { Button, Text } from 'native-base'
import BaseModal from '../BaseModal'

export default class WaterModal extends BaseModal {

  constructor (props) {
    super(props)
    this.state = {
      value: 1,
    };
  }

  render () {
    return (
      <BaseModal isVisible={this.props.isVisible} onClose={this.props.onClose}>
        <Text>How many bottles do you need?</Text>
        <NumericInput
          value={this.state.value}
          onChange={value => this.setState({value})}
          totalWidth={240}
          totalHeight={50}
          iconSize={25}
          step={1}
          minValue={1}
          maxValue={9}
          valueType="integer"
          textColor="black"
          iconStyle={{color: 'white'}}
          rightButtonBackgroundColor="#3F51B5"
          leftButtonBackgroundColor="#3F51B5"
        />
        <Button
          title="Request water"
          onPress={() => console.log('requesting water')} block
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
