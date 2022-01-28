// スプレッドシートと読み取りたいシート
var ss = SpreadsheetApp.openById("hogehoge");
var sheets = ss.getSheets();
var sheet = ss.setActiveSheet(sheets[0]);

// slackへの投稿
function sendToSlack(body, channel) {
  // slackAPIでトークンを取得しておく
  var url = "https://hooks.slack.com/hogehoge";
  var data = { "channel" : channel, "text" : body, "icon_emoji" : ":date: " , "username" : "掃除場所Bot"};
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function fetchCleaningAreasAndMembers() {

  // 場所と名前のデータをスプレッドシートから取得
  // A列に場所、B列に名前、C列はvlookupでslackの個人IDを表示させる
  var data = sheet.getRange('A1:C13').getValues();

  // 場所と名前を文字列にまとめる
  var AreasAndMembers = '';
  data.forEach(function(value){
        AreasAndMembers += value[0] + ' : <@' + value[2] + '>\n';
  });

  var cleaningBody =
        '今週の掃除場所' + '\n'
        + AreasAndMembers
        +'終わったらスタンプ✅を押してください！'
         ;
  // 掃除場所をローテーションさせる

  var areaRange = sheet.getRange('B1:B13');

  var areas = areaRange.getValues();

  // 配列の先頭の要素を一番最後に移動させる
  areas.unshift(areas.pop());

  // シートにローテーション結果を記入する
  areaRange.setValues(areas);


  sendToSlack(cleaningBody, "#hogehoge");
}