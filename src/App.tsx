import React, { useState } from 'react';
import './assets/index.css';
import axios from 'axios';

const API_KEY: string = 'https://api.datamuse.com/words?rel_syn=';

interface SynonymProps {
	word: string;
}

const App: React.FC = () => {
	const [word, setWord] = useState<string>('');
	const [data, fetchedData] = useState<string[]>([]);

	function fetchData(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		axios
			.get<SynonymProps[]>(API_KEY + word)
			.then(res => {
				const fData = res.data.map(item => item.word);
				fetchedData(fData);
			})
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<div className="container flex flex-col mx-auto">
			<div className="header text-2xl font-bold text-center my-4">
				Synonyms
			</div>
			<form onSubmit={fetchData} className="flex flex-col items-center">
				<label className="mb-2">Find the synonym of word:</label>
				<input
					type="text"
					onChange={e => {
						setWord(e.target.value);
					}}
					value={word}
					className="border-2 border-gray-300 rounded p-2 mb-4"
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Submit
				</button>
			</form>
			<ul className="items flex-1 list-none list-disc hover: list-disc grid grid-cols-3 gap4">
				{data.map((item, idx) => (
					<li
						key={item + idx}
						className="flex justify-center items-center py-1"
					>
						{item}
					</li>
				))}
			</ul>
			<div className="footer text-center py-4 border-t mt-4">Footer</div>
		</div>
	);
};

export default App;
