import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MenuModal from '../components/MenuModal';

import { useMenuContext } from '../context/MenuProvider';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

export const booksData = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    image:
      'https://nhasachphuongnam.com/images/detailed/217/dac-nhan-tam-bc.jpg',
    author: 'Dale Carnegie',
    content:
      "Tiếng huyên náo và tiếng chân chạy rầm rập trên đường phố New York. Cảnh sát đang rượt đuổi một tên tội phạm nguy hiểm. Cuối cùng, sau rất nhiều nỗ lực và quyết tâm, cảnh sát đã tóm được Crowley 'Hai Súng', một tên giết người hàng loạt, ngay tại nơi mà hắn không ngờ đến: nhà người yêu của hắn trên đại lộ West End.\n\nMột trăm năm mười chín sát và mật vụ bao vây toà nhà cao nhất, nơi hắn ẩn náu. Họ chọc thủng mái nhà, phun khói vào bên trong và súng máy tại các cửa sổ của những cao ốc xung quanh. Âm thanh chát chúa của những tràng súng máy và súng ngắn liên tiếp nổ trong hơn một giờ. Crowley, ẩn núp sau những chiếc ghế bành đón bóng đạn, quyết liệt chống trả lực lượng cảnh sát bằng những tràng súng liên thanh. Nhưng cuối cùng, tên tội phạm có tài thiện xạ này cũng phải đầu hàng.",
  },
  {
    id: '2',
    title: 'Đi Khi Ta Còn Trẻ',
    image:
      'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/dikhitacontre01.jpg?v=1710306236480',
    author: 'Nguyễn Ngọc Thạch',
    content: 'Nội dung sách Đi Khi Ta Còn Trẻ...',
  },
  {
    id: '3',
    title: 'Đam Mê Khám Phá',
    image:
      'https://smashingebook.com/cdn/shop/products/fa7fd1c1dfbb8767f1a237cd0752d26b.jpg?v=1677022783',
    author: 'Richard Feynman',
    content: 'Nội dung sách Đam Mê Khám Phá...',
  },
  {
    id: '4',
    title: 'Từ Điển Xây Dựng Từ Cơ',
    image:
      'https://salt.tikicdn.com/cache/w1200/ts/product/b4/05/0b/21aee33739f94bd54705d8ec80515f4e.jpg',
    author: 'Eran Katz',
    content: 'Nội dung sách Từ Điển Xây Dựng Từ Cơ...',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { openMenu, setOpenMenu, activeTab, setActiveTab } = useMenuContext();

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight || 0);
    if (openMenu) setOpenMenu(false);
    setActiveTab('home');
  }, [activeTab]);

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { bookId: book.id });
  };

  const handleMenuPress = () => {
    setOpenMenu(true);
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => handleBookPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.bookCover}
        resizeMode="cover"
      />
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        {item.author}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.headerTitle}>Menu</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Image
          source={{
            uri: 'https://thuvienanime.net/wp-content/uploads/2021/12/tan-muc-qin-mu-thuvienanime-2.jpg',
          }}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mới Nhất</Text>
          <FlatList
            data={booksData}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.bookRow}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleSearchPress}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>

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
  content: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    marginBottom: 15,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  bookRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bookItem: {
    width: ITEM_WIDTH,
    marginBottom: 20,
  },
  bookCover: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
