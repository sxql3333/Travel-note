import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../diaryList/utils/data';
import { FontAwesome } from '@expo/vector-icons';

const DiaryDetail = ({ route, navigation }) => {
  const { item } = route.params;

  const handleFollow = () => {
    // 添加关注的逻辑
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Image source={item.avatar} style={styles.avatar} />
          <Text style={styles.authorName}>{item.nickname}</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={styles.followButtonText}>+关注</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, item]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <View style={styles.userInfo}>
          <Image source={item.avatar} style={styles.avatar} />
          <Text style={styles.authorName}>{item.nickname}</Text>
        </View> */}
      </View>
      <Image source={item.image} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.content}>{item.content}</Text>
        </View>
        {/* <Text style={styles.description}>{item.description}</Text> */}
      </View>
      <View style={styles.footer}>
        {/* Likes count */}
        <View style={styles.likesContainer}>
          <Text style={styles.likesCount}>{item.count}</Text>
          <FontAwesome name="heart" size={15} color={colors.COLOR_PRIMARY} />
        </View>
        {/* Comments */}
        <View style={styles.commentsContainer}>
          <Text style={styles.likesCount}>{item.commentnum}</Text>
          <FontAwesome
            name="commenting"
            size={15}
            color={colors.COLOR_PRIMARY}
          />
        </View>
        {/* Comment Input */}
        {/* <View style={styles.commentInputContainer}>
          <TextInput style={styles.commentInput} placeholder="Add a comment" />
          <TouchableOpacity style={styles.commentButton}>
            <Text style={styles.commentButtonText}>Post</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.COLOR_PRIMARY,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  contentContainer: {
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    color: colors.COLOR_GRAY,
    marginRight: 4,
  },
  commentsContainer: {
    flexDirection: 'row',
    // flex: 1,
    marginTop: 16,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  commentInput: {
    // flex: 1,
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  commentButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'blue', // Customize the button style
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DiaryDetail;