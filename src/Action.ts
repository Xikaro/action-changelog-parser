import { ChangelogEntry } from "./Changelog";
import { ChangelogReader } from "./ChangelogReader";
import { ChangelogParser } from "./ChangelogParser";

export interface ActionResult {
  entry: ChangelogEntry | undefined;
  lastEntry: ChangelogEntry | undefined;
}

export class Action {
  constructor(private readonly basedir: string = "./") {}

  async run(
    version?: string | undefined,
    path?: string | undefined
  ): Promise<ActionResult> {
    const changelogContent = await new ChangelogReader(this.basedir)
      .readChangelog(path);
    const changelog = ChangelogParser.parseChangelog(changelogContent);
    const entry = version !== undefined
      ? changelog.getByVersion(version)
      : changelog.getLatestVersion();
    const lastEntry = changelog.getLastEntry();
    return { entry, lastEntry };
  }
}
