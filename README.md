# github issues SPA

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 公開先

github pagesで公開がうまくできなかったのでこちらに上げました

http://issues.tsugu.to/


## 実装方針

NPM, Webpack, VueJS(vue-cli), vue-router, axios を使って、githubのissuesを一覧・個別表示するSPAを実装しました。

ローディング時などアニメーションやローディング画像などを入れておきたかったのですがもう少し時間がかかりそうだったのでここまででアップしています。

### 構成

`src/` 以下に資源を置いており、buildすると `npm run build` 以下にbuild.jsとしてコンパイルされます。

Vueのファイル構成としては

```
src
  |- assets/     # スタイルシートと画像を配置
  |- components/ # vueのコンポーネントを格納
  |- routes/     # SPAのルーティングを管理
  |- views/      # 画面を作るvueファイル
  |- main.js     # エントリーポイント
```

という感じです。

### Vueの構成について

ルーティング構成（ページ構成）にあわせて、`issues/` ディレクトリを切っています。

### SPA/Ajaxについて

ルーティングは`vue-router`を使い、APIを叩くAjax部分にはaxiosを採用しています。

今回の規模では`vue-router`を使わなくてもできるかなと思いましたが、拡張性を考えて入れておきました。


### CSSについて

Sassを使って書いています。

- `_reset` はreset.cssを入れてブラウザ依存のリセットをしています
- `_base` は要素ごとのデフォルトになるスタイルを指定します
- `_layouts` はレイアウトに関わるスタイルを指定します
- `_modules` はVueコンポーネントを横断するような共通スタイルをclass指定で入れていきます
