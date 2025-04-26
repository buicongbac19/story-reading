import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenuContext } from '../context/MenuProvider';
import { navigate } from '../navigation/NavigationService';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7;

export default function MenuModal() {
  const navigation = useNavigation();
  const slideAnim = useState(new Animated.Value(-SIDEBAR_WIDTH))[0];
  const opacityAnim = useState(new Animated.Value(0))[0];
  const { openMenu, setOpenMenu, activeTab, setActiveTab } = useMenuContext();
  const activeBgAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (openMenu) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // setActiveTab(activeTab);
  }, [openMenu, activeTab]);

  const closeSidebar = () => {
    setOpenMenu(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    Animated.timing(activeBgAnim, {
      toValue: tab === 'home' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const interpolateBg = activeBgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E6F0FF', '#fff'],
  });

  const interpolateTextColor = activeBgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#007AFF', '#007AFF'],
  });

  return (
    <>
      {openMenu && (
        <View style={styles.overlayContainer} pointerEvents="box-none">
          <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={closeSidebar}
              activeOpacity={1}
            />
          </Animated.View>

          <Animated.View
            style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Menu</Text>
              <TouchableOpacity onPress={closeSidebar}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <AnimatedTouchable
              style={[
                styles.tab,
                activeTab === 'home' && { backgroundColor: interpolateBg },
              ]}
              onPress={() => handleTabChange('home')}
            >
              <Animated.Text
                style={[
                  styles.tabText,
                  activeTab === 'home' && {
                    color: interpolateTextColor,
                    backgroundColor: interpolateBg,
                  },
                ]}
                onPress={() => {
                  navigate('MainTabs', { screen: 'Home' });
                }}
              >
                Trang chủ
              </Animated.Text>
            </AnimatedTouchable>

            <AnimatedTouchable
              style={[
                styles.tab,
                activeTab === 'favorites' && {
                  backgroundColor: interpolateBg,
                },
              ]}
              onPress={() => {
                handleTabChange('favorites');
              }}
            >
              <Animated.Text
                style={[
                  styles.tabText,
                  activeTab === 'favorites' && {
                    color: interpolateTextColor,
                    backgroundColor: interpolateBg,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('FavoritesBook');
                }}
              >
                Truyện đã yêu thích
              </Animated.Text>
            </AnimatedTouchable>

            <AnimatedTouchable
              style={[
                styles.tab,
                activeTab === 'manage-posts' && {
                  backgroundColor: interpolateBg,
                },
              ]}
              onPress={() => handleTabChange('manage-posts')}
            >
              <Animated.Text
                style={[
                  styles.tabText,
                  activeTab === 'manage-posts' && {
                    color: interpolateTextColor,
                    backgroundColor: interpolateBg,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('ManagePosts');
                }}
              >
                Quản lý truyện
              </Animated.Text>
            </AnimatedTouchable>
          </Animated.View>
        </View>
      )}
    </>
  );
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 1,
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#ddd',
    paddingTop: 40,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabText: {
    fontSize: 16,
  },
});
