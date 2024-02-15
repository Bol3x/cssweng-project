//todo: file-type only supports ESM, but it's being hard to implement
//file-type allows us to check the 'magic number' on the file header, so it's more secure in preventing malicious file extension switches

import {fileTypeFromFile} from 'file-type';

export default async function validateUpload(path: any, whitelist: Array<string>){
	const file_type = await fileTypeFromFile(path)

	//@ts-ignore
	if (whitelist.indexOf(file_type?.mime) == -1){
		throw new Error("Filetype not allowed.")
	}
	
	return true;

}