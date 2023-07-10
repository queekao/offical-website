import { Prisma } from '@prisma/client'
export const QnAData: Prisma.QnACreateInput[] = [
  //loan
  {
    question: 'Q：若沒有勞保薪轉，可以辦理嗎?',
    answer: 'A：可以，公司會依照您的條件選擇適合您的方案。',
    generic: 'LOAN'
  },
  {
    question: 'Q：若要辦理需要準備哪些資料?',
    answer: 'A：公司會依照您辦理的項目決定，歡迎添加LINE或來電洽詢。',
    generic: 'LOAN'
  },
  {
    question: 'Q：個資會不會外流?',
    answer: 'A：本公司對客戶的資料絕對保密，不會有任何洩漏的可能。',
    generic: 'LOAN'
  },
  // part-time
  {
    question: 'Q：澳聯會是做什麼的?',
    answer:
      'A：主要為澳洲各省的聯合會，會內負責各省實業串接、資源共享與交易。備註：雙方合作合同如圖示。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：澳洲打工的所有流程是如何？',
    answer:
      'A：桃園國際機場起飛，至澳洲將有澳聯會專員接待，安排到當地農場旁住宿地點；次日教育訓練後，開始採收葡萄工作事宜。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：住宿要自己到當地尋找嗎？是否有簽約？',
    answer: 'A：安排集合住宅(1-4人/間、8人/間)；住宿合約為半年一簽。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：有簽約嗎？工作多久？簽約多久？',
    answer: 'A：有簽工作合同；一年一簽；半年/次。備註：可以只去半年。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：工作期間的保險為何？',
    answer: 'A：外工沒有保險，若要保險可以協助處理。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：收入在臺灣要繳稅嗎？在國外要繳稅嗎？',
    answer: 'A：在臺灣不用，國外會自動扣繳。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：自己要準備多少錢出發？',
    answer: 'A：基本1~2個月生活費用，約8萬上下',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：澳洲打工可能有的一切開銷？',
    answer: 'A：基本按照個人自主開銷。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：薪水待遇怎麼計算？',
    answer: 'A：採績效制，一天100箱，每月就有12~15萬，差別在於氣候及作業時間。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：跟哪個農場合作？',
    answer: 'A：GRT農場。',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：各自出發還是集體出發？',
    answer: 'A：都可以！',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：會不會說英文，有沒有太大影響？',
    answer: 'A：完全沒影響～',
    generic: 'PARTTIME'
  },
  {
    question: 'Q：是到澳洲哪個地區？',
    answer: 'A：米杜拉機場。',
    generic: 'PARTTIME'
  }
]
