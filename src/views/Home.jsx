import React from 'react';
import { View } from 'react-native';
import tabs from '../constants/tabs.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';

// import { Container } from './styles';

const SideTab = createDrawerNavigator()

const Home = () => {
    const getTabs = () => {    
        return Object.keys(tabs).map(key => tabs[key])
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
                headerTintColor: '#fff'
            })}
        >
            {getTabs().map(tab =>
                <SideTab.Screen key={tab.key} name={tab.key} component={tab.component} />
            )}
        </SideTab.Navigator>
    )
}

export default Home