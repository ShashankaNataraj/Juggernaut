import findFilesDialog from "./templates/find-files-dialog.hbs";
const mapping = {
	"find-files-dialog": findFilesDialog
};
export default class TemplateMapping{
	static getTemplate(key, values){
		if (typeof values !== 'object'){
			throw new Error(`Expected an object for values, got ${values}`);
			return false;
		}
		if (typeof key !== 'string'){
			throw new Error(`Expected a string for key, got ${key}`);
		}
		const mapEntry = mapping[key];
		if (!mapEntry || typeof mapEntry!=='string'){
			throw new Error(`No template mapping exists for ${key}`);
		}
		return mapEntry(values);
	}
};