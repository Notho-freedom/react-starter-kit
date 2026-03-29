import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();
const routesRoot = path.join(repoRoot, "src", "openride", "routes");

function listFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

describe("OpenRide structure", () => {
  it("keeps one Page.tsx entry per route folder", () => {
    const routeDirs = fs
      .readdirSync(routesRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const routeDir of routeDirs) {
      expect(fs.existsSync(path.join(routesRoot, routeDir, "Page.tsx"))).toBe(true);
      expect(fs.existsSync(path.join(routesRoot, routeDir, "index.ts"))).toBe(true);
    }
  });

  it("does not keep generated inline icon markup in route components", () => {
    const routeFiles = listFiles(routesRoot).filter((file) => file.endsWith(".tsx"));
    const patterns = ['className="missing"', "svg-inline--fa", "data-fa-i2svg"];

    for (const file of routeFiles) {
      const content = fs.readFileSync(file, "utf8");
      for (const pattern of patterns) {
        expect(content).not.toContain(pattern);
      }
    }
  });

  it("removes the legacy generated layer", () => {
    expect(fs.existsSync(path.join(repoRoot, "src", "openride", "generated"))).toBe(false);
    expect(fs.existsSync(path.join(repoRoot, "src", "openride", "pages"))).toBe(false);
  });
});
