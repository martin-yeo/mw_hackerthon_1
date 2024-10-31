<template>
  <b-container fluid>
    <b-row>
      리스트
    </b-row>
    <b-row>
      <b-col>
        <b-table id="list" :items="list" responsive>
          <template #cell(num)="data">
            {{ data.item.num }}
          </template>
          <template #cell(name)="data">
            {{ data.item.name }}
          </template>
        </b-table>
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
      list : []
    }
  },
  methods:{
    fetchList:function() {
      let url = 'http://127.0.0.1:8080/api/front'; // URL 은 달라질 수 있음

      fetch(`${url}/list`)
          .then((res) => {
            if(res.ok){
              return res.json();
            }
            throw new Error('Network res was not ok');
          }).then((json) => {
        // console.log(json); // value 확인
        this.list = json.list;
      }).catch((e) => {
        this.search_result_msg = '리스트가 없습니다';
        console.log(e);
      });
    }
  },
  computed: {
  },
  beforeMount() {
    var _this = this;
    this.$destroy(); // keep-alive cache destroy
    setTimeout(function(){
      _this.fetchList();
    }, 500);
  }
}
</script>