import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function AccountScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(height));
  const [statusBarHeight, setStatusBarHeight] = useState(
    StatusBar.currentHeight || 0,
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleChangePassword = () => {
    hideModal();
    navigation.navigate('ChangePassword');
  };

  const handleEditProfile = () => {
    hideModal();
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          { marginTop: Platform.OS === 'android' ? statusBarHeight : 0 },
        ]}
      >
        <Text style={styles.headerTitle}>Account</Text>
        <TouchableOpacity style={styles.moreButtonAbsolute} onPress={showModal}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tCeHiWOxREhwoYwA6QeyUX4DW8jxok.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>App22</Text>
        <Text style={styles.email}>app2@gmail.com</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={hideModal}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleChangePassword}
            >
              <Ionicons name="key-outline" size={22} color="#2196F3" />
              <Text style={styles.modalOptionText}>Đổi mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleEditProfile}
            >
              <Ionicons name="create-outline" size={22} color="#F44336" />
              <Text style={styles.modalOptionText}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  moreButtonAbsolute: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 8,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    position: 'relative',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  moreButton: {
    padding: 8,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  username: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 30,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 16,
  },
});
