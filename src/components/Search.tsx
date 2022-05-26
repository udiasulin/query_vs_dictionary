import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import store from "../store";

const SearchContainer = styled.div`
	width: 25rem;
	height: 2rem;
	border: 1px solid gray;
	border-radius: 25px;
	font-size: 15px;
	padding: 2px 4px;
	display: flex;
	justify-content: space-between;
	background-color: white;
`;
const IconContainer = styled.div`
	padding: 5px;
	color: black;
`;

const SearchInput = styled.input`
	width: 25rem;
	height: 2rem;
	border: none;
	border-radius: 25px;
	fontsize: 15px;
	padding-left: 10px;
	&:focus {
		outline: none;
	}
`;

const Search = () => {
	const [query, setQuery] = useState("");

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
				store.userText.text = query;
		}, 100);
		return () => clearTimeout(delayDebounce);
	}, [query]);

	return (
		<SearchContainer>
			<SearchInput
				placeholder="Enter some letter"
				type={"search"}
				onChange={(e) => {
					setQuery(e.target.value);
				}}
			/>
			<IconContainer>
				<FontAwesomeIcon icon={faMagnifyingGlass} size={"lg"} />
			</IconContainer>
		</SearchContainer>
	);
};

export default observer(Search);
