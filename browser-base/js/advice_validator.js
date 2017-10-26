/**
 * 診断型データ整合チェックモジュール
 *  診断型見積において範囲外の条件データの存在を検証する機能を提供する
 * @type {Object}
 */
var AdviceValidator = {};

/**
 * メインデータ構造に格納されているデータが診断型の条件値の範囲内かどうかを検証します
 * @param  {Object} params 診断コンテンツで選択された条件セット
 * @return {Boolean}
 */
AdviceValidator.isValidParamForAdvice = function(params) {

  // 年齢・性別を取得
  var birthday = params.userData.birthday;
  var age = params.userData.contractage.value || Plan.utils.getContractAge({
            year: birthday.year,
            month: birthday.month,
            date: birthday.date
          }, new Date());

  var sex = params.userData.sex;

  // 定期死亡保険
  if (params.fields.life.activator === 'TRUE') {
    // 保険期間
    if (!AdviceValidator.isValidLifeTermForAdvice(params.fields.life.condition.term, sex)) {
      return false;
    }
  }

  // 終身医療保険
  if (params.fields.medical2.activator === 'TRUE') {
    // 選択コース
    if (!AdviceValidator.isValidMedicalCourceForAdvice(params.fields.medical2.condition.course, sex)) {
      return false;
    }
    // 保険料払込期間
    if (!AdviceValidator.isValidMedicalPaymentForAdvice(params.fields.medical2.condition.payment, sex)) {
      return false;
    }
  }

  // がん保険
  if (params.fields.cancer.activator === 'TRUE') {
    // がん診断一時金
    if (!AdviceValidator.isValidCancerBenefitForAdvice(params.fields.cancer.condition.benefit, sex)) {
      return false;
    }
    // 選択コース
    if (!AdviceValidator.isValidCancerCourseForAdvice(params.fields.cancer.condition.course, sex)) {
      return false;
    }
  }

  // 就業不能保険
  if (params.fields.disability.activator === 'TRUE') {
    // 保険料払込期間
    if (!AdviceValidator.isValidDisabilityTermForAdvice(params.fields.disability.condition.term, sex, age)) {
      return false;
    }
    // 支払対象外期間
    if (!AdviceValidator.isValidDisabilityBillableForAdvice(params.fields.disability.condition.billable, sex)) {
      return false;
    }
    // 選択タイプ（標準：FALSE、ハーフ：TRUE）
    if (!AdviceValidator.isValidDisabilityOptionForAdvice(params.fields.disability.condition.option, sex)) {
      return false;
    }
  }

  return true;

};

/**
 * 定期死亡保険：保険期間が診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  term 保険期間
 * @param  {String}  sex 性別
 * @return {Boolean}
 */
AdviceValidator.isValidLifeTermForAdvice = function(term, sex) {
  var condition = Plan.config.advice.CONDITIONS[sex].life;
  return term === condition.A.term || term === condition.B.term || term === condition.C.term;
};

/**
 * 終身医療保険：コースが診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  course 選択コース
 * @param  {String}  sex 性別
 * @return {Boolean}
 */
AdviceValidator.isValidMedicalCourceForAdvice = function(course, sex) {
  var condition = Plan.config.advice.CONDITIONS[sex].medicalCancer;
  var values = [];
  if (condition.A.medical) values.push(condition.A.medical.course);
  if (condition.B.medical) values.push(condition.B.medical.course);
  if (condition.C.medical) values.push(condition.C.medical.course);

  return values.length > 0 ? values.indexOf(course) >= 0 : true;
};

/**
 * 終身医療保険：保険料払込期間が診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  payment 保険料払込期間
 * @param  {String}  sex 性別
 * @return {Boolean}
 */
AdviceValidator.isValidMedicalPaymentForAdvice = function(payment, sex) {
  var condition = Plan.config.advice.CONDITIONS[sex].medicalCancer;
  var values = [];
  if (condition.A.medical) values.push(condition.A.medical.payment);
  if (condition.B.medical) values.push(condition.B.medical.payment);
  if (condition.C.medical) values.push(condition.C.medical.payment);

  return values.length > 0 ? values.indexOf(payment) >= 0 : true;
};

/**
 * がん保険：がん診断一時金が診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  benefit 保険料払込期間
 * @param  {String}  sex 性別
 * @return {Boolean}
 */
AdviceValidator.isValidCancerBenefitForAdvice = function(benefit, sex) {
  var condition = Plan.config.advice.CONDITIONS[sex].medicalCancer;
  var values = [];

  if (condition.A.cancer) values.push(condition.A.cancer.benefit);
  if (condition.B.cancer) values.push(condition.B.cancer.benefit);
  if (condition.C.cancer) values.push(condition.C.cancer.benefit);

  return values.length > 0 ? values.indexOf(benefit) >= 0 : true;
};

/**
 * がん保険：コースが診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  course 選択コース（M78）
 * @param  {String}  sex 性別
 * @return {Boolean}
 */
AdviceValidator.isValidCancerCourseForAdvice = function(course, sex) {
  var condition = Plan.config.advice.CONDITIONS[sex].medicalCancer;
  var values = [];
  if (condition.A.cancer) values = values.concat(condition.A.cancer.course);
  if (condition.B.cancer) values = values.concat(condition.B.cancer.course);
  if (condition.C.cancer) values = values.concat(condition.C.cancer.course);

  return values.length > 0 ? values.indexOf(course) >= 0 : true;
};

/**
 * 就業不能保険：保険料払込期間が診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  term 保険料払込期間
 * @param  {String}  sex 性別
 * @param  {String}  age 年齢
 * @return {Boolean}
 */
AdviceValidator.isValidDisabilityTermForAdvice = function(term, sex, age) {
  var condition = Plan.config.advice.CONDITIONS[sex].disability;
  return term === Plan.params.constraint.getFallbackDisabilityTerm(condition.A.term, age) ||
        term === Plan.params.constraint.getFallbackDisabilityTerm(condition.B.term, age) ||
        term === Plan.params.constraint.getFallbackDisabilityTerm(condition.C.term, age);
};

/**
 * 就業不能保険：支払対象外期間が診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  billable 支払対象外期間
 * @param  {String}  sex 性別
 * @return {Boolean}
 */
AdviceValidator.isValidDisabilityBillableForAdvice = function(billable, sex) {
  var condition = Plan.config.advice.CONDITIONS[sex].disability;
  return billable === condition.A.billable || billable === condition.B.billable || billable === condition.C.billable;
};

/**
 * 就業不能保険：選択タイプが診断型の条件値の範囲内かどうかを検証します
 * @param  {String}  option 選択タイプ
 * @param  {String}  sex 性別
 * @return {Boolean}
 */
AdviceValidator.isValidDisabilityOptionForAdvice = function(option, sex) {
  var condition = Plan.config.advice.CONDITIONS[sex].disability;
  return option === condition.A.option || option === condition.B.option || option === condition.C.option;
};
