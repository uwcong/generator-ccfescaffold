'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = generators.extend({
    /**
     * 生命周期：
     *  initializing
     *  prompting
     *  configuring
     *  default
     *  writing
     *  conflicts
     *  install
     *  end
     * 
     */

    // 初始化阶段
    initializing: function() {
        this.log('initializing');
        this.log(this.sourceRoot());
        this.log(this.templatePath('app'));
        this.log(this.destinationPath('app'));
    },

    // 接受用户输入阶段
    prompting: function() {
        this.log('prompting');
        var done = this.async(); // 延迟执行：当处理完用户输入需要进入下一个生命周期阶段时必须调用这个方法
        this.log(yosay('Welcome to the groundbreaking ' + chalk.red('ccfescaffold') + ' generator!'));

        this.prompt([{
                type: 'input',
                name: 'name',
                message: 'name of app:',
                default: path.basename(process.cwd())
            },
            {
                type: 'input',
                name: 'description',
                message: 'description:',
                default: ''
            },
            {
                type: 'input',
                name: 'author',
                message: 'author:',
                default: ''
            },
            {
                type: 'input',
                name: 'repo',
                message: 'git repository:',
                default: ''
            },
            {
                type: 'input',
                name: 'license',
                message: 'license:',
                default: 'MIT'
            },
        ]).then(function(output) {
            this.props = output;
            this.log(this.props);
            done(); // 进入下一个生命周期阶段
        }.bind(this));
    },

    // 保存配置信息和文件
    configuring: function() {
        this.log('configuring');
    },

    // 非特定的功能函数名称，其他方法都会在这里按顺序统一调用
    customMethod1: function() {
        this.log('customMethod1');
    },
    default: function() {
        this.log('default');
    },
    customMethod2: function() {
        this.log('customMethod2');
    },

    // 生成项目目录结构阶段
    writing: function() {
        this.log('writing');
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this.props
        );
        this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );
        this.fs.copy(
            this.templatePath('app'),
            this.destinationPath('app')
        );
    },

    // 统一处理冲突，如要生成的文件已经存在是否覆盖等处理
    conflicts: function() {
        this.log('conflicts');
    },

    // 安装依赖阶段
    install: function() {
        this.log('install');
        var done = this.async();
        this.spawnCommand('npm', ['install -d']) //安装项目依赖
            .on('exit', function(code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
    },

    // 生成器即将结束
    end: function() {
        this.log('end');
        var done = this.async();
        this.log(yosay(
                'Your app has been created successfully!'
            )).on('exit', function(code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
    }
});