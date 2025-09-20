import { spacingX } from '@/constants/theme';
import { scale } from '@/utils/styling';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface GlossyCardProps {
  width?: number | string;
  height?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const GlossyCard: React.FC<GlossyCardProps> = ({ 
  width = '100%', 
  height = 200, 
  children,
}) => {
  return (
    <View style={styles.container}>
      {/* Bottom card layer */}
      <View 
        style={[
          styles.cardLayer, 
          styles.bottomLayer,
          { width: '60%', height: height * 1.2 }
        ]} 
      />
      
      {/* Middle card layer */}
      <View 
        style={[
          styles.cardLayer, 
          styles.middleLayer,
          { width: '80%', height: height * 1.1 }
        ]} 
      />
      
      {/* Top card layer with content */}
      <View 
        style={[
          styles.cardLayer, 
          styles.topLayer,
          { width: '100%', height }
        ]}
      >
        {/* Curved glossy sweep */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.glossySweep}
        />
        
        {/* Content area */}
        <View style={styles.contentArea}>
          {children}
        </View>
      </View>
    </View>
  );
};

export default GlossyCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    //height: verticalScale(100),
    justifyContent: 'space-between',
    backgroundColor: 'red'
    
  },
  cardLayer: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  bottomLayer: {
    backgroundColor: '#495057',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  middleLayer: {
    backgroundColor: '#6c757d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  topLayer: {
    backgroundColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  glossySweep: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [{ scaleX: 1.2 }, { translateX: -20 }],
  },
  contentArea: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});