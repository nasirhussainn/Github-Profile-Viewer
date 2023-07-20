import Vue from 'vue';
import ProfileViewer from './components/ProfileViewer';

const app = new Vue({
  el: '#app',
  components: {
    ProfileViewer,
  },
  data() {
    return {
      username: '',
    };
  },
});

app.mount('#app');
