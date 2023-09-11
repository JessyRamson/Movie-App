import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { fallbackPersonPoster, image185 } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
  return (
    <View style={tw`my-6`}>
      <Text style={tw`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => (
            <TouchableOpacity
              key={index}
              style={tw`mr-4 items-center`}
              onPress={() => navigation.navigate("Person", person)}
            >
              <View
                style={tw`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}
              >
                <Image
                  // source={require("../assets/poster-1.jpg")}
                  source={{
                    uri: image185(person?.profile_path) || fallbackPersonPoster,
                  }}
                  style={tw`rounded-2xl w-20 h-24`}
                />
              </View>
              <Text style={tw`text-white text-xs mt-1`}>
                {person?.character.length > 10
                  ? person?.character.slice(0, 10) + "..."
                  : person?.character}
              </Text>
              <Text style={tw`text-neutral-400 text-xs mt-1`}>
                {person?.original_name.length > 10
                  ? person?.original_name.slice(0, 10) + "..."
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Cast;
