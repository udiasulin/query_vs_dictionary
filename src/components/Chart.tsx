import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import store from "../store";
import { useEffect } from "react";
import { toJS } from "mobx";
import e from "express";

const Chart = () => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const { text } = store.userText;

	const ChartContainer = styled.div`
		height: 35rem;
		width: 35rem;
	`;

	const loadData = (query: string) => {
		const urls = [
			`https://api.datamuse.com/words?sp=${query}*&max=10000`,
			`https://api.datamuse.com/words?sp=*${query}&max=10000`,
			`https://api.datamuse.com/words?sp=*${query}${query}*&max=10000`,
			`https://api.datamuse.com/words?sp=*${query}*&max=10000`,
		];
		store.load(urls);
	};

	useEffect(() => {
		if (store.userText.text !== "") {
			loadData(store.userText.text);
		} else {
			store.reset();
		}
	}, [text]);

	if (store.results.length !== 0) {
		return (
			<ChartContainer>
				<Doughnut
					data={{
						labels: [
							`Words start with ${text}`,
							`Words end with ${text}`,
							`how many times ${text} is in conjunction`,
							`how many times the letter ${text} appear`,
						],
						datasets: [
							{
								data: [
									store.results[0].length,
									store.results[1].length,
									store.results[2].length,
									store.results[3].length,
								],
								backgroundColor: [
									"#58a55c",
									"#f1be42",
									"#5185ec",
									"#d85140",
								],
								hoverOffset: 6,
								borderColor: "rgba(36,36,36,255)",
							},
						],
					}}
					options={{
						plugins: {
							legend: {
								labels: {
									color: "white",
									font: {
										size: 14,
									},
									padding: 15,
									boxWidth: 35,
								},
								position: "right",
							},
						},
					}}
				/>
			</ChartContainer>
		);
	} else {
		return <ChartContainer></ChartContainer>;
	}
};

export default observer(Chart);
