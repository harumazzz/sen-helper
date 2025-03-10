import * as vscode from 'vscode';
import * as path from 'path';
import { replaceWithConfig } from '../configUtils';
import { isSenPathExists } from './senValidation';
import { SenLauncherType } from '@/types';
import * as fs from 'fs';
import { showMessage } from '../vscode';

export function getSenPath(): string | undefined {
	return vscode.workspace.getConfiguration('sen-helper').get('path.sen');
}

export function getSenGuiPath(): string | undefined {
	const senPath = getSenPath();

	if (!isSenPathExists() || !senPath) {
		return undefined;
	}

	const config: string | undefined = vscode.workspace
		.getConfiguration('sen-helper')
		.get('path.sui');

	if (!config) {
		return undefined;
	}

	return replaceWithConfig(config);
}

export function getLauncherPath(): string | null {
	const senPath = getSenPath();

	if (!isSenPathExists() || !senPath) {
		return null;
	}

	const config: string | undefined = vscode.workspace
		.getConfiguration('sen-helper')
		.get('advanced.launcher');
	if (!config) {
		return null;
	}

	const launcherExecutable = `${config}.exe`;
	return path.join(senPath, launcherExecutable);
}

export function getLauncherLibraries(): string[] | 'none' | null {
	const senPath = getSenPath();

	if (!isSenPathExists() || !senPath) {
		return null;
	}

	const config: string | undefined = vscode.workspace
		.getConfiguration('sen-helper')
		.get('advanced.launcher');
	if (!config) {
		return null;
	}

	if (config === SenLauncherType.Launcher) {
		return 'none';
	}

	const kernelPath = path.join(senPath, 'Kernel.dll');
	const scriptPath = path.join(senPath, 'script');
	const mainScriptPath = path.join(scriptPath, 'main.js');

	if (!fs.existsSync(kernelPath) && config === SenLauncherType.Shell) {
		showMessage(`Missing Kernel.dll at ${senPath}`, 'error');
		return null;
	}

	if (
		(!fs.existsSync(scriptPath) || !fs.existsSync(mainScriptPath)) &&
		config === SenLauncherType.Shell
	) {
		showMessage(`Missing script folder or main.js at ${senPath}`, 'error');
		return null;
	}

	return [kernelPath, mainScriptPath];
}
