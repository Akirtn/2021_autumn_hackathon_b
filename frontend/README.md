# Getting Started

First, run the development server:

`npm run start` or `yarn start`


# Version

node v12.16.3
npm 6.14.4

# Development environment

1・React

-  対応ライブラリが多く、リッチな UI を実装できるため
-  DOM 操作のパフォーマンスチューニングを自動でしてくれるため
-  コンポーネント指向であり、再利用性と拡張性が高いため
-  TypeScript との相性が vue.js より良いため

2・TypeScript

-  型宣言をすることで、開発効率、コードの安全性と可読性を高めるため
-  ビルドエラーを事前に解決することで修正コストを下げるため

4・Material UI

-  直観的に理解できるUIにするため
-  デザインが決まっていて、スピーディーに開発できるため

4・react-router-dom

-  ルーティングに使用するため

5・axios

-  簡潔にコードが書けるため
-  fetchライブラリと比較
    -  jsonにパースしなくてもいい  
    -  404や500エラーをキャッチできる

6・husky + lint-staged

-  コードの品質担保のため push・commit 前に lint と type-check を走らせる


# Architecture

atomicデザインとクリーンアーキテクチャライクな設計を採用した。利点として下記が挙げられる

-  変更に強いこと
-  理解しやすいこと
-  再利用しやすいこと

今回は、そこまでコンポーネント数が多くならいことを踏まえて、以下のatomicデザインにしている


src</br> 
　　　 ├── action 
　　　 ├── components
　　　 ├── hooks  
　　　 ├── mocks  
　　　 ├── services  
　　　 ├── types    
　　　 └── utils

### components

-  UI コンポーネントを定義

    #### pages
    
    -  page

    #### templates
    
    -  全体的なスタイル調整をする

    #### uiParts
    
    -  atmos＆molecules

### hooks

-  汎用的な hooks と API コールに関するカスタムフックを定義


### mocks

-  テストやローカル検証用のモックオブジェクト

### services

-  ロジック周り

### types

-  fetch情報など使用頻度の高いモデルの型定義

### utils

-  全体的なスタイルを定義(primaryColor,font-famliy, margin..)


