export default class WatsonChat {
    url: string;
    iam_apikey: string;
    workspaceId: string;
    shouldSendAnalytics: boolean;
  
    init(url, iam_apikey, workspaceId, shouldSendAnalytics = false) {
      this.url = url;
      this.iam_apikey = iam_apikey;
      this.workspaceId = workspaceId;
      this.shouldSendAnalytics = shouldSendAnalytics;
    }
  
    sendMessage(messages = [], input, callback) {
      var obj = {};
      obj["workspace_id"] = this.workspaceId;
      if (input) {
        messages.push(Object.assign({}, { m: input, isWatson: false }));
        obj["input"] = { text: input };
      }
  
      (<any>window).cordova.plugin.http.useBasicAuth("apikey", this.iam_apikey);
      (<any>window).cordova.plugin.http.setDataSerializer("json");
      (<any>window).cordova.plugin.http.post(
        `${this.url}/v1/workspaces/${
          this.workspaceId
        }/message?version=2018-09-20`,
        obj,
        null,
        res => {
          const responseData = JSON.parse(res.data);
          const msg = responseData.output.text[0];
          this.sendBotAnalytics(responseData);
          if (msg && msg.length !== 0) {
            messages.push(Object.assign({}, { m: msg, isWatson: true }));
          } else {
            messages.push(
              Object.assign(
                {},
                { m: " didn't understand can you try again", isWatson: true }
              )
            );
          }
          return callback(null, messages);
        },
        err => {
          alert("error " + err);
          messages.push(
            Object.assign(
              {},
              { m: "Bot is out of service! Try again later!", isWatson: true }
            )
          );
          return callback(null, messages);
        }
      );
    }
  
    sendBotAnalytics(responseData) {
      if (responseData.intents && responseData.intents.length > 0) {
        responseData.intents.map(singleIntent => {
          WL.Analytics.log({ 'Chat-Intents': singleIntent.intent }, "BotAnalytics");
          const intentConfidence = {};
          intentConfidence[`intent:${singleIntent.intent}`] = singleIntent.confidence;
          WL.Analytics.log(intentConfidence,'IntentAnalytics');
        });
      }
  
      WL.Analytics.send();
    }
  }
  