// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  droplist: {
    progress: '进度',
    courses: '课程',
    settings: '设置',
    help: '帮助'
  },
  courseSelector: {
    title: '课程',
    course: '{course}'
  },
  tableColumns: {
    name: '名字',
    score: '总正确', //COR
    complete: '总完成', //COM
    pctCorrect: '正确率', //SCO
    count: '可用数', //TOT
    pctComplete: '完成率', //CPL
  },
  infoTable: {
    title: '导航',
    cor: '总正确',
    com: '总完成',
    tot: '可用数量',
    sco: '正确率; 总正确/总完成 * 100%',
    cpl: '完成率: 总完成/可用数 * 100%'
  },
  sumNavi: {
    sco: '正确率',
    cpl: '完成率',
    crs: '课程',
    unt: '单位',
    les: '课',
    mod: '模块'
  },
  settingsContent: {
    title: '设置',
    language: '语言',
  },
  exitBtn: {
    exit: '推出'
  },
  switchCourse: {
    switch: '切换'
  },
  savedCourse: {
    saved: '已保存: '
  },
  spoony: {
    title: '问问Spoony',
    setup_title: '设置Spoony',
    setup_description: 'Spoony是您课程的AI助手。要使用Spoony，您需要从Pollinations.ai获取免费的API密钥。',
    get_key_link: '获取您的免费API密钥',
    input_placeholder: '请输入您的问题...',
    send_button: '发送',
    typing: 'Spoony正在输入...',
    error_off_topic: '我只能帮助解答有关本课程的问题。',
    error_no_answer: '我不能直接给您答案，但这里有一个提示：',
    error_invalid_key: '您的API密钥无效，请检查后重试。',
    error_rate_limited: '您已达到使用限制，请稍后再试或在pollinations.ai升级。',
    error_network: '无法连接到Spoony，请检查您的网络连接。',
    error_unavailable: 'Spoony暂时不可用，请稍后再试。',
    error_no_course: '请先开始一门课程，然后再使用Spoony。',
    settings_title: 'Spoony AI',
    settings_key_saved: 'API密钥已保存',
    settings_key_not_saved: '未设置API密钥',
    settings_update_key: '更新密钥',
    settings_delete_key: '删除密钥',
    settings_model: 'AI模型',
    clear_chat: '清除对话',
  }
};
