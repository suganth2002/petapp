import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Linking
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { Divider } from "react-native-elements";
import { Avatar } from "@rneui/themed";
import open,{ createOpenLink } from 'react-native-open-maps';
const VetDescriptionContent = ({ images , item , purpose }) => {
  console.log('item',item)

  const place = {
    latitude: item.latitude,
    longitude: item.longitude,
  };
 
  console.log(item.treatment)
  const handleLocation = createOpenLink({
    query: `${item.name}, ${item.location}`,
    zoom: 16,
  });
  const handleCallPress = () => {
    const phoneUrl = `tel:${item.phone}`;

    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          console.error(`Phone number ${item.phone} is not supported`);
        }
      })
      .catch((error) => {
        console.error('An error occurred while opening the phone app:', error);
      });
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          style={{ width: 120, height: 150, borderRadius: 5 , resizeMode: 'contain' }}
          source={{ uri: item.imageurl }}
        />
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 , marginLeft: 10}}>
            {item.name}
          </Text>
          <TouchableOpacity style={styles.location} onPress={handleLocation}>
            <Text style={{ fontSize: 17, color: "green", fontWeight: "400" , marginLeft: 10 }}>
              <Icon name="location" type="entypo" color="green" size={13} />{" "}
              {item.location}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginLeft: 10,
              alignItems: "center",
              backgroundColor: "green",
              borderRadius: 5,
              height: 40,
              width: 200,
            }}
            onPress={handleCallPress}
          >
            <Icon
              name="phone"
              type="Feather"
              color="white"
              size={20}
              containerStyle={{ marginLeft: 15 }}
            />
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              {" "}
              {item.phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        Photos
      </Text>
      <Divider width={2} style={{ marginLeft: 20, marginRight: 10 }} />
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../assets/Jojo.png")}
          />
        )}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      />
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{purpose==="treatment"?"Treatment":"Grooming"}</Text>
        <Divider width={2} style={{ marginRight: 10 }} />
        <FlatList
          data={purpose==="treatment"?item.treatment:item.grooming}
          key={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20, flexDirection: "row", gap: 10 }}>
          <Icon name="checksquare" type="antdesign" color="green" size={20} />
          <Text>{item.key}</Text>
        </View>
          )}
        nestedScrollEnabled
        />
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: 20,
            marginTop: 20,
          }}
        >
         Description
        </Text>
        <Divider width={2} style={{ marginLeft: 20, marginRight: 10 }} />
        <View>
          <Text style={{ margin: 20, marginTop: 10 , marginBottom: 100}}>
           {item.desc}
          </Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 15,
  },
  location: {
    marginTop: 10,
  },
});

export default VetDescriptionContent;
