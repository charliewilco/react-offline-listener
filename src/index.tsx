import * as React from "react";

export interface OfflineListenerState {
  offline: boolean;
}

export interface OfflineListenerProps {
  children: React.ReactNode;
}

const Offline = React.createContext();

export class OfflineListener extends React.Component<
  OfflineListenerProps,
  OfflineListenerState
> {
  static displayName = "OfflineListener";

  state = {
    offline: !window.navigator.onLine
  };

  handleChange = (x: React.SyntheticEvent) =>
    this.setState({
      offline: !x.currentTarget.navigator.onLine
    });

  componentDidMount() {
    if (window) {
      window.addEventListener("offline", this.handleChange);
      window.addEventListener("online", this.handleChange);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("offline", this.handleChange);
      window.removeEventListener("online", this.handleChange);
    }
  }

  render() {
    const { offline } = this.state;
    const { children } = this.props;
    return <Offline.Provider value={{ offline }}>{children}</Offline.Provider>;
  }
}

export interface OfflineStatus {
  children: (context: OfflineListener) => React.ReactNode;
}


export const OfflineStatus = ({ children }: OfflineStatus) => (
  <Offline.Consumer>
    {(context: OfflineListenerState) => children(context)}
  </Offline.Consumer>
)