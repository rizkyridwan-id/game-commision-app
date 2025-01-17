import fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const { argv } = yargs(hideBin(process.argv));

class UpdateVersion {
  main() {
    const buildProperties = this._readFileBuildProperties();
    const newVersion = this._assignVersion(buildProperties, argv);

    fs.writeFileSync(
      "./src/config/metadaata.json",
      JSON.stringify({ buildVersion: newVersion }, null, 4),
      "utf-8"
    );
    this._logSuccess(newVersion);
  }

  _logSuccess(newVersion) {
    console.log(
      "New Version Generated:",
      `${newVersion.major}.${newVersion.minor}.${newVersion.patch}.${newVersion.revision}`
    );
  }

  _readFileBuildProperties() {
    try {
      const buildPropertiesBytes = fs.readFileSync(
        "./src/config/metadaata.json",
        "utf-8"
      );
      return JSON.parse(buildPropertiesBytes);
    } catch (e) {
      // console.log("[UpdateVersion][_readFieldBuildProperties]", e.message);
      throw new Error("Terdapat kesalahan saat membaca file build properties.");
    }
  }

  _assignVersion(buildProperties, argv) {
    this._validateMajorAndMinorVersion(argv.major, argv.minor);

    const { major, minor, patch, revision } = buildProperties.buildVersion;

    const patchNumber = this._generatePatchNumber(patch, argv);

    const isPatchNumberChanged = patchNumber !== patch;
    const serverNumber = this._generateServerNumber(
      revision,
      isPatchNumberChanged
    );

    return {
      major: String(argv.major || major),
      minor: String(argv.minor || minor),
      patch: String(patchNumber),
      revision: serverNumber,
    };
  }

  _validateMajorAndMinorVersion(major = 0, minor = 0) {
    if (typeof major !== "number" || typeof minor !== "number")
      throw new Error(
        "Please provide minor and major version! do not leave it empty!"
      );
  }

  _generateDateVersion() {
    return new Date().toISOString().split("T")[0].replace(/-/g, "").slice(2);
  }

  _generatePatchNumber(patch, argv) {
    return argv.major || argv.minor ? 0 : !argv.patch ? patch : +patch + 1;
  }

  _generateServerNumber(revision, isPatchNumberChanged) {
    const propertiesDate = revision.slice(0, -2) || this._generateDateVersion();
    const propertiesCounter = +revision.slice(-2) || 0;
    const currentServerDate = this._generateDateVersion();
    const newServerCounter =
      propertiesDate === currentServerDate ? propertiesCounter + 1 : 1;

    return isPatchNumberChanged
      ? currentServerDate + "01"
      : currentServerDate + String(newServerCounter).padStart(2, "0");
  }
}

try {
  new UpdateVersion().main();
} catch (err) {
  console.log(err.message);
}
