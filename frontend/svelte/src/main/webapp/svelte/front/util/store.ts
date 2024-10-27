import { writable } from 'svelte/store';

export const loginInfo = writable({id:null, token:null});
export const keywordInfo = writable({id:null, token:null});
