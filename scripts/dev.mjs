import * as esbuild from "esbuild";

const ctx = await esbuild.context({
	entryPoints: ["src/index.html", "src/style.css", "src/main.ts"],
	bundle: true,
	outdir: "public",
	loader: {
		".png": "file",
		".jpg": "file",
		".html": "copy",
	},
	assetNames: "static/[name]-[hash]",
	logLevel: "info",
	color: true,
	banner: {
		js: 'new EventSource("/esbuild").addEventListener("change", () => location.reload());',
	},
});

await ctx.watch();
await ctx.serve();
