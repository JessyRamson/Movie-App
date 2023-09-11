import React from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { theme } from "../theme";

var { width, height } = Dimensions.get("window");

const Loading = ({ size }) => {
  return (
    <View
      style={[
        tw`absolute flex-row justify-center items-center`,
        { width, height },
      ]}
    >
      {/* <Progress.CircleSnail thickness={6} size={100} color={theme.background} /> */}
      <ActivityIndicator size={size ? size : 100} color={theme.background} />
    </View>
  );
};

export default Loading;
