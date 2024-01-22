import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Login from './screens/Login';
import Signup from './screens/SignUp';
import Splash from './screens/Splash';
import PetAcessories from './screens/PetAcessories';
import FindAVet from './screens/FindAVet';
import Grooming from './screens/Grooming';
import Account from './screens/Account';
import { CartProvider } from './CartContext';
import { Context } from './context';
import { Icon } from 'react-native-elements';
import VetDescriptionScreen from './screens/VetDescription';
import ProductDescriptionScreen from './screens/ProductDescriptionScreen';
import Cart from './screens/Cart';
import Wish from './screens/Wishlist';
import Address from './screens/Address';
import GroomingDescription from './screens/GroomingDescription';
import AdoptPage from './screens/AdoptPage';
import AdoptDescription from './screens/AdoptDescription';
import AccountSettings from './screens/AccountSettings';
import InviteFriends from './screens/InviteFriends';
import Welcome from './screens/Welcome';
import Checkout from './screens/Checkout';
import Orderplace from './screens/Orderplace';
import Order from './screens/Order';
import { AddressProvider } from './Addresscontext';
import Addressinput from './components/Addressinput';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()
// const CartStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Cart" component={Cart} />
//     <Stack.Screen name='Address' component={Address}/>
//   </Stack.Navigator>
// )
const PetAcessoriesStack = () => (
  <CartProvider>
  <Stack.Navigator
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PetAcessories" component={PetAcessories} />
    <Stack.Screen name="ProductDescription" component={ProductDescriptionScreen} />
    {/* <Stack.Screen name="CartStack" component={CartStack} />  */}
    <Stack.Screen name = "wish" component={Wish}/>
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name='Address' component={Address}/>
    <Stack.Screen name='checkout' component={Checkout}/>
    <Stack.Screen name='orderplace' component={Orderplace}/>
    <Stack.Screen name = 'addressinput' component={Addressinput}/>

    
  </Stack.Navigator>
  </CartProvider>
)
const FindAVetStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FindAVet" component={FindAVet} />
    <Stack.Screen name="VetDescription" component={VetDescriptionScreen} />
  </Stack.Navigator>
);

const GroomingStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GroomingScreen" component={Grooming} />
    <Stack.Screen name="GroomingDescription" component={GroomingDescription} />
  </Stack.Navigator>
)
const AdoptStack = () => (
  <Stack.Navigator 
  screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdoptPage" component={AdoptPage} />
    <Stack.Screen name = "adoptDescription" component={AdoptDescription}/>
  </Stack.Navigator>
)
const AccountStack = ()=>(
  <Stack.Navigator
  screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Accountpage' component={Account}/>
    <Stack.Screen name='AccountSettings' component={AccountSettings}/>
    <Stack.Screen name = 'Invite' component={InviteFriends}/>
    <Stack.Screen name = 'address' component={Address}/>
    <Stack.Screen name = 'order' component={Order}/>
    <Stack.Screen name = 'addressinput' component={Addressinput}/>
  </Stack.Navigator>
)



const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="splash">
    <Stack.Screen name="login" options={{headerShown:false}} component={Login} />
    <Stack.Screen name="signup" options={{headerShown:false}}  component={Signup} />
    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
    <Stack.Screen name='splash' options={{headerShown:false}} component={Splash} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator
  screenOptions={{
    headerShown: false,

    tabBarStyle: { height: 70, backgroundColor: 'white' , position: 'absolute', paddingBottom: 20, paddingTop: 10},
  }}
  >
  <Tab.Screen
    name="Home"
    component={PetAcessoriesStack}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="home" type='material' color={color} size={size} />
      ),
    }}
   
  />
  <Tab.Screen
    name="Vet"
    component={FindAVetStack}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="stethoscope" type='font-awesome' color={color} size={size} />
      )
    }}
   
  />
  <Tab.Screen
    name="Grooming"
    component={GroomingStack}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="scissors" type='font-awesome' color={color} size={size} />
      ),
    }}
  />
  <Tab.Screen
    name="Account"
    component={AccountStack}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="user" type='font-awesome' color={color} size={size} />
      ),
    }}
  />
  <Tab.Screen
  name='Adopt'
  component={AdoptStack}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="heart" type='font-awesome' color={color} size={size} />
    ),
  }}
/>
</Tab.Navigator>
);
const DrawerAppNavigator = () => (
  <Drawer.Navigator screenOptions={{headerShown:false}}>
    <Drawer.Screen name="home" component={AppNavigator} />
    <Drawer.Screen name='findvet' component={FindAVetStack} />
    <Drawer.Screen name='findgrooming' component={GroomingStack} />
    <Drawer.Screen name="petadoption" component={AdoptStack} />
    <Drawer.Screen name='yourAddress' component={Address} />
  </Drawer.Navigator>
);

export default function App() {
  const isSignedInstateinLocal = AsyncStorage.getItem('login') === 'success';
  const [isSignedIn, setisSignedIn] = useState(true);
 console.log(isSignedIn)
  return (
    <AddressProvider>
    <Context.Provider value={[isSignedIn, setisSignedIn]}>
      <NavigationContainer >
        {isSignedIn ?  <DrawerAppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Context.Provider>
    </AddressProvider>
  );
}
