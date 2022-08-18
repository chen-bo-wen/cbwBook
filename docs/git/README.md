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

## 快速访问 GitHub 网站
[如何快速访问--文档1](https://blog.csdn.net/cyrilcloud/article/details/117233436?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166055065616780366512533%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166055065616780366512533&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-117233436-null-null.142^v40^pc_rank_v36,185^v2^control&utm_term=Github&spm=1018.2226.3001.4187)

[如何快速访问--文档2](https://blog.csdn.net/wh13821662259/article/details/125091516)

[查询网站IP地址](https://ipaddress.com/website/assets-cdn.github.com)

```JavaScript
cd drivers/etc

start hosts

ipconfig/flushdns

ping github.com
```