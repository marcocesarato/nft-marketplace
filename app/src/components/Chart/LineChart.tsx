import dynamic from "next/dynamic";
import {ApexOptions} from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});
const chartOptions: ApexOptions = {
	chart: {
		toolbar: {
			show: false,
		},
	},
	tooltip: {
		theme: "dark",
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "smooth",
	},
	xaxis: {
		categories: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		labels: {
			style: {
				colors: "#718096",
				fontSize: "12px",
			},
		},
	},
	yaxis: {
		labels: {
			style: {
				colors: "#718096",
				fontSize: "12px",
			},
		},
	},
	legend: {
		show: false,
	},
	grid: {
		strokeDashArray: 5,
	},
	fill: {
		type: "gradient",
		gradient: {
			shade: "light",
			type: "vertical",
			shadeIntensity: 0.5,
			gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
			inverseColors: true,
			opacityFrom: 1,
			opacityTo: 0.3,
			stops: [],
		},
		colors: ["#4FD1C5", "#2C7A7B"],
	},
	colors: ["#4FD1C5", "#2C7A7B"],
};

export default function LineChart({chartData}): JSX.Element {
	return (
		<>
			{/* @ts-ignore */}
			<ReactApexChart
				options={chartOptions}
				series={chartData}
				type="line"
				height={250}
				width="100%"
			/>
		</>
	);
}
