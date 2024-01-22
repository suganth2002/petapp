import { View, Text , Image, TextInput } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
// import Clipboard from '@react-native-clipboard/clipboard';

const InviteFriends = () => {
  // const copyToClipboard = () => {
  //   Clipboard.setString('BROWNIE23');
  // }
  return (
    <View style={{flex: 1, marginTop: 70}}>
     <Image source={require('../assets/friends.jpg')} style={{width: '100%', height: '20%' , resizeMode: 'cover' }} />
     <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 20 , marginLeft: 20}}>Gift Your best friend's four-legged BFF a special surprise</Text>
     <View style={{flexDirection: 'row' , marginLeft: 20, marginTop: 20 , alignItems: 'center' , width: '80%'}}> 
     <TextInput value='BROWNIE23' style={{borderWidth: 1, width: '90%', height: 40,  padding: 10}}/>
     <Icon name='copy-outline' type='ionicon'  containerStyle={{marginLeft: 10}} />
     </View>
     <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 20 , marginLeft: 20}}>Terms and Conditions</Text>
     <View>
     <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20 , marginLeft: 20}}>1. We will not share your details with anyone</Text>
     <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20 , marginLeft: 20}}>2. Your details will be used for marketing purposes</Text>
     <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20 , marginLeft: 20}}>3. The gift is non-refundable</Text>
     <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20 , marginLeft: 20}}>4. We will not share your details with anyone</Text>
     <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20 , marginLeft: 20}}>5. You can invite up to 5 friends</Text>  
     </View>
    </View>
  )
}

export default InviteFriends