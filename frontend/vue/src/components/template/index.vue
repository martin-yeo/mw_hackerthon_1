<template>
    <b-container fluid>
      <b-link :to="{path:'/template/list'}" v-html="'리스트'"/><br>
      <b-link :to="{path:'/template/one/3'}" v-html="'게시글조회'"/><br>
      <b-link :to="{path:'/template/insert'}" v-html="'등록'"/><br>
      <b-link :to="{path:'/template/update'}" v-html="'수정'"/><br>
      <b-link :to="{path:'/template/delete'}" v-html="'삭제'"/><br>
    </b-container>
</template>

<style scoped>
    .csr_mouse{cursor:pointer}
</style>

<script>
export default {
    created() {
    },
    // data(){
    // },
    methods:{

    },
    computed: {
    }
}
</script>