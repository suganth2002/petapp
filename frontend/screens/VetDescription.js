import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import VetHeader from "../components/VetHeader";
import { Icon } from "@rneui/themed";
import { Divider } from "react-native-elements";
import VetDescriptionContent from "../components/VetDescriptionContent";

const VetDescriptionScreen = ({route}) => {
  const images = [1, 2, 3, 4];
  // console.log("route.params", route.params);

  const {item , purpose} = route.params;
  console.log("purpose",purpose)
 
  return (
    <ScrollView style={{ flex: 1 }}>
     <VetHeader/>
     <VetDescriptionContent images={images} item={item} purpose={purpose} />
    </ScrollView>
  );
};

export default VetDescriptionScreen;
