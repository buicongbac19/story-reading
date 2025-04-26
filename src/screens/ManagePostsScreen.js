import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMenuContext } from '../context/MenuProvider';
import MenuModal from '../components/MenuModal';

const initialPosts = [
  {
    id: '1',
    title: 'Dragon Ball Full Color',
    image:
      'https://product.hstatic.net/200000343865/product/6_f998f3fbaac84acb8710ad4bcd2a2764_master.jpg',
    description: 'Bộ truyện Dragon Ball phiên bản màu đầy đủ',
    content: 'Nội dung truyện Dragon Ball...',
  },
  {
    id: '2',
    title: 'Kỹ Năng Buông Bỏ',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoEhQX9gkgD6PU1RuTPnombczkNDys5VZj0g&s',
    description: 'Sách về kỹ năng buông bỏ trong cuộc sống',
    content: 'Nội dung sách Kỹ Năng Buông Bỏ...',
  },
  {
    id: '3',
    title: 'Khéo Ăn Nói Sẽ Có Được Thiên Hạ',
    image:
      'https://salt.tikicdn.com/media/catalog/product/k/h/kheo-an-noi-se-co-duoc-thien-ha_2.jpg',
    description: 'Sách về nghệ thuật giao tiếp',
    content: 'Nội dung sách Khéo Ăn Nói...',
  },
  {
    id: '4',
    title: 'Tư Duy Phản Biện',
    image:
      'https://salt.tikicdn.com/cache/w1200/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg',
    description: 'Sách về phương pháp tư duy phản biện',
    content: 'Nội dung sách Tư Duy Phản Biện...',
  },
  {
    id: '5',
    title: 'Những quy tắc trong cuộc sống',
    image:
      'https://bizweb.dktcdn.net/thumb/grande/100/197/269/products/nhung-quy-tac-trong-cuoc-song-02.jpg?v=1528432718670',
    description: 'Sách về các quy tắc sống',
    content: 'Nội dung sách Những quy tắc trong cuộc sống...',
  },
  {
    id: '6',
    title: 'NHỮNG NGƯỜI KHỐN KHỔ',
    image:
      'https://salt.tikicdn.com/cache/w1200/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg',
    description: 'Tiểu thuyết kinh điển của Victor Hugo',
    content: 'Nội dung tiểu thuyết Những Người Khốn Khổ...',
  },
];

export default function ManagePostsScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(
    StatusBar.currentHeight || 0,
  );
  const { openMenu, setOpenMenu, activeTab, setActiveTab } = useMenuContext();

  useEffect(() => {
    if (openMenu) setOpenMenu(false);
    setStatusBarHeight(StatusBar.currentHeight || 0);
    setActiveTab('manage-posts');
  }, [activeTab]);

  const handleAddNewStory = () => {
    navigation.navigate('EditStory', { mode: 'create' });
  };

  const handleEditStory = (post) => {
    setMenuVisible(false);
    navigation.navigate('EditStory', { mode: 'edit', post });
  };

  const handleDeleteStory = (post) => {
    setMenuVisible(false);
    setSelectedPost(post);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      setPosts(posts.filter((p) => p.id !== selectedPost.id));
      setDeleteConfirmVisible(false);
      setSelectedPost(null);
    }
  };

  const showMenu = (post, event) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX - 120, y: pageY });
    setSelectedPost(post);
    setMenuVisible(true);
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <Text style={styles.postTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={(event) => showMenu(item, event)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          { marginTop: Platform.OS === 'android' ? statusBarHeight : 0 },
        ]}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setOpenMenu(true)}
        >
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đăng bài</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNewStory}>
          <Text style={styles.addButtonText}>THÊM TRUYỆN</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View
            style={[
              styles.menuContainer,
              {
                top: menuPosition.y,
                left: menuPosition.x,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => selectedPost && handleEditStory(selectedPost)}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="#2196F3"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Sửa</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => selectedPost && handleDeleteStory(selectedPost)}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#F44336"
                style={styles.menuIcon}
              />
              <Text style={[styles.menuText, { color: '#F44336' }]}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={deleteConfirmVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteConfirmVisible(false)}
      >
        <View style={styles.confirmModalOverlay}>
          <View style={styles.confirmContainer}>
            <Text style={styles.confirmTitle}>Xác nhận xóa</Text>
            <Text style={styles.confirmMessage}>
              Bạn có chắc chắn muốn xóa truyện "{selectedPost?.title}"?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.cancelButton]}
                onPress={() => setDeleteConfirmVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <MenuModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  addButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FFA000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  postItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  postImage: {
    width: 50,
    height: 70,
    borderRadius: 4,
    marginRight: 12,
  },
  postTitle: {
    flex: 1,
    fontSize: 16,
    color: '#FF8C00',
  },
  moreButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuContainer: {
    position: 'absolute',
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    fontSize: 14,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  confirmModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  confirmMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  deleteButtonText: {
    color: '#fff',
  },
});
