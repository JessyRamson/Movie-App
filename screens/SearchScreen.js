import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Loading from "../components/Loading";
import axios from "axios";
import { debounce } from "lodash";
import { fallbackMoviePoster, image185 } from "../api/moviedb";
import { token } from "../constants";

var { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const movieName = "Ant man and the wasp dummy movie title";

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      // searchMovie({
      //   query: value,
      //   include_adult: "false",
      //   language: "en-US",
      //   page: "1",
      // });
      searchAllMovies(value);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const searchAllMovies = (data) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${data}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setResult(response.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setResult([]);
      });
  };

  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View
        style={tw`mx-4 mb-3 mt-2 flex-row justify-between items-center border border-neutral-500 rounded-full`}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
        />
        <TouchableOpacity
          style={tw`rounded-full p-3 m-1 bg-neutral-500`}
          onPress={() => navigation.navigate("Home")}
        >
          <Entypo name="cross" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* result */}
      {loading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          style={tw`space-y-3`}
        >
          <Text style={tw`text-white font-semibold ml-1 mb-2`}>
            Results ({result.length})
          </Text>
          <View style={tw`flex-row justify-between flex-wrap`}>
            {result.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={tw`gap-y-2 mb-4`}>
                  <Image
                    style={[
                      tw`rounded-3xl`,
                      { width: width * 0.44, height: height * 0.3 },
                    ]}
                    // source={require("../assets/poster-1.jpg")}
                    source={{
                      uri: image185(item?.poster_path) || fallbackMoviePoster,
                    }}
                  />
                  <Text style={tw`text-neutral-300 ml-1`}>
                    {item?.title.length > 22
                      ? item?.title.slice(0, 20) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={tw`items-center justify-center`}>
          <Image
            source={require("../assets/sitting.png")}
            style={tw`w-72 h-72`}
            resizeMode="contain"
          />
          <Text style={tw`mt-2 text-neutral-500 font-semibold text-lg`}>
            No results found !!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
