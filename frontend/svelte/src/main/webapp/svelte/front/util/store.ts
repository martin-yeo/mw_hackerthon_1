import { writable } from 'svelte/store';

export const loginInfo = writable({id:null, token:null});
