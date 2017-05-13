import React from 'react';
import { Entypo } from '@expo/vector-icons';

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openedMenu: false,
    }
  }

  openMenu() {
    this.setState({ openedMenu: true });
  }

  closeMenu() {
    this.setState({ openedMenu: false });
  }

  toggleMenu() {
    if (this.state.openedMenu) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  render() {
    return (
      <Entypo name="dots-three-vertical" size={16} color="white" />
    )
  }
}
