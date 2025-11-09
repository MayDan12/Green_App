import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useRideStore } from "@/store/useRideStore";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as SystemUI from "expo-system-ui";
import {
  Award,
  Calendar,
  ChevronRight,
  HelpCircle,
  Leaf,
  LogOut,
  Moon,
  Settings,
  Shield,
  Star,
  Trophy,
  Zap,
} from "lucide-react-native";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { totalRides, totalCO2, ecoPoints } = useRideStore();
  const theme = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const router = useRouter();

  const toggleDarkMode = () => {
    SystemUI.setBackgroundColorAsync(isDark ? "#FFFFFF" : "#121212");
  };

  const menuItems = [
    {
      icon: Calendar,
      label: "Ride History",
      color: "#10B981",
      onPress: () => router.push("/history"),
    },
    { icon: Award, label: "Achievements", color: "#F59E0B" },
    { icon: Shield, label: "Safety Center", color: "#3B82F6" },
    { icon: HelpCircle, label: "Help & Support", color: "#6B7280" },
    { icon: Settings, label: "Settings", color: "#6B7280" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View
          style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 10 }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "800",
              color: theme.colors.text,
              textAlign: "center",
            }}
          >
            Profile
          </Text>
        </View>

        {/* User Profile Card */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 10,
            backgroundColor: theme.dark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
            borderRadius: 15,
            paddingVertical: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              backgroundColor: "#10B981",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              borderWidth: 4,
              borderColor: theme.dark ? "rgba(255,255,255,0.1)" : "#FFFFFF",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "800",
                color: "#FFFFFF",
              }}
            >
              A
            </Text>
          </View>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: theme.colors.text,
              marginBottom: 4,
            }}
          >
            Alex Ryder
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              marginBottom: 16,
            }}
          >
            <Trophy size={16} color="#10B981" />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#10B981",
              }}
            >
              Eco-Warrior
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text,
                opacity: 0.8,
              }}
            >
              4.9 • Member since 2024
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginBottom: 12,
            gap: 12,
          }}
        >
          {/* Total Rides */}
          <View
            style={{
              flex: 1,
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              paddingVertical: 10,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderRadius: 12,
                marginBottom: 5,
              }}
            >
              <Zap size={24} color="#3B82F6" />
            </View>
            <Text
              style={{
                fontSize: 24,
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
                textAlign: "center",
              }}
            >
              Total Rides
            </Text>
          </View>

          {/* CO2 Saved */}
          <View
            style={{
              flex: 1,
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              paddingVertical: 10,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              <Leaf size={24} color="#10B981" />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                color: theme.colors.text,
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
                textAlign: "center",
              }}
            >
              CO₂ Saved
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#10B981",
                fontWeight: "600",
                marginTop: 2,
              }}
            >
              kg
            </Text>
          </View>
        </View>

        {/* EcoPoints Card */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 15,
            borderRadius: 15,
            padding: 24,
            backgroundColor: theme.dark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                padding: 8,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 12,
              }}
            >
              <Trophy size={24} color="#FFFFFF" />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: theme.colors.text,
              }}
            >
              EcoPoints
            </Text>
          </View>

          <Text
            style={{
              fontSize: 36,
              fontWeight: "800",
              color: theme.colors.text,
              marginBottom: 8,
            }}
          >
            {ecoPoints.toLocaleString()}
          </Text>

          <Text
            style={{
              fontSize: 14,
              marginBottom: 16,
              color: theme.colors.text,
            }}
          >
            Keep riding green to earn more points and unlock exclusive rewards
          </Text>

          <Pressable
            style={{
              backgroundColor: "#FFFFFF",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 12,
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#10B981",
              }}
            >
              View Rewards
            </Text>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={{ marginHorizontal: 20, marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: theme.colors.text,
              marginBottom: 12,
            }}
          >
            Preferences
          </Text>

          <View
            style={{
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              overflow: "hidden",
              paddingVertical: 10,
              paddingHorizontal: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              gap: 7,
              elevation: 4,
            }}
          >
            {menuItems.map((item, index) => (
              <Pressable
                key={item.label}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 20,
                  backgroundColor: pressed
                    ? theme.dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)"
                    : "transparent",
                  borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                  borderBottomColor: theme.dark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                })}
                onPress={item.onPress}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      backgroundColor: theme.dark
                        ? "rgba(255,255,255,0.1)"
                        : `${item.color}10`,
                      borderRadius: 10,
                    }}
                  >
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: theme.colors.text,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text>
                    {item.label === "Ride History" ? (
                      <ChevronRight color="white" />
                    ) : (
                      ""
                    )}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Dark Mode Toggle */}
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              backgroundColor: theme.dark
                ? "rgba(255,255,255,0.05)"
                : "#FFFFFF",
              borderRadius: 20,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
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
                    : "rgba(107, 114, 128, 0.1)",
                  borderRadius: 10,
                }}
              >
                <Moon size={20} color="#6B7280" />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.colors.text,
                  }}
                >
                  Dark Mode
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.text,
                    opacity: 0.6,
                  }}
                >
                  {isDark ? "Currently enabled" : "Currently disabled"}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              thumbColor={isDark ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>
        </View>

        {/* Logout Button */}
        <Pressable
          style={{
            marginHorizontal: 20,
            marginTop: 18,
            padding: 16,
            backgroundColor: theme.dark ? "rgba(239, 68, 68, 0.1)" : "#FEF2F2",
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <LogOut size={20} color="#EF4444" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#EF4444",
            }}
          >
            Sign Out
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
