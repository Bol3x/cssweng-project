/**
 * @file exportToCSV.ts
 * @description code to convert a JSON array into CSV for exporting to the user
 */

import fs from "fs";
import path from "path";

const __dirname = path.resolve(path.dirname(''));

export default (arr: any, filename: string) =>{

	const array = [Object.keys(arr[0])].concat(arr);

	let csv = array.map(it => {
		return Object.values(it).toString()
	}).join("\n");

	let date_created : String = new Date().toISOString().replace(/:./g, '_');

	let ext_filename = './logs/'+filename+'_'+date_created+'.csv';

	fs.writeFile(ext_filename, 
		csv, 
		{flag: 'w'}, 
		(err) => {
			if (err){
				console.log(err)
				throw new Error("an issue occured while writing the log - please check")
			}
			console.log("wrote file to /logs.")
		})

	return ext_filename;
}