<template lang="pug">
  div
    header
      .wrapper
        h1 Issue{{'#' + this.number}}
    main.wrapper
      nav
        a(href="javascript:history.back()") &lt; もどる
      h2 {{issue.title}}
      p {{issue.body}}
    footer
      .wrapper
        router-link(:to="{ name: 'home' }") ホーム
</template>

<script>
import axios from 'axios'
export default {
  name: 'IssuesShow',
  data () {
    return {
      loading: false,
      number: this.$route.params.number,
      issue: {},
    }
  },
  mounted () {
    axios
      .get("https://api.github.com/repos/facebook/react/issues/" + this.number)
      .then( (response) => {
        this.issue = response.data
      })
  }
}
</script>

<style lang="sass" scoped>
nav
  margin-bottom: 1em
h2
  margin-bottom: 1em
p
  white-space: pre-line
</style>
