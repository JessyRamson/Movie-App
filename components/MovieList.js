import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/moviedb";
import Loading from "./Loading";

var { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll, loading }) => {
  const navigation = useNavigation();

  return (
    <View style={tw`mb-8 space-y-4`}>
      <View style={tw`mx-4 flex-row justify-between items-center mb-1`}>
        <Text style={tw`text-white text-xl`}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[tw`text-lg`, styles.text]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push("Movie", item)}
          >
            <View style={tw`space-y-1 mr-4`}>
              {loading ? (
                <Loading size={30} />
              ) : (
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={[
                    tw`rounded-3xl`,
                    { width: width * 0.33, height: height * 0.22 },
                  ]}
                />
              )}
              <Text style={tw`text-neutral-300 ml-1`}>
                {item?.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
