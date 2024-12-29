import * as React from "react";
import { useEffect, useState } from "react";
import { App, TFile } from "obsidian";

import Plugin from "../main";
import { RootView } from "./root-view";

const MAX_FILES = 200;
const SUPPORTED_EXTENSIONS = ["md", "txt"];
const OPEN_IN_NEW_TAB = true;

/*
 * TODO
 * Render selected file (if any)
 * For each file, load its preview
 * Render last change date/time
 * * For today: only the time
 * * Yesterday
 * * prev week - show day name
 * * full date
 * When list of files changes, update that
 * When file contents change, update file preview
 * Render parent folder name (and a folder icon)
 */


export const FileListView = ({
	rootView,
}: {
	rootView: RootView;
}) => {
	const app: App = rootView.app;
	const plugin: Plugin = rootView.plugin;
	// Only take last 200 files
	const listOfFiles = app.vault.getFiles().sort((a, b) => {
		return b.stat.mtime - a.stat.mtime;
	}).filter((file) => SUPPORTED_EXTENSIONS.includes(file.extension)).slice(0, MAX_FILES);



  return (
		<div
			style={{
				// margin: `calc(var(--size-4-3) * -1) `,
				margin: `-12px -12px -32px`,
			}}
		>
			{listOfFiles.map((file, index) => {
				return (
					<ItemView
						file={file}
						app={app}
						isSelected={index === 2}
						key={file.path}
					/>
				);
			})}
		</div>
  );
};

const ItemView = ({ file, app, isSelected }: { file: TFile, app: App, isSelected: boolean }) => {
	return (
		<div
			style={{
				display: "block",
				borderBottom: "1px solid var(--nav-indentation-guide-color)",
				padding: "10px 0 10px 0",
				margin: "0 12px",
				...(isSelected
					? {
							backgroundColor:
								"var(--nav-item-background-active)",
							margin: 0,
							padding: "10px 12px 10px 12px",
					  }
					: {}),
			}}
			onClick={() => {
				app.workspace.openLinkText(file.path, "", OPEN_IN_NEW_TAB);
			}}
		>
			<div
				style={{
					fontWeight: 600,
					fontSize: "var(--font-ui-small)",
					lineClamp: 1,
					overflow: "hidden",
					WebkitLineClamp: 1,
					display: "-webkit-box",
					WebkitBoxOrient: "vertical",
				}}
			>
				{file.basename}
			</div>
			<div
				style={{
					display: "flex",
					fontSize: "var(--font-ui-smaller)",
					lineClamp: 1,
					overflow: "hidden",
				}}
			>
				<div style={{margin: "0 8px 0 0"}}>00:00</div>
				<div style={{ color: "var(--text-muted)" }}>preview</div>
			</div>
			<div
				style={{
					fontSize: "var(--font-ui-smaller)",
					color: "var(--text-muted)",
					display: "flex",
				}}
			>
				<Icon />
				folder2
			</div>
		</div>
	);
};

const Icon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="svg-icon lucide-folder-open"
			// style={{width: "16px !important", height: "16px !important"}}
		>
			<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path>
		</svg>
	);
}

    // --font-smallest: 0.8em;
    // --font-smaller: 0.875em;
    // --font-small: 0.933em;
    // --font-ui-smaller: 12px;
    // --font-ui-small: 13px;
    // --font-ui-medium: 15px;
    // --font-ui-large: 20px;