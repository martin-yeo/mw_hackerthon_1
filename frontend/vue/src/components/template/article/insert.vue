<template>
  <b-container fluid>
    <b-row>
      게시글 등록
    </b-row>

    <b-row>
      <b-col>
        <b-form id="insert_form" method="post" v-on:submit.prevent="insertForm">
          <b-input-group class="mt-2">
            <b-form-input v-model="name" placeholder="게시글 내용을 입력하세요." autofocus/>
            <b-button type="submit" variant="primary" size="sm">등록</b-button>
          </b-input-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.csr_mouse{cursor:pointer}
</style>

<script scoped>
export default {
  created() {

  },
  data(){
    return {
      list : [],
      name : "",
    }
  },
  methods:{
    insertForm:function(){
      if(this.name === '') {
        alert('내용을 입력해 주세요');
        return false;
      } else {
        let url = 'http://127.0.0.1:8080/api/front'; // URL 은 달라질 수 있음

        var params = {
          method:'post',
          headers: {
            'Content-Type' : 'application/json'
          },

          body: JSON.stringify({
            name: this.name,
          })
        };

        fetch(`${url}/insert`, params)
            .then((res) => {
              if(res.ok){
                return res.json();
              }
              throw new Error('Network res was not ok');
            }).then((json) => {
          if(json.result) {
            alert("게시글 등록에 성공했습니다.");
            this.name = "";
          } else {
            alert("게시글 등록에 실패했습니다.");
          }
        }).catch((e) => {
          alert("게시글 등록에 실패했습니다.");
          console.log(e);
        });
      }
    },
  },
  computed: {
  },
  beforeMount() {
  }
}
</script>