import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import tabs from '../constants/tabs.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import { UserContext } from '../context/UserContext.js';

// import { Container } from './styles';

const SideTab = createDrawerNavigator()

const Home = ({ navigation }) => {

    const { user } = useContext(UserContext)

    const getTabs = () => {    
        return Object.keys(tabs).map(key => tabs[key])
    }
    if (!user){
        navigation.navigate('Login')
        return null
    }
            
    return (
        <SideTab.Navigator
            initialRouteName='PROFILE'
            drawerContent={props => <DrawerContent tabs={getTabs()} {...props} />}
            screenOptions={() => ({
                unmountOnBlur: true,
                headerShown: true,
                headerTransparent: true,
                headerVisible: false,
                headerTitleStyle: {display: 'none'},
                headerTintColor: '#fff',
                
            })}
        >
            {getTabs().map(tab =>
                <SideTab.Screen key={tab.key} name={tab.key} component={tab.component} />
            )}
        </SideTab.Navigator>
    )
}

export default Home