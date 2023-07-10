import { Prisma } from '@prisma/client'
// I store image key of s3 and retrieve them by SDK
export const cardData: Prisma.cardCreateInput[] = [
  //about
  {
    image: 'umbrella/iconAndTestimonial/Umbrella.svg',
    content:
      `傘下是一把多功能的傘我們是把為您遮風避雨的傘，讓你不被財務壓垮。我們是把陽傘讓你的財務得到保障，每天不用趕3:30，財運妥善運用安排。
        更能成為你的智慧之傘，成為您生活中不可或缺的理財工具。而與傘下結緣的每一位朋友需要傘下提供什麼樣客製化的服務全取決於您的需求更重要的是！
        選擇要不要開啟這把命運之傘更操之在您手上。期待您的相遇與開啟`.trim(),
    about: { connect: { id: '16cbf212-1118-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Rainy_Weather.svg',
    content: `以創新思維改變商業法則。 透過俱樂部影響全球暖化生態圈。`.trim(),
    about: { connect: { id: '16cbf212-1118-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Life_Insurance.svg',
    content: `提供客戶安全活化資本的渠道。`.trim(),
    about: { connect: { id: '16cbf212-1118-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Handshake.svg',
    content: `誠信、創新、感恩。共享、共贏、共榮。`.trim(),
    about: { connect: { id: '16cbf212-1118-11ee-be56-0242ac120002' } }
  },
  //service
  {
    image: 'umbrella/iconAndTestimonial/Financial_Success.svg',
    content: `富人專案提供富人活化資本俱樂部 年報酬率24%以上。`.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Oak_Tree.svg',
    content:
      `樹人專案提供市場獨家前端產品 業界最高商業利潤 分享利潤同時邊回饋地球 從植樹做起 同時享有澳洲工作名額 最高市場回潤機制。`.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Debt.svg',
    content: `
    融資貸款
    分為『商品貸』（俗稱融資信貸）｜『原車融資貸款』兩種。金額最高分別為 45萬 ｜ 25~50萬。
    `.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Bank.svg',
    content: `
    銀行信用貸款
    各大銀行信貸，金額最高為薪資的22倍。
    `.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Business.svg',
    content: `
    青年創業貸款
    一條龍服務（包含成立公司、教育訓練、場地訪查...等等）。
    `.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Shopee.svg',
    content: `
    蝦皮企業貸款
    蝦皮運營操作，整合行銷，建置蝦皮商城等等。
    `.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Business_Network.svg',
    content: `
    企業貸款
    三年期貸款，金額最高為年營業額的25%。
    `.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/Car_Sale.svg',
    content: `
    買車找錢貸款
    金額最高價差30萬
    `.trim(),
    service: { connect: { id: '436b9930-11ae-11ee-be56-0242ac120002' } }
  },
  //feedback
  {
    image: 'umbrella/iconAndTestimonial/testimonials-1.jpg',
    content: `
        臺北市/Amy/公務員
        謝謝傘下管理學院，為我們找到真槍實戰的老師來上課，課程中工作人員也很熱心的為我們服務，開啟了我穩定賺錢的生活，朋友們也陸續去參加課程、一起賺錢！
        讓大家在資訊淹沒、到處都有招搖撞騙的現況裡，獨樹一格，幫助到很多學員，真的非常感謝！
        `.trim(),
    feedback: { connect: { id: '5e59b498-1118-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/testimonials-2.jpg',
    content: `
        臺中市/張先生/金融業
        覺得傘下管理學院的合作老師，是經過大風大浪淬鍊的老船長，而且用的方法讓學員容易懂容易上手，老師也不私藏的教學，助教也很盡力協助學員上課，這是我覺得傘下管理學院最棒的地方！
        非常推薦大家參加傘下管理學院的活動！
        `.trim(),
    feedback: { connect: { id: '5e59b498-1118-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/testimonials-3.jpg',
    content: `
       桃園市/李先生/職軍
       走進傘下管理學院，就像走進家裡，每次都感覺很溫馨，同學們彼此鼓勵與支援，能在這樣的環境學習，真的是太棒了，每次參加傘下管理學院的課程真的是滿滿的乾貨，拳拳到肉。
        `.trim(),
    feedback: { connect: { id: '5e59b498-1118-11ee-be56-0242ac120002' } }
  },
  {
    image: 'umbrella/iconAndTestimonial/testimonials-4.jpg',
    content: `
        臺北市/林小姐/家管
        謝謝傘下管理學院的工作團隊，讓我們有一個這麼好的環境可以學習，透過課程讓我發揮我自己的潛能
        ，讓我在自己的行業更上一層樓。 謝謝老師，感恩傘下管理學院所有的人、事、物。
        `.trim(),
    feedback: { connect: { id: '5e59b498-1118-11ee-be56-0242ac120002' } }
  }
]
