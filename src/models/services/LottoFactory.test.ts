import LOTTO_CONFIG from '../../constants/lottoConfig.js';
import LottoFactory from './LottoFactory.js';

describe('로또 팩토리 클래스 테스트', () => {
  test('구매 금액에 맞는 개수의 로또를 구입한다.', () => {
    const PURCHASE_PRICE = 3000;
    const QUANTITY = PURCHASE_PRICE / LOTTO_CONFIG.PRICE;

    const lottoFactory = new LottoFactory();
    const lottos = lottoFactory.purchaseLottos(PURCHASE_PRICE);

    expect(lottos.length).toBe(QUANTITY);
  });
});
