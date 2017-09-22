// アサーションライブラリの読み込み
var assert = chai.assert;

// テスト用のmockパラメータ
var params1 = {
  userData: {
    sex: 'male',
    contractage: {
      value: '20'
    },
    birthday: {

    }
  },
  fields: {
    life: {
      activator: 'TRUE',
      condition: {
        term: '10years'
      }
    },
    medical2: {
      activator: 'TRUE',
      condition: {
        course: 'A1',
        payment: 'all'
      }
    },
    cancer: {
      activator: 'TRUE',
      condition: {
        benefit: '100',
        course: 'C2'
      }
    },
    disability: {
      activator: 'TRUE',
      condition: {
        term: '65old',
        billable: '180days',
        option: 'TRUE'
      }
    }
  }
};

var params2 = {
  userData: {
    sex: 'female',
    contractage: {
      value: '20'
    },
    birthday: {

    }
  },
  fields: {
    life: {
      activator: 'TRUE',
      condition: {
        term: '10years'
      }
    },
    medical2: {
      activator: 'TRUE',
      condition: {
        course: 'A1',
        payment: 'all'
      }
    },
    cancer: {
      activator: 'TRUE',
      condition: {
        benefit: '100',
        course: 'C2'
      }
    },
    disability: {
      activator: 'TRUE',
      condition: {
        term: '55old',
        billable: '60days',
        option: 'FALSE'
      }
    }
  }
};

var params3 = {
  userData: {
    sex: 'female',
    contractage: {
      value: '20'
    },
    birthday: {

    }
  },
  fields: {
    life: {
      activator: 'TRUE',
      condition: {
        term: '10years'
      }
    },
    medical2: {
      activator: 'TRUE',
      condition: {
        course: 'A1',
        payment: 'all'
      }
    },
    cancer: {
      activator: 'TRUE',
      condition: {
        benefit: '100',
        course: 'C2'
      }
    },
    disability: {
      activator: 'TRUE',
      condition: {
        term: '55old',
        billable: 'all',
        option: 'TRUE'
      }
    }
  }
};

// Validatorモジュールのテスト
describe('Advice Validator モジュールのテスト', function() {

  // isValidLifeTermForAdvice関数のテスト
  describe('isValidLifeTermForAdvice関数のテスト: 定期死亡保険/保険期間が診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('10years', 'male'), true);
    });

    it('男性 B InValid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('20years', 'male'), false);
    });

    it('男性 C InValid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('30years', 'male'), false);
    });

    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('65old', 'male'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('10years', 'female'), true);
    });

    it('女性 B InValid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('20years', 'female'), false);
    });

    it('女性 C InValid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('30years', 'female'), false);
    });

    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidLifeTermForAdvice('65old', 'female'), false);
    });

  });

  // isValidMedicalCourceForAdvice関数のテスト
  describe('isValidMedicalCourceForAdvice関数のテスト: 終身医療保険/コースが診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('A1', 'male'), true);
    });
    it('男性 B InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('A2', 'male'), false);
    });
    it('男性 C InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('F1', 'male'), false);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('F2', 'male'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('F1', 'female'), true);
    });
    it('女性 B InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('F2', 'female'), false);
    });
    it('女性 C InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('A1', 'female'), false);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidMedicalCourceForAdvice('A2', 'female'), false);
    });

  });

  // isValidMedicalPaymentForAdvice関数のテスト
  describe('isValidMedicalPaymentForAdvice関数のテスト: 終身医療保険/保険料払込期間が診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('all', 'male'), true);
    });
    it('男性 B InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('60old', 'male'), false);
    });
    it('男性 C InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('65old', 'male'), false);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('80old', 'male'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('all', 'female'), true);
    });
    it('女性 B InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('60old', 'female'), false);
    });
    it('女性 C InValid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('65old', 'female'), false);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidMedicalPaymentForAdvice('80old', 'female'), false);
    });

  });

  // isValidCancerBenefitForAdvice関数のテスト
  describe('isValidCancerBenefitForAdvice関数のテスト: がん保険/がん診断一時金が診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('100', 'male'), true);
    });
    it('男性 B InValid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('200', 'male'), false);
    });
    it('男性 C InValid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('300', 'male'), false);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('500', 'male'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('100', 'female'), true);
    });
    it('女性 B InValid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('200', 'female'), false);
    });
    it('女性 C InValid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('300', 'female'), false);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidCancerBenefitForAdvice('500', 'female'), false);
    });

  });

  // isValidCancerCourseForAdvice関数のテスト
  describe('isValidCancerCourseForAdvice関数のテスト: がん保険/コースが診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('C2', 'male'), true);
    });
    it('男性 B Valid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('D2', 'male'), true);
    });
    it('男性 C Valid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('C2', 'male'), true);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('C1', 'male'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('C2', 'female'), true);
    });
    it('女性 B Valid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('D2', 'female'), true);
    });
    it('女性 C Valid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('D2', 'female'), true);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidCancerCourseForAdvice('D1', 'female'), false);
    });

  });

  // isValidDisabilityTermForAdvice関数のテスト
  describe('isValidDisabilityTermForAdvice関数のテスト: 就業不能保険/保険料払込期間が診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('65old', 'male', '20'), true);
    });
    it('男性 B InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('60old', 'male', '20'), false);
    });
    it('男性 C InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('all', 'male', '20'), false);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'male', '20'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('65old', 'female', '20'), true);
    });
    it('女性 B InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('60old', 'female', '20'), false);
    });
    it('女性 C InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'female', '20'), false);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('all', 'female', '20'), false);
    });

    // ５６歳以上の時
    it('※56歳以上の場合 男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'male', '56'), true);
    });
    it('※56歳以上の場合 男性 B Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'male', '56'), true);
    });
    it('※56歳以上の場合 男性 C Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'male', '56'), true);
    });
    it('※56歳以上の場合 男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('100old', 'male', '56'), false);
    });

    it('※56歳以上の場合 女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'female', '56'), true);
    });
    it('※56歳以上の場合 女性 B Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'female', '56'), true);
    });
    it('※56歳以上の場合 女性 C Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('70old', 'female', '56'), true);
    });
    it('※56歳以上の場合 女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityTermForAdvice('100old', 'female', '56'), false);
    });

  });

  // isValidDisabilityBillableForAdvice関数のテスト
  describe('isValidDisabilityBillableForAdvice関数のテスト:  就業不能保険/支払対象外期間が診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('180days', 'male'), true);
    });
    it('男性 B InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('90days', 'male'), false);
    });
    it('男性 C InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('60days', 'male'), false);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('120days', 'male'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('180days', 'female'), true);
    });
    it('女性 B InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('120days', 'female'), false);
    });
    it('女性 C InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('60days', 'female'), false);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityBillableForAdvice('90days', 'female'), false);
    });

  });

  // isValidDisabilityOptionForAdvice関数のテスト
  describe('isValidDisabilityOptionForAdvice関数のテスト: 就業不能保険/選択タイプが診断型の条件値の範囲内かどうかを検証します', function() {

    it('男性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('TRUE', 'male'), true);
    });
    it('男性 B InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('FALSE', 'male'), false);
    });
    it('男性 C InValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('FALSE', 'male'), false);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('false', 'male'), false);
    });
    it('男性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('true', 'male'), false);
    });

    it('女性 A Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('TRUE', 'female'), true);
    });
    it('女性 B Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('TRUE', 'female'), true);
    });
    it('女性 C Valid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('TRUE', 'female'), true);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('FALSE', 'female'), false);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('false', 'female'), false);
    });
    it('女性 上記以外 inValid', function() {
      assert.equal(AdviceValidator.isValidDisabilityOptionForAdvice('true', 'female'), false);
    });

  });

  // isValidParamForAdvice関数のテスト
  describe('isValidParamForAdvice関数のテスト: 全てのチェックを行い1つでもエラーがあればfalseを返す', function() {

    // 男性 正常
    it('男性 正常系 エラーなし', function() {
      assert.equal(AdviceValidator.isValidParamForAdvice(params1), true);
    });

    // 男性 正常
    it('エラーあり', function() {
      assert.equal(AdviceValidator.isValidParamForAdvice(params2), false);
    });

    it('エラーあり', function() {
      assert.equal(AdviceValidator.isValidParamForAdvice(params3), false);
    });

  });

});