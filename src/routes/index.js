import Home from '../views/Home'
import IssuesIndex from '../views/issues/Index'
import IssuesShow from '../views/issues/Show'

export default [
  { path: '/', component: Home, name: "home" },
  { path: '/issues', component: IssuesIndex, name: "issues-index" },
  { path: '/issues/:number', component: IssuesShow, name: "issues-show" },
]
