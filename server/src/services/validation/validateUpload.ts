//todo: file-type only supports ESM, but it's being hard to implement
//file-type allows us to check the 'magic number' on the file header, so it's more secure in preventing malicious file extension switches
import fileType from "file-type";

export default async function validateUpload(path: any, whitelist: any){
	const meta = await fileType.fromFile(path)
}