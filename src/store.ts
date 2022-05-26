import axios from "axios";
import { makeAutoObservable } from "mobx";

export interface Data {
	word: string;
	score: number;
}

export interface Query {
	text: string;
}

class Store {
	results: Array<Data[]> = [];
	userText: Query = {
		text: "",
	};

	constructor() {
		makeAutoObservable(this);
	}
	reset() {
		this.results = [];
	}
  
	load(urls: string[]) {
		axios.all(urls.map((url) => axios.get(url))).then((res) => {
			res.map((results) => {
				if (store.results.length <= 4) {
					return store.results.push(results.data);
				} else {
					return this.results;
				}
			});
		});
	}
}

const store = new Store();

export default store;
