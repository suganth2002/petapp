import { View, Text,TouchableOpacity,Alert } from 'react-native'
import React,{ useContext, useEffect, useState } from 'react'
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CartContext from '../CartContext'
import Addresscontext from '../Addresscontext'
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { ip } from '../ip'


const Checkout = ({navigation}) => {
  
   const [userId,setuserId] = useState('');
   const [prevOrders,setprevOrders] = useState('')
  const { items } = useContext(CartContext);
  const {address} = useContext(Addresscontext);
  // console.log(address)
   
    const [isUpiChecked,setIsUpiChecked]=useState(false)
    const [isCashChecked,setIsCashchecked]=useState(true)

    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = await AsyncStorage.getItem("userData");
          const _user = JSON.parse(user);
          if (_user && _user.id) {
            setuserId(_user.id);
    
            // Now that userId is set, make the API call
            const response = await fetch(`http://${ip}:3000/api/orderdetails/user/${_user.id}`);
            if (response.ok) {
              const data = await response.json();
              setprevOrders(data[0]);
            } else {
              console.error(`Error fetching order details. Status: ${response.status}`);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, [])

    async function handlePlaceOrderClick() {
      if(address){


       const currentDate = new Date();
      const orderDateTime = currentDate.toISOString();
       const modifiedItems = items.map(item => ({
        ...item,
        orderDateTime,
        orderMethod: isCashChecked?"cash on delivery":"upi", 
        shippingAddress:address,
        orderid:uuidv4()
      }));
      const products = [...modifiedItems]


      if(!prevOrders){
      const resp = await fetch(`http://${ip}:3000/api/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId,products}),
    });

    if (resp.status === 200) {
      
      navigation.navigate("orderplace");
    } 


  }else{


    const resp = await fetch(`http://${ip}:3000/api/updateorder/${prevOrders._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId,products}),
    });

    if (resp.status === 200) {
      
      navigation.navigate("orderplace");
    } 

  }


}else{
  ErrorAlert()
}
      
      // const previousOrders = await AsyncStorage.getItem("orders");
      // const _previousOrders = await JSON.parse(previousOrders);
      
     
     
      // if(address){
      //   if (_previousOrders) {
      //     const userOrders = _previousOrders?.users?.[_user?.id];
      //     if (userOrders) {
      //       _previousOrders.users[_user?.id] = userOrders.concat(modifiedItems);
      //       await AsyncStorage.setItem('orders', JSON.stringify(_previousOrders));
            
            
      //     } else {
      //       _previousOrders.users[_user?.id] = modifiedItems;
      //       await AsyncStorage.setItem('orders', JSON.stringify(_previousOrders));
      //     }
      //   } else {
      //     const mockOrder = {
      //       users: {
      //         [_user?.id]: modifiedItems,
      //       },
      //     };
      //     await AsyncStorage.setItem("orders", JSON.stringify(mockOrder));
      //   }
      //   navigation.navigate('orderplace')
      // }else{
      //   ErrorAlert()
      // }
     
     
     
    }
    const ErrorAlert = () => {
  Alert.alert("Add your address", null, [{ text: "OK" }]);
};


  return (
    <View style={{marginTop:48}}>
      <Text style={{textAlign:"center",fontSize:24,fontWeight:"bold",color:"#000"}}>checkout</Text>
      {address?
      <View>
      <Text>shipping addresss</Text>
      <Text>{address.name}</Text>
      <Text>{address.flat}</Text>
      <Text>{address.area}</Text>
      <Text>{address.town}</Text>
      <Text>{address.state}</Text>
      <Text>{address.pincode}</Text>
      <Text>{address.country}</Text>
      <Text>{address.mobilenumber}</Text>
      </View>: 
      <View  style={{backgroundColor:"lightblue",padding:20,marginTop:20,width:"98%",alignSelf:"center",borderRadius:10}} >
        <Text onPress={()=>navigation.navigate('Address')} style={{fontSize:16}}>Add your address</Text>
      </View>}
     
      <View style={{marginTop:20}}>
        <Text style={{fontWeight:"700",marginLeft:10,marginBottom:20}}>payment method</Text>
      <CheckBox title={"UPI"}
      checked={isUpiChecked}
      checkedColor='orange'
      onPress={()=>{
        setIsUpiChecked(true);
        setIsCashchecked(false)
      }}
      />
      <CheckBox title={"cash on delivery"}
      checked ={isCashChecked}
      checkedColor='orange'
      onPress={()=>{
        setIsCashchecked(true)
        setIsUpiChecked(false)
      }}
      />
      </View>
    <TouchableOpacity style={{marginTop:20,alignSelf:"center",padding:10,backgroundColor:"orange",width:"80%",borderRadius:10,}} onPress={handlePlaceOrderClick}>
        <Text style={{textAlign:"center",fontWeight:"500"}}>Proceed to buy</Text>
    </TouchableOpacity>

    </View>
  )
}

export default Checkout