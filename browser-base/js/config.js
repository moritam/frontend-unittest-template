/**
 * @member {boolean} __LN_PLAN_SELECT_BIRTHDAY 生年月日入力の使用有無を指定
 */
var __LN_PLAN_SELECT_BIRTHDAY = true;
var __LN_PLAN_SMARTPHONE = false;

var __LN_PLAN_VALID_AGE_START = 20;
var __LN_PLAN_VALID_AGE_END = 70;

var __LN_PLAN_PANELS = [
  {
    id: 'life',
    display: true
  },
  {
    id: 'medical',
    display: true
  },
  {
    id: 'cancer',
    display: true
  },
  {
    id: 'disability',
    display: true
  },
  {
    id: 'treatment',
    display: false
  }
];


/**
 * @member {object} __LN_PLAN_PAGE_SPECIFIC_PARAMS_PRE 見積条件（事前ロード用)
 */
var __LN_PLAN_PAGE_SPECIFIC_PARAMS_PRE = {
    userData: {
        contractage: {
            //value: "fixed_33"
        },
        //sex: "fixed_male"
    },
    fields: {
      life: {
          //activator: 'TRUE',
          condition: {
              //insurance: "600",
              //term: "fixed_20years"
          }
      },
      medical2: {
        //activator: 'TRUE',
        condition: {
          //course: 'A1'
        }
      },
      disability: {
        //activator: 'TRUE'
      },
      treatment: {
        //activator: 'FALSE'
      },
      cancer: {
        //activator: 'TRUE'
      }
    }
};

/**
 * @member {object} __LN_PLAN_PAGE_SPECIFIC_PARAMS_POST 見積条件（事後ロード用)
 */
var __LN_PLAN_PAGE_SPECIFIC_PARAMS_POST = {
    userData: {
        contractage: {
            //value: "fixed_25"
        },
        //sex: "fixed_female"
    },
    fields: {
        life: {
            //activator: 'FALSE',
            condition: {
                //insurance: "600",
                //term: "fixed_20years"
            }
        },
        medical2: {
          //activator: 'FALSE',
          condition: {
            //course: 'A1'
          }
        },
        disability: {
          // activator: 'TRUE',
          //  condition: {
          //    benefit: '15',
          //    billable: '180days',
          //    option: 'TRUE',
          //    term: '65old'
          //  }
        },
        treatment: {
          //activator: 'TRUE'
        },
        cancer: {
          
        }
    }
};

/**
 * @member {object} __LN_PLAN_SHOW_LINKS リンク表示関連設定
 */
var __LN_PLAN_SHOW_LINKS = {
    startPlan: {
        prop44_sph: '[click_sph]multiplan_start',
        prop44_pc: '[click_pc]multiplan_start',
    },
    backToTop: {
        display: true,
        prop44_sph: '[click_sph]multiplan_top',
        prop44_pc: '[click_pc]multiplan_top',
        url_sph: '/sph/',
        url_pc: '/'
    },
    proceedPlan: {
        display: true,
        prop44_sph: '[click_sph]multiplan_confirm',
        prop44_pc: '[click_pc]multiplan_confirm',
        url_sph: '/sph/confirm/',
        url_pc: '/plan/check/'
    },
    consultPro: {
        display: true,
        prop44_sph: '[click_sph]multiplan_cc_consulting',
        prop44_pc: '[click_pc]multiplan_cc_consulting',
        url_sph: '/sph/cc_consulting/',
        url_pc: '/cc_consulting/'
    },
    consultLine: {
        display: true,
        prop44_sph: '[click_sph]multiplan_line',
        prop44_pc: '[click_pc]multiplan_line'
    },
    requestCatalog: {
        display: true,
        prop44_sph: '[click_sph]multiplan_pamphlet',
        prop44_pc: '[click_pc]multiplan_pamphlet'
    },
    sendPlanByMail: {
    display: true,
    prop44_sph: '[click_sph]multiplan_sendmail',
    prop44_pc: '[click_pc]multiplan_sendmail'
  }
};

/**
 * @member {Object} __LN_PLAN_CONFIG.advice.CONDITIONS
 * 提案型の選択項目と条件
 */
var __LN_PLAN_CONFIG = {
  advice: {}
};

__LN_PLAN_CONFIG.advice.CONDITIONS = {
  // 男性
  male: {
    // ご自身が亡くなったとき
    life: {
      A: {
        insurance: '2000', // 保険金額
        term: '10years', // 保険期間、保険料払込期間
        comment: '子どもの教育費を補えるように、<em>2000万円をベース</em>に、二人目からはプラス1000万円で考えよう。最後はトータル保険料とのバランスで調整を。'
      },
      B: {
        insurance: '1000',
        term: '10years',
        comment: '配偶者や両親が生活を立て直す費用として、<em>最低限1000万円</em>で考えよう。葬儀代やお墓代は必要に応じてプラス500万円程度の調整を。'
      },
      C: {
        insurance: '500',
        term: '10years',
        comment: '残された家族の生活費を保険で補わない場合は、<em>葬儀代や身辺整理費として500万円</em>を。生活費が必要な場合は、保険金額の上乗せを。'
      }
    },
    // 病気やケガ・がんになったとき
    medicalCancer: {
      A: {
        // 終身医療保険
        medical: {
          admission: '8000', // 入院給付金日額
          course: 'A1', // 選択コース
          payment: 'all', // 保険料払込期間
          comment: '医療費の自己負担分や、差額ベッド代にも備えるためには、<em>日額8,000円</em>がおすすめ。トータル保険料とのバランスで調整を。'
        },
        // がん保険
        cancer: {
          course: ['D2', 'C2'], // M78コース（配列の先頭の値を条件として適用。配列は許可する値。）
          benefit: '100', // M78がん診断一時金
          comment: 'がんにもしっかり備えるために、がん診断一時金と、治療サポート給付金に加えて、がんと診断された後の収入サポートとして、<em>「がん収入サポート給付金」</em>があると安心です。'
        }
      },
      B: {
        medical: {
          admission: '8000', // 入院給付金日額
          course: 'A1', // 選択コース
          payment: 'all', // 保険料払込期間
          comment: '医療費の自己負担分や、差額ベッド代にも備えるためには、<em>日額8,000円</em>がおすすめ。トータル保険料とのバランスで調整を。'
        },
        cancer: {
          course: ['C2', 'D2'], // M78コース（配列の先頭の値を条件として適用。配列は許可する値。）
          benefit: '100', // M78がん診断一時金
          comment: 'がんにも備えるために、<em>がん診断一時金、治療サポート給付金</em>がついた保障がおすすめです。がんにもっと備えたい場合は、がんと診断された後の収入サポートとして、「がん収入サポート給付金」をつけると、より安心です。'
        }
      },
      C: {
        medical: {
          admission: '5000', // 入院給付金日額
          course: 'A1', // 選択コース
          payment: 'all', // 保険料払込期間
          comment: '医療費の自己負担分などに備えるために<em>日額5,000円</em>がおすすめです。トータル保険料とのバランスで調整を。'
        },
        cancer: {
          course: ['C2', 'D2'], // M78コース（配列の先頭の値を条件として適用。配列は許可する値。）
          benefit: '100', // M78がん診断一時金
          comment: 'がんにも備えるために、<em>がん診断一時金、治療サポート給付金</em>がついた保障がおすすめです。がんにもっと備えたい場合は、がんと診断された後の収入サポートとして、「がん収入サポート給付金」をつけると、より安心です。'
        }
      }
    },
    // 働けなくなったとき
    disability: {
      A: {
        benefit: '20', // 就業不能給付金月額
        term: '65old', // 保険料払込期間
        billable: '180days', // 支払対象外期間
        option: 'TRUE', // 選択タイプ（標準：FALSE、ハーフ：TRUE）
        comment: '収入が途絶えたときに、<em>日々の生活や、自身の療養に困らないような月額給付金額</em>を、保険料とのバランスを見ながら調整を。'
      },
      B: {
        benefit: '15',
        term: '65old',
        billable: '180days',
        option: 'TRUE',
        comment: '収入が途絶えたときに、<em>日々の生活や、自身の療養に困らないような月額給付金額</em>を、保険料とのバランスを見ながら調整を。'
      },
      C: {
        benefit: '10',
        term: '65old',
        billable: '180days',
        option: 'TRUE',
        comment: '収入が途絶えたときに、<em>日々の生活や、自身の療養に困らないような月額給付金額</em>を、保険料とのバランスを見ながら調整を。'
      }
    }
  },
  // 女性
  female: {
    // ご自身が亡くなったとき
    life: {
      A: {
        insurance: '2000', // 保険金額
        term: '10years', // 保険期間、保険料払込期間
        comment: '子どもの教育費を補えるように、<em>2000万円をベース</em>に、二人目からはプラス1000万円で考えよう。最後はトータル保険料とのバランスで調整を。'
      },
      B: {
        insurance: '1000',
        term: '10years',
        comment: '配偶者や両親が生活を立て直す費用として、<em>最低限1000万円</em>で考えよう。葬儀代やお墓代は必要に応じてプラス500万円程度の調整を。'
      },
      C: {
        insurance: '500',
        term: '10years',
        comment: '残された家族の生活費を保険で補わない場合は、<em>葬儀代や身辺整理費として500万円</em>を。生活費が必要な場合は、保険金額の上乗せを。'
      }
    },
    // 病気やケガ・がんになったとき
    medicalCancer: {
      A: {
        // 終身医療保険
        medical: {
          admission: '8000', // 入院給付金日額
          course: 'F1', // 選択コース
          payment: 'all', // 保険料払込期間
          comment: '医療費の自己負担分や、差額ベッド代にも備えるためには、<em>日額8,000円</em>がおすすめ。トータル保険料とのバランスで調整を。'
        },
        // がん保険
        cancer: {
          course: ['D2', 'C2'], // M78コース（配列の先頭の値を条件として適用。配列は許可する値。）
          benefit: '100', // M78がん診断一時金
          comment: 'がんにもしっかり備えるために、がん診断一時金と、治療サポート給付金に加えて、がんと診断された後の収入サポートとして、<em>「がん収入サポート給付金」</em>があると安心です。'
        }
      },
      B: {
        medical: {
          admission: '8000', // 入院給付金日額
          course: 'F1', // 選択コース
          payment: 'all', // 保険料払込期間
          comment: '医療費の自己負担分や、差額ベッド代にも備えるためには、<em>日額8,000円</em>がおすすめ。トータル保険料とのバランスで調整を。'
        },
        cancer: {
          course: ['C2', 'D2'], // M78コース（配列の先頭の値を条件として適用。配列は許可する値。）
          benefit: '100', // M78がん診断一時金
          comment: 'がんにも備えるために、<em>がん診断一時金、治療サポート給付金</em>がついた保障がおすすめです。がんにもっと備えたい場合は、がんと診断された後の収入サポートとして、「がん収入サポート給付金」をつけると、より安心です。'
        }
      },
      C: {
        medical: {
          admission: '5000', // 入院給付金日額
          course: 'F1', // 選択コース
          payment: 'all', // 保険料払込期間
          comment: '医療費の自己負担分などに備えるために<em>日額5,000円</em>がおすすめです。トータル保険料とのバランスで調整を。'
        },
        cancer: {
          course: ['C2', 'D2'], // M78コース（配列の先頭の値を条件として適用。配列は許可する値。）
          benefit: '100', // M78がん診断一時金
          comment: 'がんにも備えるために、<em>がん診断一時金、治療サポート給付金</em>がついた保障がおすすめです。がんにもっと備えたい場合は、がんと診断された後の収入サポートとして、「がん収入サポート給付金」をつけると、より安心です。'
        }
      }
    },
    // 働けなくなったとき
    disability: {
      A: {
        benefit: '20', // 就業不能給付金月額
        term: '65old', // 保険料払込期間
        billable: '180days', // 支払対象外期間
        option: 'TRUE', // 選択タイプ（標準：FALSE、ハーフ：TRUE）
        comment: '収入が途絶えたときに、<em>日々の生活や、自身の療養に困らないような月額給付金額</em>を、保険料とのバランスを見ながら調整を。'
      },
      B: {
        benefit: '15',
        term: '65old',
        billable: '180days',
        option: 'TRUE',
        comment: '収入が途絶えたときに、<em>日々の生活や、自身の療養に困らないような月額給付金額</em>を、保険料とのバランスを見ながら調整を。'
      },
      C: {
        benefit: '10',
        term: '65old',
        billable: '180days',
        option: 'TRUE',
        comment: '収入が途絶えたときに、<em>日々の生活や、自身の療養に困らないような月額給付金額</em>を、保険料とのバランスを見ながら調整を。'
      }
    }
  }
};