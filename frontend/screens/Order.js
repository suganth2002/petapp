import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react';
import Ordercard from '../components/OrderCart';
import { ip } from '../ip';


const Order = () => {
  const [userId,setuserId] = useState('')
    const [data , setData]=useState([])
    useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const user = await AsyncStorage.getItem("userData");
            const _user = JSON.parse(user);
            if (_user && _user.id) {
              setuserId(_user.id);
            }
            const response = await fetch(`http://${ip}:3000/api/orderdetails/user/${_user.id}`);
            if (response.ok) {
              const data = await response.json();
              setData(data[0].products);
            } else {
              console.error(Error `fetching order details. Status: ${response.status}`);
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
        console.log(data)
        fetchOrderData();
      }, []);
  return (
<ScrollView style={{marginTop:50,marginBottom:100}}>
    {data? 
    <>
    <Text>Order Details</Text>
         {data?.map((item)=>(
             <Ordercard 
             key={item.orderid}
            item={item}
             />
        )) }</>:<Text>order page is empty</Text>}
    
       
     
    
    </ScrollView >
  )
}

export default Order

const styles = StyleSheet.create({})