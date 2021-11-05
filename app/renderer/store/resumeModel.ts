const resumeModel: TSRcReduxModel.Props<TSResume.IntactResume> = {
  namespace: 'resumeModel',
  openSeamlessImmutable: true,
  state: {
    base: {
      avatar:
        'data:image/png;base64,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',
      username: 'xxx',
      area: '海南·海口',
      school: '湖南瞎说大学',
      major: '软件工程',
      degree: '本科',
      hometown: '海南',
      onSchoolTime: {
        beginTime: '2015.09',
        endTime: '2019.06',
      },
    },
    contact: {
      phone: '176****2612',
      email: '1063137960@qq.com',
      github: 'https://github.com/PDKSophia',
      juejin: 'https://juejin.cn/user/1838039171075352',
    },
    work: {
      job: '前端工程师',
      city: '广州｜成都｜海口',
      cityList: ['广州', '成都', '海口'],
    },
    hobby: '篮球、爬山、健身、吉他、街舞',
    skill:
      '熟悉 Vue.js，了解数据双向绑定原理、阅读过 NextTick 源码｜熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码，开发 rc-redux-model 中间件｜阅读过 Antd 部分优秀组件源码，并参考借鉴，开发组内 UI 组件库｜了解 Vscode，开发组内项目辅助工具 vscode-beehive-extension 插件｜了解 Webpack 编译原理，了解 babel 转码原理，编写过 babel 插件｜了解 Electron，了解 Node.js 以及 Git 团队协作开发工具｜了解设计模式，对于特定场景，能采用合适的设计模式进行解决｜了解 MYSQL，了解数据库优化常用方法｜了解基于微信公众号应用开发，采用 Taro 开发微信小程序，具备良好的网络基础知识',
    skillList: [
      '熟悉 Vue.js，了解数据双向绑定原理、阅读过 NextTick 源码',
      '熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码，开发 rc-redux-model 中间件',
      '阅读过 Antd 部分优秀组件源码，并参考借鉴，开发组内 UI 组件库',
      '了解 Vscode，开发组内项目辅助工具 vscode-beehive-extension 插件',
      '了解 Webpack 编译原理，了解 babel 转码原理，编写过 babel 插件',
      '了解 Electron，了解 Node.js 以及 Git 团队协作开发工具',
      '了解设计模式，对于特定场景，能采用合适的设计模式进行解决',
      '了解 MYSQL，了解数据库优化常用方法',
      '了解基于微信公众号应用开发，采用 Taro 开发微信小程序，具备良好的网络基础知识',
    ],
    evaluation:
      '投身开源，rc-redux-model 库作者，SugarTurboS Club 开源组织负责人| 掘金 lv3 博主，掘金文章 10w+ 阅读量，github blog 300+ star | 具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境|具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
    evaluationList: [
      '投身开源，rc-redux-model 库作者，SugarTurboS Club 开源组织负责人',
      '掘金 lv3 博主，掘金文章 10w+ 阅读量，github blog 300+ star',
      '具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境。',
      '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
    ],
    certificate: '广州第一届喝酒大赛参与奖',
    certificateList: ['广州第一届喝酒大赛参与奖'],
    schoolExperience: [
      {
        beginTime: '2016.09',
        endTime: '2017.09',
        post: '文艺部会长',
        department: '校团委学生会',
        content:
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动｜承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        parseContent: [
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动',
          '承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        ],
      },
    ],
    workExperience: [
      {
        beginTime: '2017.09',
        endTime: '2019.04',
        post: '前端工程师',
        department: '湖南瞎说大学网络中心',
        content:
          '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用｜任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        parseContent: [
          '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用',
          '任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        ],
      },
    ],
    projectExperience: [
      {
        beginTime: '2021.03',
        endTime: '2021.05',
        projectName: 'visResumeMook 可视化简历平台',
        post: '前端工程师',
        content:
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版｜通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档｜通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        parseContent: [
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版',
          '通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档',
          '通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        ],
        date: 1621145137865,
      },
    ],
  },
};

export default resumeModel;
