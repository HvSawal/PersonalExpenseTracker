import React from 'react';
import { DimensionValue, Platform, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

type StackedCardProps = {
  width?: DimensionValue;
  height?: number;
  radius?: number;
  frontColor?: string;             // top card
  midColor?: string;               // middle card
  backColor?: string;              // bottom card

  // vertical offsets for each layer (px)
  offsetMid?: number;              // middle vs front
  offsetBack?: number;             // back vs front

  // subtle rotations (deg) for depth flair
  rotateMidDeg?: number;
  rotateBackDeg?: number;

  glossColor?: string;
  glossOpacity?: number;

  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};


export default function StackedCard({
  width = "100%",
  height = 180,
  radius = 22,
  frontColor = "#F5F5F5",
  midColor = "#3F3F3F",
  backColor = "#2A2A2A",

  offsetMid = 8,
  offsetBack = 16,

  rotateMidDeg = 0,
  rotateBackDeg = 0,

  glossColor = "#FFFFFF",
  glossOpacity = 0.40,

  onPress,
  style,
  children
}: StackedCardProps) {
  return (
    <View style={[{ width, height: height + offsetBack }, style]}>
      {/* Back card */}
      <View
        style={[
          styles.layer,
          {
            height,
            borderRadius: radius,
            backgroundColor: backColor,
            top: offsetBack,
            transform: [{ rotate: `${rotateBackDeg}deg` }],
          },
          platformShadow(3)
        ]}
      />

      {/* Middle card */}
      <View
        style={[
          styles.layer,
          {
            height,
            borderRadius: radius,
            backgroundColor: midColor,
            top: offsetMid,
            transform: [{ rotate: `${rotateMidDeg}deg` }],
          },
          platformShadow(2)
        ]}
      />

      {/* Front glossy card */}
      <Pressable
        onPress={onPress}
        style={[
          styles.layer,
          {
            height,
            borderRadius: radius,
            backgroundColor: frontColor,
            top: 0,
          },
          platformShadow(1)
        ]}
      >
        {/* Gloss overlay */}
        <Svg pointerEvents="none" width="100%" height="100%" viewBox="0 0 736 414" preserveAspectRatio="none">
          <Defs>
            <ClipPath id="clip3">
              <Rect x="0" y="0" width="736" height="414" rx={radius} ry={radius} />
            </ClipPath>
          </Defs>
          <G clipPath="url(#clip3)">
            <Path
              d="M0 310 C 220 180, 515 160, 736 320 L 736 414 L 0 414 Z"
              fill={glossColor}
              opacity={glossOpacity}
            />
          </G>
        </Svg>

        {/* Content slot */}
        <View style={styles.content}>{children}</View>
      </Pressable>
    </View>
  );
}

function platformShadow(level: 0 | 1 | 2 | 3): ViewStyle {
  if (Platform.OS === "ios") {
    const ios = [
      { shadowOpacity: 0, shadowRadius: 0, shadowOffset: { width: 0, height: 0 } },
      { shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 6 } },
      { shadowOpacity: 0.16, shadowRadius: 10, shadowOffset: { width: 0, height: 10 } },
      { shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 14 } }
    ] as const;
    return { shadowColor: "#000", ...ios[level] };
  }
  const elev = [0, 3, 6, 10][level];
  return { elevation: elev, backgroundColor: "transparent" };
}

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: "center",
  }
});