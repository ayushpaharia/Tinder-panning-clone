import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  Text,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Users = [
  { id: "1", uri: require("./assets/profiles/1.jpg") },
  { id: "2", uri: require("./assets/profiles/2.jpg") },
  { id: "3", uri: require("./assets/profiles/3.jpg") },
  { id: "4", uri: require("./assets/profiles/4.jpg") },
  { id: "5", uri: require("./assets/profiles/5.jpg") },
  { id: "6", uri: require("./assets/profiles/6.jpg") },
  { id: "7", uri: require("./assets/profiles/7.jpg") },
  { id: "8", uri: require("./assets/profiles/8.jpg") },
];

class App extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {},
    });
  }

  renderUser = () => {
    return Users.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute",
              },
            ]}
          >
            <Image
              source={item.uri}
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20,
              }}
            />
          </Animated.View>
        );
      } else {
        return (
          //App crashes somehow so not including like or no in this
          // <Animated.View
          //   key={item.id}
          //   style={[
          //     {
          //       height: SCREEN_HEIGHT - 120,
          //       width: SCREEN_WIDTH,
          //       padding: 10,
          //       position: "absolute",
          //     },
          //   ]}
          // >
          //   <Image
          //     source={item.uri}
          //     style={{
          //       flex: 1,
          //       height: null,
          //       width: null,
          //       resizeMode: "cover",
          //       borderRadius: 20,
          //     }}
          //   />
          // </Animated.View>
        );
      }
    }).reverse();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}></View>
        <View style={{ flex: 1 }}>{this.renderUser()}</View>
        <View style={{ height: 60 }}></View>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
