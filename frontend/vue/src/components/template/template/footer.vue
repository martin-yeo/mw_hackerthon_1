<template>
    <b-container class="wrapper_footer" fluid>
        <b-row>
            <b-col id="copyright" class="align-self-center">
                &copy; {{year}}.
                <a id="domain" :to="{path:'/'}">mokwon.ac.kr</a>
                All Rights Reserved
            </b-col>
        </b-row>
    </b-container>
</template>
<style scoped>
    .wrapper_footer{border-top:2px solid #C4C4C4}
    #copyright{text-align:right}
    #copyright #domain{color:#000}
    #copyright #domain:visited{color:#000}
    #copyright #domain:hover{text-decoration:none}
</style>
<script>
export default {
  name: 'TemplateFooter',
  data(){
    return {
        "year" : new Date().getFullYear()
    }
  },
  props: {
    msg: String
  },
  beforeMount() {

  }
}
</script>