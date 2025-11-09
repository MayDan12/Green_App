import { useRideStore } from "@/store/useRideStore";
import { Link, useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { ThemedText } from "@/components/themed-text";
import { Ride } from "@/types";
import { useTheme } from "@react-navigation/native";
import {
  Car,
  History,
  MapPin,
  Search,
  Star,
  Users,
  Zap,
} from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const RideIcon = ({ type }: { type: string }) => {
  if (type.includes("EV")) return <Zap size={24} color="#10B981" />;
  if (type.includes("Eco")) return <Users size={24} color="#10B981" />;
  return <Car size={24} color="#6B7280" />;
};

function RideCard({ ride }: { ride: Ride }) {
  const { bookRide } = useRideStore();
  const theme = useTheme();

  return (
    <Link
      href={{ pathname: "/confirmation", params: { rideId: ride.id } }}
      asChild
    >
      <TouchableOpacity
        onPress={() => bookRide(ride)}
        style={{
          backgroundColor: theme.dark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
          borderRadius: 16,
          borderColor: "#50C878",
          borderWidth: 0.5,
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginVertical: 6,
          marginHorizontal: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
          borderLeftWidth: 4,
          borderLeftColor: "#50C878",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              flex: 1,
            }}
          >
            <View
              style={{
                padding: 8,
                backgroundColor: theme.dark
                  ? "rgba(16, 185, 129, 0.2)"
                  : "#F0FDF4",
                borderRadius: 12,
              }}
            >
              <RideIcon type={ride.vehicleType} />
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <ThemedText style={{ fontWeight: "700", fontSize: 16 }}>
                  {ride.vehicleType}
                </ThemedText>
                {ride.isRecommended && (
                  <View
                    style={{
                      backgroundColor: "#DCFCE7",
                      paddingHorizontal: 8,
                      paddingVertical: 1,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      alignSelf: "flex-end",
                    }}
                  >
                    <Star size={12} color="#16A34A" />
                    <ThemedText
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#16A34A",
                      }}
                    >
                      Recommended
                    </ThemedText>
                  </View>
                )}
              </View>
              <ThemedText
                style={{ color: theme.colors.text, opacity: 0.7, marginTop: 2 }}
              >
                {ride.subtitle}
              </ThemedText>
            </View>
            {/* <TouchableOpacity
              style={{
                backgroundColor: "#50C878",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <ThemedText>More Info</ThemedText>
            </TouchableOpacity> */}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: theme.dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <ThemedText style={{ fontSize: 14, opacity: 0.8 }}>
              {ride.eta}
            </ThemedText>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: theme.colors.text,
                opacity: 0.5,
              }}
            />
            <ThemedText style={{ fontSize: 14, opacity: 0.8 }}>
              {ride.capacity || "4 seats"}
            </ThemedText>
          </View>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#50C878",
              fontFamily: "sans-serif-medium",
            }}
          >
            ${ride.price.toFixed(2)}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function HomeScreen() {
  const { rides } = useRideStore();
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Header */}
        <View
          style={{
            paddingBottom: 10,
            paddingTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <ThemedText
              style={{ fontSize: 25, fontWeight: "800", marginBottom: 3 }}
            >
              Green Ride
            </ThemedText>
            <ThemedText style={{ fontSize: 16, opacity: 0.7 }}>
              Your eco-friendly option
            </ThemedText>
          </View>
          <View>
            <Pressable onPress={() => router.push("/history")}>
              <ThemedText>
                <History size={28} color={theme.colors.text} />
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={{
            marginBottom: 6,
            backgroundColor: theme.dark ? "rgba(255,255,255,0.08)" : "#FFFFFF",
            borderRadius: 16,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            borderWidth: 1,
            borderColor: theme.dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
          }}
        >
          <Search size={20} color={theme.colors.text} opacity={0.5} />
          <TextInput
            style={{
              flex: 1,
              padding: 16,
              color: theme.colors.text,
              fontSize: 16,
            }}
            placeholder="Where are you going today?"
            placeholderTextColor={
              theme.dark ? "rgba(255,255,255,0.5)" : "#9CA3AF"
            }
          />
        </View>

        {/* Map */}
        <View
          style={{
            height: 300,
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 6.6505,
              longitude: 3.3428,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            <Marker
              coordinate={{ latitude: 6.6505, longitude: 3.3428 }}
              title="Pickup"
            >
              <View
                style={{
                  backgroundColor: "#50C878",
                  padding: 8,
                  borderRadius: 12,
                  borderWidth: 3,
                  borderColor: "#FFFFFF",
                }}
              >
                <MapPin size={16} color="#FFFFFF" />
              </View>
            </Marker>
            <Marker
              coordinate={{ latitude: 6.655, longitude: 3.348 }}
              title="Dropoff"
            >
              <View
                style={{
                  backgroundColor: "#3B82F6",
                  padding: 8,
                  borderRadius: 12,
                  borderWidth: 3,
                  borderColor: "#FFFFFF",
                }}
              >
                <MapPin size={16} color="#FFFFFF" />
              </View>
            </Marker>
          </MapView>
        </View>

        {/* Ride Options Header */}
        <View style={{ marginBottom: 5 }}>
          <ThemedText
            style={{
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Choose Your Ride
          </ThemedText>
          {/* <ThemedText style={{ fontSize: 14, opacity: 0.7 }}>
            {rides.length} options near you
          </ThemedText> */}
        </View>

        {/* Ride List */}
        <FlatList
          data={rides}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => <RideCard ride={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* CTA Button */}
        {/* <View
          style={{
            position: "absolute",
            bottom: 2,
            left: 16,
            right: 16,
            paddingTop: 12,
          }}
        >
          <Link href="/confirmation" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#50C878",
                padding: 5,
                borderRadius: 15,
                alignItems: "center",
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
                alignSelf: "center",
                width: "50%",
                paddingVertical: 10,
              }}
            >
              <ThemedText
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Confirm EV Ride
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
