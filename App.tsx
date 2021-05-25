import {
  Jost_400Regular,
  Jost_600SemiBold,
  useFonts,
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';
import Routes from './src/routes';

import * as Notifications from 'expo-notifications';
import { PlantProps } from './src/libs/storage';
import { getPermissionsAsync } from 'expo-notifications';

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold });

  useEffect(() => {
    // const subscription = Notifications.addNotificationReceivedListener(
    //   async (notification) => {
    //     const data = notification.request.content.data.plant as PlantProps;
    //     console.log(data);
    //   }
    // );
    // return () => subscription.remove();

    async function notifications() {
      // const data = await Notifications.getAllScheduledNotificationsAsync();
      // console.log('Notificações: ');
      // console.log(data);
      //
      //
      // await Notifications.cancelAllScheduledNotificationsAsync();

      // Check for existing permissions

      const { status: existingStatus } = await getPermissionsAsync();
      // await Permissions.getAsync(
      //   Permissions.NOTIFICATIONS
      // );
      let finalStatus = existingStatus;

      // If no existing permission, ask for permission:
      // Only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await getPermissionsAsync();
        // await Permissions.askAsync(
        //   Permissions.NOTIFICATIONS
        // );
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return false;
      }
    }

    notifications();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Routes />;
}
