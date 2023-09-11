import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { styles, theme } from "../theme";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import axios from "axios";
import { fallbackMoviePoster, image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  var movieName = "The strange arange movieafdjk nhjsdhj dhhhf ihdfhb";
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d6aca310c36fd08002bec386b76b72cf`
    );
    if (response) setMovie(response.data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d6aca310c36fd08002bec386b76b72cf`
    );
    if (response.data) setCast(response.data.cast);
  };
  const getSimilarMovies = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d6aca310c36fd08002bec386b76b72cf`
    );
    if (response.data) setSimilar(response.data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={tw`flex-1 bg-neutral-900`}
    >
      {/* back button and movie poster */}
      <View style={tw`w-full`}>
        <SafeAreaView
          style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 mt-3`}
        >
          <TouchableOpacity
            style={[tw`rounded-xl p-1`, styles.background]}
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-small-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <FontAwesome
              name="heart"
              size={24}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/poster-1.jpg")}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width: width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={[
                tw`absolute bottom-0`,
                { width: width, height: height * 0.4 },
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={[tw`space-y-3`, { marginTop: -(height * 0.09) }]}>
        {/* title */}
        <Text
          style={[
            tw`text-white text-center font-bold text-3xl`,
            { letterSpacing: 0.5 },
          ]}
        >
          {movie?.title}
        </Text>
        {/* status, release,runtime */}
        {movie?.id ? (
          <Text
            style={tw`text-neutral-400 font-semibold text-base text-center mt-1`}
          >
            {movie?.status} . {movie?.release_date?.split("-")[0]} .{" "}
            {movie?.runtime} min
          </Text>
        ) : null}
        {/* genre */}
        <View style={tw`flex-row justify-center mx-4 gap-x-2 mt-1`}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text
                style={tw`text-neutral-400 font-semibold text-base text-center`}
              >
                {genre?.name} {showDot ? "." : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text style={[tw`text-neutral-400 mx-4 mt-1`, { letterSpacing: 0.71 }]}>
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* similar movies */}
      {similar.length > 0 && (
        <MovieList data={similar} title={"Similar Movies"} hideSeeAll={true} />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
