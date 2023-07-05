
import { createWebHistory, createRouter } from 'vue-router';
// import LuckySheet from './components/LuckySheet.vue';
// import Landing from './components/Landing.vue';

const Landing = () => import('./components/Landing.vue');
const LuckySheet = () => import('./components/LuckySheet.vue');

const routes = [
	{
		path: '/',
		name: 'LuckySheet',
		component: LuckySheet,
	},
    {
		path: '/landing',
		name: 'landing',
		component: Landing,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;