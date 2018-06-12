<template lang="pug">
  div
    main
      h1 Github Issues SPA
      nav
        router-link(:to="{name: 'issues-index'}") Issues一覧
</template>

<style lang="sass" scoped>
main
  width: 100%
  position: absolute
  top: 50%
  transform: translateY(-50%)
  text-align: center
nav
  margin-top: 1em
</style>
