import { useRideStore } from "@/store/useRideStore";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Clock,
  CreditCard,
  Leaf,
  MapPin,
  Shield,
  Star,
  Zap,
} from "lucide-react-native";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmationScreen() {
  const { rideId } = useLocalSearchParams<{ rideId: string }>();
  const router = useRouter();
  const { rides, completeRide } = useRideStore();
  const theme = useTheme();

  const ride = rides.find((r) => r.id === Number(rideId));
  if (!ride) return null;

  const handleConfirmRide = () => {
    completeRide();
    router.replace("/profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 15,
            backgroundColor: theme.colors.background,
            zIndex: 10,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: theme.colors.text,
              textAlign: "center",
            }}
          >
            Confirm Your Ride
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.text,
              opacity: 0.7,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Review your eco-friendly trip
          </Text>
        </View>

        {/* Enhanced Map */}
        <View
          style={{
            height: 220,
            marginHorizontal: 16,
            borderRadius: 15,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 6.6505,
              longitude: 3.3428,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
          >
            <Marker coordinate={{ latitude: 6.6505, longitude: 3.3428 }}>
              <View
                style={{
                  backgroundColor: "#50C878",
                  padding: 12,
                  borderRadius: 20,
                  borderWidth: 4,
                  borderColor: "#FFFFFF",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <MapPin size={18} color="#FFFFFF" />
              </View>
            </Marker>
            <Marker coordinate={{ latitude: 6.655, longitude: 3.348 }}>
              <View
                style={{
                  backgroundColor: "#3B82F6",
                  padding: 12,
                  borderRadius: 20,
                  borderWidth: 4,
                  borderColor: "#FFFFFF",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <MapPin size={18} color="#FFFFFF" />
              </View>
            </Marker>
          </MapView>
        </View>

        {/* Main Content */}
        <View style={{ flex: 1, padding: 20 }}>
          {/* CO2 Savings Card */}
          <View
            style={{
              backgroundColor: theme.dark
                ? "rgba(16, 185, 129, 0.15)"
                : "#F0FDF4",
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: theme.dark ? "rgba(16, 185, 129, 0.3)" : "#DCFCE7",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Leaf size={24} color="#10B981" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#10B981",
                }}
              >
                Environmental Impact
              </Text>
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#10B981",
              }}
            >
              {ride.co2Saved} kg
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text,
                opacity: 0.7,
                textAlign: "center",
              }}
            >
              CO₂ saved compared to regular vehicles
            </Text>
          </View>

          {/* Trip Details Card */}
          <View
            style={{
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 15,
              padding: 20,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: theme.colors.text,
                marginBottom: 12,
              }}
            >
              Trip Details
            </Text>

            <View style={{ gap: 16 }}>
              {/* Pickup */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 12,
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
                  <MapPin size={18} color="#10B981" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.colors.text,
                      opacity: 0.6,
                      marginBottom: 4,
                    }}
                  >
                    PICKUP
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: theme.colors.text,
                    }}
                  >
                    123 Main Street, Downtown
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.text,
                      opacity: 0.7,
                      marginTop: 2,
                    }}
                  >
                    Anytown, USA 12345
                  </Text>
                </View>
              </View>

              {/* Dropoff */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    padding: 8,
                    backgroundColor: theme.dark
                      ? "rgba(59, 130, 246, 0.2)"
                      : "#EFF6FF",
                    borderRadius: 12,
                  }}
                >
                  <MapPin size={18} color="#3B82F6" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.colors.text,
                      opacity: 0.6,
                      marginBottom: 4,
                    }}
                  >
                    DROPOFF
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: theme.colors.text,
                    }}
                  >
                    456 Oak Avenue, Uptown
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.text,
                      opacity: 0.7,
                      marginTop: 2,
                    }}
                  >
                    Anytown, USA 12345
                  </Text>
                </View>
              </View>
            </View>

            {/* Trip Summary */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
                paddingTop: 15,
                borderTopWidth: 1,
                borderTopColor: theme.dark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Clock size={18} color={theme.colors.text} opacity={0.7} />
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.text,
                    opacity: 0.8,
                  }}
                >
                  {ride.time}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                {/* <DollarSign size={18} color={theme.colors.text} opacity={0.7} /> */}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: theme.colors.text,
                  }}
                >
                  ${ride.price.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Driver Card */}
          <View
            style={{
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: theme.colors.text,
                    marginBottom: 4,
                  }}
                >
                  Robert P.
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Zap size={14} color="#10B981" />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#10B981",
                      fontWeight: "600",
                    }}
                  >
                    EcoCar Model S
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 4,
                  }}
                >
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.text,
                      opacity: 0.8,
                    }}
                  >
                    4.9 • 2.4k rides
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  backgroundColor: "#10B981",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}
                >
                  ECO PRO
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Method */}
          <View
            style={{
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              padding: 16,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <View
                style={{
                  padding: 8,
                  backgroundColor: theme.dark
                    ? "rgba(255,255,255,0.1)"
                    : "#F3F4F6",
                  borderRadius: 10,
                }}
              >
                <CreditCard size={20} color={theme.colors.text} />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.colors.text,
                  }}
                >
                  Visa **** 1234
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.text,
                    opacity: 0.6,
                  }}
                >
                  Primary payment method
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: theme.dark
                  ? "rgba(255,255,255,0.1)"
                  : "#F3F4F6",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#10B981", fontWeight: "600" }}>
                Change
              </Text>
            </Pressable>
          </View>

          {/* Confirm Button */}
          <Pressable
            onPress={handleConfirmRide}
            style={{
              backgroundColor: "#10B981",
              paddingVertical: 10,
              borderRadius: 16,
              shadowColor: "#10B981",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Confirm & Start Ride
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                fontSize: 14,
                marginTop: 2,
              }}
            >
              Your eco-friendly ride is ready
            </Text>
          </Pressable>

          {/* Safety Note */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 16,
              padding: 12,
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#F8FAFC",
              borderRadius: 12,
            }}
          >
            <Shield size={16} color="#6B7280" />
            <Text
              style={{
                fontSize: 12,
                color: theme.colors.text,
                opacity: 0.6,
                textAlign: "center",
              }}
            >
              Your safety is our priority. All rides are contactless and
              sanitized.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
