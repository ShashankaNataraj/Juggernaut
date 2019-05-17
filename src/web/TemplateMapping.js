import findFilesDialog from "./templates/find-files-dialog.hbs";
import setProjectRoot from "./templates/set-project-root.hbs";
const mapping = {
	"find-files-dialog": findFilesDialog,
	"set-project-root": setProjectRoot
};
export default class TemplateMapping{
	static getTemplate(key, values){
		if (typeof values !== 'object'){
			throw new Error(`Expected an object for values, got ${values}`);
		}
		if (typeof key !== 'string'){
			throw new Error(`Expected a string for key, got ${key}`);
		}
		const mapEntry = mapping[key];
		if (!mapEntry){
			throw new Error(`No template mapping exists for ${key}`);
		}
		return mapEntry(values);
	}
};