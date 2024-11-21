const fs = require("fs");
const path = require("path");
const yamljs = require("yamljs");

const yamlData = fs.readFileSync("./manual_schema.yaml", "utf8");
const data = yamljs.parse(yamlData);

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

// Templates
const tableInputs = `| Inlet | Values | Comments |  
| --- | --- | --- |
| Play Trigger | Trigger | Manually trigger or use clock |`;

const tableOutputs = `| Outlet | Values | Comments |  
| --- | --- | --- |
| Audio Output L | -1, 1 | left audio output |`;

// const genericContent = `---\nsidebar_label: "{name}"\nsidebar_position: {index}\n---\n\n# {name}\n\nThis is the description of the {name} file.\n\n## Inlets\n\n{tableInputs}\n\n## Outlets\n\n{tableOutputs}\n\n## Parameters\n\n- param1\n- param2\n- param3`;

function generateFilesAndFolders(
  data,
  currentPath = path.join(__dirname, "build")
) {
  // Clear the contents of the build folder first
  if (fs.existsSync(currentPath)) {
    fs.readdirSync(currentPath).forEach((file) => {
      const filePath = `${currentPath}/${file}`;
      fs.rmSync(filePath, { recursive: true });
    });
  }

  data.forEach((item, index) => {
    if (item.type === "folder") {
      const folderName = slugify(item.name);
      const folderPath = path.join(currentPath, folderName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      if (item.contents) {
        generateFilesAndFolders(item.contents, folderPath); // Recursive call
      }
    } else if (item.type === "markdown") {
      const fileName = slugify(item.name);
      const filePath = path.join(currentPath, `${fileName}.md`);
      // tailor the content
      const genericContent = `---\nsidebar_label: "{name}"\nsidebar_position: {index}\n---\n\n# {name}\n\n${
        item.description || "This is the description of the {name} file."
      }\n\n## Inlets\n\n{tableInputs}\n\n## Outlets\n\n{tableOutputs}\n\n## Parameters\n\n- param1\n- param2\n- param3`;
      // create the file content
      const content = genericContent
        .replace(/\{name}/g, item.name)
        .replace(/\{index}/g, index)
        .replace(/\{tableInputs}/g, tableInputs)
        .replace(/\{tableOutputs}/g, tableOutputs);

      fs.writeFileSync(filePath, content);
    }
  });
}

generateFilesAndFolders(data);
