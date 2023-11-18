/*eslint-disable*/
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const rootDir = process.cwd()
const upperCamelCase = require('uppercamelcase')
console.log(rootDir, '目录')
const successLog = (msg) => console.log(chalk.green(msg))
const errorLog = (msg) => console.log(chalk.red(msg))
const log = (msg) => console.log(chalk.blue(msg))
const { createComponent } = require('./template')
const args = process.argv.slice(2)
console.log(args, '$$$')
const checkExistDir = (dir) => {
  return fs.existsSync(dir)
}
const spinner = ora('将会在src/components文件夹下创建组件').start()

const componentName = upperCamelCase(args[0])
log(fs.readFileSync('scripts/generateView/template.js'))

/*
if (checkExistDir(`${path.join(rootDir, `src/components/${componentName}`)}`)) {
  errorLog('组件已经存在，请重新输入')
  process.exit()
} else {
  fs.mkdir(`${rootDir}/src/components/${componentName}`, (err) => {
    if (!err) {
      fs.writeFile(
        `${rootDir}/src/components/${componentName}/${componentName}.vue`,
        createComponent(`${componentName}`),
        (err, data) => {
          if (err) {
            errorLog(err)
          } else {
            successLog(`${rootDir}/src/components/${componentName}/${componentName}.vue`)
          }
        }
      )
    }
  })
}
*/
