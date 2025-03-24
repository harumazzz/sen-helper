import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { ProjectConfig, textureCategory } from '@/types';
import { readJsonFromConfig, writeJson } from '../file';
import { showError, showQuickPick, showWarning } from '../vscode';
import { assert_if } from '@/error';

export function initializeProjectConfig(
	context: vscode.ExtensionContext,
	projectName: string,
	projectPath: string,
	obbName: string,
) {
	const configPath = path.join(projectPath, 'config.json');
	const defaultConfig: ProjectConfig | null = readJsonFromConfig(
		context,
		'sen-helper.obb.androidInitProject.json',
	);

	if (!defaultConfig) {
		fs.rm(
			projectPath,
			{
				recursive: true,
				force: true,
			},
			() => null,
		);
		return null;
	}

	defaultConfig.obbName = obbName;
	defaultConfig.projectName = projectName;
	defaultConfig.option.textureCategory = textureCategory.Android;

	writeJson(configPath, defaultConfig);

	return true;
}

export async function selectAndGetTextureCategory() {
	const categories = Object.keys(textureCategory).map((key) => ({
		label: key,
	}));

	return await vscode.window
		.showQuickPick(categories, {
			placeHolder: 'Select an Option for configuration',
		})
		.then((value) => {
			const key = value?.label ?? 'Android';

			return textureCategory[key as keyof typeof textureCategory];
		});
}

export async function selectObbBundleFolder(parentFolder: string): Promise<string> {
	return new Promise((resolve, reject) => {
		// Read directories inside parentFolder
		fs.readdir(parentFolder, { withFileTypes: true }, async (err, files) => {
			if (err) {
				showError(`Failed to read directory: ${err.message}`);
				reject(err);
				return;
			}

			// Filter folders ending with .obb.bundle
			const obbBundles = files
				.filter((dirent) => dirent.isDirectory() && dirent.name.endsWith('.obb.bundle'))
				.map((dirent) => ({
					label: dirent.name,
					description: path.join(parentFolder, dirent.name),
				}));

			if (obbBundles.length === 0) {
				showWarning('Unpacked obb is not found.');
				showWarning(
					'Did you rename the unpacked obb? or unpacked obb never exists in the first place?',
				);
				reject('Unallowed operation');
			}

			const selected = await showQuickPick(obbBundles, {
				placeHolder: 'Select OBB to be packed',
			});
			if (selected === undefined) {
				reject('You have not selected any file!');
			}
			resolve(selected!.description); // Return full path if selected
		});
	});
}
