/*eslint-disable*/
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { globSync } = require('glob')
const ora = require('ora')
const ejs = require('ejs')
const { spawn } = require('child_process')
const inquirer = require('inquirer')
const rootDir = process.cwd()
const upperCamelCase = require('uppercamelcase')
const successLog = (msg) => console.log(chalk.green(msg))
const errorLog = (msg) => console.log(chalk.red(msg))
const log = (msg) => console.log(chalk.blue(msg))
const args = process.argv.slice(2)
const checkExistDir = (dir) => {
  return fs.existsSync(dir)
}
const createComponent = async () => {
  const answer = await inquirer.prompt([
    { name: 'componentName', type: 'input', message: '请输入组件名称' }
  ])
  const spinner = ora('将会在src/components文件夹下创建组件').start()
  log('\n')
  const componentName = upperCamelCase(answer.componentName)
  const className = componentName.toLowerCase()
  if (checkExistDir(`${path.join(rootDir, `src/components/${componentName}`)}`)) {
    spinner.fail(chalk.red('组件已经存在，请重新输入'))
    process.exit()
  } else {
    //创建目录组件
    const files = globSync(path.join(__dirname, 'template/*.ejs'))
    spawn('mkdir', ['-p', `${path.join(rootDir, `src/components/${componentName}`)}`])
    const createTemplate = () => {
      const allPromise = []
      return new Promise((resolve, reject) => {
        files.forEach(async (pathFile) => {
          const content = await fs.readFile(pathFile, 'utf-8')
          const result = ejs.render(content, { componentName: componentName, className: className })

          const newFilePath = pathFile
            .replace('scripts/generateView/template', `src/components/${componentName}`)
            .replace('Index', componentName)
            .replace('.ejs', '')
            .replace('.js', '.vue')
          let promise = await fs.writeFile(newFilePath, result)
          allPromise.push(promise)
          log(chalk.yellow(`write ${newFilePath} successful`))
          if (allPromise.length > 3) {
            // 重写style下面的index.scss 把新创建组件样式加入到样式入口文件
            const indexScssData = fs.readFileSync(
              path.join(rootDir, 'src/styles/index.scss'),
              'utf-8'
            )
            const newScssData = `${indexScssData}\n@import "@/components/${componentName}/style";`
            await fs.writeFile(path.join(rootDir, 'src/styles/index.scss'), newScssData)
            resolve(allPromise)
          }
        })
      })
    }

    createTemplate().then((res) => {
      Promise.all(res).then(() => {
        spawn('git', ['add', `src/components/${componentName}`])
        spinner.succeed(chalk.green(`${componentName}组件创建成功，并添加到git跟踪`))
      })
    })
  }
}
createComponent()
