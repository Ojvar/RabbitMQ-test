import { basename, extname, resolve } from "path";

import Glob from "glob";
import { Request } from "express";

/**
 * Global methods
 */
export class GlobalMethods {
    private logger: Console = console;

    /**
     * Constructor
     * @param logger {Console} logger
     */
    constructor(logger: Console) {
        this.logger = logger;
    }

    /**
     * Check for RequestType
     * @param req Express.Request The request
     */
    public static getRequestType(req: Request): string | boolean {
        return req.accepts(["html", "json"]);
    }

    /**
     * Is in production mode
     */
    public static isProductionMode(): boolean {
        return process.env.NODE_ENV == "production";
    }

    /**
     * Return root-relative path
     * @param path string[]
     */
    public static rPath(...path: string[]) {
        return resolve(...path);
    }

    /**
     * Return files list of a directory
     * @param path string[]
     */
    public static files(path: string, pattern: string = "**/*"): string[] {
        pattern = path + "/" + pattern;

        return Glob.sync(pattern);
    }

    /**
     * Import an specified file
     * @param path string
     */
    public static async importFile(path: string): Promise<any> {
        path = this.rPath(path);

        return await import(path);
    }

    /**
     * Exteact basename of a path
     * @param path string
     */
    public static baseName(path: string, useExt: boolean = true): string {
        let ext = extname(path);
        let fileName = path;

        if (useExt) {
            ext = "";
        }

        return basename(fileName, ext);
    }
}