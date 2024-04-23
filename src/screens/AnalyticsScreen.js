import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { serverRequest } from "../utils/axios";
import { getItemAsync } from "expo-secure-store";

export default function AnalyticsScreen({ navigation }) {
    const [selectedOption, setSelectedOption] = useState("W1")
    const [currentDate, setCurrentDate] = useState(new Date())

    const [weightData, setWeightData] = useState([])
    const [durationData, setDurationData] = useState([])
    const [intensityData, setIntensityData] = useState([])

    const handleOptionSelect = (option) => {
        setSelectedOption(option)
    }

    const handleLeftArrowPress = () => {
        const updatedDate = new Date(currentDate)
        updatedDate.setMonth(updatedDate.getMonth() - 1)
        setCurrentDate(updatedDate)
    }

    const handleRightArrowPress = () => {
        const updatedDate = new Date(currentDate)
        updatedDate.setMonth(updatedDate.getMonth() + 1)
        setCurrentDate(updatedDate)
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = monthNames[currentDate.getMonth()]
    const currentYear = currentDate.getFullYear()
    const formattedDate = `${currentMonth} ${currentYear}`

    const generateOvalContainers = () => {
        const weeksInMonth = 4;
        const ovalContainers = [];
        for (let i = 1; i <= weeksInMonth; i++) {
            ovalContainers.push(
                <TouchableOpacity
                    key={`week${i}`}
                    style={[styles.ellipse, selectedOption === `W${i}` ? styles.selectedEllipse : styles.unselectedEllipse]}
                    onPress={() => handleOptionSelect(`W${i}`)}>
                    <Text style={[styles.optionText, selectedOption === `W${i}` && styles.selectedOptionText]}>W{"\n"}{i}</Text>
                </TouchableOpacity>
            );
        }
        return ovalContainers;
    };

    const renderLineChart = ({ item }) => {
        return (
            <View>
                <Text style={styles.heading}>{item.heading}</Text>
                <LineChart
                    data={{
                        labels: ['W1', 'W2', 'W3', 'W4'],
                        datasets: [
                            {
                                data: item.data,
                                color: item.color,
                                strokeWidth: 2
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 20}
                    height={220}
                    yAxisLabel={item.yAxisLabel}
                    yAxisSuffix={item.yAxisSuffix}
                    yAxisInterval={1}
                    chartConfig={item.chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        top: 20,
                        paddingBottom: 10,
                        paddingLeft: 10
                    }}
                />
            </View>
        )
    }

    const lineCharts = [
        {
            heading: "Weight",
            data: weightData,
            color: (opacity = 1) => `rgba(208, 253, 62, ${opacity})`,
            yAxisLabel: "",
            yAxisSuffix: " kg",
            chartConfig: {
                backgroundColor: "black",
                backgroundGradientFrom: "black",
                backgroundGradientTo: "black",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#D0FD3E"
                }
            }
        },
        {
            heading: "Workout Duration",
            data: durationData,
            color: (opacity = 1) => `rgba(255, 36, 36, ${opacity})`,

            yAxisLabel: "",
            yAxisSuffix: " min",
            chartConfig: {
                backgroundColor: "black",
                backgroundGradientFrom: "black",
                backgroundGradientTo: "black",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#FF2424"
                }
            }
        },
        {
            heading: "Workout Intensity",
            data: intensityData,
            color: (opacity = 1) => `rgba(231, 147, 50, ${opacity})`,

            yAxisLabel: "",
            yAxisSuffix: "",
            chartConfig: {
                backgroundColor: "black",
                backgroundGradientFrom: "black",
                backgroundGradientTo: "black",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#E79332"
                },
                formatYLabel: value => {
                    switch (value) {
                        case 1:
                            return "Low"
                        case 5:
                            return "Mid"
                        case 10:
                            return "High"
                        default:
                            return "";
                    }
                }
            }
        }
    ]

    const getAnalytics = async () => {
        setWeightData([])
        setDurationData([])
        setIntensityData([])
        try {
            const { accessToken } = JSON.parse(await getItemAsync('user'));
            const res = await serverRequest({
                method: "get",
                url: "/analytics",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            const weight = []
            const duration = []
            const instensity = []
            for (let i = 0; i < res.data.length; i++) {
                // setWeightData(prev => [...prev, res.data[i].currentWeight])
                // setDurationData(prev => [...prev, res.data[i].duration])
                // setIntensityData(prev => [...prev, res.data[i].intensity])

                weight.push(res.data[i].currentWeight)
                duration.push(res.data[i].duration)
                instensity.push(res.data[i].intensity)
            }
            setWeightData([...weight])
            setDurationData([...duration])
            setIntensityData([...instensity])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAnalytics()
    }, [])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {(weightData.length > 0 && durationData.length > 0 && intensityData.length > 0) ? (<>
                    <View style={styles.header}>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={handleLeftArrowPress}>
                            <MaterialIcons name="keyboard-arrow-left" size={30} color="white" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <Text style={styles.heading}>{formattedDate}</Text>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={handleRightArrowPress}>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="white" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.ellipseContainer}>
                        {generateOvalContainers()}
                    </View>

                    <FlatList
                        data={lineCharts}
                        renderItem={renderLineChart}
                        keyExtractor={(item, index) => index.toString()}
                        vertical
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                </>) : (
                    <Text style={styles.noDataText}>No data available</Text>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 0,
        paddingTop: 0
    },
    header: {
        height: 180,
        backgroundColor: "#2C2C2E",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        flexDirection: "row",
        alignItems: "left",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    heading: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        top: 20
    },
    ellipseContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: -80,
    },
    ellipse: {
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        marginHorizontal: 10,
        width: 50,
        height: 70,
    },
    selectedEllipse: {
        backgroundColor: "#59A5D8"
    },
    unselectedEllipse: {
        backgroundColor: "#3A3A3C",
    },
    optionText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold"
    },
    selectedOptionText: {
        color: "black"
    },
    noDataText: {
        marginTop: 250,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        top: 20
    }
})