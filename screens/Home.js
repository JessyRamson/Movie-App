import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
// import { Bars3CenterLeftIcon } from "react-native-heroicons/outline";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { fetchTrendingMovies } from "../api/moviedb";
import axios from "axios";

const ios = Platform.OS === "ios";
const Home = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendinMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendinMovies = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=d6aca310c36fd08002bec386b76b72cf"
    );
    if (response.data.results.length > 0) {
      setLoading(false);
      setTrending(response.data.results);
    }
  };
  const getUpcomingMovies = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=d6aca310c36fd08002bec386b76b72cf"
    );
    if (response.data) {
      setLoading(false);
      setUpcoming(response.data.results);
    }
  };
  const getTopRatedMovies = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=d6aca310c36fd08002bec386b76b72cf"
    );
    if (response.data) {
      setLoading(false);
      setTopRated(response.data.results);
    }
  };

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      {/* search bar and logo */}
      <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
        <StatusBar style="light" />
        <View style={tw`flex-row justify-between items-center mx-4`}>
          {/* <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" /> */}
          <FontAwesome name="bars" size={26} color="white" />
          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <AntDesign name="search1" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* trending movies carousel */}
          {trending.length > 0 ? (
            <TrendingMovies data={trending} />
          ) : (
            <Loading size={50} />
          )}

          {/* Upcoming movies row */}
          {upcoming.length > 0 ? (
            <MovieList title="Upcoming" data={upcoming} loading={loading} />
          ) : (
            <Loading size={50} />
          )}

          {/* top rated movies row */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} loading={loading} />
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default Home;
