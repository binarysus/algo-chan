import chalk from "chalk";

import type { Chalk } from "chalk";

export enum logLevel {
	ALL,
	DEBUG,
	INFO,
	WARN,
	ERROR,
	FATAL,
	NONE
}

export class Logger {
	public logLevel: logLevel = logLevel.NONE;

	private log(input: string, time: boolean, modifier: string, colorFn: Chalk) {
		let timeString;
		if (time) {
			timeString = `: ${new Date().toLocaleTimeString()}`;
		} else {
			timeString = "";
		}
		console.log(colorFn(`[ ${modifier}${timeString} ] ${input}`));
	}

	public debug(input: string, time = true) {
		if (this.logLevel > logLevel.DEBUG) return;
		this.log(input, time, "DEBUG", chalk.yellow);
	}

	public info(input: string, time = true) {
		if (this.logLevel > logLevel.INFO) return;
		this.log(input, time, "INFO", chalk.green);
	}

	public warn(input: string, time = true) {
		if (this.logLevel > logLevel.WARN) return;
		this.log(input, time, "WARN", chalk.hex("#FC7F03"));
	}

	public error(input: string, time = true) {
		if (this.logLevel > logLevel.ERROR) return;
		this.log(input, time, "ERR", chalk.red);
	}

	public fatal(input: string, time = true) {
		if (this.logLevel > logLevel.FATAL) return;
		this.log(input, time, "FATAL", chalk.bgRedBright.black);
	}
}
