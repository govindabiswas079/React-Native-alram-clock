import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetFlatList, BottomSheetScrollView, BottomSheetSectionList, BottomSheetVirtualizedList, BottomSheetView, } from '@gorhom/bottom-sheet';

const DraggableSheet = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['20%', '100%'], []);
    const handleExpandPress = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const handleCollapsePress = useCallback(() => {
        bottomSheetRef.current?.collapse();
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );
    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        ),
        []
    );
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button title="Expand" onPress={() => handleExpandPress()} />
                <Button title="Collapse" onPress={() => handleCollapsePress()} />
                <Button title="Close" onPress={() => handleClosePress()} />
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    keyboardBehavior="interactive"
                    keyboardBlurBehavior="restore"
                    enablePanDownToClose={true}
                    handleComponent={() => {
                        return (
                            <>
                            </>
                        )
                    }}
                    footerComponent={() => {
                        return (
                            <>
                            </>
                        )
                    }}
                >
                    {/* <ContactList
                        count={10}
                        type="FlatList"
                        enableFooterMarginAdjustment={false}
                    /> */}
                    <BottomSheetFlatList
                        data={data}
                        keyExtractor={(i) => i}
                        renderItem={renderItem}
                        contentContainerStyle={styles.contentContainer}
                    />
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    footer: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#80f',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8.0,

        elevation: 24,
    },
    footerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
});

export default DraggableSheet