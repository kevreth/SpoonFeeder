// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  droplist: {
    progress: 'Progress',
    courses: 'Courses',
    settings: 'Settings',
    help: 'Help',
  },
  courseSelector: {
    title: 'Course',
    course: '{course}',
  },
  tableColumns: {
    name: 'Name',
    score: 'COR',
    complete: 'COM',
    pctCorrect: 'SCO',
    count: 'TOT',
    pctComplete: 'CPL',
  },
  settingsContent: {
    title: 'Settings',
    language: 'Language',
  },
  exitBtn: {
    exit: 'Exit',
  },
  infoTable: {
    title: 'Navigations',
    cor: 'COR: number correct',
    com: 'COM: number completed',
    tot: 'TOT: number available',
    sco: 'SCO: score; COR/COM * 100%',
    cpl: 'CPL: completion: COM/TOT * 100%',
  },
  sumNavi: {
    sco: 'SCO',
    cpl: 'CPL',
    crs: 'CRS:',
    unt: 'UNT:',
    les: 'LES:',
    mod: 'MOD:',
  },
  switchCourse: {
    switch: 'switch',
  },
  savedCourse: {
    saved: 'Saved: ',
  },
  spoony: {
    title: 'Ask Spoony',
    setup_title: 'Set Up Spoony',
    setup_description:
      'Spoony is an AI helper for your course. To use Spoony, you need a free API key from <span style="color:#00e5ff">Pollinations.ai</span>.',
    get_key_link: 'Get your free API key at pollinations.ai',
    input_placeholder: 'Type your question...',
    send_button: 'Send',
    typing: 'Spoony is typing...',
    error_off_topic: 'I can only help with questions about this course.',
    error_no_answer: 'I cannot give you the answer, but here is a hint: ',
    error_invalid_key: 'Your API key is not valid. Please check and try again.',
    error_rate_limited:
      'You have reached the limit. Please wait or upgrade at pollinations.ai.',
    error_network: 'Cannot connect to Spoony. Please check your internet.',
    error_unavailable:
      'Spoony is temporarily unavailable. Please try again later.',
    error_no_course: 'Please start a course before using Spoony.',
    settings_title: 'Spoony AI',
    settings_key_saved: 'API key saved',
    settings_key_not_saved: 'No API key',
    settings_update_key: 'Update Key',
    settings_delete_key: 'Delete Key',
    settings_model: 'AI Model',
    clear_chat: 'Clear Chat',
    oauth_btn: 'Connect with Pollinations',
    oauth_description: 'Click below to authorize Spoony. You will be redirected to Pollinations to approve access.',
    manual_key_toggle: 'Or enter key manually',
    oauth_success: 'Spoony is ready!',
  },
};
