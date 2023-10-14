/*eslint-env node*/
import boxen from 'boxen' // 控制台打印边框样式
const SPECIFY_PM = 'pnpm' // 所指的的依赖包管理工具
// 获取我们传递的参数<[pnpm]>
const argv = process.argv.slice(2)
const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
// 没有传递参数给与提示并终止运行
if(argv.length === 0) {
    console.log(boxen(`请指定项目选择<<<<${SPECIFY_PM}>>>>为包管理器`, boxenOpts))
    process.exit(1) // 退出进程
}

// 我们传递的参数值
const PARAMS_PM = argv[0]

// 乱传参数给与提示并终止运行 或者传入参数不是pnpm
if(PARAMS_PM!==SPECIFY_PM) {
    console.log(boxen(`${PARAMS_PM}不是本项目指定的包管理工具. 本项目包依赖管理工具只能是${SPECIFY_PM}`, boxenOpts))
    process.exit(1)
}

// 当前使用的包管理器
const CURRENT_PM = getCurrentPmByUserAgent(process.env?.npm_config_user_agent).name
// 当前使用的包管理器和我们约束的不一样 抛出一条错误日志并终止运行
if(CURRENT_PM !== SPECIFY_PM) {
    console.error(boxen(`你现在正在使用${CURRENT_PM} 但是本项目请使用 ${SPECIFY_PM}`, boxenOpts))
    process.exit(1)
}

function getCurrentPmByUserAgent(userAgent) {
    if(!userAgent) {
        console.log(boxen('请传入 userAgent', boxenOpts))
    }
    const spec = userAgent.split(' ')[0]
    const [name, version] = spec.split('/')

    return { name, version }
}
