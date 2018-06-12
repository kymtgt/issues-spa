<template lang="pug">
  div
    header
      .wrapper
        h1 Issues一覧
    main.wrapper(v-bind:class="{ loading: loading }")
      ul
        li(v-for="issue of issues")
          router-link(:to="{ name: 'issues-show', params: { number: issue.number }}")
            small {{ issue.number }}
            br
            | {{ issue.title }}

      nav
        router-link(:to="{ name: 'issues-index', query: { page: 1 }}") &lt;&lt;
        router-link(:to="{ name: 'issues-index', query: { page: prevPage() }}" v-bind:class="{ hidden: !hasPrevPage() }") &lt;
        span PAGE: {{ pages.current }}
        router-link(:to="{ name: 'issues-index', query: { page: nextPage() }}" v-bind:class="{ hidden: !hasNextPage() }") &gt;
        router-link(:to="{ name: 'issues-index', query: { page: lastPage() }}") &gt;&gt;
    footer
      .wrapper
        router-link(:to="{ name: 'home' }") ホーム
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      issues: [],
      pages: {
        current: 1,
        next: 2,
        last: 2
      }
    }
  },
  methods: {
    prevPage () {
      return parseInt(this.pages.current) - 1
    },
    nextPage () {
      return parseInt(this.pages.current) + 1
    },
    lastPage () {
      return this.pages.last
    },
    hasPrevPage () {
      return parseInt(this.pages.current) > 1
    },
    hasNextPage () {
      return (this.nextPage() <= this.lastPage())
    },
    loadIssues () {
      if(this.loading) return false
      this.loading = true
      axios
        .get("https://api.github.com/repos/facebook/react/issues?page=" + this.pages.current + "&per_page=10")
        .then( (response) => {
          this.pages = this.parseHeaderLink(response.headers.link)
          this.issues = response.data
          this.loading = false
        })
    },
    parseHeaderLink (linkStr) {
      var pages = this.pages
      if (linkStr.length == 0) return false
      var parts = linkStr.split(',')
      for(var part of parts) {
        var section = part.split(';');
        var url = new URL(section[0].replace(/<(.*)>/, '$1').trim())
        var name = section[1].replace(/rel="(.*)"/, '$1').trim()
        pages[name] = url.searchParams.get("page")
      }
      return pages
    }
  },
  watch: {
    '$route' (to, from) {
      this.pages.current = to.query.page
      this.loadIssues()
    }
  },
  created () {
    this.pages.current = this.$route.query.page || 1
    this.loadIssues()
  }
}
</script>

<style lang="sass" scoped>
.loading
  opacity: .5
li
  margin-top: .75em
  margin-bottom: .75em
  a
    display: block
    border-radius: 4px
    border: 1px solid
    padding: .75em
    line-height: 1.3
    font-weight: bold
    box-sizing: border-box
    > small
      color: #b2bec3
      font-weight: normal
      line-height: 1
      padding-bottom: .3em
      display: inline-block
nav
  text-align: center
  a
    margin: 0 1em
    display: inline-block
    &.hidden
      visibility: hidden

</style>
