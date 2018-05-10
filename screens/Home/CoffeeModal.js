import React from 'react'
import { PropTypes } from 'prop-types'
import NumericInput from 'react-native-numeric-input'
import { Button, List, ListItem, Text } from 'native-base'
import BaseModal from '../BaseModal'

export default class CoffeeModal extends BaseModal {

  constructor (props) {
    super(props)
    this.state = {
      espresso: 0,
      macchiato: 0,
    }
  }

  canOrder = () => (this.state.espresso + this.state.macchiato) <= 0

  render () {
    return (
      <BaseModal isVisible={this.props.isVisible}>
        <Text>Please select coffee you prefer:</Text>
        <List style={{width: '100%'}}>
          <ListItem style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: 0,
            paddingRight: 0
          }}>
            <Text>Espresso</Text>
            <NumericInput
              value={this.state.espresso}
              onChange={espresso => this.setState({espresso})}
              iconSize={25}
              totalHeight={40}
              step={1}
              minValue={0}
              maxValue={5}
              valueType="integer"
              textColor="black"
              iconStyle={{color: 'white'}}
              rightButtonBackgroundColor="#3F51B5"
              leftButtonBackgroundColor="#3F51B5"
            />
          </ListItem>
          <ListItem style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: 0,
            paddingRight: 0
          }}>
            <Text>Macchiato</Text>
            <NumericInput
              value={this.state.macchiato}
              onChange={macchiato => this.setState({macchiato})}
              iconSize={25}
              totalHeight={40}
              step={1}
              minValue={0}
              maxValue={5}
              valueType="integer"
              textColor="black"
              iconStyle={{color: 'white'}}
              rightButtonBackgroundColor="#3F51B5"
              leftButtonBackgroundColor="#3F51B5"
            />
          </ListItem>
        </List>
        <Button
          disabled={this.canOrder()}
          title="Request coffee"
          onPress={() => console.log('requesting coffee')} block
        >
          <Text>Request coffee</Text>
        </Button>
      </BaseModal>
    )
  }
}

CoffeeModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}
