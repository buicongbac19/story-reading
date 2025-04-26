import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMenuContext } from '../context/MenuProvider';
import MenuModal from '../components/MenuModal';

export default function FavoritesBookScreen() {
  const { openMenu, setOpenMenu, setActiveTab, activeTab } = useMenuContext();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (openMenu) setOpenMenu(false);
    setActiveTab('favorites');
  }, [activeTab]);

  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Chiến Binh Cầu Vồng',
      image:
        'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/chienbinhcauvong.jpg?v=1710306229643',
    },
    {
      id: 2,
      title: 'Đắc Nhân Tâm',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4yqr70MmTKICelHxr7TApxIXkm6wq7rGXhg&s',
    },
  ]);

  const confirmRemoveFavorite = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn bỏ yêu thích truyện này không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () => {
            setFavorites(favorites.filter((item) => item.id !== id));
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleMenuPress = () => {
    setOpenMenu(true);
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Truyện đã yêu thích</Text>
        </View>
      </View>

      <View style={styles.bookContainer}>
        {favorites.map((book) => (
          <View key={book.id} style={styles.bookItem}>
            <Image source={{ uri: book.image }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => confirmRemoveFavorite(book.id)}
              >
                <Text style={styles.removeButtonText}>Bỏ yêu thích</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <MenuModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
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
  bookContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '48%',
    elevation: 2,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  bookInfo: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
