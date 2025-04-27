import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuModal from '../components/MenuModal';

import { useMenuContext } from '../context/MenuProvider';

export default function HeaderWithMenuModal({ tab, title }) {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { openMenu, setOpenMenu, activeTab, setActiveTab } = useMenuContext();

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight || 0);
    if (openMenu) setOpenMenu(false);
    setActiveTab(tab);
  }, [activeTab]);

  const handleMenuPress = () => {
    setOpenMenu(true);
  };

  return (
    <>
      <View
        style={[
          styles.header,
          { marginTop: Platform.OS === 'android' ? statusBarHeight : 0 },
        ]}
      >
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>

      <MenuModal />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    position: 'relative',
  },
  menuButton: {
    padding: 6,
    zIndex: 2,
  },
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});
