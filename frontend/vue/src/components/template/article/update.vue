<template>
  <b-container fluid>
    <b-row>
      게시글 수정
    </b-row>

    <b-row>
      <b-col>
        <b-form id="insert_form" method="post" v-on:submit.prevent="updateForm">
          <b-input-group class="mt-2">
            <b-form-input v-model="num" placeholder="게시글 번호를 입력하세요." autofocus/>
          </b-input-group>
          
          <b-input-group class="mt-2">
            <b-form-input v-model="name" placeholder="게시글 내용을 입력하세요." autofocus/>
            <b-button type="submit" variant="primary" size="sm">수정</b-button>
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
      num : 0,
      name : "",
    }
  },
  methods:{
    updateForm:function(){
      if(this.name === '') {
        alert('내용을 입력해 주세요');
        return false;
      } else {
        let url = 'http://127.0.0.1:8080/api/front'; // URL 은 달라질 수 있음

        var params = {
          method:'put',
          headers: {
            'Content-Type' : 'application/json'
          },

          body: JSON.stringify({
            num: this.num,
            name: this.name,
          })
        };

        fetch(`${url}/update`, params)
            .then((res) => {
              if(res.ok){
                return res.json();
              }
              throw new Error('Network res was not ok');
            }).then((json) => {
          if(json.result) {
            alert("게시글 수정에 성공했습니다.");
            this.name = "";
          } else {
            alert("게시글 수정에 실패했습니다.");
          }
        }).catch((e) => {
          alert("게시글 수정에 실패했습니다.");
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