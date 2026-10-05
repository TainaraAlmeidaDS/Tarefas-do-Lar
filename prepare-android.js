// Ajustes do projeto Android gerado pelo Capacitor: ícone de notificação, assinatura fixa e versão.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const app = path.join(root, "android", "app");

fs.mkdirSync(path.join(app, "src/main/res/drawable"), { recursive: true });
fs.copyFileSync(path.join(root, "android-extra/ic_stat_casa.xml"), path.join(app, "src/main/res/drawable/ic_stat_casa.xml"));
fs.copyFileSync(path.join(root, "android-extra/tarefas.keystore"), path.join(app, "tarefas.keystore"));

const gradleFile = path.join(app, "build.gradle");
let g = fs.readFileSync(gradleFile, "utf8");
const run = parseInt(process.env.GITHUB_RUN_NUMBER || "1", 10);
g = g.replace(/versionCode \d+/, `versionCode ${run}`).replace(/versionName "[^"]*"/, `versionName "1.0.${run}"`);
if (!g.includes("signingConfigs")) {
  g = g.replace("    buildTypes {", `    signingConfigs {
        release {
            storeFile file("tarefas.keystore")
            storePassword "tarefasdacasa"
            keyAlias "tarefas"
            keyPassword "tarefasdacasa"
        }
    }
    buildTypes {`);
  g = g.replace("            minifyEnabled false", "            minifyEnabled false\n            signingConfig signingConfigs.release");
}
fs.writeFileSync(gradleFile, g);
console.log("Android pronto: versão 1.0." + run);
