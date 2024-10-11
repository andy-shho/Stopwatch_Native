import React, { useState, useRef, Children} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const App = () => {

    // State and refs to manage time and stopwatch status
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(0);
    const startTimeRef = useRef(0);
    const id = useRef(0);
    // Function to start the stopwatch
    const startStopwatch = () => {
        startTimeRef.current = Date.now() - time * 1000;
        intervalRef.current = setInterval(() => {
            setTime(
                (Date.now() - startTimeRef.current) / 1000, );
        }, 10);
        setRunning(true);
    };
    // Function to pause the stopwatch
    const pauseStopwatch = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
    };
    // Function to reset the stopwatch
    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        setTime(0);
        setLaps([]);
        setRunning(false);
        id.current = 0;
    };

    const deleteLap = (key) => {
        setLaps(laps.filter((lap) => lap.id !== key));
    }

    const lapStopwatch = () => {
        setLaps(laps => [...laps, {id: id.current, time: time}])
        id.current++;
    }

    // const checkTime = (tempTime) => {
    //   setTime(tempTime.toFixed(2));
    // }

    // Function to resume the stopwatch
    const resumeStopwatch = () => {
        startTimeRef.current = Date.now() - time * 1000;
        intervalRef.current = setInterval(() => {
            setTime(
                (Date.now() - startTimeRef.current) / 1000);
            console.log(time)
        }, 10);
        setRunning(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Stopwatch
            </Text>
            <Text style={styles.subHeader}>
                Stop Watch On Top
            </Text>
            <Text style={styles.timeText}>{time.toFixed(3)}s</Text>
            <View style={styles.buttonContainer}>
                {running ? (
                    <>
                        <TouchableOpacity
                            style={[styles.button, styles.pauseButton]}
                            onPress={pauseStopwatch}
                        >
                            <Text style={styles.buttonText}>Pause</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.lapButton]}
                            onPress={lapStopwatch}
                            >
                            <Text style={styles.buttonText}>Lap</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={[styles.button, styles.startButton]}
                            onPress={startStopwatch}
                        >
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.resetButton]}
                            onPress={resetStopwatch}
                        >
                            <Text style={styles.buttonText}>
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
                {!running && (
                    <TouchableOpacity
                        style={[styles.button, styles.resumeButton]}
                        onPress={resumeStopwatch}
                    >
                        <Text style={styles.buttonText}>
                            Resume
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView>
            {laps.map((lap) => (
                <View key={lap.id}>
                    <Text style={styles.timeText} >{lap.time}s</Text>
                    <TouchableOpacity style={[styles.button, styles.resumeButton]} onPress={() => deleteLap(lap.id)}>
                        <Text style={styles.buttonText}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>

            ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        color: "purple",
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 10,
        color: "purple",
    },
    timeText: {
        fontSize: 48,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    startButton: {
        backgroundColor: '#2ecc71',
        marginRight: 10,
    },
    lapButton: {
        backgroundColor: '#00FFFF',
        marginRight: 10,
    },
    resetButton: {
        backgroundColor: '#e74c3c',
        marginRight: 10,
    },
    pauseButton: {
        backgroundColor: '#f39c12',
        marginRight: 10
    },
    resumeButton: {
        backgroundColor: '#3498db',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default App;


















// import { Image, StyleSheet, Platform } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
