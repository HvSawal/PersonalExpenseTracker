import Header from '@/components/Header';
import Loading from '@/components/Loading';
import ScreenWrapper from '@/components/ScreenWrapper';
import TransactionList from '@/components/TransactionList';
import { colors, radius, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { fetchMonthlyStats, fetchWeeklyStats, fetchYearlyStats } from '@/services/transactionService';
import { scale, verticalScale } from '@/utils/styling';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";



const Statistics = () => {

	const { user } = useAuth();
	const [activeIndex, setActiveIndex] = useState(0);
	const [chartData, setChartData] = useState([]);
	const [chartLoading, setChartLoading] = useState(false);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		if(activeIndex == 0){
			getWeeklyStats();
		}
		if(activeIndex == 1){
			getMonthlyStats();
		}
		if(activeIndex == 2){
			getYearlyStats();
		}
	}, [activeIndex]);

	const getWeeklyStats = async () => {
		//get weekly stats
		setChartLoading(true);
		let response = await fetchWeeklyStats(user?.uid as string);
		setChartLoading(false);
		if(response.success){
			setChartData(response?.data?.stats);
			setTransactions(response?.data?.transactions);
		} else {
			Alert.alert("error", response.msg);
		}
	}
	const getMonthlyStats = async () => {
		//get weekly stats
		setChartLoading(true);
		let response = await fetchMonthlyStats(user?.uid as string);
		setChartLoading(false);
		if(response.success){
			setChartData(response?.data?.stats);
			setTransactions(response?.data?.transactions);
		} else {
			Alert.alert("error", response.msg);
		}
	}
	const getYearlyStats = async () => {
		//get weekly stats
		setChartLoading(true);
		let response = await fetchYearlyStats(user?.uid as string);
		setChartLoading(false);
		if(response.success){
			setChartData(response?.data?.stats);
			setTransactions(response?.data?.transactions);
		} else {
			Alert.alert("error", response.msg);
		}
	}


	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<View style={styles.header}>
					<Header title='Statistics'></Header>
				</View>

				<ScrollView contentContainerStyle={{
						gap: spacingY._20,
						paddingTop: spacingY._5,
						paddingBottom: verticalScale(100),
					}} 
					showsVerticalScrollIndicator={false}
				>
					<SegmentedControl
						values={['Weekly', 'Monthly', 'Yearly']}
						selectedIndex={activeIndex}
						onChange={(event) => {
							setActiveIndex(event.nativeEvent.selectedSegmentIndex);
    					}}
						tintColor={colors.neutral200}
						backgroundColor={colors.neutral800}
						appearance='dark'
						activeFontStyle={styles.segmentFontStyle}
						style={styles.segmentStyle}
						fontStyle={{...styles.segmentFontStyle, color: colors.white}}
					/>

					<View style={styles.chartContainer}>
						{
							chartData.length > 0 ? (
								<BarChart 
									data={chartData}
									barWidth={scale(12)}
									spacing={[1,2].includes(activeIndex) ? scale(25) : scale(15)}
									roundedTop
									roundedBottom
									hideRules
									yAxisLabelPrefix='$'
									yAxisThickness={0}
									xAxisThickness={0}
									yAxisLabelWidth={[1,2].includes(activeIndex) ? scale(35) : scale(38)}
									//hideYAxisText
									yAxisTextStyle={{color: colors.neutral350}}
									xAxisLabelTextStyle={{color: colors.neutral350, fontSize: verticalScale(12)}}
									noOfSections={5}
									minHeight={5}
									//maxValue={100}
									//isAnimated={true}
									//animationDuration={1000}
								/>
							) : (
								<View style={styles.noChart}></View>
							)
						}

						{
							chartLoading && (
								<View style={styles.chartLoadingContainer}>
									<Loading color={colors.white} />
								</View>
							)
						}
					</View>
					{/* Transactions */}
					<View>
						<TransactionList 
							title='Transactions'
							emptyListMessage='No Transactions found'
							data={transactions}
						>
						</TransactionList>

					</View>
				</ScrollView>

			</View>
		</ScreenWrapper>
	)
}

export default Statistics;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacingY._20,
		paddingVertical: spacingY._5,
		gap: spacingY._10,
	},
	chartContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center'
	},
	chartLoadingContainer: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		borderRadius: radius._12,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	header: {},
	noChart: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		height: verticalScale(210),
	},
	searchIcon: {
		backgroundColor: colors.neutral700,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		height: verticalScale(35),
		width: verticalScale(35),
		borderCurve: 'continuous'
	},
	segmentStyle:{
		height: scale(37),
	},
	segmentFontStyle: {
		fontSize: verticalScale(13),
		fontWeight: 'bold',
		color: colors.black,
	},
})