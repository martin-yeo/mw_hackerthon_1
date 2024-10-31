<template>
    <div id="question_paper">
        <h2 class="font-weight-bold">게시글 조회</h2>

      <table>
        <tr>
          <th>num</th>
          <th>name</th>
        </tr>
        <tr>
          <td>{{ data.num }}</td>
          <td>{{ data.name }}</td>
        </tr>
      </table>
    </div>
</template>

<script scoped>
export default {
    data(){
      return {
        data : {}
      }
    },
    methods:{
      fetchOne:function() {
        var params = this.$route.params;
        let url = 'http://127.0.0.1:8080/api/front'; // URL 은 달라질 수 있음
        var httpParams = {
          method:'post',
          headers: {
            'Content-Type' : 'application/json'
          },

          body: JSON.stringify({
            num:params.num
          })
        };

        fetch(`${url}/one/${params.num}`, httpParams)
            .then((res) => {
              if(res.ok){
                return res.json();
              }
              throw new Error('Network res was not ok');
            }).then((json) => {
          // console.log(json); // value 확인
          this.data = json.data;
        }).catch((e) => {
          this.search_result_msg = '데이터가 없습니다';
          console.log(e);
        });
      },
    },
  beforeMount() {
    var _this = this;
    this.$destroy(); // keep-alive cache destroy
    setTimeout(function(){
      _this.fetchOne();
    }, 500);
  }
}
</script>

<style scoped>
</style>