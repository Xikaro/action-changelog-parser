import * as core from '@actions/core';
import { Action, ActionResult } from './Action';

async function run(): Promise<void> {
  const path = core.getInput('path') || undefined;
  const version = core.getInput('version') || undefined;

  core.startGroup('Parse CHANGELOG');
  const result: ActionResult = await new Action().run(version, path);
  const entry = result.entry;
  const lastEntry = result.lastEntry;
  core.info(`Version: "${entry?.version ?? ""}"`);
  core.info(`  Major: "${entry?.versionMajor ?? ""}"`);
  core.info(`  Minor: "${entry?.versionMinor ?? ""}"`);
  core.info(`  Patch: "${entry?.versionPatch ?? ""}"`);
  core.info(`Date: "${entry?.date ?? ""}"`);
  core.info(`Status: "${entry?.status ?? ""}"`);
  core.info(`Description:\n${entry?.description ?? ""}\n`);
  core.info(`LastVersion: "${lastEntry?.version ?? ""}"`);
  core.info(`LastDescription:\n${lastEntry?.description ?? ""}\n`);
  core.endGroup();

  core.setOutput('version', entry?.version ?? "");
  core.setOutput('versionMajor', entry?.versionMajor ?? "");
  core.setOutput('versionMinor', entry?.versionMinor ?? "");
  core.setOutput('versionPatch', entry?.versionPatch ?? "");
  core.setOutput('date', entry?.date ?? "");
  core.setOutput('status', entry?.status ?? "");
  core.setOutput('description', entry?.description ?? "");
  core.setOutput('lastVersion', lastEntry?.version ?? "");
  core.setOutput('lastDescription', lastEntry?.description ?? "");
}

async function main(): Promise<void> {
  try {
    await run();
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
