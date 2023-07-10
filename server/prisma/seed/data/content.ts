import { Prisma } from '@prisma/client'
// I store image key of s3 and retrieve them by SDK
export const contentData: Prisma.contentCreateInput[] = [
  {
    image: ['umbrella/treeman_content/1/treeman1.jpg'],
    title: '什麼是『財富自由』，它本質你有夠瞭解嗎!',
    content: `Ent這個字是來自古英語，指「巨大」的意思
    透過創造財富與健康的同時也回饋地球
    樹人俱樂部優質的福利
    透過量子全息技術了解自己
    從裡到外，掌握人生關鍵數據
    人要走的長遠
    必須了解自己
    做更有價值的人生目標
    
    您的加入讓地球更健康
    也讓自己締造凝時青春
    
    ⭐️量子全息技術
    ⭐️專利單一全胜肽美顏產品(ALL in One)
    ⭐️獨家細胞牛樟芝咖啡
    ⭐️純單方膠原蛋白
    ⭐️獨家會員經銷制
    ⭐️強力財富機器
    
    p.s.詳細課程表單請洽傘下規劃師詢問`.trim(),
    treeman: { connect: { title: '什麼是『財富自由』，它本質你有夠瞭解嗎!' } }
  },
  {
    image: ['umbrella/rich_content/1/rich1.jpg'],
    title: '邊做公益邊賺錢，你辦得到!',
    content: `致富就是種心態，世界上有賺很多錢 卻 破產的人？
    也有錢賺很少
    卻有辦法捐大錢做慈善的人，為什麼？
    因為理財結果與運氣和風險有關，而且不受才智與個人努力影響
    更重要的是，與其了解許多理財專業知識，適當的言行舉止更加關鍵。
    
    ⭐️致富與守財是兩種不同的技巧，但都非常重要。
    ⭐️有許多事情不管濳在獲利有多龐大，都不值得冒險。
    ⭐️了解長尾效應與複利效果的本質與威力
    ⭐️掌握你的時間，就是金錢付給你位高的紅利。
    ⭐️預留安全邊際的重要性。
    ⭐️財富自由真正的本質。
    
    p.s.詳細課程表單請洽傘下規劃師詢問`.trim(),
    rich: { connect: { title: '邊做公益邊賺錢，你辦得到!' } }
  },
  {
    image: [
      'umbrella/new_content/1/DSC_0001-scaled.jpg',
      'umbrella/new_content/1/DSC_0002-scaled.jpg',
      'umbrella/new_content/1/DSC_0003-scaled.jpg',
      'umbrella/new_content/1/DSC_0004-scaled.jpg',
      'umbrella/new_content/1/DSC_0007-scaled.jpg',
      'umbrella/new_content/1/DSC_0008-scaled.jpg',
      'umbrella/new_content/1/DSC_0009-scaled.jpg',
      'umbrella/new_content/1/DSC_0015-scaled.jpg',
      'umbrella/new_content/1/DSC_0017-scaled.jpg',
      'umbrella/new_content/1/DSC_0027-scaled.jpg',
      'umbrella/new_content/1/DSC_0031-scaled.jpg',
      'umbrella/new_content/1/DSC_0053-scaled.jpg',
      'umbrella/new_content/1/DSC_0078-scaled.jpg',
      'umbrella/new_content/1/DSC_0118-scaled.jpg',
      'umbrella/new_content/1/DSC_0123-scaled.jpg',
      'umbrella/new_content/1/DSC_0133-scaled.jpg',
      'umbrella/new_content/1/DSC_0170-scaled.jpg',
      'umbrella/new_content/1/DSC_0219-scaled.jpg',
      'umbrella/new_content/1/DSC_0233-scaled.jpg',
      'umbrella/new_content/1/DSC_0259-scaled.jpg',
      'umbrella/new_content/1/DSC_0310-scaled.jpg',
      'umbrella/new_content/1/DSC_0358-scaled.jpg',
      'umbrella/new_content/1/DSC_0366-scaled.jpg'
    ],
    title: '年終尾牙～圓滿結束',
    content: `辛苦了好一陣子，我們也迎來了第一次的尾牙
    祝福 兔年行大運 數錢數到兔`.trim(),
    news: { connect: { title: '年終尾牙～圓滿結束' } }
  },
  {
    image: ['umbrella/new_content/2/2.jpg'],
    title: '傘下的開幕茶會',
    content: `新的一年 新的開始
    誠摯地邀請您蒞臨我們傘下的開幕茶會。
    p.s憑邀請函入場 並 兌換精美禮物！
    官方LINE詢問：https://lin.ee/4oq7Af1
    報名表單：https://reurl.cc/LXO26e
    日期：
    2023年2月1日(三)下午15點
    地點：
    新北市板橋區合宜路13號1樓`.trim(),
    news: { connect: { title: '傘下的開幕茶會' } }
  },
  {
    image: ['umbrella/new_content/3/5.jpg'],
    title:
      '『共心、共行、共好！一個讓你真正可以實現財富流真實含義的商會平台-衖商會』',
    content: `＊你是不是到處上課自以為的增加財商，卻一直無法實現？
    ＊你是不是不停的在玩傳直銷或是資金盤，只為了實現被動收入的美夢？
    ＊你是不是很認份地想好好工作，但工作收入卻一直停滯不前？
    ＊你是不是拿手上唯一的一筆資金到處投資，卻一直虧損？
    如果上述你符合其中一點，那你就已經是衖商會的準會員了
    這是一個可以一次解決上述四點的超牛商會-衖！！
    只要你願意認真評估衖商會，你將會獲得以下四點改變你的機會：
    ＊主動收入的增加-透過簡單操作，穩定的放大手上資金不是問題。
    ＊用錢滾錢的美夢得以實現-透過第三方公正單位把關，自己參與安全項目的操作。
    ＊被動收入的開始-透過商業模式的安排，讓你連睡覺都會悄悄的增加額外收入。
    ＊三觀的再造-透過衖的教育體制，讓你財商直接昇華到財道，不再談的只是錢。
    商會名額有限，把握得住入場門票，你的人生從此刻就進入新的轉折！！！
    如果有情侶的，只需一個人報名即可，另一位在記事本備註。
    例如：報名者是蠟筆小新與蠟筆小新女友
    報名表單是蠟筆小新報名
    下面請留言區請填寫 『日期/姓名+人數』
    例如：12/14 蠟筆小新2名
    『衖』商會小型說明會線上報名表`.trim(),
    news: {
      connect: {
        title:
          '『共心、共行、共好！一個讓你真正可以實現財富流真實含義的商會平台-衖商會』'
      }
    }
  },
  {
    image: ['umbrella/new_content/4/6.jpg'],
    title: '讓傘下書院成為您充電的藏寶閣',
    content: `對於未來，你是否還感到徬徨⁉️
    自己的專業跟不上時代的改變❓
    不知道，自己是對還是錯，該繼續 還是停下，
    就讓我們來告訴你吧！🤓
    ———————————————
    在找到智慧之鑰的瞬間
    也同時開啟宇宙之門
    透過各業界菁英精選十二堂課
    找回屬於你的智慧
    書院將引導您看見真理
    在這一條道路上
    讓你不孤單
    一同見證開啟智慧的瞬間
    ⭐️降落高維度的智慧
    ⭐️恢復自我原廠設定
    ⭐️成為開心快樂的自己
    ⭐️拾回自我價值與自信
    👉讓傘下書院成為您充電的藏寶閣
    p.s.詳細課程表單請洽傘下規劃師詢問`.trim(),
    news: { connect: { title: '讓傘下書院成為您充電的藏寶閣' } }
  },
  {
    image: ['umbrella/new_content/5/5.jpg'],
    title: '一個讓你真正可以實現財富流真實含義的商會平台-衖商會',
    content: `「與心同行，把手共行」
    一個讓你真正可以實現財富流真實含義的商會平台-衖商會
    ——————————-
    本會之宗旨為發展地球人之才智並結合有志青年之力量
    ，以促進人類生活、社會經濟及精神文明之進展。
    一、促進世界各地區商業之合作，共謀發展工商業，及開拓國際市場。
    二、藉參與計劃及執行會務活動，以訓練個人繁榮社會。
    三、促進全人類之瞭解、友誼與合作。
    四、提升自己精神世界，也幫助地球文明更進步。
    ⭐️以互助會為本質，共同攜手邁向幸褔道路
    ⭐️暸解正確理財方式，活化資本之操作運用
    ⭐️共行、共學、共榮`.trim(),
    news: {
      connect: { title: '一個讓你真正可以實現財富流真實含義的商會平台-衖商會' }
    }
  },
  {
    image: [
      'umbrella/new_content/8/S__19423511.jpg',
      'umbrella/new_content/8/S__19423513.jpg',
      'umbrella/new_content/8/S__19423514.jpg',
      'umbrella/new_content/8/S__19423515.jpg'
    ],
    title: '春滿澳洲 錢兔似錦',
    content: `澳洲工作歡迎洽詢詢問

    地點:robinvale 維多里亞省
    工作時間: AM:7:00~ PM5:00 (計件制)
    薪水：15萬/月（週結帳)
    澳洲旅遊打工須備妥以下資料
    
    姓名：
    連絡電話：
    出生年日：
    身份證號：
    居住地區：
    LINE ID ：
    身分證正反拍照、護照正本
    ——————————————————
    需準備以下金額
    現金3,400 (旅遊簽 合法3個月)
    自己預備第一個月生活費40,000台幣以及單程機票錢約35,000
    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    以上加入樹人🌲俱樂部享有免費機票名額 1名～歡迎洽詢`.trim(),
    news: { connect: { title: '春滿澳洲 錢兔似錦' } }
  },
  {
    image: [
      'umbrella/new_content/7/DSC_0069-scaled.jpg',
      'umbrella/new_content/7/DSC_0081-scaled.jpg',
      'umbrella/new_content/7/DSC_0094-scaled.jpg',
      'umbrella/new_content/7/DSC_0097-scaled.jpg',
      'umbrella/new_content/7/DSC_0100-scaled.jpg',
      'umbrella/new_content/7/DSC_0121-scaled.jpg',
      'umbrella/new_content/7/DSC_0126-scaled.jpg',
      'umbrella/new_content/7/DSC_0156-scaled.jpg',
      'umbrella/new_content/7/DSC_0175-scaled.jpg',
      'umbrella/new_content/7/DSC_0176-scaled.jpg',
      'umbrella/new_content/7/DSC_0192-scaled.jpg'
    ],
    title: '2023年2月1日 傘下管理顧問有限公司 正式啟航',
    content:
      `傘下管理顧問有限公司於2023年2月1日正式開幕，經過兩年的市場佈局，除了深受中小企業信賴，也得到許多小額投資個體的認同，公司優質的理念與價值，是我們想提供給更多社會大眾的服務。
    2023卯兔年，傘下管理顧問有限公司正式啟航，帶領所有會員，邁向新的里程碑！`.trim(),
    news: { connect: { title: '2023年2月1日 傘下管理顧問有限公司 正式啟航' } }
  },
  {
    image: [
      'umbrella/new_content/8/LINE_ALBUM_413信用講座_230418_12.jpg',
      'umbrella/new_content/8/LINE_ALBUM_413信用講座_230418_22.jpg',
      'umbrella/new_content/8/LINE_ALBUM_413信用講座_230418_28.jpg',
      'umbrella/new_content/8/LINE_ALBUM_413信用講座_230418_3.jpg'
    ],
    title: '傘下信用養成布局術講座',
    content: `很高興大家熱情的參與，讓我們場地一下子就爆滿!!
      感謝大家支持與愛戴，傘下將更加的努力，為大眾服務~`.trim(),
    news: { connect: { title: '傘下信用養成布局術講座' } }
  }
]
