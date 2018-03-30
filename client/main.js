//Lib
import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/akryum:vue';
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en';
import routerFactory from '../client/route.js';

//Main app
Vue.use(elementUi,{locale});

import App from '../import/ui/MainApp.vue';
import AppLayout from '../import/ui/AppLayout.vue';
Meteor.startup(() => {
  const router = routerFactory.create();
  new Vue({
    el: "#app",
    router,
    replace: true,
     render: h => h(AppLayout),
  });
});
