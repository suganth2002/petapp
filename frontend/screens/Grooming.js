import { View, Text , FlatList , Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import VetHeader from '../components/VetHeader'
import VetCard from '../components/VetCard';
import { ip } from '../ip';

const Grooming = ({navigation}) => {
  const [petServiceData , setPetServiceData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${ip}:3000/api/groomingdata`);
        const data = await response.json();
        setPetServiceData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <View>
     <VetHeader/>
     <FlatList 
        data={petServiceData}
        keyExtractor={(item) => item.id}
        renderItem={({ item , index }) => (
        <Pressable onPress={() => navigation.navigate("GroomingDescription", { item , purpose:"grooming"  })}>
          <VetCard  key = {index} image={item.imageurl} name={item.name} rating={item.rating} phone={item.phone} location={item.location} Latitude={item.latitude} Longitude={item.longitude}/>
        </Pressable>
        )}
        showsVerticalScrollIndicator={false}

      />
    </View>
  )
}

export default Grooming