import styled from "@emotion/styled";
import Chart from "./components/Chart";
import Search from "./components/Search";
import "./App.css";
const App = () => {
  
	const Container = styled.div`
		width: 80vw;
		height: 65vh;
		display: inline-flex;
		justify-content: space-around;
		flex-direction: column;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		align-items: center;
	`;

	return (
		<Container>
			<Search />
			<Chart />
		</Container>
	);
};

export default App;
