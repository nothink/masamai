import { prop, getModelForClass } from '@typegoose/typegoose';

// https://typegoose.github.io/typegoose/guides/quick-start-guide/
// https://github.com/typegoose/typegoose

class Girl {
  @prop({ required: true })
  public name!: string;
  @prop({ required: true })
  public japaneseName!: string;
  @prop({ required: true })
  public alphabetName!: string;
  @prop({ required: true })
  public nickname!: string;

  @prop({ required: true })
  public actorName!: string;

  @prop({ required: true })
  public grade!: number;
  @prop({ required: true })
  public className!: string;
}

export const GirlModel = getModelForClass(Girl);

/* "girl": {
  "actorName": "名塚佳織",
  "age": "18才",
  "alphabetName": "FUMIO MURAKAMI",
  "animationImage": "https://dqx9mbrpz1jhx.cloudfront.net/vcard/ratio20/images/profile/animation/fad47a190d61d2201e3b4bbe551c589a.png",
  "birthday": "11月2日",
  "birthdayFlg": false,
  "blood": "B型",
  "bust": "86",
  "className": "3年A組",
  "club": "図書委員会",
  "description": "口数が少なく、いつも本を読んでいる図書委員。<br>感情表現が苦手で口下手のため、うまく他人と打ち解けられないが、それでも自分に声をかけてくれる人には感謝している。<br>望月エレナと仲が良い。",
  "favoriteFood": "ケーキ",
  "grade": "3",
  "hateFood": "レバー",
  "height": "160",
  "hip": "86",
  "hobby": "読書",
  "id": 67,
  "image": "https://dqx9mbrpz1jhx.cloudfront.net/vcard/ratio20/images/profile/fad47a190d61d2201e3b4bbe551c589a.png",
  "introduceVoiceUrl": "https://dqx9mbrpz1jhx.cloudfront.net/vcard/mp3/girl/introduce/fad47a190d61d2201e3b4bbe551c589a.mp3",
  "japaneseName": "むらかみ ふみお",
  "messageImage": "https://dqx9mbrpz1jhx.cloudfront.net/vcard/ratio20/images/profile/message/fad47a190d61d2201e3b4bbe551c589a.png",
  "name": "村上文緒",
  "nickname": "村上先輩",
  "notDetailFlg": false,
  "questImage": "https://dqx9mbrpz1jhx.cloudfront.net/vcard/ratio20/images/profile/quest/fad47a190d61d2201e3b4bbe551c589a.png",
  "specialVoiceFlg": false,
  "sphereId": 1,
  "star": "さそり座",
  "tweetName": "humi_bookmark",
  "waist": "56",
  "weight": "45"
}, */
