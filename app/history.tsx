import { useRideStore } from "@/store/useRideStore";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { ArrowLeft, Calendar, Clock, Leaf } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { totalRides, totalCO2, ecoPoints, completedRides } = useRideStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getVehicleIcon = (type: string) => {
    if (type.includes("Electric")) return "⚡";
    if (type.includes("Hybrid")) return "🌿";
    return "🚗";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 15,
          backgroundColor: theme.colors.background,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            padding: 8,
            borderRadius: 12,
            backgroundColor: theme.dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
          }}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </Pressable>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: theme.colors.text,
            }}
          >
            Ride History
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.text,
              opacity: 0.7,
            }}
          >
            {totalRides} completed rides
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Stats Overview */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginBottom: 24,
            gap: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {totalRides}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text,
                opacity: 0.7,
              }}
            >
              Total Rides
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: "#10B981",
                marginBottom: 4,
              }}
            >
              {totalCO2.toFixed(1)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text,
                opacity: 0.7,
              }}
            >
              CO₂ Saved
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: "#F59E0B",
                marginBottom: 4,
              }}
            >
              {ecoPoints}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text,
                opacity: 0.7,
              }}
            >
              EcoPoints
            </Text>
          </View>
        </View>

        {/* Ride History List */}
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Recent Rides
          </Text>

          <View style={{ gap: 12 }}>
            {completedRides.map((ride, index) => (
              <View
                key={ride.id}
                style={{
                  backgroundColor: theme.dark
                    ? "rgba(255,255,255,0.05)"
                    : "#FFFFFF",
                  borderRadius: 20,
                  padding: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                {/* Ride Header */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>
                      {getVehicleIcon(ride.vehicleType)}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: theme.colors.text,
                        }}
                      >
                        {ride.vehicleType}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          marginTop: 2,
                        }}
                      >
                        <Calendar
                          size={14}
                          color={theme.colors.text}
                          opacity={0.6}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: theme.colors.text,
                            opacity: 0.6,
                          }}
                        >
                          {formatDate(ride.date)}
                        </Text>
                        <Clock
                          size={14}
                          color={theme.colors.text}
                          opacity={0.6}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: theme.colors.text,
                            opacity: 0.6,
                          }}
                        >
                          {ride.time}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "800",
                        color: theme.colors.text,
                      }}
                    >
                      ${ride.price.toFixed(2)}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 4,
                      }}
                    >
                      <Leaf size={14} color="#10B981" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#10B981",
                        }}
                      >
                        {ride.co2Saved} kg saved
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Route Details */}
                <View style={{ gap: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: "#10B981",
                        marginTop: 2,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.colors.text,
                          opacity: 0.6,
                          marginBottom: 2,
                        }}
                      >
                        FROM
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: theme.colors.text,
                        }}
                      >
                        {ride.from}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: "#3B82F6",
                        marginTop: 2,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.colors.text,
                          opacity: 0.6,
                          marginBottom: 2,
                        }}
                      >
                        TO
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: theme.colors.text,
                        }}
                      >
                        {ride.to}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Status Badge */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 16,
                    paddingTop: 16,
                    borderTopWidth: 1,
                    borderTopColor: theme.dark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: theme.dark
                        ? "rgba(16, 185, 129, 0.2)"
                        : "#F0FDF4",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#10B981",
                      }}
                    >
                      {ride.status.toUpperCase()}
                    </Text>
                  </View>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#10B981",
                      }}
                    >
                      View Details
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Empty State (if no rides) */}
        {completedRides.length === 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
              paddingHorizontal: 40,
            }}
          >
            <Calendar size={64} color={theme.colors.text} opacity={0.3} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme.colors.text,
                marginTop: 16,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              No ride history yet
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text,
                opacity: 0.6,
                textAlign: "center",
              }}
            >
              Your completed rides will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
