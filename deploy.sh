#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入 dist 文件夹
cd dist

# 添加 git 信息
git init
git add -A
git commit -m 'deploy'

# Gitee
git push -f git@gitee.com:LuckRain/webhooks-code-generator.git master

# GitHub
git push -f git@github.com:LuckRain7/webhooks-code-generator.git master:gh-pages

cd -