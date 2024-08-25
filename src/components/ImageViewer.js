import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;
  
    console.log('Image source:', imageSource);

    return <Image source={imageSource} style={styles.image}   onError={(e) => console.log(e.nativeEvent.error)}
    />;
  }

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
