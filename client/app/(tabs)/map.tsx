import SOSButton from "@/components/SOSButton";
import * as Location from "expo-location";
import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Heatmap, Marker } from "react-native-maps";

interface unSafePoint {
  latitude: number;
  longitude: number;
  weight: number;
}

export default function Map() {
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);
  const [unSafePoint, setUnsafePoint] = React.useState<unSafePoint[]>([
  { latitude: 28.47674989556479, longitude: 77.5016687437892, weight: 1 },
  { latitude: 28.47674989556479, longitude: 77.5016687437892, weight: 1 },

  { latitude: 28.48709375534753, longitude: 77.49297436326742, weight: 1 },

  { latitude: 28.532757586356368, longitude: 77.43741173297167, weight: 1 },

  { latitude: 28.470910619352384, longitude: 77.46224496513605, weight: 1 },

  { latitude: 28.469876415203885, longitude: 77.50207241624594, weight: 1 },
  { latitude: 28.469876415203885, longitude: 77.50207241624594, weight: 1 },

  { latitude: 28.474668623917676, longitude: 77.46364071965218, weight: 1 },

  { latitude: 28.472717578708096, longitude: 77.4640990421176, weight: 1 },
  { latitude: 28.472717578708096, longitude: 77.4640990421176, weight: 1 },

  { latitude: 28.48709375534753, longitude: 77.49297436326742, weight: 1 },
  { latitude: 28.48709375534753, longitude: 77.49297436326742, weight: 1 },

  { latitude: 28.532757586356368, longitude: 77.43741173297167, weight: 1 },
  { latitude: 28.532757586356368, longitude: 77.43741173297167, weight: 1 },
  { latitude: 28.532757586356368, longitude: 77.43741173297167, weight: 1 },

  { latitude: 28.39667069021716, longitude: 77.52965155988932, weight: 1 },
  { latitude: 28.39667069021716, longitude: 77.52965155988932, weight: 1 },

  { latitude: 28.402563906173636, longitude: 77.53503207117319, weight: 1 },
  { latitude: 28.402563906173636, longitude: 77.53503207117319, weight: 1 },
  { latitude: 28.402563906173636, longitude: 77.53503207117319, weight: 1 },
  { latitude: 28.402563906173636, longitude: 77.53503207117319, weight: 1 },

  { latitude: 28.39825270670317, longitude: 77.53301806747913, weight: 1 },
  { latitude: 28.39825270670317, longitude: 77.53301806747913, weight: 1 },
  { latitude: 28.39825270670317, longitude: 77.53301806747913, weight: 1 },
  { latitude: 28.39825270670317, longitude: 77.53301806747913, weight: 1 },
  { latitude: 28.473734956023204, longitude: 77.48913243412971, weight: 1 },
  { latitude: 28.473734956023204, longitude: 77.48913243412971, weight: 1 },
  { latitude: 28.473734956023204, longitude: 77.48913243412971, weight: 1 },
  { latitude: 28.473734956023204, longitude: 77.48913243412971, weight: 1 },

  { latitude: 28.473803036252736, longitude: 77.48927190899849, weight: 1 },
  { latitude: 28.473803036252736, longitude: 77.48927190899849, weight: 1 },
  { latitude: 28.473803036252736, longitude: 77.48927190899849, weight: 1 },

  { latitude: 28.475649143154175, longitude: 77.48967222869396, weight: 1 },
  { latitude: 28.475649143154175, longitude: 77.48967222869396, weight: 1 },
  { latitude: 28.475649143154175, longitude: 77.48967222869396, weight: 1 },

  { latitude: 28.46372285333167, longitude: 77.49638479202986, weight: 1 },
  { latitude: 28.46723088140974, longitude: 77.49936506152153, weight: 1 },
  { latitude: 28.464670167971637, longitude: 77.49327979981899, weight: 1 }
]);
  const [locationStatus, setLocationStatus] = React.useState(false);

  const handleLongPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    console.log("long pressed at: ", latitude, longitude)
    setUnsafePoint((prev) => [
      ...prev,
      {
        latitude: latitude ? latitude : 0.01,
        longitude: longitude ? longitude : 0.01,
        weight: 1,
      },
    ]);
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#363e52" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0c160f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#211d1d" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#ffffff49" }] },
  { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4644440f" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        setLocationStatus(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocationStatus(true);
      setLocation(loc);
    })();
  }, []);

  const validPoints = unSafePoint.filter(
    (p) => typeof p.latitude === "number" && typeof p.longitude === "number",
  );

  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Getting location...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={Styles.map}
        customMapStyle={darkMapStyle}
        onLongPress={handleLongPress}
        showsUserLocation
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {unSafePoint.map((point, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: point.latitude ?? 0.01,
              longitude: point.longitude ?? 0.01,
            }}
            pinColor="blue"
          />
        ))}

        {unSafePoint.length > 0 && <Heatmap points={validPoints} radius={40} />}
      </MapView>
      <SOSButton />
    </View>
  );
}

const Styles = StyleSheet.create({
  AboutContainer: {
    fontWeight: "bold",
    backgroundColor: "grey",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
