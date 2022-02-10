# 命令
## 设置 uername 和 useremail
git config  --global user.name 你的目标用户名；
git config  --global user.email 你的目标邮箱名;

## 新建一个分支并切换
git branch 新分支
git checkout 新分支

## 快速查找开源项目
| 公式   | 功能  |
|             :---:      |             :---:          |
| in:name spring boot   | 开源项目的标题里会带有 spring boot |
| in:name spring boot stars:>3000        | 收藏人数大于 300       | 
| in:readme spring boot stars:>3000 |     readme 里带有 spring boot    |
|in:description 微服务 language:JavaScript pushed:>2019-09-03       |  描述里面有“微服务”，且使用的编程语言是JavaScript，pushed是更新时间       |