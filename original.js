'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  resultDivided.innerText = "";
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // TODO ツイートエリアの作成
  tweetDivided.innerText = "";
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=あなたと相性のいい色&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', '診断結果の文章');
  anchor.innerText = 'Tweet #あなたと相性のいい色';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
    '{userName}と相性のいい色は赤色です。{userName}の持つリーダシップには目を見張るものがあります。',
    '{userName}と相性のいい色は青色です。{userName}の冷静さと誠実さに、周りの人は惹かれるでしょう。',
    '{userName}と相性のいい色は黄色です。{userName}の天性の明るさは周りの人をも明るくするでしょう。',
    '{userName}と相性のいい色は緑色です。{userName}がいるだけで周りの人は安心するはずです。',
    '{userName}と相性のいい色は白色です。{userName}を見たら周りの人の気持ちは引き締まるはずです。',
    '{userName}と相性のいい色は黒色です。{userName}の持つ存在感を求めている人はたくさんいるはずです。',
    '{userName}と相性のいい色は紫色です。{userName}から溢れ出る芸術的センスはお金には変え難いです。',
    '{userName}と相性のいい色はピンク色です。{userName}の雰囲気から溢れ出れる優しさは多くの人を幸せにします。',
    '{userName}と相性のいい色はオレンジ色です。{userName}と話す時間は誰しもが楽しいと感じています。',
    '{userName}と相性のいい色は黄緑色です。{userName}の持つ柔軟な考え方によりチームがよく助けられます。',
    '{userName}と相性のいい色は灰色です。{userName}のおしゃれさは誰しもが一度は憧れています。',
    '{userName}と相性のいい色は茶色です。{userName}といる時間は落ち着きを生んでくれます。',
    '{userName}と相性のいい色はベージュ色です。{userName}とのんびり過ごす時間がみんなは大好きです。',
    '{userName}と相性のいい色は水色です。{userName}といるときは何も隠さず自然体で話せます。'
  ];
  
  /**
   * 名前の文字列を渡すと診断結果を返す関数
   * @param {string} userName ユーザーの名前
   * @return {string} 診断結果
   */
  function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
  
    result = result.replaceAll('{userName}', userName);
    return result;
  }
  
  // テストコード
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
  
  userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };