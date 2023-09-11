import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { styles } from "../theme";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import axios from "axios";
import { fallbackPersonPoster, image342 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const { params: person } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(person.id);
    getPersonMovies(person.id);
  }, [person]);

  const getPersonDetails = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=d6aca310c36fd08002bec386b76b72cf`
    );
    if (response.data) setPersonDetails(response.data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=d6aca310c36fd08002bec386b76b72cf`
    );
    if (response.data) setPersonMovies(response.data.cast);
    setLoading(false);
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-neutral-900`}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        style={tw` z-20 w-full flex-row justify-between items-center px-4 mt-3 ${verticalMargin}`}
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
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            style={[
              tw`flex-row justify-center`,
              {
                shadowColor: "red",
                shadowRadius: 40,
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 5 },
                elevation: 10,
              },
            ]}
          >
            <View
              style={tw`items-center rounded-full overflow-hidden h-61 w-61 border-2 border-neutral-500`}
            >
              <Image
                // source={require("../assets/poster-3.jpg")}
                source={{
                  uri:
                    image342(personDetails?.profile_path) ||
                    fallbackPersonPoster,
                }}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-3xl text-white font-bold text-center`}>
              {personDetails?.name}
            </Text>
            <Text style={tw`text-base text-neutral-500 text-center`}>
              {personDetails?.place_of_birth}
            </Text>
          </View>

          <View
            style={tw`mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full`}
          >
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Gender</Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {personDetails?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Birthday</Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {personDetails?.birthday}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Known for</Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View style={tw` px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Popularity</Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {personDetails?.popularity}
              </Text>
            </View>
          </View>

          {/* biography */}
          <View style={tw`my-6 mx-4 gap-y-2`}>
            <Text style={tw`text-white text-lg`}>Biography</Text>
            <Text style={[tw`text-neutral-400`, { letterSpacing: 0.8 }]}>
              {personDetails?.biography || "N/A"}
            </Text>
          </View>

          {/* movies */}
          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
