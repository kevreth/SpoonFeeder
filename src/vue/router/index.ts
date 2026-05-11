import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

// Must run before Vue/Router initializes
const rawHash = window.location.hash;
const hashContent = rawHash.replace('#/', '').replace('#', '');
if (hashContent.includes('api_key=')) {
  const params = new URLSearchParams(hashContent);
  const apiKey = params.get('api_key');
  if (apiKey) {
    // WebStorageAdapter expects a versioned envelope — a bare string would fail JSON.parse on read
    const envelope = JSON.stringify({ version: 1, data: apiKey });
    localStorage.setItem('spoony_api_key', envelope);
    console.log('[Spoony OAuth] API key received and persisted to storage');
    window.history.replaceState(null, '', window.location.pathname + '#/');
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
