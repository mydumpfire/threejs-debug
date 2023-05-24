import * as esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["src/main.ts", "src/index.html"],
	bundle: true,
	minify: true,
	outdir: "dist",
	loader: {
		".png": "file",
		".jpg": "file",
		".html": "copy",
	},
	assetNames: "static/[name]-[hash]",
	logLevel: "info",
});
